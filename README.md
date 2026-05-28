# Counter Toast App

Take-home assignment for Yendou. Counter with a Figma-spec toast notification.

**Live demo:** [counter-toast-app.vercel.app](#) _(link after deploy)_

---

## Running locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

---

## Stack

| Tool | Version | Role |
|---|---|---|
| Vite | 6 | Build tool and dev server |
| React | 19 | UI framework |
| TypeScript | 5 | Strict mode, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` |
| Chakra UI | 3 | Component primitives and Toaster |
| Framer Motion | 12 | All animations, no CSS transitions |

---

## What it does

- Counter with increment, decrement, and reset
- Toast on every action matching the Figma spec
- Count persists to `localStorage` across page refreshes
- Keyboard shortcuts: `+` increments, `-` decrements, `r` resets

---

## Architecture

Context is split across two files: `counterContext.ts` creates the context object, `CounterProvider.tsx` is the component. `eslint-plugin-react-refresh` requires one export type per file or HMR breaks, so mixing a component and a hook in the same file is not an option.

`useCounter` throws a descriptive error if called outside the provider. Silent failures in wrong tree positions are hard to trace.

---

## Animation

Every value is explicit. Nothing is a library default.

**Number transition:** Spring `stiffness: 400, damping: 30`. The number slides out downward, the new one enters from above. A spring feels like the number has mass; a CSS duration would be arbitrary. `mode="popLayout"` on `AnimatePresence` removes the exiting number from layout immediately so the entering one does not shift position.

**Button press:** Spring `stiffness: 400, damping: 17`. Lower damping than the counter gives the press a slight overshoot on release, signalling the click registered.

**Negative colour:** `duration: 0.25s, easeOut` from `#404254` to `#ff3337` when count goes below zero. Uses duration instead of spring because springs on colour produce odd intermediate hues. The colour lives on a persistent outer `motion.div`, not on the inner span that remounts on every count change.

**Toast entry:** Spring `stiffness: 300, damping: 25`. Softer than the button. A notification should arrive with purpose, not bounce around.

---

## Toast

**Gradient border:** The Figma uses `border-image` with a radial gradient, which breaks with `border-radius`. The outer box carries the gradient as its background with `padding: 1px`, the inner box clips it to show only the border strip.

**Stale closure fix:** `handleIncrement` is memoised with `useCallback`. Reading `count` directly would capture the stale value from the render when the callback was created. A `useRef` that mirrors `count` is always safe to read at call time.

**Rapid-click dedup:** The active toast ID is tracked in a `useRef`. On rapid clicks, `toaster.update()` replaces the description in place instead of stacking new toasts.

---

## Accessibility

- `aria-live="polite"` and `aria-atomic="true"` on the counter so screen readers announce the full value on every change
- `aria-label` on every button includes the current count
- Focus rings use `:focus-visible`, invisible on mouse click, visible on keyboard Tab
- Keyboard shortcuts are guarded against firing inside `INPUT` or `TEXTAREA` elements
- `fontVariantNumeric: tabular-nums` keeps digit widths fixed so the card does not shift at `9 -> 10`

---

## TypeScript

`noUncheckedIndexedAccess` makes `localStorage.getItem()` return `string | null` at the type level, forcing the null case to be handled before parsing.

`exactOptionalPropertyTypes` prevents passing `undefined` explicitly for optional props, which matters when a component distinguishes "not provided" from "explicitly cleared".

---

## Trade-offs

`localStorage` writes are synchronous on every state change. Fine for a counter, worth debouncing for heavier state.

The toast reads the new count from a ref, not React state. At this scale it is imperceptible. With async persistence the two could diverge and a loading state would be needed.
