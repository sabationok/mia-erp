import AppRoutes from 'components/AppRoutes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import { useAppSettingsSelector } from './redux/selectors.store';
import useLoadInitialAppDataHook from './hooks/useLoadInitialAppData.hook';
import GlobalStyles from './theme/globalStyles';
import React, { Suspense } from 'react';
import AppLoader from './components/atoms/AppLoader';

const App: React.FC = () => {
  const { isDarkMode } = useAppSettingsSelector();

  useLoadInitialAppDataHook();

  return (
    <>
      <AppContainer>
        <GlobalStyles />

        <Suspense fallback={<AppLoader isLoading comment={'Please wait while minions do their work...'} />}>
          <AppRoutes />
        </Suspense>
      </AppContainer>

      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        limit={4}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
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
