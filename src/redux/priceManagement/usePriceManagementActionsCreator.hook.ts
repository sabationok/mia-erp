import { useModalProvider } from '../../components/ModalProvider/ModalProvider';
import { PriceManagementService } from './usePriceManagementService.hook';
import { useCallback } from 'react';
import { TableActionCreator } from '../../components/TableList/tableTypes.types';
import {
  IPriceList,
  IPriceListItem,
  IPriceListItemReqData,
  PriceListFilterOption,
  PriceListTypeEnum,
} from './priceManagement.types';
import FormCreatePriceList from '../../components/Forms/FormCreatePriceList';
import { toast } from 'react-toastify';
import { omit } from 'lodash';
import { ExtractId } from '../../utils/dataTransform';
import PriceListOverview from '../../components/AppPages/components/PriceListOverview';

export type PriceManagementActionsCreator = TableActionCreator<IPriceList>;

export const PriceManagementItemTypeFilterOptions: PriceListFilterOption[] = [
  { label: 'SALES', value: PriceListTypeEnum.SALES },
  { label: 'PURCHASES', value: PriceListTypeEnum.PURCHASES },
];

export const createPriceDataForReq = (input: IPriceListItem): IPriceListItemReqData => {
  return {
    ...ExtractId(input),
    data: {
      ...omit(input, ['createdAt', 'updatedAt', 'deletedAt', '_id']),
      product: ExtractId(input.product),
    },
  };
};
const usePriceManagementActionsCreator = (service: PriceManagementService): PriceManagementActionsCreator => {
  const modals = useModalProvider();

  // const onSubmitCreateWrapper = useCallback(
  //   (onCloseModal: () => void) => {
  //     return (data: ITransactionReqData, options: AfterFormSubmitOptions,) => {
  //       service.create({
  //         data,
  //         onSuccess(d) {
  //           toast.success(`Сторено транзакцію на суму: ${d.amount}`);
  //           options?.close && onCloseModal();
  //         },
  //       });
  //     };
  //   },
  //   [service]
  // );

  return useCallback(
    ctx => [
      // {
      //   name: 'editTr',
      //   title: 'Редагування транзакції',
      //   icon: 'edit',
      //   disabled: !ctx.selectedRow?._id,
      //   type: 'onlyIcon',
      //   onClick: async () => {
      //     const tr = state.transactions.find(el => el._id === ctx.selectedRow?._id);
      //
      //     const modal = modals.handleOpenModal({
      //       ModalChildren: TransactionForm,
      //       modalChildrenProps: {
      //         title: 'Редагування транзакції',
      //         filterOptions,
      //         defaultOption: filterOptions.findIndex(el => el.value === tr?.type),
      //         defaultState: tr,
      //         fillHeight: true,
      //         onSubmit: data => {
      //           service.updateById({
      //             data,
      //             onSuccess(d) {},
      //           });
      //         },
      //       },
      //     });
      //   },
      // },
      // {
      //   name: 'copyTr',
      //   title: 'Копіювання транзакції',
      //   icon: 'copy',
      //   type: 'onlyIcon',
      //   disabled: !ctx.selectedRow?._id,
      //   onClick: async () => {
      //     const tr = state.transactions.find(el => el._id === ctx.selectedRow?._id);
      //
      //     const modal = modals.handleOpenModal({
      //       ModalChildren: TransactionForm,
      //       modalChildrenProps: {
      //         title: 'Копіювання транзакції',
      //         filterOptions,
      //         defaultOption: filterOptions.findIndex(el => el.value === tr?.type),
      //         defaultState: tr,
      //         fillHeight: true,
      //         onSubmit: (data, o) => {
      //           service.create({
      //             data,
      //             onSuccess(d) {
      //               toast.success(`Транзакцію створено`);
      //               o?.close && modal?.onClose();
      //             },
      //           });
      //         },
      //       },
      //     });
      //   },
      // },
      // {
      //   name: 'deleteTr',
      //   title: 'Видалення транзакції',
      //   icon: 'delete',
      //   iconSize: '90%',
      //   type: 'onlyIcon',
      //   disabled: !ctx.selectedRow?._id,
      //   onClick: () => {
      //     service.deleteById({
      //       data: ctx.selectedRow?._id,
      //     });
      //   },
      // },
      // { separator: true },
      // {
      //   name: 'createIncomeTr',
      //   title: 'Дохід',
      //   icon: 'INCOME',
      //   iconSize: '90%',
      //   type: 'onlyIconFilled',
      //   disabled: false,
      //   onClick: () => {
      //     const modal = modals.handleOpenModal({
      //       ModalChildren: TransactionForm,
      //       modalChildrenProps: {
      //         title: 'Створити',
      //         filterOptions,
      //         defaultOption: 0,
      //         fillHeight: true,
      //         defaultState: { type: 'INCOME' },
      //         onSubmit: (data, o) => {
      //           service.create({
      //             data,
      //             onSuccess(d) {
      //               o?.close && modal?.onClose();
      //             },
      //           });
      //         },
      //       },
      //     });
      //   },
      // },
      // {
      //   name: 'createTransferTr',
      //   title: 'Переказ між рахунками',
      //   icon: 'TRANSFER',
      //   iconSize: '90%',
      //   type: 'onlyIconFilled',
      //   disabled: false,
      //   onClick: () => {
      //     const modal = modals.handleOpenModal({
      //       ModalChildren: TransactionForm,
      //       modalChildrenProps: {
      //         title: 'Створити нову',
      //         filterOptions,
      //         defaultOption: 1,
      //         fillHeight: true,
      //         defaultState: { type: 'TRANSFER' },
      //         onSubmit: (data, o) => {
      //           service.create({
      //             data,
      //             onSuccess(d) {
      //               o?.close && modal?.onClose();
      //             },
      //           });
      //         },
      //       },
      //     });
      //   },
      // },
      {
        name: 'openPriceList',
        title: 'Відкрити',
        icon: 'openInNew',
        iconSize: '90%',
        type: 'onlyIcon',
        disabled: false,
        onClick: async () => {
          const list = ctx.tableData?.find(l => l._id === ctx.selectedRow?._id);
          const modal = modals.handleOpenModal({
            ModalChildren: PriceListOverview,
            modalChildrenProps: {
              listId: ctx.selectedRow?._id,
              getTableSetting: () => ({}),
              // onSubmit: ({ data: itemOrArr, list }, o) => {
              //   if (isArray(itemOrArr)) {
              //     toast.warning('Array of prices passed. Dispatcher warn');
              //     return;
              //   }
              //   service.addItemToList({
              //     data: { data: createPriceDataForReq(itemOrArr).data, list },
              //     onSuccess: data => {
              //       console.log('IPriceListRes');
              //       o?.closeAfterSave && modal?.onClose();
              //       toast.success(`Price created`);
              //     },
              //   });
              // },
            },
          });
        },
      },

      {
        name: 'editPriceList',
        title: 'Редагувати',
        icon: 'edit',
        iconSize: '90%',
        type: 'onlyIcon',
        disabled: true,
      },
      {
        name: 'copyPriceList',
        title: 'Копіювати',
        icon: 'copy',
        iconSize: '90%',
        type: 'onlyIcon',
        disabled: true,
      },
      {
        name: 'archivePriceList',
        title: 'Архів',
        icon: 'archive',
        iconSize: '90%',
        type: 'onlyIcon',
        disabled: true,
      },
      { separator: true },
      {
        name: 'createPriceList',
        title: 'Новий',
        icon: 'plus',
        iconSize: '90%',
        type: 'onlyIconFilled',
        disabled: false,
        onClick: async () => {
          const modal = modals.handleOpenModal({
            ModalChildren: FormCreatePriceList,
            modalChildrenProps: {
              filterOptions: PriceManagementItemTypeFilterOptions,
              defaultData: { type: 'purchases' },
              onSubmit: (data, o) => {
                service.createList({
                  data,
                  onSuccess: data => {
                    o?.onSuccess && o?.onSuccess(data);
                    o?.closeAfterSave && modal?.onClose();
                    toast.success(`Created price list: ${data.label}`);
                  },
                });
              },
            },
          });
        },
      },
    ],

    [modals, service]
  );
};

export default usePriceManagementActionsCreator;
