import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';
import { Provider } from 'react-redux';
import store from './store.js';
import { Auth0Provider } from '@auth0/auth0-react';

//FIXME: is this good practice....???????
const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUri}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
);
