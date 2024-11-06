import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { Spinner } from './components/ui'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   
   <RouterProvider router={router} fallbackElement={<Spinner />} />
  </StrictMode>,
)
