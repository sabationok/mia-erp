import AppLoader from 'components/atoms/AppLoader';
import { Suspense } from 'react';
import AppRoutes from 'components/AppRoutes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import useAppSettings from 'redux/appSettings/useAppSettings.hook';
import GlobalStyles from './theme/globalStyles';
import { useBaseURLWithPermission } from './api/baseApi';

const App: React.FC = () => {
  const { isDarkMode } = useAppSettings();
  useBaseURLWithPermission();
  
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
        limit={4}
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
