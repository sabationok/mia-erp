import { FormCreatePriceProps } from '../../Forms/FormCreatePriceList';
import ModalForm, { ModalFormProps } from '../../ModalForm';
import TableList, { ITableListProps } from '../../TableList/TableList';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IPriceList, IPriceListItem } from '../../../redux/priceManagement/priceManagement.types';
import { UseAppFormAfterSubmitOptions } from '../../../hooks/useAppForm.hook';
import { createApiCall } from '../../../api';
import { PriceManagementApi } from '../../../api/priceManagement.api';
import { OnlyUUID } from '../../../redux/global.types';
import { priceListContentColumns } from '../../../data';
import { usePriceListOverviewActionsCreator } from '../../../hooks/usePriceListOverviewActionsCreator.hook';

export interface PriceListOverviewProps extends Omit<ModalFormProps, 'onSubmit' | 'afterSubmit'> {
  createFormProps?: FormCreatePriceProps;
  priceList?: IPriceList;
  getTableSetting: (priseList?: IPriceList) => ITableListProps<IPriceListItem>;
  listId?: string;
  onSubmit?: (
    data: IPriceListItem | IPriceListItem[],
    options: UseAppFormAfterSubmitOptions & {
      onSuccess: (newData: IPriceList) => void;
      onLoading: (l: boolean) => void;
    }
  ) => void;
}

const PriceListOverview: React.FC<PriceListOverviewProps> = ({
  getTableSetting,
  createFormProps,
  priceList,
  listId,
  onSubmit,
  ...props
}) => {
  const actionsCreator = usePriceListOverviewActionsCreator(listId);
  const [state, setState] = useState<IPriceList>();
  const [isLoading, setIsLoading] = useState(false);

  const tableSettings = useMemo(
    (): ITableListProps<IPriceListItem> => getTableSetting(state),
    [state, getTableSetting]
  );

  const onValidSubmit = (data: IPriceList) => {
    onSubmit &&
      data.prices &&
      onSubmit(data.prices, {
        clearAfterSave: true,
        closeAfterSave: true,
        onLoading: l => {},
        onSuccess: d => {},
      });
  };

  const loadData = useCallback(
    async (list: OnlyUUID) =>
      createApiCall(
        {
          data: list,
          onSuccess: setState,
          onLoading: setIsLoading,
          logError: true,
          logResData: true,
        },
        PriceManagementApi.getPriceListById,
        PriceManagementApi
      ),
    []
  );

  useEffect(() => {
    listId && loadData({ _id: listId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadData]);

  // TODO onSubmit={handleSubmit(onValidSubmit)}

  return (
    <ModalForm {...props} fillHeight title={isLoading ? 'Loading...' : `Price list: ${state?.label}`}>
      <TableList
        {...tableSettings}
        actionsCreator={actionsCreator}
        isSearch={false}
        tableData={state?.prices}
        tableTitles={priceListContentColumns}
      />
    </ModalForm>
  );
};
export default PriceListOverview;
