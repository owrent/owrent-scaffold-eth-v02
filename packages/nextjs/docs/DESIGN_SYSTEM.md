# Owrent Design System

## Overview

The Owrent design system is built on glassmorphism principles, providing a modern, translucent UI with depth and visual hierarchy. It supports both light and dark modes with smooth transitions.

## Core Principles

1. **Glassmorphism**: Translucent surfaces with backdrop blur
2. **Depth**: Layered UI with shadows and borders
3. **Consistency**: Unified spacing, typography, and color scales
4. **Accessibility**: WCAG 2.1 AA compliant contrast ratios
5. **Responsiveness**: Mobile-first, adaptive layouts

## Theme Configuration

### ThemeProvider Setup

The theme system is configured in `app/layout.tsx` with the following settings:

```typescript
<ThemeProvider
  attribute="data-theme"           // Uses data-theme attribute for styling
  defaultTheme="light"             // Defaults to light mode
  enableSystem={true}              // Respects system preferences
  storageKey="owrent-theme"        // Persists theme choice in localStorage
>
  {children}
</ThemeProvider>
```

### Using the Theme Hook

```typescript
import { useTheme } from "~~/hooks/useTheme";

function MyComponent() {
  const { isDark, toggleTheme, getGlassStyles } = useTheme();

  return (
    <div style={getGlassStyles("card")}>
      <button onClick={toggleTheme}>
        {isDark ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
}
```

### Theme Switching

The theme system supports:

- Manual theme selection (light/dark)
- System preference detection (via `enableSystem`)
- Persistent theme storage (via `storageKey="owrent-theme"`)
- Smooth transitions between themes
- Default light mode with system override capability

## Glassmorphism Utilities

### CSS Classes

#### `.glass`

Basic glassmorphism effect for any element.

```html
<div className="glass p-4 rounded-lg">Content with glass effect</div>
```

#### `.glass-card`

Glassmorphism card with enhanced styling.

```html
<div className="glass-card p-6">Card content</div>
```

#### `.glass-modal`

Glassmorphism modal with maximum opacity.

```html
<div className="glass-modal p-8">Modal content</div>
```

#### `.glass-hover`

Interactive glassmorphism with hover effects.

```html
<button className="glass-card glass-hover p-4">Hover me</button>
```

### JavaScript Styles

```typescript
import { useTheme } from "~~/hooks/useTheme";

function MyComponent() {
  const { getGlassStyles } = useTheme();

  return (
    <div style={getGlassStyles("card")}>
      Programmatic glass styles
    </div>
  );
}
```

## CSS Variables

### Glassmorphism Variables

#### Light Mode

```css
--glass-bg: rgb(255 255 255 / 0.7) --glass-border: rgb(255 255 255 / 0.18) --glass-shadow: 0 8px 32px
  rgb(31 38 135 / 0.15) --glass-blur: 12px --card-glass-bg: rgb(255 255 255 / 0.8)
  --card-glass-border: rgb(255 255 255 / 0.25) --card-glass-shadow: 0 8px 32px rgb(31 38 135 / 0.1)
  --modal-glass-bg: rgb(255 255 255 / 0.85) --modal-glass-border: rgb(255 255 255 / 0.3)
  --modal-backdrop: rgb(15 23 42 / 0.5);
```

#### Dark Mode

```css
--glass-bg: rgb(30 41 59 / 0.7) --glass-border: rgb(255 255 255 / 0.1) --glass-shadow: 0 8px 32px rgb(0 0 0 / 0.37)
  --card-glass-bg: rgb(30 41 59 / 0.8) --card-glass-border: rgb(255 255 255 / 0.15) --card-glass-shadow: 0 8px 32px
  rgb(0 0 0 / 0.3) --modal-glass-bg: rgb(30 41 59 / 0.9) --modal-glass-border: rgb(255 255 255 / 0.2)
  --modal-backdrop: rgb(0 0 0 / 0.7);
```

