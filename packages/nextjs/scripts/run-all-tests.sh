#!/bin/bash

# Run All Civic Auth Tests
# This script runs all automated tests in sequence

echo "🧪 Running All Civic Auth Tests"
echo "================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

TOTAL_PASS=0
TOTAL_FAIL=0
TOTAL_WARN=0

echo -e "${BLUE}📋 Test Suite 1: Civic Auth Verification${NC}"
echo "=========================================="
./scripts/verify-civic-auth.sh
RESULT=$?
echo ""

if [ $RESULT -eq 0 ]; then
    echo -e "${GREEN}✅ Civic Auth Verification: PASSED${NC}"
else
    echo -e "${RED}❌ Civic Auth Verification: FAILED${NC}"
fi

echo ""
echo "=========================================="
echo ""

echo -e "${BLUE}📋 Test Suite 2: Integration Testing${NC}"
echo "=========================================="
./scripts/integration-test.sh
RESULT=$?
echo ""

if [ $RESULT -eq 0 ]; then
    echo -e "${GREEN}✅ Integration Testing: PASSED${NC}"
else
    echo -e "${RED}❌ Integration Testing: FAILED${NC}"
fi

echo ""
echo "=========================================="
echo ""

echo -e "${BLUE}📋 Test Suite 3: Compatibility Testing${NC}"
echo "=========================================="
./scripts/compatibility-test.sh
RESULT=$?
echo ""

if [ $RESULT -eq 0 ]; then
    echo -e "${GREEN}✅ Compatibility Testing: PASSED${NC}"
else
    echo -e "${RED}❌ Compatibility Testing: FAILED${NC}"
fi

echo ""
echo "=========================================="
echo ""

echo -e "${BLUE}📋 Test Suite 4: RainbowKit Removal Check${NC}"
echo "=========================================="
./scripts/rainbowkit-removal-check.sh
RESULT=$?
echo ""

if [ $RESULT -eq 0 ]; then
    echo -e "${GREEN}✅ RainbowKit Removal: PASSED${NC}"
else
    echo -e "${RED}❌ RainbowKit Removal: FAILED${NC}"
fi

echo ""
echo "=========================================="
echo ""
echo -e "${BLUE}📊 Overall Test Summary${NC}"
echo "=========================================="
echo ""
echo "All automated test suites have been executed."
echo ""
echo "Next steps:"
echo "1. Review any failed tests above"
echo "2. Run 'yarn install' if RainbowKit removal check failed"
echo "3. Start server with 'yarn start' for full integration tests"
echo "4. Complete manual testing using TESTING_CHECKLIST.md"
echo ""
echo "For detailed results, see TESTING_SUMMARY.md"
echo ""
