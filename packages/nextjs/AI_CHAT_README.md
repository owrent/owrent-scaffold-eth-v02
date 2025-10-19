# AI Chat Integration

## Overview

The AI Chat feature integrates Civic Nexus AI capabilities into the Owrent application, enabling authenticated users to interact with an AI assistant that can access their connected services (GitHub, Slack, Notion, etc.) through the Civic Nexus platform using the Vercel AI SDK.

## Features

- **Authenticated AI Interactions**: Secure chat interface requiring Civic Auth authentication
- **Tool Calling**: AI can access external services connected via Civic Nexus
- **Real-time Streaming**: Progressive response rendering for better user experience
- **Tool Execution Visibility**: See when and how the AI uses your connected services
- **Multi-Provider Support**: Works with both OpenAI (GPT-4) and Anthropic (Claude) models
- **Error Handling**: Graceful degradation when tools are unavailable

## Architecture

### Component Overview

```
┌─────────────────────────────────────────────────────────────┐
│                   AI Chat Architecture                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Frontend Layer                           │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐    │  │
│  │  │ AI Chat    │  │  Header    │  │  User      │    │  │
│  │  │ Page       │  │ Navigation │  │  Button    │    │  │
│  │  └─────┬──────┘  └────────────┘  └────────────┘    │  │
│  │        │                                              │  │
│  │        │ useChat hook (@ai-sdk/react)                │  │
│  │        │                                              │  │
│  └────────┼──────────────────────────────────────────────┘  │
│           │                                                  │
│           │ HTTP POST /api/chat                              │
│           ▼                                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              API Layer                                │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  /api/chat/route.ts                            │  │  │
│  │  │  - Validate request                            │  │  │
│  │  │  - Get access token (Civic Auth)               │  │  │
│  │  │  - Load Nexus tools                            │  │  │
│  │  │  - Stream AI response                          │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Integration Layer                           │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  lib/ai/tools/nexus.ts                         │  │  │
│  │  │  - getNexusTools()                             │  │  │
│  │  │  - MCP client initialization                   │  │  │
│  │  │  - Tool discovery and registration             │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                               │
└───────────────────────────┬───────────────────────────────────┘
                            │
                            │ Bearer Token Auth
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              External Services                               │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Civic Nexus  │  │   OpenAI     │  │  Anthropic   │     │
│  │ MCP Hub      │  │   GPT-4      │  │   Claude     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                               │
│  Connected Services (via Nexus):                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   GitHub     │  │    Slack     │  │   Notion     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

#### 1. User Authentication Flow
```
User → Civic Auth UserButton → Sign In
  → Civic Auth Provider → Access Token
  → Stored in Session → Available to API Routes
```

#### 2. Chat Message Flow
```
User Input → Chat Component → useChat Hook
  → POST /api/chat → Validate Request
  → getTokens() → Access Token
  → getNexusTools(accessToken) → MCP Client
  → streamText(model, messages, tools)
  → Stream Response → Chat Component
  → Display to User
```

#### 3. Tool Execution Flow
```
AI Decision → Tool Call → Nexus MCP Hub
  → Service API (GitHub/Slack/etc)
  → Tool Result → AI Context
  → Continue Generation → Stream to User
```

## Key Components

### 1. Nexus Tools Helper (`lib/ai/tools/nexus.ts`)

Initializes the MCP client and retrieves available Nexus tools based on the user's connected services.

**Key Functions:**
- `getNexusTools()`: Returns tools object for AI SDK
- Handles authentication via Civic Auth access tokens
- Gracefully degrades when tools are unavailable

### 2. Chat API Route (`app/api/chat/route.ts`)

Handles AI chat requests with streaming responses.

**Features:**
- Request validation
- Authentication checks
- AI model initialization (OpenAI or Anthropic)
- Streaming response generation
- Comprehensive error handling

### 3. AI Chat Page (`app/ai-chat/page.tsx`)

User interface for AI chat interactions.

**Features:**
- Message history display
- Real-time streaming updates
- Tool execution indicators
- Input field with send button
- Loading and error states
- Authentication prompt for unauthenticated users

## Environment Variables

### Required Variables

```env
# Civic Auth Client ID (required for authentication)
NEXT_PUBLIC_CIVIC_CLIENT_ID=your_civic_client_id_here

# AI Provider API Key (required for AI functionality)
AI_GATEWAY_API_KEY=your_openai_or_anthropic_api_key_here
```

### Optional Variables

```env
# AI Model Provider (default: openai)
AI_MODEL_PROVIDER=openai  # or 'anthropic'

