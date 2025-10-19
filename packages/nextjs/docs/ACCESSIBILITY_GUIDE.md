# Accessibility Guide

## Overview

This guide documents the accessibility features implemented across the Owrent application, ensuring compliance with WCAG 2.1 Level AA standards and providing an inclusive experience for all users.

## Accessibility Features Implemented

### 1. Visible Focus Rings

All interactive elements now have visible focus indicators that meet WCAG contrast requirements:

#### Focus Ring Implementation
- **Focus-visible utility**: Uses `focus-visible:ring-2` for keyboard-only focus indicators
- **Ring color**: Primary ring color with offset for visibility
- **Ring offset**: 2px offset to ensure visibility against backgrounds
- **Consistent styling**: Applied across all interactive components

#### Components with Focus Rings
- ✅ Buttons (all variants)
- ✅ Input fields
- ✅ Links and navigation items
- ✅ Interactive cards
- ✅ Dropdown triggers
- ✅ Theme toggle
- ✅ Menu items

### 2. Semantic HTML Usage

Proper HTML5 semantic elements are used throughout the application:

#### Semantic Structure
```tsx
<header role="banner">        // Site header
  <nav aria-label="Main navigation">  // Navigation
    <ul role="menubar">        // Menu container
      <li>
        <Link aria-current="page">  // Current page indicator
      </li>
    </ul>
  </nav>
</header>

<main>                         // Main content
  <article>                    // Article content
  <section>                    // Content sections
</main>

<footer>                       // Site footer
```

#### Button vs Link Usage
- **Buttons**: Used for actions (submit, toggle, trigger)
- **Links**: Used for navigation (page changes, anchors)
- **Interactive cards**: Rendered as `<button>` when clickable

### 3. ARIA Labels and Attributes

Comprehensive ARIA attributes enhance screen reader experience:

#### ARIA Labels
```tsx
// Descriptive labels for icon-only buttons
<button aria-label="Open navigation menu">
  <Bars3Icon aria-hidden="true" />
</button>

// Dynamic labels for state changes
<button aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}>
  {/* Theme toggle icon */}
</button>

// Required field indicators
<label>
  Email
  <span aria-label="required">*</span>
</label>
```

#### ARIA States
```tsx
// Dropdown expanded state
<button
  aria-expanded={isOpen ? "true" : "false"}
  aria-haspopup="true"
  aria-controls="dropdown-menu"
>

// Current page indicator
<Link aria-current="page">Home</Link>

// Invalid input state
<input
  aria-invalid={hasError ? "true" : "false"}
  aria-describedby="error-message"
/>

// Disabled state
<button
  disabled
  aria-disabled="true"
>
```

#### ARIA Relationships
```tsx
// Label-input relationship
<label htmlFor="email">Email</label>
<input id="email" />

// Error message relationship
<input
  id="email"
  aria-describedby="email-error"
  aria-invalid="true"
/>
<p id="email-error" role="alert">Invalid email</p>

// Menu button relationship
<button
  id="user-menu-button"
  aria-haspopup="true"
  aria-controls="user-menu"
>
<div
  id="user-menu"
  role="menu"
  aria-labelledby="user-menu-button"
>
```

### 4. Keyboard Navigation

Full keyboard support for all interactive elements:

#### Keyboard Shortcuts
- **Tab**: Navigate forward through interactive elements
- **Shift + Tab**: Navigate backward
- **Enter/Space**: Activate buttons and links
- **Escape**: Close modals and dropdowns
- **Arrow keys**: Navigate within menus (where applicable)

#### Focus Management
```tsx
// Trap focus in modals
useEffect(() => {
  if (isOpen) {
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    firstElement?.focus();
  }
}, [isOpen]);

// Return focus after modal closes
const previousFocus = useRef<HTMLElement | null>(null);

const openModal = () => {
  previousFocus.current = document.activeElement as HTMLElement;
  setIsOpen(true);
};

const closeModal = () => {
  setIsOpen(false);
  previousFocus.current?.focus();
};
```

#### Skip Links
```tsx
// Skip to main content link (add to layout)
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
>
  Skip to main content
</a>

<main id="main-content">
  {/* Main content */}
</main>
```

### 5. Screen Reader Compatibility

Optimized for screen reader users:

#### Screen Reader Only Text
```tsx
// Utility class for screen reader only content
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.focus:not-sr-only {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

#### Live Regions
```tsx
// Announce dynamic content changes
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
>
  {statusMessage}
</div>

// Urgent announcements
<div
  role="alert"
  aria-live="assertive"
>
  {errorMessage}
</div>
```

#### Hiding Decorative Elements
```tsx
// Hide decorative icons from screen readers
<svg aria-hidden="true">
  {/* Icon */}
</svg>

// Provide alternative text for meaningful images
<img
  src="/logo.svg"
  alt="Scaffold-ETH logo"
/>
```

## Component Accessibility Checklist

### Button Component
- ✅ Explicit `type` attribute (button, submit, reset)
- ✅ Visible focus ring with `focus-visible:ring-2`
- ✅ `aria-disabled` attribute when disabled
- ✅ Proper contrast ratios for all variants
- ✅ Minimum touch target size (44x44px)

### Input Component
- ✅ Associated `<label>` with `htmlFor` attribute
- ✅ `aria-invalid` for error states
- ✅ `aria-describedby` linking to error messages
- ✅ `role="alert"` on error messages
- ✅ Required field indicators with `aria-label`
- ✅ Visible focus ring

### Card Component
- ✅ Rendered as `<button>` when interactive
- ✅ Proper semantic HTML (div for static, button for interactive)
- ✅ Visible focus ring for interactive cards
- ✅ `type="button"` attribute

### Navigation
- ✅ `<nav>` element with `aria-label`
- ✅ `aria-current="page"` for active links
- ✅ Visible focus rings on all links
- ✅ Proper heading hierarchy
- ✅ Skip navigation link

### Dropdown Menus
- ✅ `aria-expanded` state
- ✅ `aria-haspopup` attribute
- ✅ `role="menu"` on menu container
- ✅ `role="menuitem"` on menu items
- ✅ `aria-labelledby` relationship
- ✅ Keyboard navigation support
- ✅ Focus management

## Testing Accessibility

### Automated Testing Tools

#### ESLint Plugin
```bash
# Install eslint-plugin-jsx-a11y
npm install --save-dev eslint-plugin-jsx-a11y

