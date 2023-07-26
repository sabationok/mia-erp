import { FormCreatePriceProps } from '../../Forms/FormCreatePriceList';
import ModalForm, { ModalFormProps } from '../../ModalForm';
import TableList, { ITableListProps } from '../../TableList/TableList';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IPriceList, IPriceListItem } from '../../../redux/priceManagement/priceManagement.types';
import { UseAppFormAfterSubmitOptions } from '../../../hooks/useAppForm.hook';
import { useAppForm } from '../../../hooks';
import { createApiCall } from '../../../api';
import { PriceManagementApi } from '../../../api/priceManagement.api';
import { OnlyUUID } from '../../../redux/global.types';
import { CellTittleProps } from '../../TableList/TebleCells/CellTitle';
import { TableActionCreator } from '../../TableList/tableTypes.types';
import usePriceManagementServiceHook, {
  PriceManagementService,
} from '../../../redux/priceManagement/usePriceManagementService.hook';
import { useModalProvider } from '../../ModalProvider/ModalProvider';
import FormCreatePrices from '../../Forms/FormCreatePrices';
import { toast } from 'react-toastify';

// const moc: IPriceListItem = {
//   _id: '',
//
// };
export const priceListTableColumns: CellTittleProps<IPriceListItem>[] = [
  {
    top: { name: 'Продукт', getData: d => d?.product?.label },
    bottom: { name: 'Артикул | SKU', getData: d => d?.product?.sku },
    width: '170px',
    action: 'doubleDataWithAvatar',
  },
  {
    top: { name: 'Ціна продажу', getData: d => d?.price },
    bottom: { name: 'Ціна закупки', getData: d => d?.cost },
    width: '170px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Комісія, сума', getData: d => d?.commissionAmount },
    bottom: { name: 'Комісія, %', getData: d => d?.commissionPercentage },
    width: '170px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Націнка, сума', getData: d => d?.markupAmount },
    bottom: { name: 'Націнка, %', getData: d => d?.markupPercentage },
    width: '170px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Створено', getData: d => d?.createdAt },
    bottom: { name: 'Оновлено', getData: d => d?.updatedAt },
    width: '170px',
    action: 'dateDbl',
  },
];
export type PriceListOverviewActionsCreatorType = TableActionCreator<IPriceListItem>;

export const usePriceListOverviewActionsCreator = (
  serv?: PriceManagementService
): PriceListOverviewActionsCreatorType => {
  const modalS = useModalProvider();
  const service = usePriceManagementServiceHook();
  return useCallback(
    ctx => [
      {
        name: 'createPrice',
        title: 'Створити',
        icon: 'plus',
        onClick: async () => {
          const modal = modalS.handleOpenModal({
            ModalChildren: FormCreatePrices,
            modalChildrenProps: {
              title: 'Create new price',
              onSubmit: (data, o) => {
                service.addItemToList({
                  onSuccess: data => {
                    o?.closeAfterSave && modal?.onClose();
                    toast.success('Price created');
                  },
                  onError: () => {
                    toast.error('Price creating error');
                  },
                });
              },
            },
          });
        },
      },
    ],
    [modalS, service]
  );
};

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
  const actionsCreator = usePriceListOverviewActionsCreator();
  const [state, setState] = useState<IPriceList>();
  const [isLoading, setIsLoading] = useState(false);
  const { clearAfterSave, closeAfterSave } = useAppForm({
    defaultValues: state,
  });
  const tableSettings = useMemo(
    (): ITableListProps<IPriceListItem> => getTableSetting(state),
    [state, getTableSetting]
  );

  const onValidSubmit = (data: IPriceList) => {
    onSubmit &&
      data.prices &&
      onSubmit(data.prices, {
        clearAfterSave,
        closeAfterSave,
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
        tableTitles={priceListTableColumns}
      />
    </ModalForm>
  );
};
export default PriceListOverview;
