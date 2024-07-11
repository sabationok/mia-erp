import { useWarehousesSelector } from '../redux/selectors.store';
import { useMemo } from 'react';
import { FilterOption } from '../components/atoms/TabSelector';
import { WarehouseEntity } from '../types/warehousing/warehouses.types';
import { OnlyUUID } from '../redux/app-redux.types';
import { getIdRef } from '../utils/data-transform';
import { usePermissionsSelector } from './usePermissionsService.hook';
import { PermissionEntity, PermissionStatus } from '../types/permissions.types';

export function useWarehousesAsFilterOptions(): FilterOption<OnlyUUID, WarehouseEntity>[] {
  const warehouses = useWarehousesSelector().list;

  return useMemo((): FilterOption<OnlyUUID, WarehouseEntity>[] => {
    return warehouses.map(w => ({ ...w, value: getIdRef(w), label: `${w?.label} | ${w?.code || '---'}` }));
  }, [warehouses]);
}

export function usePermissionsAsFilterOptions(): FilterOption<OnlyUUID, PermissionEntity>[] {
  const permissions = usePermissionsSelector().permissions;

  return useMemo((): FilterOption<OnlyUUID, PermissionEntity>[] => {
    return permissions
      .filter(el => el.status === PermissionStatus.ACCEPTED)
      .map(({ user, email, ...p }) => ({ ...p, value: getIdRef(p), label: `${user?.name || ''} | ${email || ''}` }));
  }, [permissions]);
}
