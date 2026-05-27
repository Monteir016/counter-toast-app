# Counter Toast App — Claude Guidelines

## Stack
- Vite + React + TypeScript (strict)
- Chakra UI v3 for components
- Framer Motion for all animations
- No other UI or animation libraries

## The rule

AI writes, I decide what ships. Every line of code gets read before it is committed.
If I cannot explain why a piece of code is there, it gets rewritten or deleted.
Animations, component boundaries, naming, and architecture are personal decisions — not defaults.

## Rules

### Never do
- Use `any` or `@ts-ignore`
- Use CSS `@keyframes` or CSS transitions — all motion goes through Framer Motion
- Hardcode colours inline — use tokens from `src/theme/index.ts`
- Use `console.log`
- Add features not in scope

### Always do
- Explicit typed props interface on every component
- Explicit type on every piece of state
- `:focus-visible` for focus rings, never `:focus` alone
- Framer Motion with explicit easing values — never rely on defaults
- Handle every edge case visibly, never silently

### Personal decisions (not negotiable with AI)
- Animation easing and duration values — chosen for feel, not convenience
- Component boundaries — where state lives and why
- What goes in the README and how it is phrased
- What edge cases are worth handling and what are out of scope
- Commit messages — written by me, not generated

## Key files
- `src/theme/index.ts` — all Yendou brand tokens live here
- `src/context/CounterContext.tsx` — single source of truth for counter state
- `src/hooks/useCounter.ts` — public hook, re-exported from context
- `src/components/Counter.tsx` — display only, no logic
- `src/components/CounterControls.tsx` — buttons only, no state
- `src/components/CounterToast.tsx` — Figma-spec toast JSX
