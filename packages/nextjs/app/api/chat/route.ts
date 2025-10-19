import { NextRequest, NextResponse } from "next/server";
import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import { getTokens } from "@civic/auth-web3/nextjs";
import { streamText } from "ai";
import { getNexusTools } from "~~/lib/ai/tools/nexus";

/**
 * AI Chat API Route
 *
 * Handles POST requests for AI chat interactions with streaming responses.
 * Integrates with Civic Nexus for tool calling and OpenAI for AI generation.
 */
export async function POST(request: NextRequest): Promise<Response> {
  try {
    // Check authentication
    const tokens = await getTokens();
    const accessToken = tokens?.accessToken;

    if (!accessToken) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 });
    }

    // Validate messages array exists and is valid
    if (!body.messages || !Array.isArray(body.messages)) {
      console.error("Invalid messages:", body.messages);
      return NextResponse.json({ error: "Invalid request: messages array required" }, { status: 400 });
    }

    if (body.messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    // Validate and clean messages
    let cleanedMessages;
    try {
      cleanedMessages = body.messages
        .filter((msg: any) => msg && typeof msg === "object" && msg.content)
        .map((msg: any) => ({
          role: msg.role || "user",
          content: String(msg.content || ""),
          ...(msg.toolInvocations && { toolInvocations: msg.toolInvocations }),
        }));
    } catch (filterError) {
      console.error("Error filtering messages:", filterError);
      return NextResponse.json({ error: "Invalid message format" }, { status: 400 });
    }

    if (!cleanedMessages || cleanedMessages.length === 0) {
      return NextResponse.json({ error: "No valid messages provided" }, { status: 400 });
    }

    // Log messages for debugging
    console.log("Processing messages:", cleanedMessages.length);

    // Convert UI messages to core messages format
    // The AI SDK expects messages in a specific format
    let coreMessages;
    try {
      // Manually convert to ensure proper format
      coreMessages = cleanedMessages.map((msg: any) => {
        const coreMsg: any = {
          role: msg.role === "user" ? "user" : msg.role === "assistant" ? "assistant" : "system",
          content: msg.content,
        };

        // Add tool invocations if present
        if (msg.toolInvocations && Array.isArray(msg.toolInvocations)) {
          coreMsg.toolInvocations = msg.toolInvocations;
        }

        return coreMsg;
      });

      console.log("Converted to core messages:", coreMessages.length);
    } catch (conversionError) {
      console.error("Error converting messages:", conversionError);
      console.error("Cleaned messages:", JSON.stringify(cleanedMessages, null, 2));
      return NextResponse.json({ error: "Failed to process messages. Please try again." }, { status: 400 });
    }

    // Check for AI API key and set it for the SDK
    const apiKey = process.env.AI_GATEWAY_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI service not configured. Please set AI_GATEWAY_API_KEY in your environment variables." },
        { status: 503 },
      );
    }

    // Set the API key as environment variable for the AI SDK
    const provider = process.env.AI_MODEL_PROVIDER || "openai";
    if (provider === "openai") {
      process.env.OPENAI_API_KEY = apiKey;
    } else if (provider === "anthropic") {
      process.env.ANTHROPIC_API_KEY = apiKey;
    }

    // Determine model name
    const modelName = process.env.AI_MODEL_NAME || (provider === "anthropic" ? "claude-sonnet-4-5-20250929" : "gpt-4o");

    // Initialize AI model based on provider
    const model = provider === "anthropic" ? anthropic(modelName) : openai(modelName);

    // Try to retrieve Nexus tools, but don't fail if unavailable
    let nexusTools: Record<string, any> | undefined;
    try {
      const tools = await getNexusTools();
      if (tools && Object.keys(tools).length > 0) {
        nexusTools = tools;
        console.log("Using Nexus tools:", Object.keys(tools));
      }
    } catch (toolError) {
      console.warn("Failed to load Nexus tools, continuing without them:", toolError);
    }

    // Stream AI response (with or without tools)
    const result = nexusTools
      ? streamText({
          model,
          messages: coreMessages,
          tools: nexusTools,
        })
      : streamText({
          model,
          messages: coreMessages,
        });

    // Return streaming response compatible with @ai-sdk/react
    return result.toTextStreamResponse();
  } catch (error) {
    // Log full error for debugging
    console.error("Chat error:", error);
    if (error instanceof Error) {
      console.error("Error stack:", error.stack);
    }

    // Extract user-friendly error message
    let errorMessage = "An error occurred while processing your request";

    if (error instanceof Error) {
      // Provide more specific error messages for known error types
      if (error.message.includes("API key")) {
        errorMessage = "AI service configuration error. Please contact support.";
      } else if (error.message.includes("rate limit")) {
        errorMessage = "Too many requests. Please try again later.";
      } else if (error.message.includes("model")) {
        errorMessage = "AI model unavailable. Please try again later.";
      } else if (error.message.includes("filter")) {
        errorMessage = "Internal error processing messages. Please try again.";
      }
    }

    // Return 500 error with user-friendly message
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
