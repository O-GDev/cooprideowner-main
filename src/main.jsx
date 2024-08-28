import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient } from '../node_modules/@tanstack/query-core/build/legacy/index.js';
import { QueryClientProvider } from '../node_modules/@tanstack/react-query/build/legacy/QueryClientProvider.js';
import { AppStateProvider } from '../src/context/AppContext'


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppStateProvider>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
    </AppStateProvider>
  </StrictMode>,
)
