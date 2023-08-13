import TableList from 'components/TableList/TableList';
import { takeFullGridArea } from './pagesStyles';
import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import { ITableListProps } from '../TableList/tableTypes.types';
import AppGridPage from './AppGridPage';
import { useWarehousesSelector } from '../../redux/selectors.store';
import { ISortParams } from '../../api';
import { FilterReturnDataType } from '../Filter/AppFilter';
import { PagePathType } from '../../data/pages.data';
import { warehouseOverviewTableColumns } from '../../data/warehauses.data';
import { useAppParams, useAppServices } from '../../hooks';
import { IProductInventory } from '../../redux/warehouses/warehouses.types';
import { ServiceName } from '../../hooks/useAppServices.hook';

type Props = {
  path: PagePathType;
};
const PageWarehouseOverview: React.FC<any> = (props: Props) => {
  const warehouseId = useAppParams().warehouseId;
  const service = useAppServices()[ServiceName.warehouses];
  const state = useWarehousesSelector();
  const [isLoading, setIsLoading] = useState(false);
  const [sortParams, setSortParams] = useState<ISortParams>();
  const [filterParams, setFilterParams] = useState<FilterReturnDataType>();

  const tableConfig = useMemo(
    (): ITableListProps<IProductInventory> => ({
      tableData: state.current?.items,
      isFilter: false,
      isSearch: true,
      footer: false,
      checkBoxes: true,
      onFilterSubmit: filterParams => {
        setFilterParams(filterParams);
      },
      handleTableSort: (param, sortOrder) => {
        setSortParams({ dataPath: param.dataPath, sortOrder });
      },
    }),
    [state]
  );

  useEffect(() => {
    if (warehouseId) {
      const currentForReq = state.warehouses.find(w => w._id === warehouseId);

      service.getById({ data: currentForReq });
    }
  }, [warehouseId]);

  return (
    <AppGridPage path={props.path}>
      <Page>
        <TableList {...tableConfig} isLoading={isLoading} tableTitles={warehouseOverviewTableColumns} />
      </Page>
    </AppGridPage>
  );
};

const Page = styled.div`
  ${takeFullGridArea}
`;

export default PageWarehouseOverview;
