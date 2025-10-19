# Spacing and Layout System

## Overview

This document describes the spacing and layout system implemented for the glassmorphism UI redesign (Task 4).

## Spacing Scale

The spacing scale follows a consistent pattern for margins, padding, and gaps:

```css
--spacing-0: 0;
--spacing-1: 0.25rem; /* 4px */
--spacing-2: 0.5rem; /* 8px */
--spacing-3: 0.75rem; /* 12px */
--spacing-4: 1rem; /* 16px */
--spacing-5: 1.25rem; /* 20px */
--spacing-6: 1.5rem; /* 24px */
--spacing-8: 2rem; /* 32px */
--spacing-10: 2.5rem; /* 40px */
--spacing-12: 3rem; /* 48px */
--spacing-16: 4rem; /* 64px */
--spacing-20: 5rem; /* 80px */
--spacing-24: 6rem; /* 96px */
```

## Component-Specific Padding

Predefined padding values for common components:

```css
--padding-button: 0.625rem 1rem; /* 10px 16px */
--padding-button-sm: 0.5rem 0.75rem; /* 8px 12px */
--padding-button-lg: 0.75rem 1.5rem; /* 12px 24px */
--padding-card: 1.5rem; /* 24px */
--padding-input: 0.625rem 1rem; /* 10px 16px */
```

## Header Layout

The header uses glassmorphism with sticky positioning:

```css
.header-glass {
  height: 73px;
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--card-glass-bg);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--card-glass-border);
  box-shadow: var(--card-glass-shadow);
}
```

**Usage:**

```tsx
<div className="header-glass navbar min-h-0 shrink-0 justify-between px-0 sm:px-2">{/* Header content */}</div>
```

## Main Content Container

The main content area has a maximum width constraint and responsive padding:

```css
.main-content {
  max-width: 80rem; /* 1280px */
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem; /* Mobile */
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .main-content {
    padding-left: 1.5rem; /* Tablet */
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .main-content {
    padding-left: 2rem; /* Desktop */
    padding-right: 2rem;
  }
}
```

**Usage:**

```tsx
<main className="relative flex flex-col flex-1">
  <div className="main-content py-8">{children}</div>
</main>
```

## Responsive Grid Layouts

### Deals Grid

A responsive grid that adapts to different screen sizes:

```css
.deals-grid {
  display: grid;
  grid-template-columns: 1fr; /* Mobile: 1 column */
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .deals-grid {
    grid-template-columns: repeat(2, 1fr); /* Tablet: 2 columns */
  }
}

@media (min-width: 1024px) {
  .deals-grid {
    grid-template-columns: repeat(3, 1fr); /* Desktop: 3 columns */
  }
}
```

**Usage:**

```tsx
<div className="deals-grid">
  <div className="glass-card p-6">Deal 1</div>
  <div className="glass-card p-6">Deal 2</div>
  <div className="glass-card p-6">Deal 3</div>
</div>
```

## Responsive Breakpoints

Standard breakpoints for responsive design:

```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

## Spacing Utilities

### Vertical Spacing

```css
.space-y-1 > * + * {
  margin-top: 0.25rem;
}
.space-y-2 > * + * {
  margin-top: 0.5rem;
}
.space-y-3 > * + * {
  margin-top: 0.75rem;
}
.space-y-4 > * + * {
  margin-top: 1rem;
}
.space-y-6 > * + * {
  margin-top: 1.5rem;
}
.space-y-8 > * + * {
  margin-top: 2rem;
}
```

**Usage:**

```tsx
<div className="space-y-4">
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
  <p>Paragraph 3</p>
</div>
```

### Gap Utilities

```css
.gap-1 {
  gap: 0.25rem;
}
.gap-2 {
  gap: 0.5rem;
}
.gap-3 {
  gap: 0.75rem;
}
.gap-4 {
  gap: 1rem;
}
.gap-6 {
  gap: 1.5rem;
}
.gap-8 {
  gap: 2rem;
}
```

**Usage:**

```tsx
<div className="flex gap-4">
  <button>Button 1</button>
  <button>Button 2</button>
</div>
```

## Examples

### Card Layout with Spacing

```tsx
<div className="glass-card" style={{ padding: "var(--padding-card)" }}>
  <div className="space-y-4">
    <h2>Card Title</h2>
    <p>Card content with consistent spacing</p>
    <div className="flex gap-2">
      <button style={{ padding: "var(--padding-button)" }}>Action</button>
      <button style={{ padding: "var(--padding-button)" }}>Cancel</button>
    </div>
  </div>
</div>
```

### Responsive Grid Example

```tsx
<div className="main-content">
  <h1>Deals</h1>
  <div className="deals-grid">
    {deals.map(deal => (
      <div key={deal.id} className="glass-card p-6">
        <h3>{deal.title}</h3>
        <p>{deal.description}</p>
      </div>
    ))}
  </div>
</div>
```

### Page Layout Example

```tsx
export default function Page() {
  return (
    <div className="space-y-8">
      <section>
        <h1>Page Title</h1>
        <p>Page description</p>
      </section>

      <section className="deals-grid">{/* Grid items */}</section>

      <section className="space-y-4">{/* Vertically spaced content */}</section>
    </div>
  );
}
```

## Testing Responsive Breakpoints

To test the responsive layout:

1. **Mobile (< 640px)**:

   - Main content padding: 1rem
   - Grid: 1 column

2. **Tablet (640px - 1023px)**:

   - Main content padding: 1.5rem
   - Grid: 2 columns

3. **Desktop (≥ 1024px)**:
   - Main content padding: 2rem
   - Grid: 3 columns

## Requirements Satisfied

- ✅ **6.1**: Spacing scale (0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24) implemented
- ✅ **6.2**: Component-specific padding (button, card, input) defined
- ✅ **6.3**: Header with 73px height, sticky positioning, and backdrop blur
- ✅ **6.4**: Responsive grid layouts (1 column mobile, 2 columns md, 3 columns lg)
- ✅ **6.5**: Max-width of 7xl (80rem) for main content with centered alignment

## Browser Compatibility

The layout system uses modern CSS features:

- CSS Custom Properties (CSS Variables)
- CSS Grid
- Flexbox
- Media Queries
- backdrop-filter (with -webkit- prefix for Safari)

All features are supported in modern browsers (Chrome, Firefox, Safari, Edge).
