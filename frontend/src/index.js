import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { store } from "./app/store";
const container = document.getElementById('root');
const root = createRoot(container);
const clientId = process.env.GG_CLIENT_ID;
root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <Provider store={store}>

      <App />

    </Provider>
  </GoogleOAuthProvider>

);

