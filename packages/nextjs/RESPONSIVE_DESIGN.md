# Responsive Design Implementation

## Overview

This document describes the responsive design implementation for the Owrent application, following mobile-first principles and ensuring excellent user experience across all devices.

## Breakpoints (Requirements 13.1)

The application uses the following breakpoints defined in `styles/globals.css`:

| Breakpoint | Min Width | Target Devices |
|------------|-----------|----------------|
| **sm** | 640px | Mobile landscape, small tablets |
| **md** | 768px | Tablets |
| **lg** | 1024px | Small laptops, large tablets |
| **xl** | 1280px | Desktops |
| **2xl** | 1536px | Large desktops |

## Mobile-First Approach (Requirements 13.2)

All styles are written mobile-first, meaning:
1. Base styles target mobile devices (< 640px)
2. Media queries progressively enhance for larger screens
3. Typography scales appropriately at each breakpoint
4. Layouts adapt from single-column to multi-column

### Example: Grid Layout

```css
/* Mobile: Single column */
.deals-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-4);
}

/* Tablet: Two columns */
@media (min-width: 768px) {
  .deals-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-6);
  }
}

/* Desktop: Three columns */
@media (min-width: 1024px) {
  .deals-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## Glassmorphism on Mobile (Requirements 13.3)

### Performance Optimization

On mobile devices, backdrop blur is reduced from 16px to 10px for better performance:

```css
@media (max-width: 639px) {
  .glass,
  .glass-card,
  .glass-modal {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
}
```

### Browser Support

- **iOS Safari**: Full support with `-webkit-backdrop-filter`
- **Android Chrome**: Full support
- **Fallback**: Solid background colors for unsupported browsers

## Touch-Friendly Sizing (Requirements 13.4)

All interactive elements meet the minimum touch target size of 44x44px:

### Implementation

```css
.touch-target {
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
```

### Applied To

- Navigation menu items (mobile)
- Buttons
- Links
- Form inputs
- Icon buttons
- Dropdown triggers

## Responsive Utilities

### Layout Utilities

```css
/* Responsive padding */
.responsive-padding {
  padding: var(--spacing-4);        /* Mobile: 16px */
}

@media (min-width: 640px) {
  .responsive-padding {
    padding: var(--spacing-6);      /* Tablet: 24px */
  }
}

@media (min-width: 1024px) {
  .responsive-padding {
    padding: var(--spacing-8);      /* Desktop: 32px */
  }
}
```

### Visibility Utilities

```css
.hide-mobile    /* Hidden on mobile, visible on tablet+ */
.show-mobile    /* Visible on mobile, hidden on tablet+ */
.hide-tablet    /* Hidden on tablet only */
.hide-desktop   /* Hidden on desktop+ */
```

### Flex Utilities

```css
.flex-responsive {
  display: flex;
  flex-direction: column;           /* Mobile: Stack vertically */
  gap: var(--spacing-4);
}

@media (min-width: 768px) {
  .flex-responsive {
    flex-direction: row;            /* Tablet+: Horizontal */
    gap: var(--spacing-6);
  }
}
```

## Typography Scaling

### Mobile Typography

On mobile devices (< 640px), heading sizes are reduced for better readability:

```css
@media (max-width: 639px) {
  h1 { font-size: var(--font-size-3xl); }  /* 30px instead of 36px */
  h2 { font-size: var(--font-size-2xl); }  /* 24px instead of 30px */
  h3 { font-size: var(--font-size-xl); }   /* 20px instead of 24px */
  h4 { font-size: var(--font-size-lg); }   /* 18px instead of 20px */
}
```

### Base Font Size

The base font size is set to 16px to prevent iOS Safari from zooming on input focus:

```css
@media screen and (max-width: 767px) {
  input[type="text"],
  input[type="email"],
  input[type="password"],
  textarea,
  select {
    font-size: 16px !important;
  }
}
```

## iOS Safari Fixes (Requirements 13.3)

### Height Fix

Addresses the iOS Safari bottom bar issue:

```css
@supports (-webkit-touch-callout: none) {
  html {
    height: -webkit-fill-available;
  }

  body {
    min-height: -webkit-fill-available;
  }
}
```

### Input Zoom Prevention

Prevents automatic zoom on input focus:

```css
@supports (-webkit-touch-callout: none) {
  input,
  textarea,
  select {
    font-size: 16px;
  }
}
```

### Momentum Scrolling

Enables smooth scrolling on iOS:

```css
.scrollable {
  -webkit-overflow-scrolling: touch;
}
```

## Component Responsive Behavior

### Header

- **Mobile (< 1024px)**: Hamburger menu with dropdown
- **Desktop (≥ 1024px)**: Full horizontal navigation
- **Touch targets**: All menu items are 44px minimum height on mobile

### Home Page

- **Mobile**: Single column layout, stacked cards
- **Tablet (≥ 768px)**: Two-column feature cards
- **Desktop (≥ 1024px)**: Centered content with max-width

### Profile Page

- **Mobile**: Stacked sections, full-width cards
- **Tablet**: Optimized spacing
- **Desktop**: Multi-column layout where appropriate

### AI Chat

- **Mobile**: Full-width chat container, optimized input area
- **Tablet**: Increased max-width for messages
- **Desktop**: Centered chat with comfortable reading width

## Viewport Configuration

The viewport is configured in `app/layout.tsx`:

```typescript
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#385183" },
  ],
};
```

## Testing Checklist

### Browser DevTools Testing

1. Open Chrome/Firefox DevTools
2. Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
3. Test each breakpoint:
   - 375px (iPhone SE)
   - 640px (sm)
   - 768px (md)
   - 1024px (lg)
   - 1280px (xl)
   - 1536px (2xl)

### Physical Device Testing

- **iOS**: iPhone 12/13/14 (Safari)
- **Android**: Samsung Galaxy S21 (Chrome)
- **Tablet**: iPad Air (Safari)
- **Desktop**: 1920x1080 monitor

### Key Test Points

- [ ] All text is readable (no overflow)
- [ ] Touch targets are minimum 44x44px
- [ ] No horizontal scroll
- [ ] Glassmorphism effects render correctly
- [ ] Navigation works on all devices
- [ ] Forms are usable on mobile
- [ ] Images scale appropriately
- [ ] Performance is acceptable

## Performance Considerations

### Mobile Performance

1. **Reduced Blur**: 10px on mobile vs 16px on desktop
2. **Optimized Animations**: Respect `prefers-reduced-motion`
3. **Lazy Loading**: Images and heavy components
4. **CSS Containment**: Applied to complex glassmorphism effects

### Lighthouse Targets

- **Performance**: > 90
- **Accessibility**: > 95
- **Best Practices**: > 90
- **SEO**: > 90

## Common Issues and Solutions

### Issue: Horizontal Scroll on Mobile

**Solution**: Ensure all containers have proper max-width and overflow handling:

```css
body {
  overflow-x: hidden;
}

