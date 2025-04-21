import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx' // Ensure this import exists
import "./index.css";
import { SocketContextProvider } from './context/SocketContext.jsx'; // Ensure this import exists


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SocketContextProvider> 
      <App />
       </SocketContextProvider>
     
    </AuthContextProvider>
  </React.StrictMode>
);
