import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Register from './pages/Register';
import { AuthContextProvider } from './context/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <App/>
        </AuthContextProvider>
    </React.StrictMode>
);
