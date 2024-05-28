import FlexBox from '../../atoms/FlexBox';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../redux/store.store';
import { PermissionEntity } from '../../../types/permissions.types';
import { WarehouseEntity } from '../../../types/warehousing/warehouses.types';
import { PriceListEntity } from '../../../types/price-management/price-management.types';
import { usePermissionsSelector } from '../../../hooks/usePermissionsService.hook';
import { useEffect, useMemo } from 'react';
import { AppPagesEnum } from '../../AppPages';
import { MaybeNull } from '../../../types/utils.types';

export interface SubNavMenuProps {
  subMenuKey: AppPagesEnum;
  onActive?: (key: AppPagesEnum) => void;
}
const getLinkDataMap: Record<
  AppPagesEnum | string,
  ((option: any) => { id?: string; label?: MaybeNull<string> }) | undefined
> = {
  [AppPagesEnum.warehouses]: (warehouse: WarehouseEntity) => ({
    id: warehouse._id,
    label: `${warehouse?.label} | ${warehouse?.code}`,
  }),
  [AppPagesEnum.priceLists]: (priceList: PriceListEntity) => ({ id: priceList._id, label: priceList?.label }),
  [AppPagesEnum.companies]: (permission: PermissionEntity) => ({
    id: permission?.company?._id,
    label: permission?.company?.label?.base,
  }),
};
const SubNavMenu: React.FC<SubNavMenuProps> = ({ subMenuKey, onActive }) => {
  const pathname = useLocation().pathname;
  const { permission } = usePermissionsSelector();
  const { warehouses, priceLists, permissions } = useAppSelector();

  const renderLinks = useMemo(() => {
    const map: Record<AppPagesEnum | string, any[] | undefined> = {
      [AppPagesEnum.warehouses]: warehouses.warehouses,
      [AppPagesEnum.priceLists]: priceLists.lists,
      [AppPagesEnum.companies]: permissions.permissions,
    };
    return map[subMenuKey]?.map(el => {
      const getLinkData = getLinkDataMap[subMenuKey];

      const linkData = getLinkData ? getLinkData(el) : undefined;

      return (
        linkData?.id &&
        linkData.label && (
          <StyledNavLink
            key={`${subMenuKey}-${linkData.id}`}
            to={`/app/${permission._id}/${subMenuKey}/${linkData.id}`}
          >
            {linkData.label}
          </StyledNavLink>
        )
      );
    });
  }, [permission._id, permissions.permissions, priceLists.lists, subMenuKey, warehouses.warehouses]);

  useEffect(() => {
    if (pathname.includes(subMenuKey)) {
      onActive && onActive(subMenuKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FlexBox fillWidth padding={'0 0 0 16px'}>
      {renderLinks}
    </FlexBox>
  );
};

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 8px;

  position: relative;

  width: 100%;
  min-height: 34px;
  font-size: 14px;
  font-weight: 400;
  height: min-content;

  padding: 4px 8px;

  border-radius: 0;
  border-style: none;
  transition: none;

  &.active {
    color: ${p => p.theme.accentColor.base};
  }

  // &::before {
  //   content: '';
  //   position: absolute;
  //   top: 50%;
  //   left: 0;
  //
  //   width: 3px;
  //   height: 0;
  //
  //   background-color: transparent;
  //
  //   transform: translateY(-50%);
  //   transition: all ${({ theme }) => theme.globals.timingFunctionLong};
  // }

  //&:hover {
  //  background-color: rgba(254, 254, 254, 0.25);
  //
  //  &::before {
  //    height: 100%;
  //    background-color: var(--darkOrange);
  //  }
  //}

  // &.active {
  //   background-color: rgba(254, 254, 254, 0.05);
  //   /* color: var(--darkOrange); */
  //   /* fill: var(--darkOrange); */
  //
  //   &::before {
  //     height: 80%;
  //     background-color: ${({ theme: { accentColor } }) => accentColor.base};
  //   }
  // }

  @media screen and (min-width: 768px) {
    min-height: 24px;
    font-size: 12px;
    height: min-content;
  }
`;

export default SubNavMenu;
