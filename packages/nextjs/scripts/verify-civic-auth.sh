#!/bin/bash

# Civic Auth Integration Verification Script
# This script automates some of the verification tasks from the testing checklist

echo "🔍 Civic Auth Integration Verification"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counter for results
PASS=0
FAIL=0

# Function to print test result
print_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ PASS${NC}: $2"
        ((PASS++))
    else
        echo -e "${RED}❌ FAIL${NC}: $2"
        ((FAIL++))
    fi
}

echo "📦 Test 1: Checking package.json for RainbowKit..."
if grep -q "@rainbow-me/rainbowkit" package.json; then
    print_result 1 "RainbowKit found in package.json"
else
    print_result 0 "No RainbowKit dependency in package.json"
fi

echo ""
echo "📦 Test 2: Checking for Civic Auth dependency..."
if grep -q "@civic/auth-web3" package.json; then
    print_result 0 "Civic Auth dependency found"
else
    print_result 1 "Civic Auth dependency missing"
fi

echo ""
echo "🔍 Test 3: Searching for RainbowKit imports in TypeScript files..."
RAINBOW_IMPORTS=$(grep -r "from.*rainbow" --include="*.ts" --include="*.tsx" . 2>/dev/null | grep -v "node_modules" | grep -v ".next" | wc -l)
if [ "$RAINBOW_IMPORTS" -eq 0 ]; then
    print_result 0 "No RainbowKit imports found"
else
    print_result 1 "Found $RAINBOW_IMPORTS RainbowKit import(s)"
    echo "   Run: grep -r 'from.*rainbow' --include='*.ts' --include='*.tsx' . | grep -v node_modules"
fi

echo ""
echo "🔍 Test 4: Searching for RainbowKit component usage..."
RAINBOW_USAGE=$(grep -r "RainbowKit" --include="*.ts" --include="*.tsx" . 2>/dev/null | grep -v "node_modules" | grep -v ".next" | grep -v "TESTING_CHECKLIST" | grep -v "verify-civic-auth" | wc -l)
if [ "$RAINBOW_USAGE" -eq 0 ]; then
    print_result 0 "No RainbowKit component usage found"
else
    print_result 1 "Found $RAINBOW_USAGE RainbowKit usage(s)"
    echo "   Run: grep -r 'RainbowKit' --include='*.ts' --include='*.tsx' . | grep -v node_modules"
fi

echo ""
echo "🔍 Test 5: Checking for Civic Auth imports..."
CIVIC_IMPORTS=$(grep -r "from.*@civic/auth-web3" --include="*.ts" --include="*.tsx" . 2>/dev/null | grep -v "node_modules" | grep -v ".next" | wc -l)
if [ "$CIVIC_IMPORTS" -gt 0 ]; then
    print_result 0 "Found $CIVIC_IMPORTS Civic Auth import(s)"
else
    print_result 1 "No Civic Auth imports found"
fi

echo ""
echo "📄 Test 6: Checking for middleware.ts..."
if [ -f "middleware.ts" ]; then
    print_result 0 "middleware.ts exists"
    
    echo "   Checking middleware content..."
    if grep -q "authMiddleware" middleware.ts; then
        print_result 0 "authMiddleware found in middleware.ts"
    else
        print_result 1 "authMiddleware not found in middleware.ts"
    fi
else
    print_result 1 "middleware.ts not found"
fi

echo ""
echo "📄 Test 7: Checking for Civic Auth API route..."
if [ -f "app/api/auth/[...civicauth]/route.ts" ]; then
    print_result 0 "Civic Auth API route exists"
else
    print_result 1 "Civic Auth API route not found"
fi

echo ""
echo "📄 Test 8: Checking layout.tsx for CivicAuthProvider..."
if [ -f "app/layout.tsx" ]; then
    if grep -q "CivicAuthProvider" app/layout.tsx; then
        print_result 0 "CivicAuthProvider found in layout.tsx"
    else
        print_result 1 "CivicAuthProvider not found in layout.tsx"
    fi
else
    print_result 1 "app/layout.tsx not found"
fi

echo ""
echo "📄 Test 9: Checking Header.tsx for Civic Auth integration..."
if [ -f "components/Header.tsx" ]; then
    if grep -q "useUser" components/Header.tsx; then
        print_result 0 "useUser hook found in Header.tsx"
    else
        print_result 1 "useUser hook not found in Header.tsx"
    fi
    
    if grep -q "RainbowKit" components/Header.tsx; then
        print_result 1 "RainbowKit reference found in Header.tsx"
    else
        print_result 0 "No RainbowKit references in Header.tsx"
    fi
else
    print_result 1 "components/Header.tsx not found"
fi

echo ""
echo "🔧 Test 10: Checking next.config.ts for Civic Auth plugin..."
if [ -f "next.config.ts" ]; then
    if grep -q "createCivicAuthPlugin" next.config.ts; then
        print_result 0 "Civic Auth plugin found in next.config.ts"
    else
        print_result 1 "Civic Auth plugin not found in next.config.ts"
    fi
else
    print_result 1 "next.config.ts not found"
fi

echo ""
echo "🔧 Test 11: Checking for environment variables..."
if [ -f ".env.example" ]; then
    if grep -q "NEXT_PUBLIC_CIVIC_CLIENT_ID" .env.example; then
        print_result 0 "CIVIC_CLIENT_ID found in .env.example"
    else
        print_result 1 "CIVIC_CLIENT_ID not found in .env.example"
    fi
else
    print_result 1 ".env.example not found"
fi

echo ""
echo "📊 Test 12: Checking for example pages..."
EXAMPLE_PAGES=0
if [ -f "app/profile/page.tsx" ]; then
    print_result 0 "Profile page exists"
    ((EXAMPLE_PAGES++))
else
    print_result 1 "Profile page not found"
fi

if [ -f "app/server-example/page.tsx" ]; then
    print_result 0 "Server example page exists"
    ((EXAMPLE_PAGES++))
else
    print_result 1 "Server example page not found"
fi

if [ -f "app/api/user/route.ts" ]; then
    print_result 0 "User API route exists"
    ((EXAMPLE_PAGES++))
else
    print_result 1 "User API route not found"
fi

if [ -f "app/actions/userActions.ts" ]; then
    print_result 0 "User actions file exists"
    ((EXAMPLE_PAGES++))
else
    print_result 1 "User actions file not found"
fi

echo ""
echo "========================================"
echo "📊 Summary"
echo "========================================"
echo -e "${GREEN}Passed: $PASS${NC}"
echo -e "${RED}Failed: $FAIL${NC}"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}🎉 All automated checks passed!${NC}"
    echo "Please proceed with manual testing using TESTING_CHECKLIST.md"
    exit 0
else
    echo -e "${YELLOW}⚠️  Some checks failed. Please review the issues above.${NC}"
    exit 1
fi
