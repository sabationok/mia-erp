import FlexBox from '../../atoms/FlexBox';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { PermissionEntity } from '../../../types/permissions.types';
import { WarehouseEntity } from '../../../types/warehousing/warehouses.types';
import { PriceListEntity } from '../../../types/price-management/price-management.types';
import { usePermissionsSelector } from '../../../hooks/usePermissionsService.hook';
import { useEffect, useMemo } from 'react';
import { AppPagesEnum } from '../../AppPages';
import { Text } from '../../atoms/Text';
import { IBase } from '../../../types/utils.types';

export interface SubNavMenuProps {
  subMenuKey: AppPagesEnum;
  onActive?: (key: AppPagesEnum) => void;
  childrenList?: IBase[];
}
const getLinkDataMap: Record<
  AppPagesEnum | string,
  ((option: any) => { id?: string; label?: React.ReactNode }) | undefined
> = {
  [AppPagesEnum.warehouses]: (warehouse: WarehouseEntity) => ({
    id: warehouse._id,
    label: (
      <FlexBox
        fxDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        fillWidth
        gap={8}
        style={{ cursor: 'inherit' }}
      >
        <Text $ellipsisMode>{warehouse?.label + (warehouse?.label ?? '')}</Text>

        <Text>{warehouse?.code}</Text>
      </FlexBox>
    ),
  }),
  [AppPagesEnum.priceLists]: (priceList: PriceListEntity) => ({ id: priceList._id, label: priceList?.label }),
  [AppPagesEnum.companies]: (permission: PermissionEntity) => ({
    id: permission?.company?._id,
    label: permission?.company?.label?.base,
  }),
};
const SubNavMenu: React.FC<SubNavMenuProps> = ({ childrenList, subMenuKey, onActive }) => {
  const pathname = useLocation().pathname;
  const { permission } = usePermissionsSelector();

  const renderLinks = useMemo(() => {
    return childrenList?.map(el => {
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
  }, [childrenList, permission._id, subMenuKey]);

  useEffect(() => {
    if (pathname.includes(subMenuKey)) {
      onActive && onActive(subMenuKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FlexBox
      fillWidth
      padding={'0 0 0 16px'}
      maxHeight={'calc(38px * 4)'}
      style={{
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
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
    background-color: ${p => p.theme.accentColor.extraLight};
  }
  @media screen and (min-width: 768px) {
    min-height: 30px;

    height: min-content;
  }
`;

export default SubNavMenu;
