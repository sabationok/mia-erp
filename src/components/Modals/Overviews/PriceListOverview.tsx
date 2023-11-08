import ModalForm, { ModalFormProps } from '../../ModalForm';
import TableList, { ITableListProps } from '../../TableList/TableList';
import { useEffect, useMemo, useState } from 'react';
import { IPriceList, IPriceListItem } from '../../../redux/priceManagement/priceManagement.types';
import { UseAppFormSubmitOptions } from '../../../hooks/useAppForm.hook';
import { usePriceListOverviewActionsCreator } from '../../../hooks/usePriceListOverviewActionsCreator.hook';
import { useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { usePriceListsSelector } from '../../../redux/selectors.store';
import { FormCreatePriceProps } from '../../Forms/FormCreatePrice/FormCreatePrice';
import { priceListContentColumns } from '../../../data/priceManagement.data';

export interface PriceListOverviewProps extends Omit<ModalFormProps, 'onSubmit' | 'afterSubmit'> {
  createFormProps?: FormCreatePriceProps;
  priceList?: IPriceList;
  getTableSetting: (data?: IPriceListItem[]) => ITableListProps<IPriceListItem>;
  listId?: string;
  onSubmit?: (
    data: IPriceListItem | IPriceListItem[],
    options: UseAppFormSubmitOptions & {
      onSuccess: (newData: IPriceList) => void;
      onLoading: (l: boolean) => void;
    }
  ) => void;
}

const PriceListOverview: React.FC<PriceListOverviewProps> = ({
  getTableSetting,
  createFormProps,
  listId,
  onSubmit,
  ...props
}) => {
  const { lists } = usePriceListsSelector();
  const actionsCreator = usePriceListOverviewActionsCreator(listId);
  const { priceManagement } = useAppServiceProvider();
  const [tableData, setTableData] = useState<IPriceListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const listInfo = useMemo(() => lists.find(l => l._id === listId), [listId, lists]);
  const tableSettings = useMemo(
    (): ITableListProps<IPriceListItem> => getTableSetting(tableData),
    [tableData, getTableSetting]
  );

  useEffect(() => {
    if (listId) {
      priceManagement
        .getAllPrices({
          data: { params: { list: { _id: listId } }, refreshCurrent: true },
          onSuccess: setTableData,
          onLoading: setIsLoading,
        })
        .then();
    }
  }, [listId, priceManagement]);

  // TODO onSubmit={handleSubmit(onValidSubmit)}

  return (
    <ModalForm {...props} fillHeight title={isLoading ? 'Loading...' : `Price list: ${listInfo?.label}`}>
      <TableList
        {...tableSettings}
        actionsCreator={actionsCreator}
        isSearch={false}
        tableData={tableData}
        tableTitles={priceListContentColumns}
      />
    </ModalForm>
  );
};
export default PriceListOverview;
