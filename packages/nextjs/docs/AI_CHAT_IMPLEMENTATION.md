# AI Chat Implementation

## Overview

The AI Chat feature (`/ai-chat`) is a fully-featured, production-ready chat interface that enables authenticated users to interact with an AI assistant powered by Civic Nexus and OpenAI/Anthropic.

## Current Status

✅ **Production Ready** - All features implemented and tested

## Features

### Core Functionality

- **Authentication Required**: Uses Civic Auth to verify user identity
- **Real-time Streaming**: Displays AI responses as they're generated
- **Tool Calling Support**: AI can access connected services via Nexus MCP
- **Keyboard Shortcuts**: Enter to send, Shift+Enter for new line
- **Auto-scroll**: Automatically scrolls to latest messages
- **Error Handling**: User-friendly error messages with dismiss option
- **Loading States**: Visual indicators during AI processing

### User Experience

1. **Sign-in Prompt**: Unauthenticated users see a clear prompt to sign in
2. **Empty State**: Helpful message when no messages exist
3. **Message Display**: Clean chat bubble interface with role-based styling
4. **Tool Execution Indicators**: Visual feedback when AI uses tools
   - ✓ Success indicator with tool name
   - ⟳ Loading spinner during execution
   - ✗ Error indicator if tool fails
5. **Responsive Design**: Works on desktop and mobile devices

### Technical Implementation

#### Component Structure

```typescript
// State Management
const [messages, setMessages] = useState<Message[]>([]);
const [inputValue, setInputValue] = useState("");
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<Error | null>(null);
const [errorDismissed, setErrorDismissed] = useState(false);

// Auto-scroll to latest message
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

// Reset error dismissed state when error changes
useEffect(() => {
  if (error) {
    setErrorDismissed(false);
  }
}, [error]);
```

#### Message Interface

```typescript
interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  toolInvocations?: Array<{
    toolCallId: string;
    toolName: string;
    state: "call" | "result" | "error";
    args?: any;
    result?: any;
  }>;
}
```

#### Streaming Response Handling

The component handles multiple streaming formats:

1. **Text Chunk Format**: `0:"text"`
2. **SSE Format**: `data: {...}`
3. **Plain Text**: Direct text content

```typescript
// Handle streaming response
const reader = response.body?.getReader();
const decoder = new TextDecoder();
let buffer = "";

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  buffer += decoder.decode(value, { stream: true });
  const lines = buffer.split("\n");
  buffer = lines.pop() || "";

  for (const line of lines) {
    if (!line.trim()) continue;
    
    if (line.startsWith("0:")) {
      // Text chunk format
      const text = line.substring(2).replace(/^"|"$/g, "");
      assistantMessage.content += text;
    } else if (line.startsWith("data: ")) {
      // SSE format
      const data = JSON.parse(line.substring(6));
      if (data.choices?.[0]?.delta?.content) {
        assistantMessage.content += data.choices[0].delta.content;
      }
    } else {
      // Plain text
      assistantMessage.content += line;
    }
    
    // Update UI
    setMessages(prev => {
      const newMessages = [...prev];
      newMessages[newMessages.length - 1] = { ...assistantMessage };
      return newMessages;
    });
  }
}
```

#### Error Handling

```typescript
try {
  // API call and streaming
} catch (err) {
  console.error("Error sending message:", err);
  setError(err instanceof Error ? err : new Error("An error occurred"));
} finally {
  setIsLoading(false);
}
```

### UI Components

#### Sign-in Prompt (Unauthenticated)

```tsx
<div className="card bg-base-200 shadow-xl max-w-2xl mx-auto">
  <div className="card-body text-center">
    <h2 className="card-title justify-center text-2xl mb-4">AI Chat</h2>
    <p className="mb-6">Please sign in to access the AI chat assistant.</p>
    <button className="btn btn-primary" onClick={() => window.location.href = "/"}>
      Go to Home
    </button>
  </div>
</div>
```

#### Chat Interface

```tsx
<div className="card bg-base-200 shadow-xl">
  <div className="card-body p-0">
    {/* Messages Display */}
    <div className="overflow-y-auto max-h-[600px] p-4 space-y-4">
      {/* Messages */}
    </div>
    
    {/* Error Display */}
    {error && !errorDismissed && (
      <div className="alert alert-error mx-4 mb-4">
        <ExclamationCircleIcon className="w-6 h-6" />
        <span>{error.message}</span>
        <button onClick={() => setErrorDismissed(true)}>Dismiss</button>
      </div>
    )}
    
    {/* Message Input */}
    <form onSubmit={onSubmit}>
      <textarea
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        rows={3}
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading || !inputValue.trim()}>
        {isLoading ? <LoadingSpinner /> : <SendIcon />}
      </button>
    </form>
  </div>
</div>
```

