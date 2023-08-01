import AppLoader from 'components/atoms/AppLoader';
import { Suspense } from 'react';
import AppRoutes from 'components/AppRoutes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import GlobalStyles from './theme/globalStyles';
import { useBaseApiWithAccessToken, useBaseApiWithPermissionToken } from './api/baseApi';
import { useAppSettingsSelector } from './redux/selectors.store';
import useLoadInitialAppDataHook from './hooks/useLoadInitialAppData.hook';
// import { useAppDispatch } from './redux/store.store';
// import { setMockPermissionData } from './redux/permissions/permissions.action';

const App: React.FC = () => {
  const { isDarkMode } = useAppSettingsSelector();
  // const { user } = useAuthSelector();
  // const dispatch = useAppDispatch();

  useBaseApiWithAccessToken();

  useBaseApiWithPermissionToken();

  useLoadInitialAppDataHook();

  // useEffect(() => {
  //   if (user.email === 'dliaKariny@mail.com') {
  //     dispatch(
  //       setMockPermissionData({
  //         _id: 'dliaKariny@mail.com',
  //         user: { _id: 'dliaKariny@mail.com', email: 'dliaKariny@mail.com' },
  //       })
  //     );
  //   }
  // }, [dispatch, user]);

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
