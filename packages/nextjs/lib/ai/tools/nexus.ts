import { getTokens } from "@civic/auth-web3/nextjs";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { experimental_createMCPClient } from "ai";

/**
 * Retrieves Nexus tools for AI chat integration
 *
 * This function initializes an MCP client connection to Civic Nexus
 * and retrieves available tools that the AI can use to interact with
 * connected services (GitHub, Slack, Notion, etc.)
 *
 * @returns Promise<Record<string, Tool>> - Available Nexus tools or empty object if unavailable
 */
export async function getNexusTools(): Promise<Record<string, any>> {
  try {
    // Retrieve access token from Civic Auth
    const tokens = await getTokens();
    const accessToken = tokens?.accessToken;

    // Return empty tools if no access token
    if (!accessToken) {
      console.warn("No access token available, continuing without Nexus tools");
      return {};
    }

    // Create StreamableHTTPClientTransport with Nexus endpoint
    const transport = new StreamableHTTPClientTransport(new URL("https://nexus.civic.com/hub/mcp"), {
      requestInit: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });

    // Initialize MCP client
    const mcpClient = await experimental_createMCPClient({ transport });

    // Retrieve available tools
    const tools = await mcpClient.tools();

    return tools;
  } catch (error) {
    // Log error without exposing sensitive information
    console.warn(
      "Failed to load Nexus tools, continuing without them:",
      error instanceof Error ? error.message : "Unknown error",
    );

    // Return empty object to allow chat to continue without tools
    return {};
  }
}
