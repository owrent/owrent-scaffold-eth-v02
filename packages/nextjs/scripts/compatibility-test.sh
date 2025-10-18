#!/bin/bash

# Civic Auth Compatibility Testing Script
# This script verifies compatibility with existing Scaffold-ETH features

echo "🔗 Civic Auth Compatibility Testing"
echo "===================================="
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

echo "🔍 Test 1: FHEVM Compatibility..."

# Check if FHEVM page exists
if [ -f "app/fhevm/page.tsx" ]; then
    print_result 0 "FHEVM page exists"
    
    # Check if FHEVM hooks are present
    if [ -d "fhevm" ]; then
        print_result 0 "FHEVM directory exists"
        
        if [ -f "fhevm/useFhevm.tsx" ]; then
            print_result 0 "useFhevm hook exists"
        else
            print_result 1 "useFhevm hook not found"
        fi
    else
        print_result 1 "FHEVM directory not found"
    fi
    
    # Check if FHEVM page is accessible
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/fhevm)
        if [ "$HTTP_CODE" -eq 200 ]; then
            print_result 0 "FHEVM page is accessible (HTTP 200)"
        else
            print_result 1 "FHEVM page returned HTTP $HTTP_CODE"
        fi
    else
        print_result 2 "Server not running - skipping HTTP test"
    fi
else
    print_result 1 "FHEVM page not found"
fi

echo ""
echo "🐛 Test 2: Debug UI Compatibility..."

# Check if debug page exists
if [ -f "app/debug/page.tsx" ] || [ -f "app/debug/_components/DebugContracts.tsx" ]; then
    print_result 0 "Debug UI exists"
    
    # Check if debug page is accessible
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/debug)
        if [ "$HTTP_CODE" -eq 200 ]; then
            print_result 0 "Debug page is accessible (HTTP 200)"
        else
            print_result 1 "Debug page returned HTTP $HTTP_CODE"
        fi
    else
        print_result 2 "Server not running - skipping HTTP test"
    fi
else
    print_result 1 "Debug UI not found"
fi

echo ""
echo "🔍 Test 3: Block Explorer Compatibility..."

# Check if block explorer exists
if [ -f "app/blockexplorer/page.tsx" ] || [ -d "app/blockexplorer" ]; then
    print_result 0 "Block explorer exists"
    
    # Check if block explorer is accessible
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/blockexplorer)
        if [ "$HTTP_CODE" -eq 200 ]; then
            print_result 0 "Block explorer is accessible (HTTP 200)"
        else
            print_result 1 "Block explorer returned HTTP $HTTP_CODE"
        fi
    else
        print_result 2 "Server not running - skipping HTTP test"
    fi
else
    print_result 1 "Block explorer not found"
fi

echo ""
echo "🔌 Test 4: Provider Compatibility..."

# Check layout for provider hierarchy
if [ -f "app/layout.tsx" ]; then
    if grep -q "ThemeProvider" app/layout.tsx; then
        print_result 0 "ThemeProvider present in layout"
    else
        print_result 1 "ThemeProvider not found in layout"
    fi
    
    if grep -q "CivicAuthProvider" app/layout.tsx; then
        print_result 0 "CivicAuthProvider present in layout"
    else
        print_result 1 "CivicAuthProvider not found in layout"
    fi
    
    if grep -q "ScaffoldEthAppWithProviders" app/layout.tsx; then
        print_result 0 "ScaffoldEthAppWithProviders present in layout"
    else
        print_result 1 "ScaffoldEthAppWithProviders not found in layout"
    fi
    
    # Check provider order (CivicAuthProvider should wrap ScaffoldEthAppWithProviders)
    LAYOUT_CONTENT=$(cat app/layout.tsx)
    if echo "$LAYOUT_CONTENT" | grep -A 5 "CivicAuthProvider" | grep -q "ScaffoldEthAppWithProviders"; then
        print_result 0 "Provider hierarchy is correct"
    else
        print_result 1 "Provider hierarchy may be incorrect"
    fi
else
    print_result 1 "app/layout.tsx not found"
fi

# Check ScaffoldEthAppWithProviders
if [ -f "components/ScaffoldEthAppWithProviders.tsx" ]; then
    if grep -q "WagmiProvider" components/ScaffoldEthAppWithProviders.tsx; then
        print_result 0 "WagmiProvider present in ScaffoldEthAppWithProviders"
    else
        print_result 1 "WagmiProvider not found in ScaffoldEthAppWithProviders"
    fi
    
    if grep -q "QueryClientProvider" components/ScaffoldEthAppWithProviders.tsx; then
        print_result 0 "QueryClientProvider present in ScaffoldEthAppWithProviders"
    else
        print_result 1 "QueryClientProvider not found in ScaffoldEthAppWithProviders"
    fi
else
    print_result 1 "components/ScaffoldEthAppWithProviders.tsx not found"
fi

echo ""
echo "🪝 Test 5: Wagmi Hooks Compatibility..."

# Check if wagmi is still in dependencies
if grep -q '"wagmi"' package.json; then
    print_result 0 "Wagmi dependency present"
else
    print_result 1 "Wagmi dependency not found"
fi

# Check if viem is still in dependencies
if grep -q '"viem"' package.json; then
    print_result 0 "Viem dependency present"
else
    print_result 1 "Viem dependency not found"
fi