.container {
  max-width: 100%;
  overflow-x: hidden;
}
```

### Issue: iOS Input Zoom

**Solution**: Set font-size to 16px minimum:

```css
input {
  font-size: 16px;
}
```

### Issue: Glassmorphism Performance

**Solution**: Reduce blur on mobile and use CSS containment:

```css
@media (max-width: 639px) {
  .glass-card {
    backdrop-filter: blur(10px);
    contain: layout style paint;
  }
}
```

### Issue: Touch Targets Too Small

**Solution**: Use the `.touch-target` utility class:

```tsx
<button className="touch-target">
  Click me
</button>
```

## Accessibility

All responsive design implementations maintain accessibility:

- **Keyboard Navigation**: Works at all breakpoints
- **Focus Indicators**: Visible on all devices
- **Screen Readers**: Proper semantic HTML
- **Zoom Support**: Layout doesn't break at 200% zoom
- **Color Contrast**: Meets WCAG AA at all sizes

## Resources

- **Testing Checklist**: See `RESPONSIVE_DESIGN_TEST.md`
- **Verification Script**: Run `./scripts/verify-responsive-design.sh`
- **Design System**: See `styles/globals.css`
- **Requirements**: See `.kiro/specs/glassmorphism-ui-redesign/requirements.md`

## Maintenance

When adding new components:

1. Start with mobile styles
2. Add media queries for larger screens
3. Ensure touch targets are 44x44px minimum
4. Test on actual devices
5. Verify glassmorphism performance
6. Check accessibility

## Version History

- **v1.0.0** (2025-01): Initial responsive design implementation
  - Mobile-first approach
  - All breakpoints defined
  - Touch-friendly sizing
  - iOS Safari fixes
  - Glassmorphism mobile optimization
