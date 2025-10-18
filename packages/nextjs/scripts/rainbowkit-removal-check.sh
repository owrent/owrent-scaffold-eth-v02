#!/bin/bash

# RainbowKit Complete Removal Verification Script
# This script thoroughly checks that RainbowKit has been completely removed

echo "🔍 RainbowKit Complete Removal Verification"
echo "==========================================="
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
WARN=0

# Function to print test result
print_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ PASS${NC}: $2"
        ((PASS++))
    elif [ $1 -eq 2 ]; then
        echo -e "${YELLOW}⚠️  WARN${NC}: $2"
        ((WARN++))
    else
        echo -e "${RED}❌ FAIL${NC}: $2"
        ((FAIL++))
    fi
}

echo "📦 Test 1: Package Dependencies..."

# Check package.json for RainbowKit
if grep -q "@rainbow-me/rainbowkit" package.json; then
    print_result 1 "RainbowKit dependency found in package.json"
    echo "   Run: yarn remove @rainbow-me/rainbowkit"
else
    print_result 0 "No RainbowKit dependency in package.json"
fi

# Check for RainbowKit in node_modules
if [ -d "node_modules/@rainbow-me" ]; then
    print_result 1 "RainbowKit found in node_modules"
    echo "   Run: yarn install to clean up"
else
    print_result 0 "No RainbowKit in node_modules"
fi

# Check yarn.lock for RainbowKit
if [ -f "../../yarn.lock" ]; then
    if grep -q "@rainbow-me/rainbowkit" ../../yarn.lock; then
        print_result 2 "RainbowKit references found in yarn.lock"
        echo "   This is normal if recently removed. Run: yarn install"
    else
        print_result 0 "No RainbowKit in yarn.lock"
    fi
fi

echo ""
echo "🔍 Test 2: Source Code - Imports..."