### Spacing Scale

```css
--spacing-xs: 0.25rem /* 4px */ --spacing-sm: 0.5rem /* 8px */ --spacing-md: 1rem /* 16px */ --spacing-lg: 1.5rem
  /* 24px */ --spacing-xl: 2rem /* 32px */ --spacing-2xl: 3rem /* 48px */ --spacing-3xl: 4rem /* 64px */;
```

### Border Radius

```css
--radius-sm: 0.375rem /* 6px */ --radius-md: 0.5rem /* 8px */ --radius-lg: 0.625rem /* 10px */ --radius-xl: 0.875rem
  /* 14px */ --radius-2xl: 1rem /* 16px */ --radius-3xl: 1.5rem /* 24px */;
```

### Transitions

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1) --transition-normal: 300ms cubic-bezier(0.4, 0, 0.2, 1)
  --transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
```

## Component Examples

### Glass Card

```tsx
export const GlassCard = ({ children, className = "" }) => {
  return <div className={`glass-card p-6 ${className}`}>{children}</div>;
};
```

### Glass Button

```tsx
export const GlassButton = ({ children, onClick, className = "" }) => {
  return (
    <button onClick={onClick} className={`glass-card glass-hover px-6 py-3 ${className}`}>
      {children}
    </button>
  );
};
```

### Glass Modal

```tsx
export const GlassModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1040]" style={{ background: "var(--modal-backdrop)" }}>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="glass-modal max-w-lg w-full p-8">{children}</div>
      </div>
    </div>
  );
};
```

## Best Practices

### Do's ✅

- Use `.glass-card` for content containers
- Use `.glass-modal` for overlays and modals
- Add `.glass-hover` for interactive elements
- Use CSS variables for consistent theming
- Test in both light and dark modes
- Ensure sufficient contrast for text

### Don'ts ❌

- Don't stack too many glass layers (max 2-3)
- Don't use glass effects on small elements (< 100px)
- Don't override blur values without testing
- Don't forget backdrop-filter browser support
- Don't use glass on text-heavy content

## Browser Support

Glassmorphism requires `backdrop-filter` support:

- ✅ Chrome 76+
- ✅ Safari 9+
- ✅ Firefox 103+
- ✅ Edge 79+

For unsupported browsers, fallback to solid backgrounds:

```css
@supports not (backdrop-filter: blur(12px)) {
  .glass {
    background: var(--color-base-100);
  }
}
```

## Accessibility

### Contrast Ratios

All text on glass surfaces maintains WCAG AA compliance:

- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- Interactive elements: 3:1 minimum

### Focus States

All interactive glass elements include visible focus indicators:

```css
.glass-hover:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

### Reduced Motion

Respect user preferences for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  .glass-hover {
    transition: none;
  }
}
```

## Performance

### Optimization Tips

1. **Limit blur radius**: Keep blur at 12px or less
2. **Minimize layers**: Avoid deeply nested glass elements
3. **Use will-change**: For animated glass elements
4. **Optimize images**: Use WebP for background images
5. **Test on mobile**: Glass effects can impact mobile performance

### Performance Monitoring

```typescript
// Monitor paint performance
const observer = new PerformanceObserver(list => {
  for (const entry of list.getEntries()) {
    console.log("Paint time:", entry.duration);
  }
});
observer.observe({ entryTypes: ["paint"] });
```

## Migration Guide

### From Existing Components

1. Replace solid backgrounds with `.glass-card`
2. Add `.glass-hover` to interactive elements
3. Update modals to use `.glass-modal`
4. Test theme switching
5. Verify accessibility

### Example Migration

**Before:**

```tsx
<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">Content</div>
```

**After:**

```tsx
<div className="glass-card p-6">Content</div>
```

## Resources

- [Glassmorphism Generator](https://hype4.academy/tools/glassmorphism-generator)
- [CSS backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
- [WCAG Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
