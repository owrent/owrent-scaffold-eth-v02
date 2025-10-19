#!/bin/bash

# Responsive Design Verification Script
echo "🔍 Responsive Design Verification"
echo "=================================="
echo ""

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0;33m'

cd .. 2>/dev/null || true

echo "📋 Checking Responsive Design Implementation..."
echo ""

echo "1️⃣  Checking CSS breakpoints..."
if grep -q "@media (min-width: 640px)" styles/globals.css && \
   grep -q "@media (min-width: 768px)" styles/globals.css && \
   grep -q "@media (min-width: 1024px)" styles/globals.css; then
    echo -e "${GREEN}✅ All breakpoints defined${NC}"
else
    echo -e "${RED}❌ Missing breakpoints${NC}"
fi

echo ""
echo "2️⃣  Checking mobile-first approach..."
if grep -q "grid-template-columns: 1fr" styles/globals.css; then
    echo -e "${GREEN}✅ Mobile-first grid layout found${NC}"
else
    echo -e "${YELLOW}⚠️  Mobile-first grid layout not found${NC}"
fi

echo ""
echo "3️⃣  Checking touch-friendly sizing..."
if grep -q "min-width: 44px" styles/globals.css; then
    echo -e "${GREEN}✅ Touch-friendly sizing implemented${NC}"
else
    echo -e "${RED}❌ Touch-friendly sizing not found${NC}"
fi

echo ""
echo "✅ Responsive design verification complete!"
