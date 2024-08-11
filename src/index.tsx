import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { LocalStorageProvider } from './pages/appContexte';
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <LocalStorageProvider>
        <App />
    </LocalStorageProvider>
);

reportWebVitals();
