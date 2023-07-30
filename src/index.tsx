import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux';
import { persistor, store } from 'redux/store.store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import AppThemeProvider from 'components/AppThemeProvider/AppThemeProvider';
import ModalProvider from 'components/ModalProvider/ModalProvider';
// import reportWebVitals from './reportWebVitals';
import './index.scss';
import 'react-toastify/dist/ReactToastify.css';
import SideBarProvider from 'components/SideBarLeft/SideBarProvider';
import { AppServiceProvider } from './hooks/useAppServices.hook';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  //<React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter basename="/counter-app-ts">
        <AppServiceProvider>
          <AppThemeProvider>
            <ModalProvider>
              <SideBarProvider>
                <App />
              </SideBarProvider>
            </ModalProvider>
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
