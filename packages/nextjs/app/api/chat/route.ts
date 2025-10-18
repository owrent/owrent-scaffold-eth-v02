import { NextRequest, NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { getTokens } from "@civic/auth-web3/nextjs";
import { convertToCoreMessages, streamText } from "ai";
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
    } catch {
      return NextResponse.json({ error: "Invalid request: messages array required" }, { status: 400 });
    }

    // Validate messages array exists
    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json({ error: "Invalid request: messages array required" }, { status: 400 });
    }

    // Convert UI messages to core messages
    const coreMessages = convertToCoreMessages(body.messages);

    // Retrieve Nexus tools
    const nexusTools = await getNexusTools();

    // Initialize AI model with streaming
    const model = openai("gpt-4o");

    // Stream AI response with tools
    const result = streamText({
      model,
      messages: coreMessages,
      tools: nexusTools,
    });

    // Return streaming response compatible with @ai-sdk/react
    return result.toTextStreamResponse();
  } catch (error) {
    // Log error with context (without sensitive information)
    console.error("Chat error:", error instanceof Error ? error.message : "Unknown error");

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
      }
    }

    // Return 500 error with user-friendly message
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
