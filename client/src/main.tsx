import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import { UserProvider } from './context/usercontext';
import { AuthProvider } from './context/AuthContext';

import { BrowserRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <Router>
          <App />
        </Router>
      </UserProvider>
    </AuthProvider>
  </StrictMode>
);
