import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';

// Force dark theme on initial load
const storedTheme = localStorage.getItem('theme');
if (!storedTheme) {
  localStorage.setItem('theme', 'neon');
}
document.documentElement.className = (storedTheme !== 'light') ? 'dark' : 'light';
console.log('Initial theme class set to:', document.documentElement.className);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);