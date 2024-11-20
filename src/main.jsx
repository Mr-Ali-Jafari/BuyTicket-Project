import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// router
import { BrowserRouter } from 'react-router-dom'

// context
import { AuthProvider } from './Context/authContext';
import { ProfileProvider } from './Context/profileContext'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ProfileProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ProfileProvider>
    </BrowserRouter>
  </StrictMode>,
)
