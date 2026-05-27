import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { CounterContext, type CounterContextValue } from './counterContext'

const STORAGE_KEY = 'yendou-counter'

function readStoredCount(fallback: number): number {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === null) return fallback
  const parsed = parseInt(stored, 10)
  return isNaN(parsed) ? fallback : parsed
}

interface CounterProviderProps {
  children: ReactNode
  initialCount?: number
}

export function CounterProvider({ children, initialCount = 0 }: CounterProviderProps) {
  const [count, setCount] = useState<number>(() => readStoredCount(initialCount))

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(count))
  }, [count])

  const increment = useCallback(() => setCount(c => c + 1), [])
  const decrement = useCallback(() => setCount(c => c - 1), [])
  const reset = useCallback(() => setCount(initialCount), [initialCount])

  const value = useMemo<CounterContextValue>(
    () => ({ count, increment, decrement, reset }),
    [count, increment, decrement, reset],
  )

  return <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
}
