#!/bin/bash

# Manual Testing Checklist for AI Chat Integration
# This script provides a guided checklist for manual testing

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║     AI Chat Integration - Manual Testing Checklist            ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Prerequisites:${NC}"
echo "✓ Development server running (yarn start)"
echo "✓ Environment variables configured:"
echo "  - NEXT_PUBLIC_CIVIC_CLIENT_ID"
echo "  - AI_GATEWAY_API_KEY"
echo "✓ Civic Auth account created at https://auth.civic.com"
echo "✓ At least one service connected at https://nexus.civic.com"
echo ""

read -p "Press Enter to continue..."
echo ""

# Test 7.2: Nexus Tools Integration
echo "═══════════════════════════════════════════════════════════════"
echo -e "${YELLOW}Test 7.2: Nexus Tools Integration${NC}"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "Steps to perform:"
echo "1. Open http://localhost:3000/ai-chat in your browser"
echo "2. Sign in with Civic Auth"
echo "3. Open browser DevTools (F12) → Console tab"
echo "4. Look for messages about Nexus tools loading"
echo "5. Send a message: 'List my GitHub repositories'"
echo "6. Verify tool execution appears in chat interface"
echo "7. Verify tool results are displayed correctly"
echo ""
echo "Expected Results:"
echo "✓ Console shows: 'Loaded X Nexus tools'"
echo "✓ Tool execution indicators appear (loading spinner)"
echo "✓ Tool results are displayed in chat"
echo "✓ Success checkmark appears when tool completes"
echo ""
read -p "Did Test 7.2 pass? (y/n): " test72
if [ "$test72" = "y" ] || [ "$test72" = "Y" ]; then
  echo -e "${GREEN}✓ Test 7.2 PASSED${NC}"
else
  echo -e "${RED}✗ Test 7.2 FAILED${NC}"
  echo "Troubleshooting:"
  echo "- Verify you're signed in with Civic Auth"
  echo "- Check you've connected services at https://nexus.civic.com"
  echo "- Verify NEXT_PUBLIC_CIVIC_CLIENT_ID is set correctly"
fi
echo ""

# Test 7.3: Streaming Functionality
echo "═══════════════════════════════════════════════════════════════"
echo -e "${YELLOW}Test 7.3: Streaming Functionality${NC}"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "Steps to perform:"
echo "1. In the AI chat interface, send: 'Write a short poem about blockchain'"
echo "2. Observe the response appearing progressively"
echo "3. Verify message appears word-by-word or chunk-by-chunk"
echo "4. Send another message: 'Write a long essay about...'"
echo "5. Navigate away before completion"
echo "6. Return to page and verify streaming stopped"
echo ""
echo "Expected Results:"
echo "✓ Messages appear progressively (not all at once)"
echo "✓ Loading indicator shows during generation"
echo "✓ Streaming completes successfully"
echo "✓ Navigation cancels streaming"
echo ""
read -p "Did Test 7.3 pass? (y/n): " test73
if [ "$test73" = "y" ] || [ "$test73" = "Y" ]; then
  echo -e "${GREEN}✓ Test 7.3 PASSED${NC}"
else
  echo -e "${RED}✗ Test 7.3 FAILED${NC}"
  echo "Troubleshooting:"
  echo "- Check browser console for errors"
  echo "- Verify network connection"
  echo "- Try different browser"
fi
echo ""

# Test 7.4: Error Handling
echo "═══════════════════════════════════════════════════════════════"
echo -e "${YELLOW}Test 7.4: Error Handling${NC}"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "Steps to perform:"
echo "1. Test with invalid API key:"
echo "   - Edit .env.local: AI_GATEWAY_API_KEY=invalid_key"
echo "   - Restart server: yarn start"
echo "   - Send message, verify user-friendly error"
echo ""
echo "2. Test network disconnection:"
echo "   - Disconnect WiFi or use DevTools → Network → Offline"
echo "   - Send message, verify graceful error handling"
echo ""
echo "3. Test malformed request:"
echo "   - Open browser console"
echo "   - Run: fetch('/api/chat', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({invalid:'data'})})"
echo "   - Verify 400 error with clear message"
echo ""
echo "4. Test unauthenticated access:"
echo "   - Sign out"
echo "   - Try to access /ai-chat"
echo "   - Verify sign-in prompt appears"
echo ""
echo "Expected Results:"
echo "✓ Invalid API key shows user-friendly error"
echo "✓ Network errors handled gracefully"
echo "✓ Malformed requests return 400 with clear message"
echo "✓ Unauthenticated requests show sign-in prompt"
echo "✓ No sensitive information exposed in errors"
echo ""
read -p "Did Test 7.4 pass? (y/n): " test74
if [ "$test74" = "y" ] || [ "$test74" = "Y" ]; then
  echo -e "${GREEN}✓ Test 7.4 PASSED${NC}"
