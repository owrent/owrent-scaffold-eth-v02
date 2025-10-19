# AI Chat Error Fix

## Problem

The AI chat feature was experiencing a runtime error:

```
Chat error: Cannot read properties of undefined (reading 'filter')
POST /api/chat 500 in 3508ms
```

## Root Causes

1. **Message Validation Issue**: The `convertToCoreMessages` function was receiving messages with undefined or null values, causing it to fail when trying to filter them
2. **Tools Format Issue**: The `getNexusTools()` function could return data in an unexpected format (array vs object)
3. **Insufficient Error Handling**: The chat route didn't properly validate and clean messages before processing

## Fixes Applied

### 1. Message Validation and Cleaning (`app/api/chat/route.ts`)

Added robust message validation and cleaning before processing:

```typescript
// Validate and clean messages
const cleanedMessages = body.messages
  .filter((msg: any) => msg && typeof msg === "object")
  .map((msg: any) => ({
    role: msg.role || "user",
    content: msg.content || "",
    ...(msg.toolInvocations && { toolInvocations: msg.toolInvocations }),
  }));
```

### 2. Safe Message Conversion

Wrapped `convertToCoreMessages` in try-catch to handle conversion errors:

```typescript
try {
  coreMessages = convertToCoreMessages(cleanedMessages);
} catch (conversionError) {
  console.error("Error converting messages:", conversionError);
  return NextResponse.json(
    { error: "Failed to process messages. Please try again." },
    { status: 400 },
  );
}
```

### 3. Enhanced Tools Validation (`lib/ai/tools/nexus.ts`)

Added validation to handle both array and object responses from Nexus:

```typescript
// If tools is an array, convert it to an object
if (Array.isArray(tools)) {
  const toolsObject: Record<string, any> = {};
  tools.forEach((tool: any, index: number) => {
    if (tool && tool.name) {
      toolsObject[tool.name] = tool;
    }
  });
  return toolsObject;
}
```

### 4. Isolated Tools Loading

Wrapped tools loading in try-catch to prevent failures from breaking the chat:

```typescript
try {
  const tools = await getNexusTools();
  if (tools && Object.keys(tools).length > 0) {
    nexusTools = tools;
  }
} catch (toolError) {
  console.warn("Failed to load Nexus tools, continuing without them");
}
```

### 3. API Key Configuration

Added proper API key handling with clear error messages:

```typescript
// Check for AI API key and set it for the SDK
const apiKey = process.env.AI_GATEWAY_API_KEY;
if (!apiKey) {
  return NextResponse.json(
    { error: "AI service not configured. Please set AI_GATEWAY_API_KEY in your environment variables." },
    { status: 503 },
  );
}
```

### 4. Multi-Provider Support

Added support for both OpenAI and Anthropic:

```typescript
// Set the API key as environment variable for the AI SDK
const provider = process.env.AI_MODEL_PROVIDER || "openai";
if (provider === "openai") {
  process.env.OPENAI_API_KEY = apiKey;
} else if (provider === "anthropic") {
  process.env.ANTHROPIC_API_KEY = apiKey;
}
```

## Setup Instructions

### 1. Create `.env.local` File

Copy the example environment file:

```bash
cd owrent-scaffold-eth-v02/packages/nextjs
cp .env.example .env.local
```

### 2. Get OpenAI API Key

1. Visit https://platform.openai.com/api-keys
2. Sign up or log in to your OpenAI account
3. Click "Create new secret key"
4. Copy the API key

### 3. Configure Environment Variables

Edit `.env.local` and add your API key:

```env
# Required: AI Gateway API Key
AI_GATEWAY_API_KEY=sk-proj-your-openai-api-key-here

# Optional: AI Model Configuration
AI_MODEL_PROVIDER=openai
AI_MODEL_NAME=gpt-4o
```

### 4. Alternative: Use Anthropic

If you prefer Anthropic's Claude:

1. Visit https://console.anthropic.com/settings/keys
2. Create an API key
3. Configure in `.env.local`:

```env
AI_GATEWAY_API_KEY=sk-ant-your-anthropic-api-key-here
AI_MODEL_PROVIDER=anthropic
AI_MODEL_NAME=claude-sonnet-4-5-20250929
```

### 5. Restart Development Server

```bash
# Stop the current server (Ctrl+C)
# Start it again
yarn start
```

## Testing

1. Navigate to http://localhost:3000/ai-chat
2. Sign in with Civic Auth
3. Send a test message
4. You should receive a response from the AI

## Error Messages

The chat now provides clear error messages:

- **"Authentication required"** (401): User needs to sign in
- **"AI service not configured"** (503): `AI_GATEWAY_API_KEY` is missing
- **"Invalid request: messages array required"** (400): Malformed request
- **Other errors** (500): Specific error messages based on the failure type

## Troubleshooting

### Issue: "AI service not configured"

**Solution**: Set the `AI_GATEWAY_API_KEY` in your `.env.local` file

### Issue: "API key" error

**Solution**: Verify your API key is valid and has sufficient credits

### Issue: "rate limit" error

**Solution**: You've exceeded the API rate limit. Wait a few minutes or upgrade your plan

### Issue: Chat still not working

**Solution**:

1. Check browser console for errors
2. Verify `.env.local` file exists and has the correct key
3. Restart the development server
4. Clear browser cache and cookies

## Architecture

```
User → AI Chat Page → /api/chat → AI SDK
                          ↓
                    getNexusTools() → Civic Nexus (optional)
                          ↓
                    OpenAI/Anthropic API
                          ↓
                    Streaming Response → User
```

## Files Modified

1. `app/api/chat/route.ts` - Main chat API route
2. `lib/ai/tools/nexus.ts` - Nexus tools integration
3. `.env.example` - Environment variable documentation

## Additional Notes

- The chat works without Civic Nexus tools if they're unavailable
- Streaming responses provide real-time feedback
- Tool invocations are displayed in the UI when available
- All errors are logged server-side for debugging
