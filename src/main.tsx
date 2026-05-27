import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from '@chakra-ui/react'
import { system } from './theme'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element #root not found in the document.')
}

createRoot(rootElement).render(
  <StrictMode>
    <Provider value={system}>
      <App />
    </Provider>
  </StrictMode>,
)
