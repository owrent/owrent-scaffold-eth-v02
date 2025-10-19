"use client";

import { useState } from "react";

/**
 * Animations Demo Page
 * Demonstrates all animations and transitions implemented in Task 11
 * Requirements: 15.1, 15.2, 15.3, 15.4, 15.5
 */
export default function AnimationsDemoPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="main-content py-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="glass-card p-8">
          <h1 className="text-4xl font-bold mb-4">Animations & Transitions Demo</h1>
          <p className="text-base-content/70">
            This page demonstrates all animations and transitions implemented for the glassmorphism UI redesign. All
            animations respect the <code>prefers-reduced-motion</code> setting.
          </p>
        </div>

        {/* Button Transitions - Requirement 15.1 */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-semibold mb-4">Button Hover Transitions (150ms)</h2>
          <p className="text-base-content/70 mb-6">
            Buttons have 150ms transitions with hover lift effect. Try hovering over these buttons:
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="btn btn-primary">Primary Button</button>
            <button className="btn btn-secondary">Secondary Button</button>
            <button className="btn btn-accent">Accent Button</button>
            <button className="btn btn-ghost">Ghost Button (No Transform)</button>
            <button className="btn btn-outline">Outline Button</button>
          </div>
        </div>

        {/* Glassmorphism Hover - Requirement 15.2 */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-semibold mb-4">Glassmorphism Hover Enhancements (300ms)</h2>
          <p className="text-base-content/70 mb-6">
            Glassmorphism elements have 300ms transitions with enhanced hover states. Hover over these cards:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-2">Card 1</h3>
              <p className="text-base-content/70">
                Hover to see opacity increase, border enhancement, and subtle lift.
              </p>
            </div>
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-2">Card 2</h3>
              <p className="text-base-content/70">All glassmorphism elements have consistent hover behavior.</p>
            </div>
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-2">Card 3</h3>
              <p className="text-base-content/70">Shadow depth increases on hover for better depth perception.</p>
            </div>
          </div>
        </div>

        {/* Theme Color Transitions - Requirement 15.3 */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-semibold mb-4">Theme Color Transitions (300ms)</h2>
          <p className="text-base-content/70 mb-6">
            Theme colors transition smoothly over 300ms. Toggle the theme in the header to see the effect.
          </p>
          <div className="p-6 bg-base-100 rounded-lg border border-base-300">
            <p className="text-base-content">
              This element demonstrates smooth color transitions when switching themes. All colors transition using the
              cubic-bezier(0.4, 0, 0.2, 1) easing function.
            </p>
          </div>
        </div>

        {/* Animation Keyframes */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-semibold mb-4">Animation Keyframes</h2>
          <p className="text-base-content/70 mb-6">Various animation keyframes for common UI patterns:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-base-100 rounded-lg border border-base-300">
              <h3 className="text-lg font-semibold mb-2">Pulse Animation</h3>
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                <span className="text-base-content/70">Loading indicator</span>
              </div>
            </div>
            <div className="p-6 bg-base-100 rounded-lg border border-base-300">
              <h3 className="text-lg font-semibold mb-2">Spin Animation</h3>
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-base-content/70">Spinner</span>
              </div>
            </div>
          </div>
        </div>

        {/* Transition Utilities */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-semibold mb-4">Transition Utilities</h2>
          <p className="text-base-content/70 mb-6">Utility classes for flexible transition control:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-base-100 rounded-lg border border-base-300 transition-all hover:translate-y-1 hover:shadow-lg cursor-pointer">
              <h3 className="text-lg font-semibold mb-2">Hover Transform</h3>
              <p className="text-base-content/70">Hover to see translateY and shadow transition</p>
            </div>
            <div className="p-6 bg-base-100 rounded-lg border border-base-300 transition-all hover:scale-105 cursor-pointer">
              <h3 className="text-lg font-semibold mb-2">Hover Scale</h3>
              <p className="text-base-content/70">Hover to see scale transition</p>
            </div>
          </div>
        </div>

        {/* Modal Demo */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-semibold mb-4">Modal Animations</h2>
          <p className="text-base-content/70 mb-6">Modals use scaleIn/scaleOut animations with glassmorphism:</p>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            Open Modal
          </button>
        </div>

        {/* Reduced Motion Notice */}
        <div className="glass-card p-8 bg-warning/10 border-warning/30">
          <h2 className="text-2xl font-semibold mb-4">Accessibility: Reduced Motion</h2>
          <p className="text-base-content/70 mb-4">
            All animations respect the <code>prefers-reduced-motion</code> setting. To test:
          </p>
          <ul className="list-disc list-inside space-y-2 text-base-content/70">
            <li>
              <strong>macOS:</strong> System Preferences → Accessibility → Display → Reduce motion
            </li>
            <li>
              <strong>Windows:</strong> Settings → Ease of Access → Display → Show animations
            </li>
            <li>
              <strong>iOS:</strong> Settings → Accessibility → Motion → Reduce Motion
            </li>
            <li>
              <strong>Android:</strong> Settings → Accessibility → Remove animations
            </li>
          </ul>
          <p className="text-base-content/70 mt-4">
            When enabled, all animations are reduced to minimal durations (0.01ms) while maintaining functionality.
          </p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setShowModal(false)}
          ></div>

          {/* Modal Content */}
          <div className="glass-modal p-8 max-w-md w-full relative animate-scale-in">
            <h3 className="text-2xl font-semibold mb-4">Modal Title</h3>
            <p className="text-base-content/70 mb-6">
              This modal demonstrates the scaleIn animation with glassmorphism effects. The backdrop uses fadeIn
              animation.
            </p>
            <div className="flex gap-4">
              <button className="btn btn-primary" onClick={() => setShowModal(false)}>
                Close
              </button>
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
