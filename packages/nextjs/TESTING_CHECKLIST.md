# Civic Auth Integration - Manual Testing Checklist

## Overview

This checklist covers all manual testing scenarios for the Civic Auth integration. Complete each test and mark with ✅ (pass) or ❌ (fail).

## Prerequisites

- [ ] Application is running (`yarn start`)
- [ ] Local blockchain is running (`yarn chain`)
- [ ] Contracts are deployed (`yarn deploy`)
- [ ] Environment variables are configured (`.env.local`)
- [ ] Browser console is open for error monitoring

---

## 13.1 Manual Testing Checklist

### Sign-In Flow

- [ ] **Test 1.1**: Click "Connect Wallet" button in header
  - Expected: Civic Auth modal opens
  - Result: ___________
  
- [ ] **Test 1.2**: Complete Civic Auth sign-in process
  - Expected: User is authenticated and redirected back to app
  - Result: ___________
  
- [ ] **Test 1.3**: Verify wallet connection during sign-in
  - Expected: Wallet address is connected and visible
  - Result: ___________

### User Information Display

- [ ] **Test 2.1**: Check user information in header (authenticated)
  - Expected: User name (if available) and wallet address displayed
  - Result: ___________
  
- [ ] **Test 2.2**: Verify wallet address format
  - Expected: Address shown as `0x1234...5678` format
  - Result: ___________
  
- [ ] **Test 2.3**: Navigate to `/profile` page
  - Expected: Full user information displayed (id, name, email, walletAddress)
  - Result: ___________

### Sign-Out Functionality

- [ ] **Test 3.1**: Click "Sign Out" button in header
  - Expected: User is signed out and session cleared
  - Result: ___________
  
- [ ] **Test 3.2**: Verify UI updates after sign-out
  - Expected: "Connect Wallet" button appears, user info disappears
  - Result: ___________
  
- [ ] **Test 3.3**: Attempt to access `/profile` after sign-out
  - Expected: Redirected to login or shown unauthenticated message
  - Result: ___________

### Route Protection

- [ ] **Test 4.1**: Access protected route while unauthenticated
  - Route: `/profile`
  - Expected: Redirected to login page
  - Result: ___________
  
- [ ] **Test 4.2**: Access protected route while authenticated
  - Route: `/profile`
  - Expected: Page loads successfully
  - Result: ___________
  
- [ ] **Test 4.3**: Access server example while unauthenticated
  - Route: `/server-example`
  - Expected: Shows "Unauthorized" message
  - Result: ___________
  
- [ ] **Test 4.4**: Access server example while authenticated
  - Route: `/server-example`
  - Expected: Shows user data
  - Result: ___________

### RainbowKit Removal Verification

- [ ] **Test 5.1**: Inspect header component
  - Expected: No RainbowKit connect button visible
  - Result: ___________
  
- [ ] **Test 5.2**: Check browser console for errors
  - Expected: No RainbowKit-related errors or warnings
  - Result: ___________
  
- [ ] **Test 5.3**: Verify only Civic Auth UI elements present
  - Expected: Only "Connect Wallet" or user info with "Sign Out" button
  - Result: ___________

### Browser Compatibility

- [ ] **Test 6.1**: Chrome/Chromium
  - Sign-in: ___________
  - Sign-out: ___________
  - Route protection: ___________
  
- [ ] **Test 6.2**: Firefox
  - Sign-in: ___________
  - Sign-out: ___________
  - Route protection: ___________
  
- [ ] **Test 6.3**: Safari (macOS)
  - Sign-in: ___________
  - Sign-out: ___________
  - Route protection: ___________

### Mobile Responsiveness

- [ ] **Test 7.1**: Mobile viewport (375px width)
  - Header layout: ___________
  - Connect button visible: ___________
  - User info readable: ___________
  
- [ ] **Test 7.2**: Tablet viewport (768px width)
  - Header layout: ___________
  - Connect button visible: ___________
  - User info readable: ___________
  
- [ ] **Test 7.3**: Mobile browser (iOS Safari)
  - Sign-in flow: ___________
  - Touch interactions: ___________
  
- [ ] **Test 7.4**: Mobile browser (Android Chrome)
  - Sign-in flow: ___________
  - Touch interactions: ___________

---

## 13.2 Integration Testing

### End-to-End Authentication Flow

- [ ] **Test 8.1**: Complete authentication flow
  1. Start unauthenticated
  2. Click "Connect Wallet"
  3. Complete Civic Auth sign-in
  4. Verify redirect back to app
  5. Verify user info displayed
  - Result: ___________

### Session Persistence

- [ ] **Test 9.1**: Refresh page while authenticated
  - Expected: User remains authenticated
  - Result: ___________
  
- [ ] **Test 9.2**: Navigate between pages while authenticated
  - Expected: User remains authenticated on all pages
  - Result: ___________
  
- [ ] **Test 9.3**: Close and reopen browser tab
  - Expected: User remains authenticated (if session not expired)
  - Result: ___________

### Middleware Protection

- [ ] **Test 10.1**: Access `/profile` without authentication
  - Expected: Redirected to login
  - Result: ___________
  
- [ ] **Test 10.2**: Access `/server-example` without authentication
  - Expected: Shows unauthorized message
  - Result: ___________
  
- [ ] **Test 10.3**: Access public routes without authentication
  - Routes: `/`, `/debug`, `/fhevm`
  - Expected: All accessible
  - Result: ___________

### Server-Side User Access

- [ ] **Test 11.1**: Server component (`/server-example`)
  - Authenticated: Shows user data
  - Unauthenticated: Shows unauthorized message
  - Result: ___________
  