else
  echo -e "${RED}✗ Test 7.4 FAILED${NC}"
  echo "Troubleshooting:"
  echo "- Check error messages are user-friendly"
  echo "- Verify no stack traces exposed"
  echo "- Check console logs for details"
fi
echo ""

# Test 7.5: Authentication Requirements
echo "═══════════════════════════════════════════════════════════════"
echo -e "${YELLOW}Test 7.5: Authentication Requirements${NC}"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "Steps to perform:"
echo "1. Open incognito/private window"
echo "2. Navigate to http://localhost:3000/ai-chat"
echo "3. Verify sign-in prompt appears"
echo "4. Click 'Go to Home' and sign in"
echo "5. Navigate back to /ai-chat"
echo "6. Verify chat interface appears"
echo "7. Send message: 'Hello, how are you?'"
echo "8. Verify message sends successfully"
echo "9. Sign out"
echo "10. Try to access /ai-chat again"
echo "11. Verify redirected to sign-in prompt"
echo ""
echo "Expected Results:"
echo "✓ Unauthenticated users see sign-in prompt"
echo "✓ Sign-in flow works correctly"
echo "✓ Chat interface appears after authentication"
echo "✓ Messages send successfully when authenticated"
echo "✓ Sign-out removes access to chat"
echo "✓ Session persists across page refreshes"
echo ""
read -p "Did Test 7.5 pass? (y/n): " test75
if [ "$test75" = "y" ] || [ "$test75" = "Y" ]; then
  echo -e "${GREEN}✓ Test 7.5 PASSED${NC}"
else
  echo -e "${RED}✗ Test 7.5 FAILED${NC}"
  echo "Troubleshooting:"
  echo "- Verify NEXT_PUBLIC_CIVIC_CLIENT_ID is correct"
  echo "- Check redirect URLs in Civic Auth dashboard"
  echo "- Clear cookies and try again"
fi
echo ""

# Summary
echo "═══════════════════════════════════════════════════════════════"
echo -e "${BLUE}Test Summary${NC}"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "Test Results:"
[ "$test72" = "y" ] || [ "$test72" = "Y" ] && echo -e "7.2 Nexus Tools Integration:     ${GREEN}PASSED${NC}" || echo -e "7.2 Nexus Tools Integration:     ${RED}FAILED${NC}"
[ "$test73" = "y" ] || [ "$test73" = "Y" ] && echo -e "7.3 Streaming Functionality:     ${GREEN}PASSED${NC}" || echo -e "7.3 Streaming Functionality:     ${RED}FAILED${NC}"
[ "$test74" = "y" ] || [ "$test74" = "Y" ] && echo -e "7.4 Error Handling:              ${GREEN}PASSED${NC}" || echo -e "7.4 Error Handling:              ${RED}FAILED${NC}"
[ "$test75" = "y" ] || [ "$test75" = "Y" ] && echo -e "7.5 Authentication Requirements: ${GREEN}PASSED${NC}" || echo -e "7.5 Authentication Requirements: ${RED}FAILED${NC}"
echo ""

# Check if all tests passed
if [ "$test72" = "y" ] && [ "$test73" = "y" ] && [ "$test74" = "y" ] && [ "$test75" = "y" ]; then
  echo -e "${GREEN}╔════════════════════════════════════════════════════════════════╗${NC}"
  echo -e "${GREEN}║  ✓ All manual tests PASSED!                                   ║${NC}"
  echo -e "${GREEN}║  The AI Chat integration is working correctly.                ║${NC}"
  echo -e "${GREEN}╚════════════════════════════════════════════════════════════════╝${NC}"
else
  echo -e "${YELLOW}╔════════════════════════════════════════════════════════════════╗${NC}"
  echo -e "${YELLOW}║  ⚠ Some tests FAILED                                          ║${NC}"
  echo -e "${YELLOW}║  Please review the troubleshooting steps above.               ║${NC}"
  echo -e "${YELLOW}╚════════════════════════════════════════════════════════════════╝${NC}"
fi
echo ""

echo "For detailed testing instructions, see:"
echo "- AI_CHAT_TESTING.md"
echo "- AI_CHAT_README.md"
echo ""
