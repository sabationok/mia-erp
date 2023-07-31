import { usePermissionsSelector } from './usePermissionsService.hook';
import useAppSettings from './useAppSettings.hook';
import { useEffect, useState } from 'react';
import { ApiDirType } from '../redux/APP_CONFIGS';
import { toast } from 'react-toastify';
import { useAppServiceProvider } from './useAppServices.hook';

const directoriesForLoading: { dirType: ApiDirType; createTreeData?: boolean }[] = [
  {
    dirType: ApiDirType.COUNTS,
    createTreeData: true,
  },
  {
    dirType: ApiDirType.CATEGORIES_TR,
    createTreeData: true,
  },
  {
    dirType: ApiDirType.CATEGORIES_PROD,
    createTreeData: true,
  },
  {
    dirType: ApiDirType.ACTIVITIES,
    createTreeData: true,
  },
  {
    dirType: ApiDirType.BRANDS,
    createTreeData: true,
  },
  { dirType: ApiDirType.CONTRACTORS },
];
const useLoadInitialAppDataHook = ({
  onLoading,
  onSuccess,
  onError,
}: {
  onLoading?: (l: boolean) => void;
  onSuccess?: () => void;
  onError?: (e: any) => void;
} = {}) => {
  const { _id, permission_token } = usePermissionsSelector().permission;
  const {
    directories: { getAllByDirType },
    products,
    priceManagement,
    transactions,
  } = useAppServiceProvider();
  const { getAppActions } = useAppSettings();
  const [_isLoading, setIsLoading] = useState(false);
  const [_statuses, setStatuses] = useState<Partial<Record<ApiDirType, boolean>>>();
  const onSuccessToast = (dirType: ApiDirType) => () => {
    setStatuses(prev => ({ ...prev, [dirType]: true }));

    // toast.success(`Updated data for directory: ${dirType}`);
  };
  const load = async () => {
    if (permission_token || _id) {
      setIsLoading(true);
      const id = toast.loading('Loading app data', {
        isLoading: true,
      });
      try {
        await getAppActions();

        await products.getAll({ data: { refresh: true } });

        await priceManagement.getAll({ data: { refresh: true } });

        await transactions.getAll({ data: { refresh: true } });

        Promise.all(
          directoriesForLoading.map(async ({ dirType, createTreeData }) => {
            return await getAllByDirType({
              data: { dirType, params: { createTreeData } },
              onSuccess: onSuccessToast(dirType),
            });
          })
        );
        setTimeout(() => {
          toast.dismiss(id);
          toast.success('App data loaded', { autoClose: 2000 });
        });
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
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permission_token]);

  return load;
};
export default useLoadInitialAppDataHook;
