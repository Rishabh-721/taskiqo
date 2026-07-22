  import React from 'react';
  import { BrowserRouter } from 'react-router-dom';
  import {createRoot} from 'react-dom/client';
  import './index.css';
  import App from './App.jsx';
  import { AuthProvider } from './utils/AuthContext.jsx';

  createRoot(document.getElementById('root')).render(
    <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </AuthProvider>
  )
