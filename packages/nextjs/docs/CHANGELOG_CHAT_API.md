# Chat API Changelog

## Version 1.2.0 (Current)

### Custom Message Conversion Implementation

**Date**: January 2025

#### Critical Fix: Replaced AI SDK's convertToCoreMessages

**Issue**: The AI SDK's `convertToCoreMessages` function was throwing "Cannot read properties of undefined (reading 'filter')" errors, even with properly formatted messages.

**Root Cause**: The `convertToCoreMessages` function from the `ai` package was attempting to filter messages internally, but was encountering undefined values in its internal processing.

**Solution**: Implemented custom message conversion logic that:

1. Manually maps messages to the core format expected by the AI SDK
2. Explicitly handles role conversion (user/assistant/system)
3. Preserves tool invocations when present
4. Provides better error handling and logging

#### Changes Made

1. **Removed Dependency on convertToCoreMessages**
   - Removed import: `convertToCoreMessages` from "ai" package
   - Implemented custom conversion logic
   - More control over message format

2. **Custom Message Conversion**

   ```typescript
   coreMessages = cleanedMessages.map((msg: any) => {
     const coreMsg: any = {
       role: msg.role === "user" ? "user" : msg.role === "assistant" ? "assistant" : "system",
       content: msg.content,
     };
     
     if (msg.toolInvocations && Array.isArray(msg.toolInvocations)) {
       coreMsg.toolInvocations = msg.toolInvocations;
     }
     
     return coreMsg;
   });
   ```

3. **Enhanced Logging**
   - Added log after successful conversion: "Converted to core messages: X"
   - Helps verify conversion is working correctly

#### Benefits

1. **Reliability**: No more undefined filter errors
2. **Control**: Full control over message format
3. **Debugging**: Better logging for troubleshooting
4. **Compatibility**: Works with all AI SDK streaming functions
5. **Maintainability**: Simpler, more transparent code

#### Testing

**Verified Working**:

- ✅ Single user message
- ✅ Multi-turn conversations
- ✅ Messages with tool invocations
- ✅ Mixed role messages (user/assistant/system)
- ✅ Streaming responses
- ✅ Error handling

**Example Test**:

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "messages": [
      {"role": "user", "content": "hi, how protect my assets"}
    ]
  }'
```

#### Migration Notes

No breaking changes for API consumers. This is an internal implementation change.

**Before**: Used `convertToCoreMessages` from AI SDK
**After**: Custom message conversion logic

Both produce the same output format expected by `streamText()`.

---

## Version 1.2.0 (Current)

### Manual Message Conversion for AI SDK Compatibility

**Date**: January 2025

#### Changes Made

1. **Replaced convertToCoreMessages with Manual Conversion**
   - Removed dependency on `convertToCoreMessages` utility
   - Implemented explicit message format conversion
   - Ensures compatibility with AI SDK's expected message structure
   - Provides better control over message transformation

2. **Explicit Role Mapping**
   - Maps roles explicitly: "user" → "user", "assistant" → "assistant", other → "system"
   - Prevents role mapping errors from utility function
   - More predictable and debuggable conversion logic

3. **Enhanced Logging**
   - Added log after successful conversion: "Converted to core messages: X"
   - Helps track conversion success in production
   - Easier debugging of message format issues

4. **Preserved Tool Invocations**
   - Maintains tool invocations in converted messages
   - Validates tool invocations are arrays before adding
   - Ensures tool calling functionality remains intact

#### Code Changes

**Before**:

```typescript
// Convert UI messages to core messages
let coreMessages;
try {
  coreMessages = convertToCoreMessages(cleanedMessages);
} catch (conversionError) {
  console.error("Error converting messages:", conversionError);
  console.error("Cleaned messages:", JSON.stringify(cleanedMessages, null, 2));
  return NextResponse.json(
    { error: "Failed to process messages. Please try again." },
    { status: 400 },
  );
}
```

**After**:

```typescript
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
  return NextResponse.json(
    { error: "Failed to process messages. Please try again." },
    { status: 400 },
  );
}
```

#### Benefits

1. **Better Compatibility**: Direct control over message format ensures AI SDK compatibility
2. **Reduced Dependencies**: No reliance on external conversion utilities
3. **Improved Debugging**: Explicit conversion logic is easier to trace and debug
4. **Predictable Behavior**: Role mapping is explicit and deterministic
5. **Maintainability**: Self-contained conversion logic within the route handler

#### Migration Guide

No breaking changes for API consumers. This is an internal implementation improvement.

**If you're using the chat API**:

- No code changes required
- Message format remains the same
- Tool calling continues to work as expected

**If you're extending the chat API**:

- Use the manual conversion pattern for consistency
- Ensure role mapping follows the explicit pattern
- Validate tool invocations before adding to messages

#### Testing

**Test Cases Verified**:

1. User messages convert correctly
2. Assistant messages convert correctly
3. System messages convert correctly
4. Tool invocations are preserved
5. Empty tool invocations are handled
6. Invalid roles default to "system"

**Manual Testing**:

```bash
# Test basic message conversion
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello"}]}'

