import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { store } from "./app/store";
import { SocketContextProvider } from "./context/SocketContext";
const container = document.getElementById("root");
const root = createRoot(container);
const clientId =
  "354282151928-io0qjv0qkn919lnf89efelaja0fp0njn.apps.googleusercontent.com";
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketContextProvider>
        <GoogleOAuthProvider clientId={clientId}>
          <App />
        </GoogleOAuthProvider>
      </SocketContextProvider>
    </Provider>
  </React.StrictMode>
);
