import TableList from 'components/TableList/TableList';
import { memo, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { takeFullGridArea, takeFullPlace } from './pagesStyles';
import { useAuthSelector } from 'redux/selectors.store';
import { usePermissionsSelector } from 'hooks/usePermissionsService.hook';
import { PermissionEntity } from '../../types/permissions.types';
import { ITableListProps } from '../TableList/tableTypes.types';
import usePermissionsActionsCreator from '../../hooks/usePermissonsActionsCreator';
import { PermissionStatus } from 'types/permissions.types';
import { permissionsTableColumns } from '../../data/permissions.data';
import { permissionsSearchParams, permissionsSortParams } from '../../data/companies.data';
import { useAppServiceProvider } from '../../hooks/useAppServices.hook';
import { AppModuleName } from '../../redux/reduxTypes.types';
import { BaseAppPageProps } from './index';
import { PartialRecord } from '../../types/utils.types';
import { enumToFilterOptions } from '../../utils';
import { useAppRouter } from '../../hooks';
import TabSelector from '../atoms/TabSelector';
import FlexBox from '../atoms/FlexBox';
import { CompanyQueryTypeEnum } from 'types/companies/companies.types';

const companyFilterOptions = enumToFilterOptions(CompanyQueryTypeEnum);

interface Props extends Partial<BaseAppPageProps> {}
const PageHome: React.FC<Props> = ({ path }) => {
  const { user } = useAuthSelector();
  const { query, ...router } = useAppRouter();
  const state = usePermissionsSelector();
  const permissionsService = useAppServiceProvider()[AppModuleName.permissions];
  const actionsCreator = usePermissionsActionsCreator(query.companyType || CompanyQueryTypeEnum.own);
  const [loading, setLoading] = useState(false);

  const { data } = useMemo(() => {
    const type = query.companyType || CompanyQueryTypeEnum.own;
    const companyTypeIs: PartialRecord<CompanyQueryTypeEnum, boolean> = {
      [type]: true,
    };

    const data = state.permissions?.filter(pr => {
      if (companyTypeIs.invited) return pr.status === PermissionStatus.ACCEPTED;
      if (companyTypeIs.invites) return pr.status === PermissionStatus.PENDING;
      if (companyTypeIs.all) return pr;
      if (companyTypeIs.own) return pr.user?._id === pr.owner?._id;
      return pr;
    });

    return {
      companyTypeIs,
      data,
    };
  }, [query.companyType, state.permissions]);

  const tableConfig = useMemo(
    (): ITableListProps<PermissionEntity> => ({
      tableData: data,
      tableTitles: permissionsTableColumns,
      searchParams: permissionsSearchParams,
      sortParams: permissionsSortParams,
      hasFilter: false,
      showFooter: true,
      hasSearch: true,
      checkBoxes: false,
      actionsCreator,
    }),
    [actionsCreator, data]
  );

  useEffect(() => {
    router.push({ query: { companyType: companyFilterOptions[0].value } });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) {
      user._id && permissionsService.getAllByUserId({ data: { userId: user._id }, onLoading: setLoading });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id]);

  return (
    <Page>
      <Top>
        {/*<ProfileInfo>/!*<ProfileCard {...user} />*!/</ProfileInfo>*/}

        <TabSelector
          options={companyFilterOptions}
          onSelect={option => {
            router.push({ query: { companyType: option.value } });
          }}
        />
      </Top>

      <Bottom>
        <TableList {...tableConfig} isLoading={loading} />
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
const Bottom = styled(FlexBox)`
  align-items: center;
  justify-content: center;

  overflow: hidden;
  padding: 8px 0 16px;

  ${takeFullPlace};

  background-color: ${({ theme }) => theme.tableBackgroundColor};
`;

// const ProfileInfo = styled.div`
//   position: sticky;
//   top: 0;
//   left: 0;
//   z-index: 1;
//
//   padding: 16px 12px;
//   width: 100%;
//   max-width: 250px;
// `;

export default memo(PageHome);
