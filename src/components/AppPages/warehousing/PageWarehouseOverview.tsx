import TableList, { ITableListContext } from 'components/TableList/TableList';
import { takeFullGridArea } from '../pagesStyles';
import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import { ITableListProps, TableActionCreator } from '../../TableList/tableTypes.types';
import AppGridPage from '../AppGridPage';
import { useWarehousesSelector } from '../../../redux/selectors.store';
import { ISortParams } from '../../../api';
import { FilterReturnDataType } from '../../Filter/AppFilter';
import { warehouseOverviewTableColumns } from '../../../data/warehauses.data';
import { useAppParams } from '../../../hooks';
import { WarehouseItemEntity } from '../../../types/warehousing/warehouses.types';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { useModalProvider } from '../../ModalProvider/ModalProvider';
import { Modals } from '../../Modals/Modals';
import { BaseAppPageProps } from '../index';

interface Props extends BaseAppPageProps {}

const PageWarehouseOverview: React.FC<any> = (props: Props) => {
  const warehouseId = useAppParams().warehouseId;
  const { getById } = useAppServiceProvider()[ServiceName.warehouses];
  const state = useWarehousesSelector();
  const actionsCreator = useWarehouseOverviewActionsCreator();
  const [isLoading, setIsLoading] = useState(false);
  const [sortParams, setSortParams] = useState<ISortParams>();
  const [filterParams, setFilterParams] = useState<FilterReturnDataType>();

  const tableConfig = useMemo(
    (): ITableListProps<WarehouseItemEntity> => ({
      tableData: state.current?.inventories,
      isFilter: false,
      isSearch: true,
      footer: false,
      checkBoxes: true,
      actionsCreator,
      onFilterSubmit: filterParams => {
        setFilterParams(filterParams);
      },
      handleTableSort: (param, sortOrder) => {
        setSortParams({ dataPath: param.dataPath, sortOrder });
      },
    }),
    [actionsCreator, state]
  );

  useEffect(() => {
    if (warehouseId) {
      getById({ data: { _id: warehouseId }, onLoading: setIsLoading });
    }
    // eslint-disable-next-line
  }, [warehouseId]);

  useEffect(() => {
    console.log('PageWarehouseOverview ============>>>>>>>>>>');
    console.log('sortParams', sortParams);
    console.log('filterParams', filterParams);
  }, [filterParams, sortParams]);

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

type WarehouseTableActionsCreator = TableActionCreator<WarehouseItemEntity>;

const useWarehouseOverviewActionsCreator = (): WarehouseTableActionsCreator => {
  // const service = useAppServiceProvider().warehouses;
  const modalS = useModalProvider();

  return (ctx: ITableListContext<WarehouseItemEntity>) => {
    const current = ctx.selectedRow;

    return [
      { name: 'deleteProductInventory', icon: 'delete', onClick: () => {} },
      { name: 'editProductInventory', icon: 'edit', onClick: () => {} },
      {
        name: 'addProductInventory',
        icon: 'plus',
        type: 'onlyIconFilled',
        onClick: () => {
          console.log(current);
          modalS.open({
            Modal: Modals.SelectProductModal,
            props: {
              onSelect: p => {
                modalS.open({
                  Modal: Modals.FormCreateWarehouseDocument,
                  props: {
                    product: p,
                    title: `Create warehouse document for product: ${p?.label}`,
                  },
                });
              },
            },
          });
        },
      },
    ];
  };
};
export default PageWarehouseOverview;
