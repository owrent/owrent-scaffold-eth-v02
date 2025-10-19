# Icon System Documentation

## Overview

This document defines the standardized icon system for the Owrent application, ensuring consistency, accessibility, and proper implementation across all components.

## Icon Library

**Library:** `@heroicons/react` v2.1.5

**Import Paths:**
- Outline icons: `@heroicons/react/24/outline`
- Solid icons: `@heroicons/react/24/solid`
- Mini icons (20px): `@heroicons/react/20/solid`

## Icon Sizes

### Standard Sizes

| Context | Size | Tailwind Class | Use Case |
|---------|------|----------------|----------|
| Navigation | 20px | `h-5 w-5` | Header navigation links, menu items |
| Buttons | 16px | `h-4 w-4` | Icon buttons, inline button icons |
| Cards | 20-24px | `h-5 w-5` or `h-6 w-6` | Card headers, feature icons |
| Empty States | 48-64px | `h-12 w-12` or `h-16 w-16` | Large placeholder icons |
| Status Indicators | 16px | `h-4 w-4` | Inline status icons, badges |

### Size Guidelines

```typescript
// Navigation icons
<HomeIcon className="h-5 w-5" />

// Button icons
<PlusIcon className="h-4 w-4" />

// Card icons
<FileTextIcon className="h-6 w-6" />

// Empty state icons
<InboxIcon className="h-16 w-16" />
```

## Semantic Icon Mapping

### Core Features

| Feature | Icon | Import |
|---------|------|--------|
| Deals | `DocumentTextIcon` | `@heroicons/react/24/outline` |
| Bids | `LockClosedIcon` | `@heroicons/react/24/outline` |
| Settlement | `CheckCircleIcon` | `@heroicons/react/24/outline` |
| Receipts | `DocumentCheckIcon` | `@heroicons/react/24/outline` |
| Profile | `UserCircleIcon` | `@heroicons/react/24/outline` |
| Wallet | `WalletIcon` | `@heroicons/react/24/outline` |
| Chat | `ChatBubbleLeftRightIcon` | `@heroicons/react/24/outline` |

### Actions

| Action | Icon | Import |
|--------|------|--------|
| Create/Add | `PlusIcon` | `@heroicons/react/24/outline` |
| Edit | `PencilIcon` | `@heroicons/react/24/outline` |
| Delete | `TrashIcon` | `@heroicons/react/24/outline` |
| Copy | `ClipboardDocumentIcon` | `@heroicons/react/24/outline` |
| Download | `ArrowDownTrayIcon` | `@heroicons/react/24/outline` |
| Upload | `ArrowUpTrayIcon` | `@heroicons/react/24/outline` |
| Search | `MagnifyingGlassIcon` | `@heroicons/react/24/outline` |
| Filter | `FunnelIcon` | `@heroicons/react/24/outline` |
| Settings | `Cog6ToothIcon` | `@heroicons/react/24/outline` |
| Close | `XMarkIcon` | `@heroicons/react/24/outline` |

### Navigation

| Element | Icon | Import |
|---------|------|--------|
| Home | `HomeIcon` | `@heroicons/react/24/outline` |
| Menu | `Bars3Icon` | `@heroicons/react/24/outline` |
| Back | `ArrowLeftIcon` | `@heroicons/react/24/outline` |
| Forward | `ArrowRightIcon` | `@heroicons/react/24/outline` |
| External Link | `ArrowTopRightOnSquareIcon` | `@heroicons/react/24/outline` |

### Status & Feedback

| Status | Icon | Import |
|--------|------|--------|
| Success | `CheckCircleIcon` | `@heroicons/react/24/outline` |
| Error | `XCircleIcon` | `@heroicons/react/24/outline` |
| Warning | `ExclamationTriangleIcon` | `@heroicons/react/24/outline` |
| Info | `InformationCircleIcon` | `@heroicons/react/24/outline` |
| Loading | `ArrowPathIcon` | `@heroicons/react/24/outline` |

### Theme

| Theme | Icon | Import |
|-------|------|--------|
| Light Mode | `SunIcon` | `@heroicons/react/24/outline` |
| Dark Mode | `MoonIcon` | `@heroicons/react/24/outline` |

## Color Contrast Requirements

### WCAG AA Standards

- **Normal text (< 18pt):** 4.5:1 contrast ratio
- **Large text (≥ 18pt):** 3:1 contrast ratio
- **Icons:** 3:1 contrast ratio (treated as large text)

### Implementation

```typescript
// Light mode - ensure sufficient contrast against light backgrounds
<HomeIcon className="h-5 w-5 text-foreground" />

// Dark mode - ensure sufficient contrast against dark backgrounds
<HomeIcon className="h-5 w-5 text-foreground" />

// Muted icons (secondary information)
<InfoIcon className="h-4 w-4 text-muted-foreground" />

// Status icons (use semantic colors)
<CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
<XCircleIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
```

## Accessibility

### Icon-Only Buttons

**Always provide accessible labels for icon-only buttons:**

```typescript
// ✅ Good: Accessible label provided
<button
  onClick={handleCopy}
  aria-label="Copy wallet address"
  className="p-2 rounded-lg hover:bg-accent"
>
  <ClipboardDocumentIcon className="h-4 w-4" />
</button>

// ❌ Bad: No accessible label
<button onClick={handleCopy}>
  <ClipboardDocumentIcon className="h-4 w-4" />
</button>
```

