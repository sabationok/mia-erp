import { useWarehousesSelector } from '../redux/selectors.store';
import { useMemo } from 'react';
import { FilterOption } from '../components/ModalForm/ModalFilter';
import { IWarehouse } from '../redux/warehouses/warehouses.types';
import { OnlyUUID } from '../redux/global.types';
import { getIdRef } from '../utils/dataTransform';
import { usePermissionsSelector } from './usePermissionsService.hook';
import { IPermission, PermissionStatus } from '../redux/permissions/permissions.types';

export function useWarehousesAsFilterOptions(): FilterOption<OnlyUUID, IWarehouse>[] {
  const warehouses = useWarehousesSelector().warehouses;

  return useMemo((): FilterOption<OnlyUUID, IWarehouse>[] => {
    return warehouses.map(w => ({ ...w, value: getIdRef(w), label: `${w?.label} | ${w?.code || '---'}` }));
  }, [warehouses]);
}

export function usePermissionsAsFilterOptions(): FilterOption<OnlyUUID, IPermission>[] {
  const permissions = usePermissionsSelector().permissions;

  return useMemo((): FilterOption<OnlyUUID, IPermission>[] => {
    return permissions
      .filter(el => el.status === PermissionStatus.ACCEPTED)
      .map(({ user, email, ...p }) => ({ ...p, value: getIdRef(p), label: `${user?.name || ''} | ${email || ''}` }));
  }, [permissions]);
}