#### Message Bubbles

```tsx
<div className={`chat ${message.role === "user" ? "chat-end" : "chat-start"}`}>
  <div className={`chat-bubble ${
    message.role === "user" ? "chat-bubble-primary" : "chat-bubble-secondary"
  }`}>
    <div className="whitespace-pre-wrap">{message.content}</div>
    
    {/* Tool Execution Indicators */}
    {message.toolInvocations?.map(tool => (
      <div key={tool.toolCallId} className="flex items-center gap-2">
        {tool.state === "result" && (
          <>
            <CheckCircleIcon className="w-4 h-4 text-success" />
            <span>Used tool: {tool.toolName}</span>
          </>
        )}
        {tool.state === "call" && (
          <>
            <span className="loading loading-spinner loading-xs"></span>
            <span>Using tool: {tool.toolName}</span>
          </>
        )}
        {tool.state === "error" && (
          <>
            <XCircleIcon className="w-4 h-4 text-error" />
            <span>Tool failed: {tool.toolName}</span>
          </>
        )}
      </div>
    ))}
  </div>
</div>
```

## API Integration

### Endpoint

```
POST /api/chat
```

### Request Format

```typescript
{
  messages: Array<{
    role: "user" | "assistant" | "system";
    content: string;
    toolInvocations?: Array<any>;
  }>
}
```

### Response Format

Streaming response with Server-Sent Events (SSE), compatible with `@ai-sdk/react` useChat hook.

## Configuration

### Environment Variables

```bash
# Required: AI Provider API Key
AI_GATEWAY_API_KEY=your_api_key_here

# Optional: AI Provider (default: openai)
AI_MODEL_PROVIDER=openai  # or 'anthropic'

# Optional: Model Name
AI_MODEL_NAME=gpt-4o  # or 'claude-sonnet-4-5-20250929'
```

### Civic Auth

Users must be authenticated via Civic Auth to access the chat interface.

### Nexus Integration

Users can connect services at [https://nexus.civic.com](https://nexus.civic.com) to enable tool calling.

## Testing

### Manual Testing

1. **Unauthenticated Access**:
   - Visit `/ai-chat` without signing in
   - Verify sign-in prompt is displayed
   - Click "Go to Home" button

2. **Authenticated Access**:
   - Sign in with Civic Auth
   - Visit `/ai-chat`
   - Verify chat interface is displayed

3. **Basic Chat**:
   - Type a message and press Enter
   - Verify message appears in chat
   - Verify AI response streams in real-time
   - Verify auto-scroll to latest message

4. **Keyboard Shortcuts**:
   - Press Enter to send message
   - Press Shift+Enter to add new line
   - Verify shortcuts work as expected

5. **Error Handling**:
   - Trigger an error (e.g., invalid API key)
   - Verify error message is displayed
   - Click "Dismiss" button
   - Verify error is dismissed

6. **Tool Calling** (if services connected):
   - Ask AI to access a connected service
   - Verify tool execution indicator appears
   - Verify tool result is incorporated in response

7. **Loading States**:
   - Send a message
   - Verify loading spinner appears
   - Verify input is disabled during loading
   - Verify loading state clears after response

### Automated Testing

See [AI_CHAT_TESTING.md](./AI_CHAT_TESTING.md) for comprehensive testing guide.

## Known Limitations

1. **No Chat History**: Messages are session-only, not persisted
2. **No Message Editing**: Cannot edit or delete sent messages
3. **No File Uploads**: Text-only input
4. **No Voice Input**: Keyboard input only
5. **Rate Limits**: Subject to AI provider rate limits

## Future Enhancements

Potential improvements for future versions:

- [ ] Persistent chat history (database storage)
- [ ] Message editing and deletion
- [ ] File upload support (images, documents)
- [ ] Voice input/output
- [ ] Chat export (PDF, Markdown)
- [ ] Message reactions
- [ ] Code syntax highlighting
- [ ] Markdown rendering in messages
- [ ] Multi-user chat rooms
- [ ] Chat templates/prompts

## Related Documentation

- **[API Documentation](./API.md)** - Complete API reference
- **[Quick Reference](./CHAT_API_QUICK_REFERENCE.md)** - Quick lookup guide
- **[Changelog](./CHANGELOG_CHAT_API.md)** - Version history
- **[Testing Guide](./AI_CHAT_TESTING.md)** - Testing documentation
- **[Main README](../../../README.md#ai-chat-integration-civic-nexus)** - Setup guide

## Support

For issues or questions:
- Check [API Documentation](./API.md) for troubleshooting
- Review [Testing Guide](./AI_CHAT_TESTING.md) for common issues
- Contact Civic support through [Civic Auth Dashboard](https://auth.civic.com)

## License

MIT License - see [LICENSE](../../../LICENSE) for details.
