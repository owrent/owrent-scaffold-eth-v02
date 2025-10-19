# AI Chat Testing Guide

This document provides comprehensive testing instructions for the Civic Nexus AI integration.

## Prerequisites

1. **Development Server Running**: `yarn start` in `packages/nextjs`
2. **Environment Variables Configured**:
   - `NEXT_PUBLIC_CIVIC_CLIENT_ID`: Your Civic Auth client ID
   - `AI_GATEWAY_API_KEY`: Your OpenAI or Anthropic API key
3. **Civic Auth Account**: Sign up at https://auth.civic.com
4. **Nexus Services Connected**: Connect at least one service at https://nexus.civic.com

## Quick Start

### Run All Manual Tests

For a guided walkthrough of all manual tests:
```bash
cd packages/nextjs
./scripts/run-manual-tests.sh
```

This interactive script will guide you through tests 7.2-7.5 with step-by-step instructions.

### Run Automated API Tests

For automated API endpoint testing:
```bash
cd packages/nextjs
./scripts/test-chat-api.sh
```

## Test 1: Chat API Endpoint

### Automated Testing

Run the test script:
```bash
cd packages/nextjs
./scripts/test-chat-api.sh
```

### Expected Results

| Test Case | Expected Status | Expected Behavior |
|-----------|----------------|-------------------|
| Missing messages array | 307 (redirect) or 400 | Middleware redirects unauthenticated requests |
| Invalid message format | 307 (redirect) or 400 | Message validation fails (missing role/content) |
| Malformed JSON | 307 (redirect) or 400 | Request validation fails |
| Unauthenticated request | 307 (redirect) or 401 | Authentication required |

### Manual API Testing

To test authenticated requests:

1. **Sign in through the web interface**:
   ```
   Visit http://localhost:3000
   Click "Connect Wallet" or sign in with Civic Auth
   ```

2. **Get authentication cookies**:
   - Open browser DevTools (F12)
   - Go to Application/Storage → Cookies
   - Copy the Civic Auth session cookie

3. **Test with curl**:
   ```bash
   # Valid request
   curl -X POST http://localhost:3000/api/chat \
     -H "Content-Type: application/json" \
     -b "civic_auth_session=YOUR_SESSION_COOKIE" \
     -d '{"messages":[{"role":"user","content":"Hello"}]}'
   
   # Invalid message format (missing role)
   curl -X POST http://localhost:3000/api/chat \
     -H "Content-Type: application/json" \
     -b "civic_auth_session=YOUR_SESSION_COOKIE" \
     -d '{"messages":[{"content":"Hello"}]}'
   
   # Invalid message format (missing content)
   curl -X POST http://localhost:3000/api/chat \
     -H "Content-Type: application/json" \
     -b "civic_auth_session=YOUR_SESSION_COOKIE" \
     -d '{"messages":[{"role":"user"}]}'
   ```

### Verification Checklist

- [ ] 400 error for missing messages array
- [ ] 400 error for invalid message format (missing role or content)
- [ ] 400 error for malformed JSON
- [ ] 401 error or redirect for unauthenticated requests
- [ ] Streaming response for valid authenticated requests
- [ ] Error messages are user-friendly (no stack traces exposed)

## Test 2: Nexus Tools Integration

### Setup

1. **Sign in to Civic Auth**:
   ```
   Visit http://localhost:3000
   Sign in with your Civic Auth account
   ```

2. **Connect Services**:
   ```
   Visit https://nexus.civic.com
   Connect at least one service (GitHub, Slack, Notion, etc.)
   ```

### Testing Tool Loading

1. **Open AI Chat**:
   ```
   Navigate to http://localhost:3000/ai-chat
   ```

2. **Check Browser Console**:
   - Open DevTools (F12) → Console
   - Look for messages about Nexus tools loading
   - Should see: "Loaded X Nexus tools" or similar

3. **Test Tool Usage**:
   - Send a message that requires tool use
   - Example: "List my GitHub repositories"
   - Example: "Search my Slack messages for 'meeting'"

### Verification Checklist

