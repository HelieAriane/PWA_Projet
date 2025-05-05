import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function registerSW() {
  if ('serviceWorker' in navigator && import.meta.en.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service worker ready! Scope: ', registration.scope);
          registration.update();
        })
        .catch((error) => {
          console.log('Service Worker registration failed: ', error);
        });
    });
  }
}

registerSW();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
