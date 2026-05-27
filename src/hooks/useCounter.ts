import { useContext } from 'react'
import { CounterContext, type CounterContextValue } from '../context/counterContext'

export function useCounter(): CounterContextValue {
  const context = useContext(CounterContext)
  if (context === null) {
    throw new Error(
      'useCounter must be used within a <CounterProvider>. ' +
        'Wrap your component tree with <CounterProvider>.',
    )
  }
  return context
}
