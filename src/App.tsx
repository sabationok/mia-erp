import AppLoader from 'components/atoms/AppLoader';
import { Suspense, useEffect } from 'react';
import AppRoutes from 'components/AppRoutes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import useAppSettings from 'redux/appSettings/useAppSettings.hook';
import GlobalStyles from './theme/globalStyles';
import useAppAuthHook from './redux/auth/useAppAuth.hook';

const App: React.FC = () => {
  const { isDarkMode } = useAppSettings();
  const auth = useAppAuthHook();

  console.log('App', auth);

  useEffect(() => {
    const onConfirmRefresh = function (event: BeforeUnloadEvent) {
      event.preventDefault();
      return (event.returnValue = 'Are you sure you want to leave the page?');
    };

    window.addEventListener('beforeunload', onConfirmRefresh, { capture: true });
    // return () => window.removeEventListener('beforeunload', onConfirmRefresh);
  }, []);

  return (
    <>
      <AppContainer>
        <GlobalStyles />
        <Suspense fallback={<AppLoader isLoading />}>
          <AppRoutes />
        </Suspense>
      </AppContainer>

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        limit={7}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={!isDarkMode ? 'dark' : 'light'}
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
