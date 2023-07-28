import { useModalProvider } from '../../components/ModalProvider/ModalProvider';
import useStorageServiceHook from './useStorageService.hook';
import { useCallback } from 'react';
import { TableActionCreator } from '../../components/TableList/tableTypes.types';
import { IStorageItem, StorageItemFilterOption } from './products.types';
import { useProductsSelector } from '../selectors.store';
import ProductForm from '../../components/Forms/FormCreateProduct';
import ProductReviewModal from '../../components/Modals/ProductReviewModal';

export type StorageActionsCreator = TableActionCreator<IStorageItem>;

export const StorageItemTypeFilterOptions: StorageItemFilterOption[] = [
  { label: 'GOODS', value: 'GOODS' },
  { label: 'SERVICE', value: 'SERVICE' },
];

const useStorageActionsCreator = (): StorageActionsCreator => {
  const service = useStorageServiceHook();
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
      {
        name: 'reviewProduct',
        title: 'Перегляд продукту',
        icon: 'openInNew',
        disabled: !ctx.selectedRow?._id,
        type: 'onlyIcon',
        onClick: () => {
          const modal = modals.handleOpenModal({
            ModalChildren: ProductReviewModal,
            modalChildrenProps: {
              title: 'Перегляд продукту',
              product: state.products.find(el => el._id === ctx.selectedRow?._id),
              // filterOptions: StorageItemTypeFilterOptions,
              // defaultOption: StorageItemTypeFilterOptions.findIndex(el => el.value === product?.type),
              // onSubmit: data => {
              //   service.updateById({
              //     data,
              //     onSuccess(d) {},
              //   });
              // },
            },
          });
        },
      },
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
      // {
      //   name: 'editProduct',
      //   title: 'Редагувати',
      //   icon: 'edit',
      //   iconSize: '90%',
      //   type: 'onlyIcon',
      //   disabled: false,
      // },
      {
        name: 'copyProduct',
        title: 'Копіювати',
        icon: 'copy',
        iconSize: '90%',
        type: 'onlyIcon',
        disabled: true,
      },
      {
        name: 'archiveProduct',
        title: 'Архів',
        icon: 'archive',
        iconSize: '90%',
        type: 'onlyIcon',
        disabled: true,
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
              filterOptions: StorageItemTypeFilterOptions,
              defaultState: { type: 'GOODS' },
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

    [modals, service, state.products]
  );
};

export default useStorageActionsCreator;
