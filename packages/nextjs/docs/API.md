# API Documentation

## Chat API

### POST `/api/chat`

AI chat endpoint with streaming responses, powered by Civic Nexus and OpenAI/Anthropic.

#### Authentication

**Required**: Valid Civic Auth session

The endpoint uses Civic Auth tokens to authenticate requests. Users must be signed in before making requests.

#### Request

**Headers**:
```
Content-Type: application/json
Cookie: civic-auth-session=<session-token>
```

**Body**:
```typescript
{
  "messages": Array<{
    role: "user" | "assistant" | "system";
    content: string;
    toolInvocations?: Array<any>;  // Optional: Previous tool calls
  }>
}
```

**Example**:
```json
{
  "messages": [
    {
      "role": "user",
      "content": "What are my recent GitHub repositories?"
    }
  ]
}
```

#### Response

**Success (200)**: Streaming response with Server-Sent Events (SSE)

The response is a stream compatible with `@ai-sdk/react` useChat hook:

```typescript
// Stream format
data: {"type":"text","content":"Hello"}
data: {"type":"tool_call","name":"github_repos","args":{}}
data: {"type":"tool_result","result":{...}}
data: [DONE]
```

**Error Responses**:

| Status | Error | Description |
|--------|-------|-------------|
| 400 | Invalid request: messages array required | Request body is missing or malformed |
| 400 | No messages provided | Messages array is empty |
| 400 | No valid messages provided | All messages filtered out (invalid format) |
| 400 | Invalid message format | Error during message filtering/validation |
| 400 | Failed to process messages | Error converting messages to AI format |
| 401 | Authentication required | No valid Civic Auth session |
| 500 | An error occurred while processing your request | Generic server error |
| 500 | AI service configuration error | Missing AI_GATEWAY_API_KEY |
| 500 | Too many requests | Rate limit exceeded |
| 500 | AI model unavailable | AI provider service down |
| 503 | AI service not configured | AI_GATEWAY_API_KEY not set |

#### Message Validation

The endpoint performs comprehensive message validation:

1. **Request Body Validation**:
   - Checks if request body is valid JSON
   - Verifies `messages` field exists and is an array
   - Ensures array is not empty

2. **Message Filtering**:
   - Filters out null/undefined messages
   - Filters out messages without content
   - Ensures each message is an object

3. **Message Cleaning**:
   - Sets default role to "user" if missing
   - Converts content to string
   - Preserves toolInvocations if present

4. **Message Conversion**:
   - Manually converts UI messages to AI SDK core message format
   - Explicitly maps roles: "user" → "user", "assistant" → "assistant", other → "system"
   - Preserves tool invocations when present
   - Validates message format compatibility
   - Provides detailed error logging on failure

#### Error Handling

The endpoint provides user-friendly error messages while logging detailed errors for debugging:

**Client-Facing Errors**:
- Generic, user-friendly messages
- No sensitive information exposed
- Actionable guidance when possible

**Server-Side Logging**:
- Full error stack traces
- Detailed message validation failures
- Message content for debugging (in development)

**Example Error Response**:
```json
{
  "error": "Failed to process messages. Please try again."
}
```

#### Configuration

Configure the AI provider via environment variables:

```bash
# Required: AI Provider API Key
AI_GATEWAY_API_KEY=your_api_key_here

# Optional: AI Provider (default: openai)
AI_MODEL_PROVIDER=openai  # or 'anthropic'

# Optional: Model Name
AI_MODEL_NAME=gpt-4o  # or 'claude-sonnet-4-5-20250929'
```

#### Tool Calling (Nexus Integration)

If the user has connected services via Civic Nexus, the AI can access them through tool calling:

**Available Tools** (when connected):
- GitHub: Repository access, issue management
- Slack: Message reading, channel access
- Notion: Page creation, database queries
- And more...

**Tool Execution Flow**:
1. AI determines which tool to call
2. Tool is executed via Nexus MCP client
3. Result is returned to AI
4. AI incorporates result in response

**Graceful Degradation**:
- If Nexus tools fail to load, chat continues without tools
- No user-facing errors for tool loading failures
- Warning logged to console for debugging

#### Usage Examples

