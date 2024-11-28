import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { store } from "./app/store";
const container = document.getElementById('root');
const root = createRoot(container);
const clientId = '354282151928-io0qjv0qkn919lnf89efelaja0fp0njn.apps.googleusercontent.com';
root.render(
  <Provider store={store}>
    {/* <GoogleOAuthProvider clientId={clientId} > */}
    <App />
    {/* </GoogleOAuthProvider> */}
  </Provider>
);

