import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { persistor, store } from 'redux/store.store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import AppThemeProvider from 'Providers/AppThemeProvider/AppThemeProvider';
import ModalProvider from 'Providers/ModalProvider/ModalProvider';
import './index.scss';
import 'react-toastify/dist/ReactToastify.css';
import SideBarProvider from 'components/SideBarLeft/SideBarProvider';
import { AppServiceProvider } from './hooks/useAppServices.hook';
import CartProvider from 'Providers/CartProvider';

// import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  //<React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter basename="/mia-erp">
        <AppServiceProvider>
          <AppThemeProvider>
            <CartProvider>
              <ModalProvider>
                <SideBarProvider>
                  <App />
                </SideBarProvider>
              </ModalProvider>
            </CartProvider>
          </AppThemeProvider>
        </AppServiceProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
