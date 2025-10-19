# Animations and Transitions Guide

## Overview
This guide documents the comprehensive animations and transitions system implemented for the Owrent glassmorphism UI redesign.

## Quick Reference

### Transition Durations
- **Fast (150ms)**: Button hovers, input focus, quick interactions
- **Normal (300ms)**: Glassmorphism effects, theme changes, card hovers
- **Slow (500ms)**: Complex animations, page transitions

### Easing Function
All transitions use: `cubic-bezier(0.4, 0, 0.2, 1)`

## CSS Variables

```css
/* Transitions */
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-normal: 300ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
```

## Button Transitions

### Standard Buttons
```tsx
<button className="btn btn-primary">
  Click Me
</button>
```

**Behavior:**
- 150ms transition on all properties
- Hover: Lifts by 1px with enhanced shadow
- Active: Returns to normal position
- Smooth color transitions

### Ghost Buttons
```tsx
<button className="btn btn-ghost">
  Ghost Button
</button>
```

**Behavior:**
- No transform on hover
- No shadow effects
- Color transitions only

## Glassmorphism Transitions

### Glass Cards
```tsx
<div className="glass-card p-6">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>
```

**Hover Effects:**
- 300ms transition
- Lifts by 2px
- Opacity increases to 0.98
- Border contrast enhancement
- Shadow depth increases

### Glass Elements
```tsx
<div className="glass p-4">
  Content
</div>
```

**Hover Effects:**
- 300ms transition
- Opacity increases to 0.95
- Border contrast enhancement

### Glass Hover Utility
```tsx
<div className="glass-hover p-4">
  Interactive element
</div>
```

**Hover Effects:**
- Full glassmorphism enhancement
- Primary color border
- Maximum shadow depth
- 2px lift

## Animation Keyframes

### Slide Animations
```tsx
// Slide down (dropdowns, menus)
<div className="animate-slide-down">
  Dropdown content
</div>

// Slide up (closing animations)
<div className="animate-slide-up">
  Closing content
</div>
```

### Fade Animations
```tsx
// Fade in (modal backdrops)
<div className="animate-fade-in">
  Fading in
</div>

// Fade out (closing overlays)
<div className="animate-fade-out">
  Fading out
</div>
```

### Scale Animations
```tsx
// Scale in (modal content)
<div className="animate-scale-in">
  Modal content
</div>

// Scale out (closing modals)
<div className="animate-scale-out">
  Closing modal
</div>
```

### Loading Animations
```tsx
// Pulse (loading indicators)
<div className="animate-pulse">
  Loading...
</div>

// Spin (spinners)
<div className="animate-spin">
  ⟳
</div>
```

## Transition Utilities

### Duration Control
```tsx
<div className="transition-fast">Fast transition</div>
<div className="transition-normal">Normal transition</div>
<div className="transition-slow">Slow transition</div>
```

### Property-Specific Transitions
```tsx
<div className="transition-colors">Color transitions only</div>
<div className="transition-opacity">Opacity transitions only</div>
<div className="transition-shadow">Shadow transitions only</div>
<div className="transition-transform">Transform transitions only</div>
<div className="transition-all">All properties</div>
```

### Hover Transforms
```tsx
<div className="transition-all hover:translate-y-1">
  Lifts on hover
</div>

<div className="transition-all hover:scale-105">
  Scales on hover
</div>
```

## Theme Transitions

Theme color changes transition smoothly over 300ms:

```tsx
// Body element automatically transitions
<body>
  {/* All colors transition when theme changes */}
</body>
```

**Transitioning Properties:**
- background-color
- color
- All semantic color tokens

## Accessibility: Reduced Motion

### Automatic Support
All animations automatically respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  /* All animations reduced to 0.01ms */
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Testing Reduced Motion

**macOS:**
```
System Preferences → Accessibility → Display → Reduce motion
```

**Windows:**
```
Settings → Ease of Access → Display → Show animations (off)
```

**iOS:**
```
Settings → Accessibility → Motion → Reduce Motion
```

**Android:**
```
Settings → Accessibility → Remove animations
```

## Civic Auth Animations

### Buttons
```tsx
<button data-civic-auth-button>
  Sign In
</button>
```

**Behavior:**
- 150ms transitions
- Hover lift effect
- Enhanced shadow on hover

### Input Fields
```tsx
<input data-civic-auth-input />
```

**Behavior:**
- 150ms transitions
- Focus state with primary color outline
- Border color transition

### Modals
```tsx
<div data-civic-auth-modal>
  Modal content
</div>
```

**Behavior:**
- Glassmorphism effects
- Scale-in animation on open
- Backdrop blur

## Performance Considerations

### GPU-Accelerated Properties
Use these for smooth animations:
- `transform`
- `opacity`
- `filter` (backdrop-filter)

### Avoid These in Animations
- `width`, `height` (triggers layout)
- `top`, `left` (triggers layout)
- `margin`, `padding` (triggers layout)

### Best Practices
1. Use `transform` instead of position changes
2. Use `opacity` instead of `visibility`
3. Limit simultaneous animations
4. Test on lower-end devices
5. Respect reduced motion preferences

## Common Patterns

### Interactive Card
```tsx
<div className="glass-card p-6 transition-all hover:translate-y-1 hover:shadow-lg cursor-pointer">
  <h3>Interactive Card</h3>
  <p>Hover to see effect</p>
</div>
```

### Button with Custom Transition
```tsx
<button className="btn btn-primary transition-all hover:scale-105">
  Hover Me
</button>
```

### Modal with Animations
```tsx
{showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="absolute inset-0 bg-black/50 animate-fade-in" />
    <div className="glass-modal p-8 animate-scale-in">
      Modal content
    </div>
  </div>
)}
```

### Loading State
```tsx
<div className="flex items-center gap-2">
  <div className="w-4 h-4 bg-primary rounded-full animate-pulse" />
  <span>Loading...</span>
</div>
```

## Demo Page

Visit `/animations-demo` to see all animations in action and test reduced motion support.

## Troubleshooting

### Animations Not Working
1. Check if `prefers-reduced-motion` is enabled
2. Verify CSS variables are loaded
3. Check for conflicting styles
4. Ensure proper class names

### Performance Issues
1. Reduce number of simultaneous animations
2. Use `will-change` sparingly
3. Check for layout thrashing
4. Profile with browser DevTools

### Reduced Motion Not Working
1. Verify OS setting is enabled
2. Check browser support
3. Test with DevTools emulation
4. Verify media query is applied

## Browser Support

All animations work in:
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- iOS Safari 14+
- Chrome Mobile 88+

Fallbacks provided for older browsers.

## Resources

- [MDN: CSS Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions)
- [MDN: CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [Web.dev: Animations Performance](https://web.dev/animations/)
