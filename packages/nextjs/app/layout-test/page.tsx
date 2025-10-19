"use client";

import type { NextPage } from "next";

/**
 * Layout Test Page
 *
 * This page demonstrates the spacing and layout system implemented in Task 4.
 * It showcases:
 * - Responsive grid layouts
 * - Spacing utilities
 * - Main content max-width constraints
 * - Component-specific padding
 */
const LayoutTestPage: NextPage = () => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <section>
        <h1>Spacing and Layout System Test</h1>
        <p className="text-lg opacity-70">
          This page demonstrates the responsive layout system with glassmorphism effects.
        </p>
      </section>

      {/* Spacing Scale Demo */}
      <section className="space-y-4">
        <h2>Spacing Scale</h2>
        <div className="glass-card" style={{ padding: "var(--padding-card)" }}>
          <div className="space-y-4">
            <p>This card uses the standard card padding (1.5rem / 24px)</p>
            <div className="flex gap-2">
              <div className="bg-primary/20 p-2 rounded">Gap 2 (0.5rem)</div>
              <div className="bg-primary/20 p-2 rounded">Between</div>
              <div className="bg-primary/20 p-2 rounded">Items</div>
            </div>
            <div className="flex gap-4">
              <div className="bg-secondary/20 p-2 rounded">Gap 4 (1rem)</div>
              <div className="bg-secondary/20 p-2 rounded">Between</div>
              <div className="bg-secondary/20 p-2 rounded">Items</div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Grid Demo */}
      <section className="space-y-4">
        <h2>Responsive Grid Layout</h2>
        <p className="opacity-70">
          Resize your browser to see the grid adapt: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
        </p>
        <div className="deals-grid">
          {[1, 2, 3, 4, 5, 6].map(num => (
            <div key={num} className="glass-card" style={{ padding: "var(--padding-card)" }}>
              <h3>Card {num}</h3>
              <p className="opacity-70">
                This card demonstrates the responsive grid layout. The grid automatically adjusts based on screen size.
              </p>
              <div className="flex gap-2 mt-4">
                <button className="btn btn-sm btn-primary">Action</button>
                <button className="btn btn-sm btn-ghost">Cancel</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vertical Spacing Demo */}
      <section className="space-y-4">
        <h2>Vertical Spacing Utilities</h2>
        <div className="glass-card" style={{ padding: "var(--padding-card)" }}>
          <div className="space-y-2">
            <p className="font-semibold">Space-y-2 (0.5rem between items)</p>
            <p className="opacity-70">First paragraph</p>
            <p className="opacity-70">Second paragraph</p>
            <p className="opacity-70">Third paragraph</p>
          </div>
        </div>
        <div className="glass-card" style={{ padding: "var(--padding-card)" }}>
          <div className="space-y-4">
            <p className="font-semibold">Space-y-4 (1rem between items)</p>
            <p className="opacity-70">First paragraph</p>
            <p className="opacity-70">Second paragraph</p>
            <p className="opacity-70">Third paragraph</p>
          </div>
        </div>
      </section>

      {/* Button Padding Demo */}
      <section className="space-y-4">
        <h2>Component-Specific Padding</h2>
        <div className="glass-card" style={{ padding: "var(--padding-card)" }}>
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Button Sizes</p>
              <div className="flex gap-2 flex-wrap">
                <button className="btn btn-sm">Small Button</button>
                <button className="btn">Medium Button (Default)</button>
                <button className="btn btn-lg">Large Button</button>
              </div>
            </div>
            <div>
              <p className="font-semibold mb-2">Button Variants</p>
              <div className="flex gap-2 flex-wrap">
                <button className="btn btn-primary">Primary</button>
                <button className="btn btn-secondary">Secondary</button>
                <button className="btn btn-accent">Accent</button>
                <button className="btn btn-ghost">Ghost</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Max Width Demo */}
      <section className="space-y-4">
        <h2>Max Width Constraint</h2>
        <div className="glass-card" style={{ padding: "var(--padding-card)" }}>
          <p className="opacity-70">
            This entire page is wrapped in a <code className="bg-base-300 px-2 py-1 rounded">.main-content</code>{" "}
            container that has a maximum width of 80rem (1280px) and is centered on the page. On smaller screens, it has
            responsive padding that increases from 1rem (mobile) to 1.5rem (tablet) to 2rem (desktop).
          </p>
        </div>
      </section>

      {/* Header Demo */}
      <section className="space-y-4">
        <h2>Header Glassmorphism</h2>
        <div className="glass-card" style={{ padding: "var(--padding-card)" }}>
          <p className="opacity-70">
            The header at the top of this page uses the{" "}
            <code className="bg-base-300 px-2 py-1 rounded">.header-glass</code> class which provides:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4 opacity-70">
            <li>Fixed height of 73px</li>
            <li>Sticky positioning (stays at top when scrolling)</li>
            <li>Glassmorphism effect with backdrop blur</li>
            <li>Smooth transitions</li>
            <li>Proper z-index layering</li>
          </ul>
          <p className="mt-4 opacity-70">Scroll down to see the sticky header in action!</p>
        </div>
      </section>

      {/* Responsive Breakpoints Info */}
      <section className="space-y-4">
        <h2>Responsive Breakpoints</h2>
        <div className="glass-card" style={{ padding: "var(--padding-card)" }}>
          <div className="space-y-2">
            <p className="font-semibold">Breakpoint Reference:</p>
            <ul className="list-disc list-inside space-y-1 opacity-70">
              <li>
                <strong>sm:</strong> 640px - Small tablets
              </li>
              <li>
                <strong>md:</strong> 768px - Tablets (grid switches to 2 columns)
              </li>
              <li>
                <strong>lg:</strong> 1024px - Desktops (grid switches to 3 columns)
              </li>
              <li>
                <strong>xl:</strong> 1280px - Large desktops
              </li>
              <li>
                <strong>2xl:</strong> 1536px - Extra large screens
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Spacer for scroll testing */}
      <div style={{ height: "50vh" }} className="flex items-center justify-center opacity-50">
        <p>Scroll up to see the sticky header effect</p>
      </div>
    </div>
  );
};

export default LayoutTestPage;
