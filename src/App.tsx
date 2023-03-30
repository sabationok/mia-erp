import AppLoader from 'components/AppLoader/AppLoader';
import { Suspense } from 'react';
import Layout from 'components/Layout/Layout';
import AppRoutes from 'components/AppRoutes/AppRoutes';
import SideBarProvider from 'components/SideBarLeft/SideBarProvider';
import { ToastContainer } from 'react-toastify';
// import { getAppSettings } from 'redux/selectors.store';
import styled from 'styled-components';
import useAppSettings from 'redux/appSettings/useAppSettings.hook';

const App: React.FC = () => {
  const { isDarkMode } = useAppSettings();

  return (
    <>
      <AppContainer>
        <Suspense fallback={<AppLoader isLoading />}>
          <SideBarProvider>
            <Layout>
              <AppRoutes />
            </Layout>
          </SideBarProvider>
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
  background-color: ${({ theme }) => theme.backgroundColorMain};
`;
export default App;
