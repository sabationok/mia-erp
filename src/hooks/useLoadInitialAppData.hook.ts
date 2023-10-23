import usePermissionsServiceHook, { usePermissionsSelector } from './usePermissionsService.hook';
import useAppSettings from './useAppSettings.hook';
import { useEffect } from 'react';
import { ApiDirType } from '../redux/APP_CONFIGS';
import { useAppServiceProvider } from './useAppServices.hook';
import { ToastService } from '../services';

const directoriesForLoading: { dirType: ApiDirType; createTreeData?: boolean }[] = [
  { dirType: ApiDirType.COUNTS, createTreeData: true },
  { dirType: ApiDirType.CATEGORIES_TR, createTreeData: true },
  { dirType: ApiDirType.CATEGORIES_PROD, createTreeData: true },
  { dirType: ApiDirType.ACTIVITIES, createTreeData: true },
  { dirType: ApiDirType.BRANDS, createTreeData: true },
  { dirType: ApiDirType.PROPERTIES_PRODUCTS, createTreeData: true },
  { dirType: ApiDirType.CONTRACTORS },
  { dirType: ApiDirType.TAGS },
  // { dirType: ApiDirType.METHODS_PAYMENT },
  // { dirType: ApiDirType.METHODS_SHIPMENT },
  { dirType: ApiDirType.METHODS_COMMUNICATION },
  { dirType: ApiDirType.VARIATIONS },
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
  const { _id, permission_token, company } = usePermissionsSelector().permission;
  const prService = usePermissionsServiceHook();
  const {
    directories: { getAllByDirType },
    products,
    priceManagement,
    transactions,
    warehouses,
    payments,
    shipments,
  } = useAppServiceProvider();

  const { getAppActions } = useAppSettings();
  // const [_isLoading, setIsLoading] = useState(false);
  // const [_statuses, setStatuses] = useState<Partial<Record<ApiDirType, boolean>>>();
  const onSuccessToast = (dirType: ApiDirType) => () => {
    // setStatuses(prev => ({ ...prev, [dirType]: true }));
    // toast.success(`Updated data for directory: ${dirType}`);
  };
  const load = async () => {
    onLoading && onLoading(true);
    const close = () =>
      setTimeout(
        ToastService.createLoader('Loading app data...').open({
          afterClose: ['App data loaded', { type: 'success' }],
        }).close,
        2000
      );

    if (permission_token || _id) {
      // setIsLoading(true);

      try {
        if (company?._id) {
          await prService.getAllByCompanyId({ data: { refresh: true, companyId: company._id } });
        }

        await products.getAll({ data: { refresh: true } });
        await products.getAllProperties({ data: { params: { createTreeData: true } } });

        await priceManagement.getAll({ data: { refresh: true } });
        await transactions.getAll({ data: { refresh: true } });
        await warehouses.getAll({ data: { refresh: true } });

        await payments.getAllMethods();
        await shipments.getAllMethods();

        await Promise.all(
          directoriesForLoading.map(async ({ dirType, createTreeData }) => {
            return await getAllByDirType({
              data: { dirType, params: { createTreeData } },
              onSuccess: onSuccessToast(dirType),
            });
          })
        );

        onSuccess && onSuccess();
        onLoading && onLoading(false);
        close();
        // setIsLoading(false);
      } catch (e) {
        onLoading && onLoading(false);
        onError && onError(e);
        close();
        // setIsLoading(false);
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
