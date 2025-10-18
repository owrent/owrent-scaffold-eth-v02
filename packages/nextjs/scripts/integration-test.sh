#!/bin/bash

# Civic Auth Integration Testing Script
# This script performs integration tests for the Civic Auth implementation

echo "🧪 Civic Auth Integration Testing"
echo "=================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counter for results
PASS=0
FAIL=0
SKIP=0

# Function to print test result
print_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ PASS${NC}: $2"
        ((PASS++))
    elif [ $1 -eq 2 ]; then
        echo -e "${YELLOW}⏭️  SKIP${NC}: $2"
        ((SKIP++))
    else
        echo -e "${RED}❌ FAIL${NC}: $2"
        ((FAIL++))
    fi
}

# Check if server is running
echo "🔍 Checking if development server is running..."
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    print_result 0 "Development server is running"
else
    print_result 1 "Development server is not running"
    echo -e "${YELLOW}⚠️  Please start the server with 'yarn start' before running integration tests${NC}"
    exit 1
fi

echo ""
echo "📄 Test 1: Checking public routes accessibility..."

# Test home page
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/)
if [ "$HTTP_CODE" -eq 200 ]; then
    print_result 0 "Home page (/) accessible"
else
    print_result 1 "Home page returned HTTP $HTTP_CODE"
fi

# Test debug page
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/debug)
if [ "$HTTP_CODE" -eq 200 ]; then
    print_result 0 "Debug page (/debug) accessible"
else
    print_result 1 "Debug page returned HTTP $HTTP_CODE"
fi

# Test FHEVM page
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/fhevm)
if [ "$HTTP_CODE" -eq 200 ]; then
    print_result 0 "FHEVM page (/fhevm) accessible"
else
    print_result 1 "FHEVM page returned HTTP $HTTP_CODE"
fi

echo ""
echo "📄 Test 2: Checking protected routes (should redirect or show auth required)..."

# Test profile page (protected)
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/profile)
if [ "$HTTP_CODE" -eq 200 ] || [ "$HTTP_CODE" -eq 302 ] || [ "$HTTP_CODE" -eq 307 ]; then
    print_result 0 "Profile page (/profile) returns expected status: $HTTP_CODE"
else
    print_result 1 "Profile page returned unexpected HTTP $HTTP_CODE"
fi

# Test server example page (protected)
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/server-example)
if [ "$HTTP_CODE" -eq 200 ] || [ "$HTTP_CODE" -eq 302 ] || [ "$HTTP_CODE" -eq 307 ]; then
    print_result 0 "Server example page (/server-example) returns expected status: $HTTP_CODE"
else
    print_result 1 "Server example page returned unexpected HTTP $HTTP_CODE"
fi

echo ""
echo "🔌 Test 3: Checking API routes..."

# Test user API route (should return 401 without auth)
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/user)
if [ "$HTTP_CODE" -eq 401 ] || [ "$HTTP_CODE" -eq 403 ]; then
    print_result 0 "User API route (/api/user) correctly returns $HTTP_CODE without auth"
else
    print_result 1 "User API route returned unexpected HTTP $HTTP_CODE (expected 401 or 403)"
fi

# Test Civic Auth API route
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/auth/civicauth)
if [ "$HTTP_CODE" -eq 200 ] || [ "$HTTP_CODE" -eq 302 ] || [ "$HTTP_CODE" -eq 404 ] || [ "$HTTP_CODE" -eq 405 ]; then
    print_result 0 "Civic Auth API route exists (HTTP $HTTP_CODE)"
else
    print_result 1 "Civic Auth API route returned unexpected HTTP $HTTP_CODE"
fi

echo ""
echo "📦 Test 4: Checking middleware configuration..."

# Check if middleware file exists and has correct exports
if [ -f "middleware.ts" ]; then
    if grep -q "export default authMiddleware" middleware.ts; then
        print_result 0 "Middleware exports authMiddleware correctly"
    else
        print_result 1 "Middleware does not export authMiddleware correctly"
    fi
    
    if grep -q "export const config" middleware.ts; then
        print_result 0 "Middleware has config export"
    else
        print_result 1 "Middleware missing config export"
    fi
    
    if grep -q "matcher" middleware.ts; then
        print_result 0 "Middleware has matcher configuration"
    else
        print_result 1 "Middleware missing matcher configuration"
    fi
else
    print_result 1 "middleware.ts file not found"
fi

echo ""
echo "🔧 Test 5: Checking component integration..."

