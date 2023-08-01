import AppLoader from 'components/atoms/AppLoader';
import { Suspense, useEffect } from 'react';
import AppRoutes from 'components/AppRoutes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import GlobalStyles from './theme/globalStyles';
import { useBaseApiWithAccessToken, useBaseApiWithPermissionToken } from './api/baseApi';
import { useAppSettingsSelector, useAuthSelector } from './redux/selectors.store';
import useLoadInitialAppDataHook from './hooks/useLoadInitialAppData.hook';
import { useAppDispatch } from './redux/store.store';
import { setMockPermissionData } from './redux/permissions/permissions.action';
import { IPermission } from './redux/permissions/permissions.types';

const mockPr: IPermission = {
  _id: 'f9a9f426-26af-4995-8ee0-be37ac7c70ed',
  createdAt: '2023-07-25T09:26:25.984Z',
  updatedAt: '2023-07-25T09:26:25.984Z',
  deletedAt: '',

  permission_token: '',
  user: { _id: '6aa9bc2d-bf6f-4cc2-8b24-08b4a198eb4s', email: 'dliaKariny@mail.com', name: 'Каріна' },
  owner: { _id: '6aa9bc2d-bf6f-4cc2-8b24-08b4a198eb4s', email: 'dliaKariny@mail.com', name: 'Каріна' },
  company: {
    _id: 'd53a038d-355d-4d3d-9b65-efd71b951e7a',
    createdAt: '2023-07-25T09:26:25.976Z',
    updatedAt: '2023-07-25T09:26:25.976Z',
    deletedAt: '',
    name: 'СуперБуд',
    email: 'superBud@bud.com',
    taxCode: '1223456789',
    fullName: 'ТОВ "СуперБуд"',
    phone: '',
    type: '',
    avatarUrl: '',
    avatarPreviewUrl: '',
  },
};
const App: React.FC = () => {
  const { isDarkMode } = useAppSettingsSelector();
  const { user } = useAuthSelector();
  const dispatch = useAppDispatch();

  useBaseApiWithAccessToken();

  useBaseApiWithPermissionToken();

  useLoadInitialAppDataHook();

  useEffect(() => {
    if (user.email === 'dliaKariny@mail.com') {
      dispatch(setMockPermissionData(mockPr));
    }
  }, [dispatch, user]);

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
