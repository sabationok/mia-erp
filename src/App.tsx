import AppRoutes from 'components/AppRoutes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import { useAppSettingsSelector, useAuthSelector } from './redux/selectors.store';
import GlobalStyles from './theme/globalStyles';
import React, { Suspense, useLayoutEffect, useMemo } from 'react';
import AppLoader from './components/atoms/AppLoader';
import { t } from './lang';
import { ClientApi } from './api';
import { useAppDispatch } from './redux/store.store';
import useAppAuthHook from './hooks/useAppAuth.hook';

const App: React.FC = () => {
  const { isDarkMode } = useAppSettingsSelector();
  const { access_token } = useAuthSelector();
  const dispatch = useAppDispatch();
  const { logOutUser } = useAppAuthHook();
  const hasAccess = useMemo(() => {
    return !!access_token;
  }, [access_token]);

  useLayoutEffect(() => {
    if (access_token) {
      ClientApi.setToken(access_token);

      const unsubscribers = [
        ClientApi.onUnauthorized(error => {
          console.error('onUnauthorized ==========================================', error);
          logOutUser();
        }),
        ClientApi.onRefreshToken(data => {
          console.log('onRefreshToken ==========================================');

          dispatch();
        }),
      ];

      return () => {
        unsubscribers.forEach(off => off());
      };
    } else {
      ClientApi.unsetToken();
    }
  }, [access_token, hasAccess, logOutUser]);

  return (
    <>
      <AppContainer>
        <GlobalStyles />

        <Suspense fallback={<AppLoader isLoading comment={t('Please wait while minions do their work...')} />}>
          <AppRoutes />
        </Suspense>
      </AppContainer>

      <ToastContainer
        position="top-center"
        autoClose={1000}
        limit={4}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme={isDarkMode ? 'dark' : 'light'}
      />
    </>
  );
};

const AppContainer = styled.div`
  position: relative;

  width: 100%;
  height: 100vh;
  max-height: 100%;

  fill: ${({ theme }) => theme.fillColor};
  color: ${({ theme }) => theme.fontColor};
  background-color: ${({ theme }) => theme.backgroundColorLight};
`;
export default App;
