import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import ClientProvider from './context/ClientContext.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <ClientProvider>
    <App />
    <Toaster />
  </ClientProvider>
);
