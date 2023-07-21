import AppLoader from 'components/atoms/AppLoader';
import { Suspense, useEffect } from 'react';
import AppRoutes from 'components/AppRoutes/AppRoutes';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import GlobalStyles from './theme/globalStyles';
import { useBaseApiWithAccessToken, useBaseApiWithPermissionToken } from './api/baseApi';

import { ApiDirType } from './redux/APP_CONFIGS';
import { useAppSettingsSelector } from './redux/selectors.store';
import { usePermissionsSelector } from './redux/permissions/usePermissionsService.hook';
import useAppSettings from './redux/appSettings/useAppSettings.hook';
import { useDirService } from './hooks';

const useLoadInitialAppData = () => {
  const { _id, permission_token } = usePermissionsSelector().permission;
  const { getAllByDirType } = useDirService();
  const { getAppActions } = useAppSettings();
  const onSuccessToast = (dirType: ApiDirType) => () => toast.success(`Updated data for directory: ${dirType}`);

  return useEffect(() => {
    (async () => {
      if (permission_token || _id) {
        await getAppActions();
        await getAllByDirType({
          data: { dirType: ApiDirType.CATEGORIES_TR },
          onSuccess: onSuccessToast(ApiDirType.CATEGORIES_TR),
        });
        await getAllByDirType({ data: { dirType: ApiDirType.COUNTS }, onSuccess: onSuccessToast(ApiDirType.COUNTS) });
        await getAllByDirType({
          data: { dirType: ApiDirType.CONTRACTORS },
          onSuccess: onSuccessToast(ApiDirType.CONTRACTORS),
        });
      }
    })();
  }, [permission_token]);
};
const App: React.FC = () => {
  const { isDarkMode } = useAppSettingsSelector();

  useBaseApiWithAccessToken();
  useBaseApiWithPermissionToken();

  useLoadInitialAppData();

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