- [ ] Tools load successfully (check console logs)
- [ ] Tool execution appears in chat interface
- [ ] Tool results are displayed correctly
- [ ] Tool execution indicators show (loading spinner, success checkmark)
- [ ] Error handling works if tool fails

### Expected Console Output

```
Loaded Nexus tools: github_list_repos, slack_search, notion_query, ...
```

## Test 3: Streaming Functionality

### Testing Real-Time Streaming

1. **Send a message**:
   ```
   Navigate to http://localhost:3000/ai-chat
   Type: "Write a short poem about blockchain"
   Press Enter
   ```

2. **Observe streaming behavior**:
   - Message should appear progressively (word by word or chunk by chunk)
   - NOT all at once after completion
   - Loading indicator should show while streaming

3. **Test cancellation**:
   - Send a long message (e.g., "Write a long essay about...")
   - Navigate away before completion
   - Return to page - should not continue streaming

### Verification Checklist

- [ ] Messages appear progressively during streaming
- [ ] Loading indicator shows during generation
- [ ] Streaming completes successfully
- [ ] Cancellation works (navigate away during streaming)
- [ ] No memory leaks or hanging connections

### Expected Behavior

- **Time to First Byte (TTFB)**: < 2 seconds
- **Streaming Rate**: Visible chunks every 100-200ms
- **Completion**: Clean finish with no errors

## Test 4: Error Handling

### Test Scenarios

#### 4.1 Invalid API Key

1. **Temporarily set invalid API key**:
   ```bash
   # In .env.local
   AI_GATEWAY_API_KEY=invalid_key_12345
   ```

2. **Restart server**:
   ```bash
   yarn start
   ```

3. **Send message**:
   - Should show user-friendly error
   - Should NOT expose API key or stack trace

#### 4.2 Network Disconnection

1. **Disconnect network**:
   - Turn off WiFi or disconnect ethernet
   - Or use browser DevTools → Network → Offline

2. **Send message**:
   - Should show connection error
   - Should handle gracefully (no crash)

#### 4.3 Malformed Request

1. **Test missing messages array**:
   ```javascript
   fetch('/api/chat', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ invalid: 'data' })
   }).then(r => r.json()).then(console.log)
   ```

   **Expected response**:
   ```json
   {
     "error": "Invalid request: messages array required"
   }
   ```

2. **Test invalid message format**:
   ```javascript
   fetch('/api/chat', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ 
       messages: [{ invalid: 'format' }] 
     })
   }).then(r => r.json()).then(console.log)
   ```

   **Expected response**:
   ```json
   {
     "error": "Invalid message format: each message must have role and content"
   }
   ```

3. **Test partial message format**:
   ```javascript
   fetch('/api/chat', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ 
       messages: [{ role: 'user' }] // missing content
     })
   }).then(r => r.json()).then(console.log)
   ```

   **Expected response**:
   ```json
   {
     "error": "Invalid message format: each message must have role and content"
   }
   ```

#### 4.4 Unauthenticated Request

1. **Sign out**:
   - Click sign out button
   - Or clear cookies

2. **Try to access /ai-chat**:
   - Should show sign-in prompt
   - Should NOT crash or show error

### Verification Checklist

- [ ] Invalid API key shows user-friendly error
- [ ] Network errors handled gracefully
- [ ] Malformed requests return 400 with clear message
- [ ] Unauthenticated requests redirect or show sign-in prompt
- [ ] No sensitive information exposed in errors
- [ ] Error messages are actionable

### Expected Error Messages

| Scenario | Expected Message |
|----------|-----------------|
| Invalid API key | "AI service configuration error. Please contact support." |
| Network error | "An error occurred while processing your request" |
| Missing messages array | "Invalid request: messages array required" |
| Invalid message format | "Invalid message format: each message must have role and content" |
| Unauthenticated | "Authentication required" |

## Test 5: Authentication Requirements

### Test Flow

1. **Access /ai-chat without signing in**:
   ```
   Open incognito/private window
   Navigate to http://localhost:3000/ai-chat
   ```
   - **Expected**: Sign-in prompt with "Go to Home" button

2. **Sign in**:
   ```
   Click "Go to Home"
   Sign in with Civic Auth
   Navigate back to /ai-chat
   ```
   - **Expected**: Chat interface appears