### Decorative Icons

**For decorative icons (with adjacent text), use `aria-hidden`:**

```typescript
// Icon is decorative, text provides context
<button className="flex items-center gap-2">
  <PlusIcon className="h-4 w-4" aria-hidden="true" />
  <span>Create Deal</span>
</button>
```

### Screen Reader Announcements

```typescript
// For status changes, provide screen reader text
<div className="flex items-center gap-2">
  <CheckCircleIcon className="h-5 w-5 text-green-600" aria-hidden="true" />
  <span className="sr-only">Success:</span>
  <span>Deal created successfully</span>
</div>
```

## Usage Examples

### Navigation Link with Icon

```typescript
import { HomeIcon } from "@heroicons/react/24/outline";

<Link
  href="/"
  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent"
>
  <HomeIcon className="h-5 w-5" aria-hidden="true" />
  <span>Home</span>
</Link>
```

### Button with Icon

```typescript
import { PlusIcon } from "@heroicons/react/24/outline";

// Icon + Text
<button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground">
  <PlusIcon className="h-4 w-4" aria-hidden="true" />
  <span>Create Deal</span>
</button>

// Icon Only
<button
  aria-label="Create new deal"
  className="p-2 rounded-lg hover:bg-accent"
>
  <PlusIcon className="h-5 w-5" />
</button>
```

### Card with Icon

```typescript
import { DocumentTextIcon } from "@heroicons/react/24/outline";

<div className="card-glass p-6">
  <div className="flex items-center gap-3 mb-4">
    <div className="p-2 rounded-lg bg-primary/10">
      <DocumentTextIcon className="h-6 w-6 text-primary" aria-hidden="true" />
    </div>
    <h3 className="text-lg font-semibold">Active Deals</h3>
  </div>
  {/* Card content */}
</div>
```

### Status Badge with Icon

```typescript
import { CheckCircleIcon } from "@heroicons/react/24/outline";

<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30">
  <CheckCircleIcon className="h-4 w-4" aria-hidden="true" />
  <span>Completed</span>
</span>
```

### Empty State with Icon

```typescript
import { InboxIcon } from "@heroicons/react/24/outline";

<div className="flex flex-col items-center justify-center py-12 text-center">
  <InboxIcon className="h-16 w-16 text-muted-foreground mb-4" aria-hidden="true" />
  <h3 className="text-lg font-semibold mb-2">No deals yet</h3>
  <p className="text-muted-foreground mb-4">Create your first deal to get started</p>
  <button className="btn btn-primary">
    <PlusIcon className="h-4 w-4" aria-hidden="true" />
    Create Deal
  </button>
</div>
```

## Icon Component Wrapper (Optional)

For consistent styling and accessibility, consider creating an icon wrapper component:

```typescript
// components/atoms/Icon.tsx
import { ComponentType, SVGProps } from "react";

interface IconProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
}

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-8 w-8",
};

export const Icon = ({
  icon: IconComponent,
  size = "md",
  className = "",
  ...props
}: IconProps) => {
  return (
    <IconComponent
      className={`${sizeMap[size]} ${className}`}
      {...props}
    />
  );
};

// Usage
<Icon icon={HomeIcon} size="md" aria-hidden="true" />
```

## Migration Checklist

When updating existing icons:

- [ ] Replace any inline SVGs with Heroicons
- [ ] Standardize icon sizes using the size guide
- [ ] Add `aria-label` to icon-only buttons
- [ ] Add `aria-hidden="true"` to decorative icons
- [ ] Ensure proper color contrast in both light and dark modes
- [ ] Test with screen readers
- [ ] Verify keyboard navigation works

## Testing

### Visual Testing

1. **Light Mode:** Verify all icons are visible with proper contrast
2. **Dark Mode:** Verify all icons are visible with proper contrast
3. **Hover States:** Verify icon colors change appropriately
4. **Focus States:** Verify focus rings are visible around icon buttons

### Accessibility Testing

1. **Screen Reader:** Test with VoiceOver (Mac) or NVDA (Windows)
2. **Keyboard Navigation:** Tab through all icon buttons
3. **Color Contrast:** Use browser DevTools to check contrast ratios
4. **Reduced Motion:** Verify icons don't animate if user prefers reduced motion

## Common Mistakes to Avoid

❌ **Don't:**
- Use different icon sizes inconsistently
- Forget `aria-label` on icon-only buttons
- Use low-contrast colors
- Mix outline and solid icons in the same context
- Use icons without semantic meaning

✅ **Do:**
- Follow the size guidelines
- Provide accessible labels
- Ensure proper contrast
- Use consistent icon styles
- Choose icons that match their function

## Resources

- **Heroicons Documentation:** https://heroicons.com/
- **WCAG Contrast Guidelines:** https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
- **ARIA Labels:** https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
- **Icon Accessibility:** https://www.sarasoueidan.com/blog/accessible-icon-buttons/

## Maintenance

This icon system should be reviewed and updated:
- When adding new features that require new icons
- When Heroicons releases major updates
- When accessibility standards change
- Quarterly as part of design system maintenance
