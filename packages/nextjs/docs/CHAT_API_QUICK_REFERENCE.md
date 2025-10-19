# Chat API Quick Reference

## Endpoint

```
POST /api/chat
```

## Authentication

**Required**: Civic Auth session cookie

## Request Format

```typescript
{
  messages: Array<{
    role: "user" | "assistant" | "system";
    content: string;
    toolInvocations?: any[];
  }>;
}
```

## Response Format

**Success**: Streaming SSE response (compatible with `@ai-sdk/react`)

**Error**: JSON with error message

## Status Codes

| Code | Meaning             |
| ---- | ------------------- |
| 200  | Success (streaming) |
| 400  | Invalid request     |
| 401  | Not authenticated   |
| 500  | Server error        |
| 503  | Service unavailable |

## Common Errors

| Error Message                            | Cause                    | Solution                     |
| ---------------------------------------- | ------------------------ | ---------------------------- |
| Invalid request: messages array required | Missing/invalid messages | Send valid messages array    |
| No messages provided                     | Empty array              | Send at least one message    |
| No valid messages provided               | All messages filtered    | Ensure messages have content |
| Invalid message format                   | Filtering error          | Check message structure      |
| Failed to process messages               | Conversion error         | Verify message format        |
| Authentication required                  | No session               | Sign in with Civic Auth      |
| AI service not configured                | Missing API key          | Set AI_GATEWAY_API_KEY       |

## Environment Variables

```bash
# Required
AI_GATEWAY_API_KEY=your_api_key

# Optional
AI_MODEL_PROVIDER=openai  # or 'anthropic'
AI_MODEL_NAME=gpt-4o      # or model of choice
```

## Usage Examples

### Basic (fetch)

```javascript
const response = await fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    messages: [{ role: "user", content: "Hello!" }],
  }),
});
```

### With @ai-sdk/react

```typescript
import { useChat } from "@ai-sdk/react";

const { messages, input, handleInputChange, handleSubmit } = useChat({
  api: "/api/chat",
});
```

### With Tool Invocations

```javascript
{
  messages: [
    { role: 'user', content: 'What are my repos?' },
    {
      role: 'assistant',
      content: '',
      toolInvocations: [{
        toolCallId: 'call_123',
        toolName: 'github_repos',
        args: {},
        result: { repos: [...] }
      }]
    }
  ]
}
```

## Message Validation Rules

1. ✅ Must be an array
2. ✅ Must not be empty
3. ✅ Each message must be an object
4. ✅ Each message must have content
5. ✅ Content will be converted to string
6. ✅ Role defaults to "user" if missing
7. ✅ toolInvocations preserved if present

## Debugging

**Server Logs**:

```
Processing messages: 3
Using Nexus tools: ['github_repos', 'slack_messages']
Error converting messages: <error details>
Cleaned messages: <JSON dump>
```

**Enable Detailed Logging**:

- Check server console for validation errors
- Review cleaned messages JSON on conversion errors
- Monitor tool loading warnings

## Rate Limits

**OpenAI**: 3-5 req/min (free tier)
**Anthropic**: 5 req/min (free tier)

**Handling**:

- Implement client-side throttling
- Show loading states
- Handle 429 errors gracefully

## Security

- ✅ Authentication required
- ✅ Input validation
- ✅ Error sanitization
- ✅ API keys server-side only
- ✅ Tool access control via Nexus

## Performance

- **First token**: 500ms - 2s
- **Streaming**: Real-time
- **Tool calls**: +1-3s each

## Resources

- [Full API Documentation](./API.md)
- [Changelog](./CHANGELOG_CHAT_API.md)
- [Civic Nexus Dashboard](https://nexus.civic.com)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
