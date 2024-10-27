import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from "react-redux";
import Store from "./redux/store";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}> {/* Bọc ứng dụng bằng Provider */}
      <GoogleOAuthProvider clientId="354282151928-io0qjv0qkn919lnf89efelaja0fp0njn.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>;
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
