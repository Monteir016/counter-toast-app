import { Toaster } from '@chakra-ui/react'
import { CounterProvider } from './context/CounterProvider'
import { toaster } from './toaster'

function App() {
  return (
    <CounterProvider>
      {/* components will go here */}
      <Toaster toaster={toaster} />
    </CounterProvider>
  )
}

export default App
