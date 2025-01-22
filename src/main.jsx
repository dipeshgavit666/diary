import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { PostsContextProvider } from './context/PostsContext.jsx'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
    <PostsContextProvider>
      <Router>
         <App />
      </Router>
    </PostsContextProvider>
    </AuthContextProvider>
    
  </StrictMode>,
)

