# Accessibility Guide

## Overview

This document outlines the accessibility features implemented in the Owrent application to ensure compliance with WCAG 2.1 Level AA standards.

## Requirements Addressed

- **14.1**: Visible focus rings on all interactive elements
- **14.2**: Semantic HTML usage
- **14.3**: ARIA labels where needed
- **14.4**: Keyboard navigation support
- **14.5**: Screen reader compatibility

## Implemented Features

### 1. Visible Focus Rings (Requirement 14.1)

All interactive elements have visible focus indicators:

```css
/* Focus visible styles */
*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(147, 187, 251, 0.2);
}
```

**Elements with focus rings:**
- Buttons
- Links
- Form inputs
- Navigation items
- Menu items
- Interactive cards

**High contrast mode support:**
- Focus rings increase to 3px width in high contrast mode
- Shadow increases to 6px for better visibility

### 2. Semantic HTML (Requirement 14.2)

The application uses proper semantic HTML elements:

**Document Structure:**
```html
<html lang="en">
  <body>
    <a href="#main-content" class="skip-to-main">Skip to main content</a>
    <header role="banner">
      <nav aria-label="Main navigation">...</nav>
    </header>
    <main id="main-content">
      <section aria-labelledby="heading-id">...</section>
    </main>
    <footer role="contentinfo">
      <nav aria-label="Footer navigation">...</nav>
    </footer>
  </body>
</html>
```

**Semantic Elements Used:**
- `<header>` for site header
- `<nav>` for navigation menus
- `<main>` for main content
- `<section>` for content sections
- `<article>` for self-contained content
- `<footer>` for site footer
- `<h1>` through `<h6>` for heading hierarchy

### 3. ARIA Labels (Requirement 14.3)

ARIA attributes are used where semantic HTML is insufficient:

**Navigation:**
```tsx
<nav aria-label="Main navigation">
  <ul role="menubar">
    <li role="none">
      <Link href="/" role="menuitem" aria-current="page">Home</Link>
    </li>
  </ul>
</nav>
```

**Dropdowns:**
```tsx
<button
  aria-label="User menu"
  aria-expanded={isOpen}
  aria-haspopup="true"
  aria-controls="user-menu-dropdown"
>
  Menu
</button>
<div id="user-menu-dropdown" role="menu">
  <button role="menuitem">Sign Out</button>
</div>
```

**Status Information:**
```tsx
<div role="status" aria-label="Current price: $1,234.56">
  $1,234.56
</div>
```

**Icons:**
```tsx
<BugAntIcon aria-hidden="true" />
<span>Debug Contracts</span>
```

### 4. Keyboard Navigation (Requirement 14.4)

Full keyboard navigation support:

**Skip Link:**
- Press `Tab` on page load to reveal "Skip to main content" link
- Press `Enter` to jump directly to main content

**Navigation:**
- `Tab` / `Shift+Tab`: Move between interactive elements
- `Enter` / `Space`: Activate buttons and links
- `Escape`: Close modals and dropdowns
- `Arrow keys`: Navigate within menus (where applicable)

**Focus Management:**
- Focus is trapped within modals
- Focus returns to trigger element when closing modals
- Focus is visible on all interactive elements

**Keyboard Shortcuts:**
| Key | Action |
|-----|--------|
| `Tab` | Move to next focusable element |
| `Shift+Tab` | Move to previous focusable element |
| `Enter` | Activate button or link |
| `Space` | Activate button or toggle |
| `Escape` | Close modal or dropdown |

### 5. Screen Reader Compatibility (Requirement 14.5)

The application is compatible with major screen readers:

**Tested Screen Readers:**
- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS/iOS)
- TalkBack (Android)

**Screen Reader Features:**
- Proper heading hierarchy for navigation
- ARIA live regions for dynamic content
- Descriptive labels for all interactive elements
- Alternative text for images
- Status announcements for loading states

**Live Regions:**
```tsx
// Announce messages to screen readers
<div role="status" aria-live="polite" aria-atomic="true">
  Transaction successful
</div>

// Urgent announcements
<div role="alert" aria-live="assertive">
  Error: Transaction failed
</div>
```

**Screen Reader Only Content:**
```tsx
<span className="sr-only">
  Full wallet address: 0x1234...5678
</span>
```

## Accessibility Utilities

The application includes utility functions for common accessibility patterns:

```typescript
import {
  announceToScreenReader,
  trapFocus,
  handleEscapeKey,
  getWalletAddressLabel,
  prefersReducedMotion,
} from "~~/utils/accessibility";

// Announce to screen reader
announceToScreenReader("Deal created successfully", "polite");

// Trap focus in modal
const cleanup = trapFocus(modalElement);

// Handle escape key
const cleanup = handleEscapeKey(() => closeModal());

// Get accessible wallet label
const label = getWalletAddressLabel("0x1234...5678");

// Check motion preference
if (prefersReducedMotion()) {
  // Disable animations
}
```

## Reduced Motion Support

The application respects `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Affected Features:**
- Button hover animations
- Card transitions
- Theme transitions
- Dropdown animations
- Modal animations

## Color Contrast

All text meets WCAG AA contrast requirements:

**Light Mode:**
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- Interactive elements: 3:1 minimum

**Dark Mode:**
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- Interactive elements: 3:1 minimum

## Touch Targets

All interactive elements meet minimum touch target size:

- Minimum size: 44x44px
- Adequate spacing between targets
- Touch-friendly on mobile devices

## Testing

### Manual Testing Checklist

**Keyboard Navigation:**
- [ ] Tab through all interactive elements
- [ ] Verify focus is visible on all elements
- [ ] Test skip link functionality
- [ ] Verify escape key closes modals
- [ ] Test arrow key navigation in menus

**Screen Reader:**
- [ ] Navigate with screen reader
- [ ] Verify all content is announced
- [ ] Check heading hierarchy
- [ ] Verify ARIA labels are correct
- [ ] Test live region announcements

**Visual:**
- [ ] Verify focus rings are visible
- [ ] Check color contrast
- [ ] Test with high contrast mode
- [ ] Verify touch target sizes
- [ ] Test responsive design

**Motion:**
- [ ] Enable reduced motion preference
- [ ] Verify animations are disabled
- [ ] Check transitions are minimal
- [ ] Test theme switching

### Automated Testing

Run accessibility audits:

```bash
# Lighthouse accessibility audit
npm run lighthouse

# axe-core accessibility testing
npm run test:a11y
```

## Browser Support

Accessibility features are tested on:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Known Issues

None at this time.

## Future Improvements

- [ ] Add keyboard shortcuts documentation page
- [ ] Implement focus indicators for custom components
- [ ] Add more ARIA live regions for dynamic content
- [ ] Improve screen reader announcements for complex interactions
- [ ] Add accessibility settings panel

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [axe DevTools](https://www.deque.com/axe/devtools/)

## Contact

For accessibility issues or questions, please open an issue on GitHub.
