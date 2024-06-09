import usePermissionsServiceHook, { usePermissionsSelector } from './usePermissionsService.hook';
import { useEffect } from 'react';
import { ApiDirType } from '../redux/APP_CONFIGS';
import { useAppServiceProvider } from './useAppServices.hook';
import { PermissionRecipientEnum } from '../types/permissions.types';

const directoriesForLoading: { dirType: ApiDirType; createTreeData?: boolean }[] = [
  // { dirType: ApiDirType.COUNTS, createTreeData: true },
  // { dirType: ApiDirType.CATEGORIES_TR, createTreeData: true },
  { dirType: ApiDirType.CATEGORIES_PROD, createTreeData: true },
  // { dirType: ApiDirType.ACTIVITIES, createTreeData: true },
  { dirType: ApiDirType.BRANDS, createTreeData: true },
  // { dirType: ApiDirType.CONTRACTORS },
  { dirType: ApiDirType.TAGS },
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

    // priceManagement,
    // transactions,
    deliveries,
    warehouses,
    payments,
    integrations,
    offers,
    // shipments,
    // invoicing,
    // customers,
  } = useAppServiceProvider();

  const load = async () => {
    onLoading && onLoading(true);

    if (permission_token || _id) {
      // setIsLoading(true);

      try {
        if (company?._id) {
          await prService.getAllByCompanyId({
            data: { refresh: true, _id: company._id, params: { recipient: PermissionRecipientEnum.user } },
          });
        }

        offers.getAllProperties({ data: { params: { dataView: 'tree' } } });
        // offers.getAll({ data: { refresh: true } });
        warehouses.getAll({ data: { refresh: true } });
        // priceManagement.getAll({ data: { refresh: true } });
        //  transactions.getAll({ data: { refresh: true } });

        integrations.getAllExtServices({
          onSuccess: () => {
            // invoicing.getAllMethods();
            payments.getAllMethods();
            deliveries.getAllMethods();
            // customers.getAllMethods();
          },
        });
        directoriesForLoading.map(({ dirType, createTreeData }) => {
          return getAllByDirType({
            data: { dirType, params: { createTreeData } },
          });
        });
        // await Promise.allSettled([
        //   ...directoriesForLoading.map(({ dirType, createTreeData }) => {
        //     return getAllByDirType({
        //       data: { dirType, params: { createTreeData } },
        //     });
        //   }),
        // ]);
        onSuccess && onSuccess();
        onLoading && onLoading(false);

        // setIsLoading(false);
      } catch (e) {
        onLoading && onLoading(false);
        onError && onError(e);

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