- [ ] **Test 11.2**: API route (`/api/user`)
  - Authenticated: Returns user data (200)
  - Unauthenticated: Returns error (401)
  - Result: ___________
  
- [ ] **Test 11.3**: Server action (via form submission)
  - Authenticated: Action executes successfully
  - Unauthenticated: Action throws error
  - Result: ___________

### Error Handling

- [ ] **Test 12.1**: Failed authentication attempt
  - Expected: Error message displayed, user remains unauthenticated
  - Result: ___________
  
- [ ] **Test 12.2**: Network error during sign-in
  - Expected: Graceful error handling, retry option
  - Result: ___________
  
- [ ] **Test 12.3**: Expired session
  - Expected: User prompted to sign in again
  - Result: ___________

### Wallet Address Accessibility

- [ ] **Test 13.1**: Wallet address in header
  - Expected: Visible and correctly formatted
  - Result: ___________
  
- [ ] **Test 13.2**: Wallet address in profile page
  - Expected: Full address displayed
  - Result: ___________
  
- [ ] **Test 13.3**: Wallet address in API response
  - Expected: Included in user object
  - Result: ___________

---

## 13.3 Compatibility with Existing Features

### FHEVM Functionality

- [ ] **Test 14.1**: Access FHEVM example page (`/fhevm`)
  - Expected: Page loads successfully
  - Result: ___________
  
- [ ] **Test 14.2**: Connect wallet via Civic Auth
  - Expected: FHEVM functionality works with Civic Auth wallet
  - Result: ___________
  
- [ ] **Test 14.3**: Perform FHEVM operations
  - Expected: Encryption/decryption works correctly
  - Result: ___________

### Debug UI

- [ ] **Test 15.1**: Access debug contracts page (`/debug`)
  - Expected: Page loads successfully
  - Result: ___________
  
- [ ] **Test 15.2**: Read contract data
  - Expected: Contract reads work with Civic Auth
  - Result: ___________
  
- [ ] **Test 15.3**: Write to contract
  - Expected: Contract writes work with Civic Auth wallet
  - Result: ___________

### Block Explorer

- [ ] **Test 16.1**: Access block explorer (`/blockexplorer`)
  - Expected: Page loads successfully
  - Result: ___________
  
- [ ] **Test 16.2**: View transactions
  - Expected: Transactions from Civic Auth wallet visible
  - Result: ___________

### Provider Compatibility

- [ ] **Test 17.1**: ThemeProvider
  - Expected: Theme switching works correctly
  - Result: ___________
  
- [ ] **Test 17.2**: ScaffoldEthAppWithProviders
  - Expected: All SE features work correctly
  - Result: ___________
  
- [ ] **Test 17.3**: No provider conflicts
  - Expected: No console errors about provider conflicts
  - Result: ___________

### Wagmi Hooks (if used)

- [ ] **Test 18.1**: useAccount hook
  - Expected: Returns correct account data
  - Result: ___________
  
- [ ] **Test 18.2**: useBalance hook
  - Expected: Returns correct balance
  - Result: ___________
  
- [ ] **Test 18.3**: Contract interaction hooks
  - Expected: Work correctly with Civic Auth wallet
  - Result: ___________

---

## 13.4 Complete RainbowKit Removal Verification

### Codebase Search

- [ ] **Test 19.1**: Search for "rainbow" in codebase

  ```bash
  grep -r "rainbow" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" packages/nextjs/
  ```

  - Expected: No results (or only in comments/documentation)
  - Result: ___________
  
- [ ] **Test 19.2**: Search for "RainbowKit" in codebase

  ```bash
  grep -r "RainbowKit" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" packages/nextjs/
  ```

  - Expected: No results (or only in comments/documentation)
  - Result: ___________

### Console Verification

- [ ] **Test 20.1**: Check console on page load
  - Expected: No RainbowKit errors or warnings
  - Result: ___________
  
- [ ] **Test 20.2**: Check console during sign-in
  - Expected: No RainbowKit-related messages
  - Result: ___________
  
- [ ] **Test 20.3**: Check console during navigation
  - Expected: No RainbowKit-related messages
  - Result: ___________

### Dependencies Verification

- [ ] **Test 21.1**: Check package.json

  ```bash
  cat packages/nextjs/package.json | grep -i rainbow
  ```

  - Expected: No RainbowKit dependency
  - Result: ___________
  
- [ ] **Test 21.2**: Check node_modules

  ```bash
  ls packages/nextjs/node_modules | grep -i rainbow
  ```

  - Expected: No RainbowKit folder
  - Result: ___________

### UI Elements Verification

- [ ] **Test 22.1**: Inspect header component
  - Expected: Only Civic Auth button present
  - Result: ___________
  
- [ ] **Test 22.2**: Check all pages for RainbowKit UI
  - Expected: No RainbowKit modals, buttons, or components
  - Result: ___________
  
- [ ] **Test 22.3**: Verify wallet connection UI
  - Expected: Only Civic Auth UI elements
  - Result: ___________

---

## Summary

### Test Results

- Total Tests: ___________
- Passed: ___________
- Failed: ___________
- Skipped: ___________

### Critical Issues Found

1. ___________
2. ___________
3. ___________

### Non-Critical Issues Found

1. ___________
2. ___________
3. ___________

### Recommendations

1. ___________
2. ___________
3. ___________

### Sign-Off

- Tester Name: ___________
- Date: ___________
- Status: [ ] Approved [ ] Needs Fixes

---

## Notes

Use this section to document any additional observations, edge cases, or issues encountered during testing.

___________
___________
___________
