import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import TableList from 'components/TableList/TableList';
import { useSearchParams } from 'react-router-dom';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { takeFullGridArea, takeFullPlace } from './pagesStyles';
import { useAuthSelector } from 'redux/selectors.store';
import ProfileCard from 'components/atoms/ProfileCard/ProfileCard';
import usePermissionsService, { usePermissionsSelector } from 'redux/permissions/usePermissionsService.hook';
import { IPermission } from '../../redux/permissions/permissions.types';
import { permissionsSearchParams, permissionsTableColumns } from '../../data';
import { ITableListProps } from '../TableList/tableTypes.types';
import usePermissionsActionsCreator from '../../redux/permissions/usePermissonsActionsCreator';
import { CompanyQueryType } from '../../redux/global.types';
import { PermissionStatus } from 'redux/permissions/permissions.types';

export type CompanyTypeItem = { title: string; param: CompanyQueryType };
const companyTypes: CompanyTypeItem[] = [
  { title: 'Мої', param: 'own' },
  { title: 'Працюю', param: 'invited' },
  { title: 'Запрошення', param: 'invites' },
  { title: 'Усі', param: 'all' },
];

type Props = {
  path?: string;
};
const PageHome: React.FC<any> = ({ path }: Props) => {
  const { user } = useAuthSelector();
  const [companyType, setCompanyType] = useState<CompanyTypeItem>();
  const setSearchParams = useSearchParams({
    companyType: companyTypes[0].param,
  })[1];
  const state = usePermissionsSelector();
  const permissionsService = usePermissionsService();
  const actionsCreator = usePermissionsActionsCreator(permissionsService, companyType?.param || 'own');

  const permissionsData = useMemo(() => {
    return state.permissions?.filter(pr => {
      if (companyType?.param === 'invited') return pr.status === PermissionStatus.ACCEPTED;
      if (companyType?.param === 'invites') return pr.status === PermissionStatus.PENDING;
      if (companyType?.param === 'all') return pr;
      if (companyType?.param === 'own') return pr.user?._id === pr.owner?._id;
      return pr;
    });
  }, [companyType?.param, state.permissions]);

  const tableConfig = useMemo(
    (): ITableListProps<IPermission> => ({
      tableData: permissionsData,
      tableTitles: permissionsTableColumns,
      tableSearchParams: permissionsSearchParams,
      isFilter: false,
      isSearch: true,
      checkBoxes: false,
      actionsCreator,
    }),
    [actionsCreator, permissionsData]
  );
  const onSearchParamClick = useCallback(
    (item: CompanyTypeItem) => {
      setSearchParams({ companyType: item.param });
      setCompanyType(item);
    },
    [setSearchParams]
  );
  const isActiveClassName = useCallback(
    (param: string) => (companyType?.param === param ? 'active' : ''),
    [companyType?.param]
  );

  const renderFilterButtons = useMemo(() => {
    return companyTypes.map(item => (
      <StButtonIcon
        key={item.param}
        variant="def"
        onClick={() => onSearchParamClick(item)}
        className={isActiveClassName(item.param)}
      >
        {item.title}
      </StButtonIcon>
    ));
  }, [isActiveClassName, onSearchParamClick]);

  useEffect(() => {
    setSearchParams({ companyType: companyTypes[0].param });
    setCompanyType(companyTypes[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMemo(() => {
    user._id && permissionsService.getAllByUserId({ data: { userId: user._id } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user._id]);

  return (
    <Page>
      <Top>
        <ProfileInfo>
          <ProfileCard {...user} />
        </ProfileInfo>

        <FilterButtons>
          <ButtonsList>{renderFilterButtons}</ButtonsList>
        </FilterButtons>
      </Top>

      <Bottom>
        <TableList {...tableConfig} />
      </Bottom>
    </Page>
  );
};

const Page = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr;

  ${takeFullGridArea}
`;
const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  position: relative;

  overflow: hidden;

  //background-color: ${({ theme }) => theme.tableBackgroundColor};

  ${takeFullPlace}
`;
const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  overflow: hidden;

  ${takeFullPlace};

  background-color: ${({ theme }) => theme.tableBackgroundColor};
`;

const ProfileInfo = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;

  padding: 16px 12px;
  width: 100%;
  max-width: 250px;
`;
const FilterButtons = styled.div`
  max-width: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;
const ButtonsList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 150px);
  grid-auto-rows: 32px;

  max-width: 600px;
`;

const StButtonIcon = styled(ButtonIcon)`
  position: relative;

  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  text-align: center;

  border-radius: 0;
  border-style: none;
  border-width: 0;

  &::before {
    display: block;
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.trBorderClr};
  }

  &::after {
    display: block;
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    //height: 1px;
    //width: 100%;
    height: 3px;
    width: 0;
    transition: all ${({ theme }) => theme.globals.timingFnMui};
    transform: translate(-50%);
    background-color: ${({ theme }) => theme.accentColor.base};
  }

  &.active {
    &::after {
      width: 80%;
    }
  }

  &:hover,
  &:focus {
    outline-style: none;

    &::after {
      width: 100%;
    }
  }
`;

export default memo(PageHome);
