import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { persistor, store } from './redux/store'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistGate } from 'redux-persist/integration/react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { GoogleOAuthProvider } from '@react-oauth/google';

const initialOptions = {
  clientId: "AQEyrn2CDsn_Ewy8LTMRzB2LkhrNYlLOeGOxwvR0h8uXWZmrEsjsRHOlduwb1h8sOu_qxfomBS0DpMl8",
  currency: "USD",
  intent: "capture",
};

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient()
root.render(
  //<React.StrictMode>
  <GoogleOAuthProvider clientId='311705554423-ok4qhdbkejmhmlukojale0uv85q2fipe.apps.googleusercontent.com'>
    <PayPalScriptProvider options={initialOptions}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </PayPalScriptProvider>
  </GoogleOAuthProvider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