# Test with tool invocations
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"assistant","content":"Result","toolInvocations":[]}]}'
```

#### Known Issues

None at this time.

#### Future Improvements

1. **Type Safety**: Add TypeScript interfaces for message formats
2. **Validation**: Add schema validation for message structure
3. **Performance**: Consider caching conversion logic for repeated patterns

---

## Version 1.1.0

### Enhanced Message Validation & Error Handling

**Date**: January 2025

#### Changes Made

1. **Empty Message Array Validation**
   - Added check for empty messages array before processing
   - Returns clear error: "No messages provided"
   - Prevents unnecessary processing of empty requests

2. **Enhanced Message Filtering**
   - Added content validation: filters out messages without content
   - Wrapped filtering logic in try-catch for better error handling
   - Explicit type checking: `msg && typeof msg === "object" && msg.content`
   - Converts content to string explicitly: `String(msg.content || "")`

3. **Improved Error Logging**
   - Added console.error for invalid messages array
   - Added console.error for filtering errors
   - Added detailed JSON logging of cleaned messages on conversion errors
   - Helps debugging by showing exact message format that failed

4. **Better Error Messages**
   - "Invalid message format" for filtering errors
   - "Failed to process messages. Please try again." for conversion errors
   - User-friendly messages that don't expose internal details

5. **Null Safety**
   - Added null check for cleanedMessages: `if (!cleanedMessages || cleanedMessages.length === 0)`
   - Prevents potential null reference errors

#### Code Changes

**Before**:

```typescript
// Validate messages array exists
if (!body.messages || !Array.isArray(body.messages)) {
  return NextResponse.json({ error: "Invalid request: messages array required" }, { status: 400 });
}

// Validate and clean messages
const cleanedMessages = body.messages
  .filter((msg: any) => msg && typeof msg === "object")
  .map((msg: any) => ({
    role: msg.role || "user",
    content: msg.content || "",
    ...(msg.toolInvocations && { toolInvocations: msg.toolInvocations }),
  }));

if (cleanedMessages.length === 0) {
  return NextResponse.json({ error: "No valid messages provided" }, { status: 400 });
}
```

**After**:

```typescript
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
```

**Conversion Error Logging**:

```typescript
try {
  coreMessages = convertToCoreMessages(cleanedMessages);
} catch (conversionError) {
  console.error("Error converting messages:", conversionError);
  console.error("Cleaned messages:", JSON.stringify(cleanedMessages, null, 2));
  return NextResponse.json(
    { error: "Failed to process messages. Please try again." },
    { status: 400 },
  );
}
```

#### Benefits

1. **Better Debugging**: Detailed error logging helps identify issues quickly
2. **Improved Reliability**: Catches edge cases that could cause crashes
3. **User Experience**: Clear error messages guide users to fix issues
4. **Security**: No sensitive information exposed in error messages
5. **Maintainability**: Easier to troubleshoot production issues

#### Migration Guide

No breaking changes. This is a backward-compatible enhancement.

**If you're using the chat API**:

- No code changes required
- You may see more detailed error messages
- Check server logs for debugging information

**If you're extending the chat API**:

- Follow the new error handling pattern
- Add detailed logging for debugging
- Use try-catch for validation logic
- Return user-friendly error messages

#### Testing

**Test Cases Added**:

1. Empty messages array
2. Messages without content field
3. Malformed message objects
4. Message filtering errors
5. Message conversion errors

**Manual Testing**:

```bash
# Test empty array
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[]}'

# Test messages without content
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user"}]}'

# Test malformed messages
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[null, undefined, "string"]}'
```

#### Known Issues

None at this time.

#### Future Improvements

1. **Rate Limiting**: Add per-user rate limiting
2. **Message History**: Optional conversation persistence
3. **Streaming Improvements**: Better error handling during streaming
4. **Tool Calling**: Enhanced tool result validation
5. **Analytics**: Track message validation failures

---

## Version 1.0.0

### Initial Release

**Date**: December 2024

#### Features

1. **Streaming Responses**: Real-time AI response generation
2. **Civic Auth Integration**: Secure authentication
3. **Nexus Tool Calling**: Access to connected services
4. **Multi-Provider Support**: OpenAI and Anthropic
5. **Error Handling**: Basic error handling and logging

#### Initial Implementation

- POST endpoint at `/api/chat`
- Message validation and cleaning
- AI SDK integration with streaming
- Tool calling via Nexus MCP client
- Environment-based configuration
