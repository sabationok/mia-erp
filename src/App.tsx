import AppLoader from 'components/atoms/AppLoader';
import { Suspense, useEffect, useState } from 'react';
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

const useLoadInitialAppData = ({
  onLoading,
  onSuccess,
  onError,
}: {
  onLoading?: (l: boolean) => void;
  onSuccess?: () => void;
  onError?: (e: any) => void;
} = {}) => {
  const { _id, permission_token } = usePermissionsSelector().permission;
  const { getAllByDirType } = useDirService();
  const { getAppActions } = useAppSettings();
  const [_isLoading, setIsLoading] = useState(false);
  const [_statuses, setStatuses] = useState<Partial<Record<ApiDirType, boolean>>>();
  const onSuccessToast = (dirType: ApiDirType) => () => {
    setStatuses(prev => ({ ...prev, [dirType]: true }));

    // toast.success(`Updated data for directory: ${dirType}`
  };

  return useEffect(() => {
    (async () => {
      if (permission_token || _id) {
        setIsLoading(true);
        const id = toast.loading('Loading app data', {
          isLoading: true,
        });
        try {
          await getAppActions();
          await getAllByDirType({
            data: { dirType: ApiDirType.CATEGORIES_TR, params: { createTreeData: true } },
            onSuccess: onSuccessToast(ApiDirType.CATEGORIES_TR),
          });
          await getAllByDirType({
            data: { dirType: ApiDirType.COUNTS, params: { createTreeData: true } },
            onSuccess: onSuccessToast(ApiDirType.COUNTS),
          });
          await getAllByDirType({
            data: { dirType: ApiDirType.CATEGORIES_PROD, params: { createTreeData: true } },
            onSuccess: onSuccessToast(ApiDirType.CATEGORIES_PROD),
          });
          await getAllByDirType({
            data: { dirType: ApiDirType.CONTRACTORS },
            onSuccess: onSuccessToast(ApiDirType.CONTRACTORS),
          });
          await getAllByDirType({
            data: { dirType: ApiDirType.BRANDS, params: { createTreeData: false } },
            onSuccess: onSuccessToast(ApiDirType.BRANDS),
          });
          // await getAllByDirType({
          //   data: { dirType: ApiDirType.PROJECTS },
          //   onSuccess: onSuccessToast(ApiDirType.PROJECTS),
          // });

          setTimeout(() => {
            toast.dismiss(id);
            toast.success('App data loaded', { autoClose: 2000 });
          }, 2000);
          onSuccess && onSuccess();
          setIsLoading(false);
        } catch (e) {
          setTimeout(() => {
            toast.dismiss(id);
            toast.error('Unknown server error while loading app data', { autoClose: 2000 });
          }, 2000);
          setIsLoading(false);
        }
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
