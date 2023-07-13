import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import { setupStore } from './store/store';
import reportWebVitals from './reportWebVitals';

import router from './common/router';
import theme from './common/theme';

import './index.scss';

const store = setupStore();

const paypalOptions = {
  clientId: 'YOUR_CLIENT_ID',
  currency: 'USD',
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider options={paypalOptions} deferLoading={true}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
