#!/bin/bash

# Test Chat API Endpoint
# This script tests the /api/chat endpoint with various scenarios

echo "=== Testing Chat API Endpoint ==="
echo ""

# Colors for output
RED='\033[0:31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

API_URL="http://localhost:3000/api/chat"

echo "Test 1: Missing messages array (should return 400 or redirect)"
echo "--------------------------------------------------------------"
RESPONSE=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{}' \
  -w "\nHTTP_STATUS:%{http_code}")

HTTP_STATUS=$(echo "$RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed '/HTTP_STATUS/d')

echo "HTTP Status: $HTTP_STATUS"
echo "Response Body: $BODY"

if [ "$HTTP_STATUS" = "400" ] || [ "$HTTP_STATUS" = "307" ]; then
  echo -e "${GREEN}✓ Test 1 PASSED${NC}"
else
  echo -e "${RED}✗ Test 1 FAILED - Expected 400 or 307, got $HTTP_STATUS${NC}"
fi
echo ""

echo "Test 2: Malformed JSON (should return 400 or redirect)"
echo "--------------------------------------------------------------"
RESPONSE=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d 'invalid json' \
  -w "\nHTTP_STATUS:%{http_code}")

HTTP_STATUS=$(echo "$RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed '/HTTP_STATUS/d')

echo "HTTP Status: $HTTP_STATUS"
echo "Response Body: $BODY"

if [ "$HTTP_STATUS" = "400" ] || [ "$HTTP_STATUS" = "307" ]; then
  echo -e "${GREEN}✓ Test 2 PASSED${NC}"
else
  echo -e "${RED}✗ Test 2 FAILED - Expected 400 or 307, got $HTTP_STATUS${NC}"
fi
echo ""

echo "Test 3: Unauthenticated request with valid payload (should return 401 or redirect)"
echo "--------------------------------------------------------------"
RESPONSE=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello"}]}' \
  -w "\nHTTP_STATUS:%{http_code}")

HTTP_STATUS=$(echo "$RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed '/HTTP_STATUS/d')

echo "HTTP Status: $HTTP_STATUS"
echo "Response Body: $BODY"

if [ "$HTTP_STATUS" = "401" ] || [ "$HTTP_STATUS" = "307" ]; then
  echo -e "${GREEN}✓ Test 3 PASSED${NC}"
else
  echo -e "${RED}✗ Test 3 FAILED - Expected 401 or 307, got $HTTP_STATUS${NC}"
fi
echo ""

echo "=== Summary ==="
echo "The API endpoint is protected by Civic Auth middleware."
echo "To test authenticated requests:"
echo "1. Sign in through the web interface at http://localhost:3000"
echo "2. Use browser DevTools to copy authentication cookies"
echo "3. Include cookies in curl requests with -b flag"
echo ""
echo "For manual testing:"
echo "- Visit http://localhost:3000/ai-chat"
echo "- Sign in with Civic Auth"
echo "- Use the chat interface to test streaming responses"
echo ""
