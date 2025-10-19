# AI Chat Setup Guide

## Overview

The AI Chat feature provides an interactive chat interface powered by OpenAI or Anthropic models, with optional integration to Civic Nexus tools for enhanced functionality.

## Quick Setup

### 1. Get an AI API Key

Choose one of the following providers:

#### Option A: OpenAI (Recommended)
1. Visit https://platform.openai.com/api-keys
2. Sign up or log in to your OpenAI account
3. Click "Create new secret key"
4. Copy the API key

#### Option B: Anthropic
1. Visit https://console.anthropic.com/settings/keys
2. Sign up or log in to your Anthropic account
3. Click "Create Key"
4. Copy the API key

### 2. Configure Environment Variables

Create or edit `.env.local` in the `packages/nextjs` directory:

```bash
# Required: AI API Key
AI_GATEWAY_API_KEY=your_api_key_here

# Optional: Choose provider (default: openai)
AI_MODEL_PROVIDER=openai

# Optional: Specify model (default: gpt-4o for OpenAI)
AI_MODEL_NAME=gpt-4o
```

### 3. Restart Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart
yarn start
```

### 4. Test the Chat

1. Navigate to http://localhost:3000/ai-chat
2. Sign in with Civic Auth if not already authenticated
3. Start chatting with the AI assistant!

## Configuration Options

### AI Providers

**OpenAI Models:**
- `gpt-4o` (default) - Latest GPT-4 Optimized model
- `gpt-4-turbo` - Fast GPT-4 variant
- `gpt-3.5-turbo` - Faster, cheaper option

**Anthropic Models:**
- `claude-sonnet-4-5-20250929` (default) - Latest Claude Sonnet
- `claude-opus-4-20250514` - Most capable Claude model

### Example Configurations

**OpenAI with GPT-4:**
```bash
AI_GATEWAY_API_KEY=sk-...
AI_MODEL_PROVIDER=openai
AI_MODEL_NAME=gpt-4o
```

**Anthropic with Claude:**
```bash
AI_GATEWAY_API_KEY=sk-ant-...
AI_MODEL_PROVIDER=anthropic
AI_MODEL_NAME=claude-sonnet-4-5-20250929
```

## Features

### Basic Chat
- Real-time streaming responses
- Message history
- Keyboard shortcuts (Enter to send, Shift+Enter for new line)
- Error handling with user-friendly messages

### Tool Integration (Optional)
If Civic Nexus tools are configured, the AI can:
- Access connected services
- Perform actions on your behalf
- Retrieve real-time data

Tool execution is indicated with visual feedback in the chat interface.

## Troubleshooting

### "AI service not configured" Error
**Cause:** Missing `AI_GATEWAY_API_KEY` environment variable

**Solution:**
1. Add `AI_GATEWAY_API_KEY` to `.env.local`
2. Restart the development server

### "Failed to process messages" Error
**Cause:** Invalid message format or API communication issue

**Solution:**
1. Check browser console for detailed error logs
2. Verify your API key is valid
3. Try refreshing the page and sending a new message
4. Check server logs for detailed error information

**Note:** This error was fixed in the latest version by implementing custom message conversion instead of relying on the AI SDK's `convertToCoreMessages` function.

### "Authentication required" Error
**Cause:** Not signed in with Civic Auth

**Solution:**
1. Click "Go to Home" button
2. Sign in using the Connect Wallet button
3. Return to /ai-chat

### Rate Limit Errors
**Cause:** Too many requests to AI provider

**Solution:**
1. Wait a few minutes before trying again
2. Consider upgrading your API plan with the provider

## API Endpoint

The chat functionality is powered by the `/api/chat` endpoint:

**Request:**
```typescript
POST /api/chat
Content-Type: application/json

{
  "messages": [
    { "role": "user", "content": "Hello!" },
    { "role": "assistant", "content": "Hi! How can I help?" },
    { "role": "user", "content": "What can you do?" }
  ]
}
```

**Response:**
Streaming text response compatible with `@ai-sdk/react`

## Security Notes

- API keys are stored server-side only (never exposed to client)
- Authentication required via Civic Auth
- All requests are validated and sanitized
- Rate limiting recommended for production use

## Testing

For comprehensive testing instructions, see the [AI Chat Testing Guide](./docs/AI_CHAT_TESTING.md).

Quick verification:
1. Navigate to http://localhost:3000/ai-chat
2. Sign in with Civic Auth
3. Send a test message
4. Verify streaming response appears

## Next Steps

1. **Test Functionality:** Follow the [AI Chat Testing Guide](./docs/AI_CHAT_TESTING.md)
2. **Customize System Prompt:** Edit the chat route to add custom instructions
3. **Add Tools:** Integrate Civic Nexus tools for enhanced functionality
4. **Style Chat UI:** Customize the chat interface in `app/ai-chat/page.tsx`
5. **Add Features:** Implement conversation history, export, or sharing

## Resources

- **AI Chat Testing Guide:** [docs/AI_CHAT_TESTING.md](./docs/AI_CHAT_TESTING.md)
- **OpenAI Documentation:** https://platform.openai.com/docs
- **Anthropic Documentation:** https://docs.anthropic.com
- **Vercel AI SDK:** https://sdk.vercel.ai/docs
- **Civic Auth:** https://docs.civic.com