# AI Model Name (default: gpt-4o for OpenAI, claude-sonnet-4-5-20250929 for Anthropic)
AI_MODEL_NAME=gpt-4o
```

### Setup Instructions

1. **Get Civic Auth Client ID**:
   - Visit https://auth.civic.com
   - Create an application
   - Copy the Client ID
   - Add to `.env.local`

2. **Get AI Provider API Key**:
   - **OpenAI**: Visit https://platform.openai.com/api-keys
   - **Anthropic**: Visit https://console.anthropic.com/settings/keys
   - Copy the API key
   - Add to `.env.local`

3. **Connect Services to Nexus**:
   - Visit https://nexus.civic.com
   - Sign in with your Civic account
   - Connect services (GitHub, Slack, Notion, etc.)
   - These services will be available as tools in the AI chat

## Usage

### Accessing AI Chat

1. Navigate to `/ai-chat` in the application
2. Sign in with Civic Auth if not already authenticated
3. Start chatting with the AI assistant

### Example Prompts

#### Basic Prompts
- "Hello"
- "What can you help me with?"
- "Tell me about yourself"

#### Tool-Using Prompts
- "List my GitHub repositories"
- "Search my Slack messages for 'meeting notes'"
- "Show me my recent Notion pages"
- "What's in my Google Drive?"

#### Multi-Step Prompts
- "Find my GitHub repo called 'project-x' and tell me about the latest commits"
- "Search my Slack for messages about 'budget' and summarize them"
- "List my Notion pages and find the one about 'Q1 planning'"

### Expected Behavior

- **Without Connected Services**: AI will respond conversationally but cannot access external tools
- **With Connected Services**: AI will use appropriate tools to answer questions about your data
- **Tool Execution**: You'll see indicators showing which tools are being used
- **Streaming**: Responses appear progressively as they're generated

## Troubleshooting

### Common Issues

#### Issue: "No tools available"

**Symptoms**: AI responds but cannot access your services

**Solutions**:
1. Check that you're signed in with Civic Auth
2. Verify you've connected services at https://nexus.civic.com
3. Check browser console for errors
4. Verify `NEXT_PUBLIC_CIVIC_CLIENT_ID` is set correctly

#### Issue: "Authentication failed"

**Symptoms**: Cannot access AI chat page or API returns 401

**Solutions**:
1. Sign out and sign in again with Civic Auth
2. Clear browser cookies and cache
3. Verify `NEXT_PUBLIC_CIVIC_CLIENT_ID` is correct
4. Check that Civic Auth is properly configured in `next.config.ts`

#### Issue: "Streaming not working"

**Symptoms**: Responses appear all at once instead of progressively

**Solutions**:
1. Check browser console for errors
2. Verify network tab shows streaming response
3. Try a different browser
4. Check that `AI_GATEWAY_API_KEY` is valid

#### Issue: "AI responses are slow"

**Symptoms**: Long wait times for responses

**Solutions**:
1. Check your internet connection
2. Verify AI provider API status
3. Try a different AI model (set `AI_MODEL_NAME`)
4. Check if tool execution is taking time (normal for complex queries)

### Debugging Tips

1. **Check Console Logs**:
   - Open browser developer tools
   - Look for errors in console
   - Check network tab for failed requests

2. **Verify Environment Variables**:
   ```bash
   # In packages/nextjs directory
   cat .env.local | grep CIVIC
   cat .env.local | grep AI_
   ```

3. **Test API Endpoint**:
   ```bash
   # Test chat API (requires authentication)
   curl -X POST http://localhost:3000/api/chat \
     -H "Content-Type: application/json" \
     -d '{"messages":[{"role":"user","content":"Hello"}]}'
   ```

4. **Check Nexus Connection**:
   - Visit https://nexus.civic.com
   - Verify services are connected
   - Check service permissions

### FAQ

**Q: Can I use this without connecting any services?**
A: Yes, the AI will work conversationally but won't be able to access external tools.

**Q: Which AI model should I use?**
A: GPT-4 (OpenAI) is recommended for general use. Claude (Anthropic) is good for longer conversations and complex reasoning.

**Q: How much does this cost?**
A: Costs depend on your AI provider usage. Check OpenAI or Anthropic pricing for details.

**Q: Is my data secure?**
A: Yes, all communication is encrypted. Civic Nexus handles service authentication securely, and your access tokens are never exposed to the client.

**Q: Can I add custom tools?**
A: Currently, tools are managed through Civic Nexus. Contact Civic support for custom tool integration.

**Q: Does this work offline?**
A: No, AI chat requires an internet connection to communicate with AI providers and Nexus services.

## Testing

For comprehensive testing instructions, see the [AI Chat Testing Guide](./AI_CHAT_TESTING.md).

The testing guide covers:
- Chat API endpoint testing (automated and manual)
- Nexus tools integration testing
- Streaming functionality testing
- Error handling scenarios
- Authentication requirements
- Browser compatibility
- Mobile responsiveness
- Performance testing

Quick test:
```bash
cd packages/nextjs
./scripts/test-chat-api.sh
```

## Additional Resources

- **AI Chat Testing Guide**: [AI_CHAT_TESTING.md](./AI_CHAT_TESTING.md)
- **Civic Nexus Documentation**: https://docs.civic.com/nexus
- **Civic Nexus Dashboard**: https://nexus.civic.com
- **Civic Auth Documentation**: https://docs.civic.com/auth
- **Vercel AI SDK Documentation**: https://sdk.vercel.ai/docs
- **OpenAI API Documentation**: https://platform.openai.com/docs
- **Anthropic API Documentation**: https://docs.anthropic.com

## Support

For issues or questions:
- **Civic Support**: Contact through https://auth.civic.com
- **Project Issues**: Open an issue in the project repository
- **Community**: Join the Civic Discord or community forums