# Check scaffold-eth hooks
if [ -d "hooks/scaffold-eth" ]; then
    print_result 0 "Scaffold-ETH hooks directory exists"
    
    if [ -f "hooks/scaffold-eth/useScaffoldContract.ts" ]; then
        print_result 0 "useScaffoldContract hook exists"
    else
        print_result 1 "useScaffoldContract hook not found"
    fi
    
    if [ -f "hooks/scaffold-eth/useScaffoldReadContract.ts" ]; then
        print_result 0 "useScaffoldReadContract hook exists"
    else
        print_result 1 "useScaffoldReadContract hook not found"
    fi
    
    if [ -f "hooks/scaffold-eth/useScaffoldWriteContract.ts" ]; then
        print_result 0 "useScaffoldWriteContract hook exists"
    else
        print_result 1 "useScaffoldWriteContract hook not found"
    fi
else
    print_result 1 "Scaffold-ETH hooks directory not found"
fi

echo ""
echo "⚙️ Test 6: Configuration Compatibility..."

# Check scaffold.config.ts
if [ -f "scaffold.config.ts" ]; then
    print_result 0 "scaffold.config.ts exists"
    
    if grep -q "targetNetworks" scaffold.config.ts; then
        print_result 0 "targetNetworks configuration present"
    else
        print_result 1 "targetNetworks configuration not found"
    fi
else
    print_result 1 "scaffold.config.ts not found"
fi

# Check next.config.ts
if [ -f "next.config.ts" ]; then
    if grep -q "createCivicAuthPlugin" next.config.ts; then
        print_result 0 "Civic Auth plugin in next.config.ts"
    else
        print_result 1 "Civic Auth plugin not found in next.config.ts"
    fi
    
    # Check that existing Next.js config is preserved
    if grep -q "nextConfig" next.config.ts; then
        print_result 0 "Existing Next.js config preserved"
    else
        print_result 1 "Existing Next.js config may be missing"
    fi
else
    print_result 1 "next.config.ts not found"
fi

echo ""
echo "📦 Test 7: Contract Integration Compatibility..."

# Check if deployedContracts.ts exists
if [ -f "contracts/deployedContracts.ts" ]; then
    print_result 0 "deployedContracts.ts exists"
else
    print_result 1 "deployedContracts.ts not found"
fi

# Check if externalContracts.ts exists
if [ -f "contracts/externalContracts.ts" ]; then
    print_result 0 "externalContracts.ts exists"
else
    print_result 2 "externalContracts.ts not found (optional)"
fi

echo ""
echo "🎨 Test 8: UI Component Compatibility..."

# Check if Header still has all necessary components
if [ -f "components/Header.tsx" ]; then
    if grep -q "FaucetButton" components/Header.tsx; then
        print_result 0 "FaucetButton still present in Header"
    else
        print_result 1 "FaucetButton not found in Header"
    fi
    
    if grep -q "HeaderMenuLinks" components/Header.tsx; then
        print_result 0 "HeaderMenuLinks still present in Header"
    else
        print_result 1 "HeaderMenuLinks not found in Header"
    fi
else
    print_result 1 "components/Header.tsx not found"
fi

# Check if Footer exists
if [ -f "components/Footer.tsx" ]; then
    print_result 0 "Footer component exists"
else
    print_result 1 "Footer component not found"
fi

echo ""
echo "🔐 Test 9: No Provider Conflicts..."

# Check for duplicate provider warnings in code
# Expected: 3 references (1 import + 1 opening tag + 1 closing tag in ScaffoldEthAppWithProviders)
DUPLICATE_PROVIDERS=$(grep -r "WagmiProvider" --include="*.tsx" --include="*.ts" . 2>/dev/null | grep -v "node_modules" | grep -v ".next" | grep -v "compatibility-test" | wc -l)
if [ "$DUPLICATE_PROVIDERS" -le 3 ]; then
    print_result 0 "No duplicate WagmiProvider instances detected (found $DUPLICATE_PROVIDERS references)"
else
    print_result 1 "Multiple WagmiProvider instances found ($DUPLICATE_PROVIDERS references, expected ≤3)"
fi

# Check that RainbowKitProvider is not present
RAINBOW_PROVIDERS=$(grep -r "RainbowKitProvider" --include="*.tsx" --include="*.ts" . 2>/dev/null | grep -v "node_modules" | grep -v ".next" | grep -v "TESTING_CHECKLIST" | grep -v "compatibility-test" | wc -l)
if [ "$RAINBOW_PROVIDERS" -eq 0 ]; then
    print_result 0 "No RainbowKitProvider instances found"
else
    print_result 1 "RainbowKitProvider still present in code"
fi

echo ""
echo "===================================="
echo "📊 Summary"
echo "===================================="
echo -e "${GREEN}Passed: $PASS${NC}"
echo -e "${RED}Failed: $FAIL${NC}"
echo -e "${YELLOW}Skipped: $SKIP${NC}"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}🎉 All compatibility tests passed!${NC}"
    echo ""
    echo "Civic Auth is compatible with existing features:"
    echo "✅ FHEVM functionality"
    echo "✅ Debug UI"
    echo "✅ Block Explorer"
    echo "✅ Provider hierarchy"
    echo "✅ Wagmi hooks"
    echo "✅ Scaffold-ETH hooks"
    echo ""
    echo "Next steps:"
    echo "1. Test FHEVM operations with Civic Auth wallet"
    echo "2. Test contract interactions in Debug UI"
    echo "3. Verify block explorer shows Civic Auth transactions"
    exit 0
else
    echo -e "${YELLOW}⚠️  Some compatibility tests failed. Please review the issues above.${NC}"
    exit 1
fi