# Search for RainbowKit imports
RAINBOW_IMPORTS=$(grep -r "from.*@rainbow-me/rainbowkit" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" . 2>/dev/null | grep -v "node_modules" | grep -v ".next" | grep -v "rainbowkit-removal-check")
if [ -z "$RAINBOW_IMPORTS" ]; then
    print_result 0 "No RainbowKit imports found"
else
    print_result 1 "RainbowKit imports found:"
    echo "$RAINBOW_IMPORTS" | while read line; do
        echo "   $line"
    done
fi

# Search for alternative import patterns
RAINBOW_IMPORTS_ALT=$(grep -r "import.*rainbow" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" . 2>/dev/null | grep -v "node_modules" | grep -v ".next" | grep -v "rainbowkit-removal-check" | grep -v "// " | grep -v "/\*")
if [ -z "$RAINBOW_IMPORTS_ALT" ]; then
    print_result 0 "No alternative RainbowKit import patterns found"
else
    print_result 1 "Alternative RainbowKit imports found:"
    echo "$RAINBOW_IMPORTS_ALT" | while read line; do
        echo "   $line"
    done
fi

echo ""
echo "🔍 Test 3: Source Code - Component Usage..."

# Search for RainbowKitProvider
RAINBOWKIT_PROVIDER=$(grep -r "RainbowKitProvider" --include="*.ts" --include="*.tsx" . 2>/dev/null | grep -v "node_modules" | grep -v ".next" | grep -v "rainbowkit-removal-check" | grep -v "TESTING_CHECKLIST")
if [ -z "$RAINBOWKIT_PROVIDER" ]; then
    print_result 0 "No RainbowKitProvider usage found"
else
    print_result 1 "RainbowKitProvider usage found:"
    echo "$RAINBOWKIT_PROVIDER" | while read line; do
        echo "   $line"
    done
fi

# Search for RainbowKitCustomConnectButton
RAINBOWKIT_BUTTON=$(grep -r "RainbowKitCustomConnectButton" --include="*.ts" --include="*.tsx" . 2>/dev/null | grep -v "node_modules" | grep -v ".next" | grep -v "rainbowkit-removal-check")
if [ -z "$RAINBOWKIT_BUTTON" ]; then
    print_result 0 "No RainbowKitCustomConnectButton usage found"
else
    print_result 1 "RainbowKitCustomConnectButton usage found:"
    echo "$RAINBOWKIT_BUTTON" | while read line; do
        echo "   $line"
    done
fi

# Search for any RainbowKit component
RAINBOWKIT_COMPONENTS=$(grep -r "RainbowKit" --include="*.ts" --include="*.tsx" . 2>/dev/null | grep -v "node_modules" | grep -v ".next" | grep -v "rainbowkit-removal-check" | grep -v "TESTING_CHECKLIST" | grep -v "README" | grep -v "// " | grep -v "/\*")
if [ -z "$RAINBOWKIT_COMPONENTS" ]; then
    print_result 0 "No RainbowKit components found"
else
    print_result 1 "RainbowKit components found:"
    echo "$RAINBOWKIT_COMPONENTS" | while read line; do
        echo "   $line"
    done
fi

echo ""
echo "🔍 Test 4: Source Code - Hooks..."

# Search for RainbowKit hooks
RAINBOWKIT_HOOKS=$(grep -r "useConnectModal\|useAccountModal\|useChainModal" --include="*.ts" --include="*.tsx" . 2>/dev/null | grep -v "node_modules" | grep -v ".next" | grep -v "rainbowkit-removal-check")
if [ -z "$RAINBOWKIT_HOOKS" ]; then
    print_result 0 "No RainbowKit hooks found"
else
    print_result 1 "RainbowKit hooks found:"
    echo "$RAINBOWKIT_HOOKS" | while read line; do
        echo "   $line"
    done
fi

echo ""
echo "🔍 Test 5: Configuration Files..."

# Check scaffold.config.ts
if [ -f "scaffold.config.ts" ]; then
    if grep -q "rainbow" scaffold.config.ts; then
        print_result 1 "RainbowKit references in scaffold.config.ts"
    else
        print_result 0 "No RainbowKit in scaffold.config.ts"
    fi
else
    print_result 2 "scaffold.config.ts not found"
fi

# Check next.config.ts
if [ -f "next.config.ts" ]; then
    if grep -q "rainbow" next.config.ts; then
        print_result 1 "RainbowKit references in next.config.ts"
    else
        print_result 0 "No RainbowKit in next.config.ts"
    fi
else
    print_result 2 "next.config.ts not found"
fi

echo ""
echo "🔍 Test 6: Environment Variables..."

# Check .env.example
if [ -f ".env.example" ]; then
    if grep -i "rainbow" .env.example; then
        print_result 1 "RainbowKit references in .env.example"
    else
        print_result 0 "No RainbowKit in .env.example"
    fi
else
    print_result 2 ".env.example not found"
fi

# Check .env.local (if exists)
if [ -f ".env.local" ]; then
    if grep -i "rainbow" .env.local; then
        print_result 2 "RainbowKit references in .env.local (consider removing)"
    else
        print_result 0 "No RainbowKit in .env.local"
    fi
fi

echo ""
echo "🔍 Test 7: Documentation..."

# Check README for outdated RainbowKit references
if [ -f "../../README.md" ]; then
    RAINBOW_README=$(grep -i "rainbowkit" ../../README.md | grep -v "Civic Auth" | grep -v "replacing" | grep -v "removed")
    if [ -z "$RAINBOW_README" ]; then
        print_result 0 "No outdated RainbowKit references in README"
    else
        print_result 2 "RainbowKit mentioned in README (may need update)"
        echo "$RAINBOW_README" | while read line; do
            echo "   $line"
        done
    fi
else
    print_result 2 "README.md not found"
fi

echo ""
echo "🌐 Test 8: Runtime Verification (if server is running)..."

if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "   Server is running, checking for runtime errors..."
    
    # Check if page loads without RainbowKit errors
    PAGE_CONTENT=$(curl -s http://localhost:3000)
    if echo "$PAGE_CONTENT" | grep -qi "rainbowkit"; then
        print_result 2 "RainbowKit references found in rendered HTML"
    else
        print_result 0 "No RainbowKit in rendered HTML"
    fi
else
    print_result 2 "Server not running - skipping runtime checks"
    echo "   Start server with 'yarn start' for runtime verification"
fi

echo ""
echo "🔍 Test 9: Civic Auth Replacement Verification..."

# Verify Civic Auth is properly installed
if grep -q "@civic/auth-web3" package.json; then
    print_result 0 "Civic Auth dependency present"
else
    print_result 1 "Civic Auth dependency missing"
fi

# Verify Civic Auth is used in layout
if [ -f "app/layout.tsx" ]; then
    if grep -q "CivicAuthProvider" app/layout.tsx; then
        print_result 0 "CivicAuthProvider in layout"
    else
        print_result 1 "CivicAuthProvider not in layout"
    fi
fi

# Verify Civic Auth is used in Header
if [ -f "components/Header.tsx" ]; then
    if grep -q "useUser" components/Header.tsx; then
        print_result 0 "Civic Auth useUser hook in Header"
    else
        print_result 1 "Civic Auth useUser hook not in Header"
    fi
fi

echo ""
echo "==========================================="
echo "📊 Summary"
echo "==========================================="
echo -e "${GREEN}Passed: $PASS${NC}"
echo -e "${RED}Failed: $FAIL${NC}"
echo -e "${YELLOW}Warnings: $WARN${NC}"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}🎉 RainbowKit has been completely removed!${NC}"
    echo ""
    echo "✅ Verification complete:"
    echo "   • No RainbowKit dependencies"
    echo "   • No RainbowKit imports"
    echo "   • No RainbowKit components"
    echo "   • No RainbowKit hooks"
    echo "   • Civic Auth properly integrated"
    echo ""
    if [ $WARN -gt 0 ]; then
        echo -e "${YELLOW}Note: $WARN warning(s) found. These are typically minor issues.${NC}"
    fi
    exit 0
else
    echo -e "${RED}❌ RainbowKit removal incomplete!${NC}"
    echo ""
    echo "Please address the failed checks above."
    echo "Common fixes:"
    echo "  • Remove RainbowKit from package.json: yarn remove @rainbow-me/rainbowkit"
    echo "  • Remove RainbowKit imports from source files"
    echo "  • Replace RainbowKit components with Civic Auth equivalents"
    echo "  • Run yarn install to clean up dependencies"
    exit 1
fi
