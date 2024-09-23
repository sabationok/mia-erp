import { Navigate, Outlet } from 'react-router-dom';
import { usePermissionsSelector } from '../../hooks/usePermissionsService.hook';
import { memo, useEffect, useMemo } from 'react';
import useAppParams from '../../hooks/useAppParams.hook';
import { useAppServiceProvider } from '../../hooks/useAppServices.hook';
import AppLoader from '../atoms/AppLoader';
import { isUndefined } from 'lodash';
import { t } from '../../i18e';
import { ToastService } from '../../services';
import { ClientApi } from '../../api';
import { useLoaders } from '../../Providers/Loaders/useLoaders.hook';
import useLoadInitialAppDataHook from 'hooks/useLoadInitialAppData.hook';

type Props = {
  redirectTo?: string;
};
const PermissionCheck: React.FC<Props> = ({ redirectTo }) => {
  const loaders = useLoaders<'permission' | 'isLoaded' | 'appData', { isLoaded?: boolean }>();
  // const navigate = useNavigate();
  const { permissionId } = useAppParams();

  const {
    permissions: { clearCurrent, logOut },
    auth: { logOutUser },
  } = useAppServiceProvider();

  const state = usePermissionsSelector();

  // const [loading, setLoading] = useState(false);

  const isValidPermissionId = useMemo(() => {
    const isValid = !isUndefined(permissionId) && state?.permission?._id === permissionId;

    if (isValid) {
      ClientApi.setPToken(permissionId);
    } else {
      console.warn('[PermissionCheck] ACCESS DENIED');
      ClientApi.removePToken();
    }
    return permissionId && ClientApi.getTokens().p_token === permissionId;
  }, [permissionId, state.permission._id]);

  const hasPermission = useMemo(() => !!state.permission._id, [state.permission._id]);

  const onAppLoadFinish = () => loaders.setData('isLoaded', true);

  useLoadInitialAppDataHook({
    onLoading: loaders.onLoading('appData'),
    onSuccess: onAppLoadFinish,
  });

  // useEffect(() => {
  //   if (!isValidPermissionId) {
  //     navigate('/app');
  //   }
  // }, [isValidPermissionId, navigate]);

  useEffect(() => {
    if (!hasPermission) {
    } else {
      const unsubcribe = ClientApi.onForbidden(error => {
        ToastService.error('Forbidden company action');
        console.log(error);
        clearCurrent();
        ClientApi.removePToken();
        logOut({});
      });

      return () => {
        unsubcribe();
      };
    }
  }, [clearCurrent, hasPermission, logOut, logOutUser, permissionId]);

  if (loaders.isLoading?.permission) {
    return <AppLoader isLoading comment={t('Permission check, please wait')} />;
  }

  return isValidPermissionId ? <Outlet /> : <Navigate to={redirectTo || '/app'} />;
};
export default memo(PermissionCheck);
