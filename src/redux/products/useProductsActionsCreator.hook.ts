import { useModalProvider } from '../../components/ModalProvider/ModalProvider';
import { ProductsService } from './useProductsService.hook';
import { useCallback } from 'react';
import { TableActionCreator } from '../../components/TableList/tableTypes.types';
import { IProduct } from './products.types';
import { useProductsSelector } from '../selectors.store';
import ProductForm, { ProductFilterOpt } from '../../components/Forms/FormCreateProduct';

export type ProductsActionsCreator = TableActionCreator<IProduct>;
export const ProductPriceTypeFilterOptions: ProductFilterOpt[] = [
  { label: 'DEFAULT', value: 'DEFAULT' },
  { label: 'COMMISSION', value: 'COMMISSION', disabled: true },
  { label: 'COMMISSION\n FIX', value: 'COMMISSION_FIX', disabled: true },
];
const useProductsActionsCreator = (service: ProductsService): ProductsActionsCreator => {
  const state = useProductsSelector();
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
        name: 'editProduct',
        title: 'Редагувати',
        icon: 'edit',
        iconSize: '90%',
        type: 'onlyIcon',
        disabled: false,
      },
      {
        name: 'copyProduct',
        title: 'Копіювати',
        icon: 'copy',
        iconSize: '90%',
        type: 'onlyIcon',
        disabled: false,
      },
      {
        name: 'archiveProduct',
        title: 'Архів',
        icon: 'archive',
        iconSize: '90%',
        type: 'onlyIcon',
        disabled: false,
      },
      { separator: true },
      {
        name: 'createProduct',
        title: 'Новий',
        icon: 'plus',
        iconSize: '90%',
        type: 'onlyIconFilled',
        disabled: false,
        onClick: async () => {
          const modal = modals.handleOpenModal({
            ModalChildren: ProductForm,
            modalChildrenProps: {
              title: 'Створити',
              filterOptions: ProductPriceTypeFilterOptions,
              defaultState: { type: 'DEFAULT' },
              onSubmit: (data, o) => {
                service.create({
                  data,
                  onSuccess(d) {
                    o?.closeAfterSave && modal?.onClose();
                  },
                });
              },
              fillHeight: true,
            },
          });
        },
      },
    ],

    [modals, service]
  );
};

export { useProductsActionsCreator };