# Add to .eslintrc.json
{
  "extends": [
    "plugin:jsx-a11y/recommended"
  ]
}
```

#### Axe DevTools
1. Install [Axe DevTools browser extension](https://www.deque.com/axe/devtools/)
2. Open DevTools → Axe tab
3. Click "Scan ALL of my page"
4. Review and fix issues

#### Lighthouse
1. Open Chrome DevTools
2. Navigate to Lighthouse tab
3. Select "Accessibility" category
4. Run audit
5. Target score: 95+

### Manual Testing

#### Keyboard Navigation Test
1. Disconnect mouse/trackpad
2. Use only keyboard to navigate entire application
3. Verify all interactive elements are reachable
4. Verify focus indicators are visible
5. Verify logical tab order

#### Screen Reader Test
**macOS VoiceOver:**
```bash
# Enable VoiceOver
Cmd + F5

# Navigate
Control + Option + Arrow keys

# Interact with elements
Control + Option + Space
```

**Windows NVDA:**
1. Download [NVDA](https://www.nvaccess.org/)
2. Start NVDA
3. Navigate with arrow keys
4. Interact with elements using Enter/Space

#### Color Contrast Test
1. Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
2. Test all text/background combinations
3. Ensure minimum ratios:
   - Normal text: 4.5:1
   - Large text (18pt+): 3:1
   - UI components: 3:1

#### Focus Indicator Test
1. Tab through all interactive elements
2. Verify focus ring is visible on all elements
3. Verify focus ring has sufficient contrast (3:1 minimum)
4. Verify focus ring is not obscured by other elements

### Testing Checklist

#### Per Component
- [ ] Keyboard accessible (Tab, Enter, Space, Escape)
- [ ] Visible focus indicators
- [ ] Proper ARIA attributes
- [ ] Semantic HTML elements
- [ ] Screen reader announces correctly
- [ ] Color contrast meets WCAG AA
- [ ] Touch targets ≥ 44x44px
- [ ] Works with browser zoom (200%)

#### Per Page
- [ ] Logical heading hierarchy (h1 → h2 → h3)
- [ ] Skip navigation link present
- [ ] Page title is descriptive
- [ ] Landmarks properly labeled
- [ ] Forms have proper labels
- [ ] Error messages are clear and associated
- [ ] Dynamic content announces to screen readers
- [ ] No keyboard traps

## Common Accessibility Patterns

### Modal Dialog
```tsx
export const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement as HTMLElement;
      modalRef.current?.focus();
    } else {
      previousFocus.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={modalRef}
        className="relative glass-card p-6 max-w-md"
        tabIndex={-1}
      >
        <h2 id="modal-title" className="text-xl font-bold mb-4">
          {title}
        </h2>
        {children}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4"
          aria-label="Close dialog"
        >
          <XIcon className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
```

### Form with Validation
```tsx
export const ContactForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Input
        label="Email"
        type="email"
        id="email"
        required
        error={errors.email}
        aria-required="true"
      />
      
      <Input
        label="Message"
        type="textarea"
        id="message"
        required
        error={errors.message}
        aria-required="true"
      />
      
      <Button type="submit">
        Send Message
      </Button>
      
      {/* Success message */}
      {success && (
        <div role="status" aria-live="polite" className="text-success">
          Message sent successfully!
        </div>
      )}
    </form>
  );
};
```

### Loading States
```tsx
export const LoadingButton = ({ isLoading, children, ...props }) => {
  return (
    <Button
      {...props}
      disabled={isLoading}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <>
          <span className="sr-only">Loading...</span>
          <Spinner aria-hidden="true" />
        </>
      ) : (
        children
      )}
    </Button>
  );
};
```

## Resources

### WCAG Guidelines
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM WCAG Checklist](https://webaim.org/standards/wcag/checklist)

### Testing Tools
- [Axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Screen Readers
- [NVDA (Windows)](https://www.nvaccess.org/)
- [JAWS (Windows)](https://www.freedomscientific.com/products/software/jaws/)
- [VoiceOver (macOS/iOS)](https://www.apple.com/accessibility/voiceover/)
- [TalkBack (Android)](https://support.google.com/accessibility/android/answer/6283677)

### Learning Resources
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11y Project](https://www.a11yproject.com/)
- [Inclusive Components](https://inclusive-components.design/)
- [WebAIM Articles](https://webaim.org/articles/)

## Maintenance

### Regular Audits
- Run automated tests before each release
- Conduct manual keyboard testing monthly
- Test with screen readers quarterly
- Review WCAG compliance annually

### Continuous Improvement
- Monitor user feedback for accessibility issues
- Stay updated with WCAG guidelines
- Test with real assistive technology users
- Document accessibility decisions and patterns

## Support

For accessibility questions or issues:
1. Check this guide first
2. Review WCAG 2.1 guidelines
3. Test with automated tools
4. Consult with accessibility experts
5. Engage with users who rely on assistive technologies
