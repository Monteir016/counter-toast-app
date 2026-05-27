import { createContext } from 'react'

export interface CounterContextValue {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

export const CounterContext = createContext<CounterContextValue | null>(null)