**Basic Chat (JavaScript)**:
```javascript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    messages: [
      { role: 'user', content: 'Hello!' }
    ]
  })
});

// Handle streaming response
const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  
  const chunk = decoder.decode(value);
  console.log(chunk);
}
```

**Using @ai-sdk/react**:
```typescript
import { useChat } from '@ai-sdk/react';

export function ChatComponent() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });

  return (
    <div>
      {messages.map(message => (
        <div key={message.id}>
          <strong>{message.role}:</strong> {message.content}
        </div>
      ))}
      
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          Send
        </button>
      </form>
    </div>
  );
}
```

**With Tool Invocations**:
```javascript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    messages: [
      { role: 'user', content: 'What are my GitHub repos?' },
      { 
        role: 'assistant', 
        content: '',
        toolInvocations: [
          {
            toolCallId: 'call_123',
            toolName: 'github_repos',
            args: {},
            result: { repos: [...] }
          }
        ]
      },
      { role: 'user', content: 'Tell me more about the first one' }
    ]
  })
});
```

#### Rate Limiting

The endpoint respects AI provider rate limits:

**OpenAI**:
- Tier-based limits (varies by plan)
- Typically 3-5 requests per minute for free tier
- Error: "Too many requests. Please try again later."

**Anthropic**:
- Tier-based limits (varies by plan)
- Typically 5 requests per minute for free tier
- Error: "Too many requests. Please try again later."

**Recommendations**:
- Implement client-side rate limiting
- Show loading states during requests
- Handle 429 errors gracefully
- Consider upgrading AI provider plan for production

#### Security Considerations

1. **Authentication**: All requests require valid Civic Auth session
2. **Input Validation**: Comprehensive message validation prevents malformed requests
3. **Error Sanitization**: No sensitive information in error messages
4. **API Key Protection**: AI provider keys stored server-side only
5. **Tool Access Control**: Nexus tools respect user's connected services

#### Debugging

**Enable Detailed Logging**:

The endpoint logs detailed information for debugging:

```typescript
// Logged on every request
console.log("Processing messages:", cleanedMessages.length);

// Logged on validation errors
console.error("Invalid messages:", body.messages);
console.error("Error filtering messages:", filterError);

// Logged on conversion errors
console.error("Error converting messages:", conversionError);
console.error("Cleaned messages:", JSON.stringify(cleanedMessages, null, 2));

// Logged on tool loading
console.log("Using Nexus tools:", Object.keys(tools));
console.warn("Failed to load Nexus tools, continuing without them:", toolError);

// Logged on errors
console.error("Chat error:", error);
console.error("Error stack:", error.stack);
```

**Common Issues**:

1. **"Invalid request: messages array required"**
   - Check request body is valid JSON
   - Ensure `messages` field exists
   - Verify `messages` is an array

2. **"No valid messages provided"**
   - Ensure messages have `content` field
   - Check message objects are properly formatted
   - Verify content is not empty string

3. **"Failed to process messages"**
   - Check message format matches AI SDK expectations
   - Review server logs for detailed error
   - Verify role values are valid ("user", "assistant", "system")

4. **"Authentication required"**
   - Sign in with Civic Auth
   - Check session cookie is being sent
   - Verify middleware is configured correctly

5. **"AI service not configured"**
   - Set `AI_GATEWAY_API_KEY` in `.env.local`
   - Restart development server
   - Verify environment variable is loaded

#### Performance

**Response Times**:
- First token: ~500ms - 2s (depends on AI provider)
- Streaming: Real-time as tokens are generated
- Tool calls: +1-3s per tool execution

**Optimization Tips**:
- Use streaming for better perceived performance
- Show loading indicators during first token delay
- Cache tool results when appropriate
- Consider shorter context windows for faster responses

#### Changelog

**v1.2.0** (Current):
- Replaced `convertToCoreMessages` with manual message conversion
- Explicit role mapping for better predictability
- Enhanced logging after successful conversion
- Improved AI SDK compatibility
- Better control over message transformation

**v1.1.0**:
- Enhanced message validation with detailed error logging
- Improved error handling with user-friendly messages
- Added empty message array validation
- Added message content validation
- Added try-catch for message filtering
- Added detailed logging for debugging
- Improved error messages for common issues

**v1.0.0**:
- Initial release with streaming support
- Civic Auth integration
- Nexus tool calling
- Multi-provider support (OpenAI, Anthropic)
