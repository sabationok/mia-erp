import AppRoutes from 'components/AppRoutes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import { useAppSettingsSelector } from './redux/selectors.store';
import GlobalStyles from './theme/globalStyles';
import React, { Suspense } from 'react';
import AppLoader from './components/atoms/AppLoader';
import { t } from './lang';

const App: React.FC = () => {
  const { isDarkMode } = useAppSettingsSelector();

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