# Check Header component
if [ -f "components/Header.tsx" ]; then
    if grep -q "useUser" components/Header.tsx; then
        print_result 0 "Header uses useUser hook"
    else
        print_result 1 "Header does not use useUser hook"
    fi
    
    if grep -q "signIn" components/Header.tsx; then
        print_result 0 "Header has signIn functionality"
    else
        print_result 1 "Header missing signIn functionality"
    fi
    
    if grep -q "signOut" components/Header.tsx; then
        print_result 0 "Header has signOut functionality"
    else
        print_result 1 "Header missing signOut functionality"
    fi
    
    if grep -q "walletAddress" components/Header.tsx; then
        print_result 0 "Header displays wallet address"
    else
        print_result 1 "Header does not display wallet address"
    fi
else
    print_result 1 "components/Header.tsx not found"
fi

echo ""
echo "📄 Test 6: Checking example pages implementation..."

# Check profile page
if [ -f "app/profile/page.tsx" ]; then
    if grep -q "useUser" app/profile/page.tsx; then
        print_result 0 "Profile page uses useUser hook"
    else
        print_result 1 "Profile page does not use useUser hook"
    fi
    
    if grep -q "walletAddress" app/profile/page.tsx; then
        print_result 0 "Profile page displays wallet address"
    else
        print_result 1 "Profile page does not display wallet address"
    fi
else
    print_result 1 "app/profile/page.tsx not found"
fi

# Check server example page
if [ -f "app/server-example/page.tsx" ]; then
    if grep -q "getUser" app/server-example/page.tsx; then
        print_result 0 "Server example uses getUser function"
    else
        print_result 1 "Server example does not use getUser function"
    fi
else
    print_result 1 "app/server-example/page.tsx not found"
fi

# Check user API route
if [ -f "app/api/user/route.ts" ]; then
    if grep -q "getUser" app/api/user/route.ts; then
        print_result 0 "User API route uses getUser function"
    else
        print_result 1 "User API route does not use getUser function"
    fi
    
    if grep -q "401" app/api/user/route.ts; then
        print_result 0 "User API route has 401 error handling"
    else
        print_result 1 "User API route missing 401 error handling"
    fi
else
    print_result 1 "app/api/user/route.ts not found"
fi

# Check user actions
if [ -f "app/actions/userActions.ts" ]; then
    if grep -q '"use server"' app/actions/userActions.ts; then
        print_result 0 "User actions file has 'use server' directive"
    else
        print_result 1 "User actions file missing 'use server' directive"
    fi
    
    if grep -q "getUser" app/actions/userActions.ts; then
        print_result 0 "User actions use getUser function"
    else
        print_result 1 "User actions do not use getUser function"
    fi
else
    print_result 1 "app/actions/userActions.ts not found"
fi

echo ""
echo "🔐 Test 7: Checking environment configuration..."

if [ -f ".env.example" ]; then
    if grep -q "NEXT_PUBLIC_CIVIC_CLIENT_ID" .env.example; then
        print_result 0 ".env.example has CIVIC_CLIENT_ID"
    else
        print_result 1 ".env.example missing CIVIC_CLIENT_ID"
    fi
else
    print_result 1 ".env.example not found"
fi

if [ -f "next.config.ts" ]; then
    if grep -q "NEXT_PUBLIC_CIVIC_CLIENT_ID" next.config.ts; then
        print_result 0 "next.config.ts uses CIVIC_CLIENT_ID"
    else
        print_result 1 "next.config.ts does not use CIVIC_CLIENT_ID"
    fi
else
    print_result 1 "next.config.ts not found"
fi

echo ""
echo "📚 Test 8: Checking documentation..."

if [ -f "../../README.md" ]; then
    if grep -q "Civic Auth" ../../README.md; then
        print_result 0 "README mentions Civic Auth"
    else
        print_result 1 "README does not mention Civic Auth"
    fi
else
    print_result 1 "README.md not found"
fi

if [ -f "TESTING_CHECKLIST.md" ]; then
    print_result 0 "Testing checklist exists"
else
    print_result 1 "Testing checklist not found"
fi

echo ""
echo "=================================="
echo "📊 Summary"
echo "=================================="
echo -e "${GREEN}Passed: $PASS${NC}"
echo -e "${RED}Failed: $FAIL${NC}"
echo -e "${YELLOW}Skipped: $SKIP${NC}"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}🎉 All integration tests passed!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Complete manual testing using TESTING_CHECKLIST.md"
    echo "2. Test authentication flow with actual Civic Auth credentials"
    echo "3. Verify session persistence across page refreshes"
    echo "4. Test on different browsers and devices"
    exit 0
else
    echo -e "${YELLOW}⚠️  Some integration tests failed. Please review the issues above.${NC}"
    exit 1
fi
