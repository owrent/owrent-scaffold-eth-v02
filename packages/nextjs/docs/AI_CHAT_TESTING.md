# AI Chat Testing Guide

## Quick Test

### 1. Setup Environment

Make sure you have the required environment variable in `.env.local`:

```bash
AI_GATEWAY_API_KEY=your_openai_or_anthropic_api_key
```

### 2. Restart Server

```bash
# Stop current server (Ctrl+C)
# Then restart
yarn start
```

### 3. Test in Browser

1. Navigate to http://localhost:3000/ai-chat
2. Sign in with Civic Auth if prompted
3. Type a message: "hi, how protect my assets"
4. Press Enter or click Send
5. You should see a streaming response

## Expected Behavior

### Success Indicators

✅ **Message Sent**

- Input clears after sending
- Message appears in chat with user bubble (right side)
- Loading indicator shows briefly

✅ **Response Received**

- Assistant message appears (left side)
- Text streams in character by character
- No error messages displayed

✅ **Console Logs** (Check browser DevTools)

```
Processing messages: 1
Converted to core messages: 1
```

### Error Indicators

❌ **Authentication Error**

- Shows "Please sign in to access the AI chat assistant"
- Solution: Click "Go to Home" and sign in

❌ **Configuration Error**

- Shows "AI service not configured"
- Solution: Add `AI_GATEWAY_API_KEY` to `.env.local`

❌ **API Error**

- Shows error message in red alert box
- Check server console for details

## Manual Testing Scenarios

### Test 1: Single Message

```
User: "Hello"
Expected: AI responds with greeting
```

### Test 2: Multi-Turn Conversation

```
User: "What is Owrent?"
AI: [Response about Owrent]
User: "How does it work?"
Expected: AI responds with context from previous message
```

### Test 3: Long Message

```
User: "Can you explain in detail how confidential invoice factoring works, including the role of sealed-bid auctions, FHEVM encryption, and cross-chain settlement via HTLCs?"
Expected: AI provides comprehensive response
```

### Test 4: Special Characters

```
User: "What's the difference between $ETH and $BTC?"
Expected: AI handles special characters correctly
```

### Test 5: Code Request

```
User: "Show me a simple smart contract example"
Expected: AI provides code with proper formatting
```

## API Testing with cURL

### Test Authentication Required

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"test"}]}'
```

Expected: `401 Unauthorized` (if not authenticated)

### Test Valid Request (with auth token)

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Cookie: your_auth_cookie_here" \
  -d '{
    "messages": [
      {"role": "user", "content": "Hello, how are you?"}
    ]
  }'
```

Expected: Streaming response with AI text

### Test Empty Messages

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Cookie: your_auth_cookie_here" \
  -d '{"messages":[]}'
```

Expected: `400 Bad Request` with "No messages provided"

### Test Invalid Message Format

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Cookie: your_auth_cookie_here" \
  -d '{"messages":[{"role":"user"}]}'
```

Expected: `400 Bad Request` with "No valid messages provided"

## Server Log Verification

### Successful Request Logs

```
Processing messages: 1
Converted to core messages: 1
```

### Error Logs

**Authentication Error:**

```
(No logs - returns 401 immediately)
```

**Invalid Messages:**

```
Invalid messages: undefined
```

**Filtering Error:**

```
Error filtering messages: [error details]
```

**Conversion Error:**

```
Error converting messages: [error details]
Cleaned messages: [JSON output]
```

## Performance Testing

### Response Time

- **Expected**: First token within 1-3 seconds
- **Streaming**: Smooth, continuous text flow
- **Total**: Complete response within 10-30 seconds (depending on length)

### Load Testing

```bash
# Install Apache Bench (if not installed)
# macOS: brew install httpd
# Linux: apt-get install apache2-utils

# Test with 10 concurrent requests
ab -n 10 -c 2 -p message.json -T application/json \
  http://localhost:3000/api/chat
```

Where `message.json` contains:

```json
{ "messages": [{ "role": "user", "content": "test" }] }
```

## Troubleshooting

### Issue: No response after sending message

**Check:**

1. Browser console for JavaScript errors
2. Network tab for failed requests
3. Server console for error logs

**Common Causes:**

- Missing API key
- Invalid API key
- Rate limit exceeded
- Network connectivity issues

### Issue: Response is very slow

**Check:**

1. AI provider status page
2. Network latency
3. Model selection (some models are slower)

**Solutions:**

- Try a faster model (e.g., gpt-3.5-turbo)
- Check your internet connection
- Verify API key has sufficient quota

### Issue: Error messages in chat

**Check:**

1. Error message content
2. Server console logs
3. Browser console logs

**Common Errors:**

- "Authentication required" → Sign in with Civic Auth
- "AI service not configured" → Add API key to .env.local
- "Failed to process messages" → Check server logs for details

## Automated Testing (Future)

### Unit Tests

```typescript
// Example test structure
describe("Chat API", () => {
  it("should require authentication", async () => {
    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages: [] }),
    });
    expect(response.status).toBe(401);
  });

  it("should validate messages array", async () => {
    // Test with authenticated request
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { Cookie: authCookie },
      body: JSON.stringify({ messages: [] }),
    });
    expect(response.status).toBe(400);
  });
});
```

### Integration Tests

```typescript
// Example integration test
describe("Chat Flow", () => {
  it("should complete a conversation", async () => {
    // 1. Sign in
    // 2. Send message
    // 3. Receive response
    // 4. Send follow-up
    // 5. Verify context maintained
  });
});
```

## Success Criteria

✅ **All tests pass**

- Authentication works
- Messages send successfully
- Responses stream correctly
- Errors handled gracefully

✅ **Performance acceptable**

- First token < 3 seconds
- Smooth streaming
- No memory leaks

✅ **User experience smooth**

- No UI freezing
- Clear error messages
- Intuitive interactions

## Next Steps

1. ✅ Fix message conversion error
2. ✅ Test basic functionality
3. ⏳ Add automated tests
4. ⏳ Implement rate limiting
5. ⏳ Add conversation history
6. ⏳ Enhance tool calling
7. ⏳ Add analytics tracking

## Support

If tests fail or you encounter issues:

1. Review `AI_CHAT_FIX_SUMMARY.md` for recent fixes
2. Check `AI_CHAT_SETUP.md` for configuration help
3. Review `docs/CHANGELOG_CHAT_API.md` for version history
4. Check server and browser console logs
