import AppRoutes from 'components/AppRoutes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import { useAppSettingsSelector, useAuthSelector } from './redux/selectors.store';
import GlobalStyles from './theme/globalStyles';
import React, { Suspense, useLayoutEffect, useMemo, useRef } from 'react';
import AppLoader from './components/atoms/AppLoader';
import { t } from './lang';
import useAppAuthHook from './hooks/useAppAuth.hook';
import { isUndefined } from 'lodash';
import { ClientApi } from './api';

const App: React.FC = () => {
  const { isDarkMode } = useAppSettingsSelector();
  const { access_token } = useAuthSelector();

  const { logOutUser } = useAppAuthHook();
  const interceptorIdRef = useRef<number | undefined>();
  const hasAccess = useMemo(() => {
    if (access_token) {
      ClientApi.setToken(access_token);
    } else {
      ClientApi.unsetToken();
    }

    return !!access_token;
  }, [access_token]);

  useLayoutEffect(() => {
    // if (!hasAccess) {
    //   !isUndefined(interceptorIdRef.current) &&
    //     ClientApi.clientRef.interceptors.response.eject(interceptorIdRef.current);
    //   ToastService.error('Unauthorized');
    //   return;
    // }

    if (!isUndefined(interceptorIdRef.current)) {
      return;
    }

    // ClientApi.setAuthInterceptor({
    //   onUnauthorized: error => {
    //     console.error(error);
    //     if (error?.status === 401) {
    //       console.error('PrivateRoute | access denied');
    //       ToastService.error('PrivateRoute | access denied');
    //       logOutUser().finally();
    //     }
    //   },
    // });

    // interceptorIdRef.current = ClientApi.clientRef.interceptors.response.use(
    //   value => value,
    //   (e: AxiosError) => {
    //     if (e.response?.status === 401) {
    //       console.error('PrivateRoute | access denied');
    //       ToastService.error('PrivateRoute | access denied');
    //       logOutUser().finally();
    //     }
    //     return e;
    //   },
    //   {}
    // );

    console.log('interceptorIdRef.current', interceptorIdRef.current);

    return () => {
      !isUndefined(interceptorIdRef.current) &&
        ClientApi.clientRef.interceptors.response.eject(interceptorIdRef.current);
    };
  }, [hasAccess, logOutUser]);

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