3. **Send message**:
   ```
   Type: "Hello, how are you?"
   Press Enter
   ```
   - **Expected**: Message sends successfully, AI responds

4. **Sign out**:
   ```
   Click sign out button
   Try to access /ai-chat again
   ```
   - **Expected**: Redirected to sign-in prompt

### Verification Checklist

- [ ] Unauthenticated users see sign-in prompt
- [ ] Sign-in flow works correctly
- [ ] Chat interface appears after authentication
- [ ] Messages send successfully when authenticated
- [ ] Sign-out removes access to chat
- [ ] Session persists across page refreshes

## Browser Compatibility Testing

Test in multiple browsers:

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Mobile Responsiveness Testing

Test on different screen sizes:

- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

### Mobile-Specific Tests

- [ ] Chat interface is usable on mobile
- [ ] Keyboard doesn't obscure input field
- [ ] Messages are readable
- [ ] Buttons are tappable (not too small)
- [ ] Scrolling works smoothly

## Performance Testing

### Metrics to Monitor

1. **Initial Load Time**:
   - Open DevTools → Network
   - Navigate to /ai-chat
   - Check "Load" time (should be < 3s)

2. **Time to First Byte (TTFB)**:
   - Send message
   - Check Network tab for /api/chat request
   - TTFB should be < 2s

3. **Streaming Performance**:
   - Send message
   - Observe chunk delivery rate
   - Should see updates every 100-200ms

4. **Memory Usage**:
   - Open DevTools → Performance
   - Record while using chat
   - Check for memory leaks (increasing memory over time)

### Verification Checklist

- [ ] Initial load < 3 seconds
- [ ] TTFB < 2 seconds
- [ ] Smooth streaming (no stuttering)
- [ ] No memory leaks
- [ ] No console errors

## Troubleshooting

### Common Issues

#### Issue: "No tools available" in console

**Solution**:
1. Verify you're signed in with Civic Auth
2. Check you've connected services at https://nexus.civic.com
3. Verify `NEXT_PUBLIC_CIVIC_CLIENT_ID` is set correctly

#### Issue: "AI service configuration error"

**Solution**:
1. Check `AI_GATEWAY_API_KEY` is set in `.env.local`
2. Verify API key is valid (test at provider's website)
3. Check API key has sufficient credits/quota

#### Issue: Streaming not working

**Solution**:
1. Check browser console for errors
2. Verify network connection
3. Check server logs for errors
4. Try different browser

#### Issue: Authentication fails

**Solution**:
1. Verify `NEXT_PUBLIC_CIVIC_CLIENT_ID` is correct
2. Check redirect URLs in Civic Auth dashboard
3. Clear cookies and try again
4. Check middleware configuration

## Test Results Template

A comprehensive test results template is available at `AI_CHAT_TEST_RESULTS.md`.

To use it:
1. Copy the template: `cp AI_CHAT_TEST_RESULTS.md AI_CHAT_TEST_RESULTS_[DATE].md`
2. Fill in the test results as you perform each test
3. Save the completed results for documentation

The template includes:
- Detailed test steps for each scenario
- Space for observations and screenshots
- Browser compatibility checklist
- Mobile responsiveness checklist
- Performance metrics tracking
- Sign-off section for approval

## Automated Testing (Future)

For future implementation, consider adding:

1. **Unit Tests**: Test individual functions
2. **Integration Tests**: Test API routes with mocked authentication
3. **E2E Tests**: Use Playwright or Cypress for full user flows
4. **Performance Tests**: Automated performance monitoring

Example test structure:
```typescript
// __tests__/api/chat.test.ts
describe('Chat API', () => {
  it('should return 400 for missing messages', async () => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    expect(response.status).toBe(400);
  });
});
```

## Conclusion

This testing guide covers all critical aspects of the AI Chat integration. Follow each section systematically to ensure the feature works correctly across all scenarios.

For questions or issues, refer to:
- AI Chat README: `AI_CHAT_README.md`
- Civic Auth Guide: `.kiro/steering/civic-auth-guide.md`
- Architecture Overview: `.kiro/steering/architecture.md`
