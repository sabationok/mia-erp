import { useModalProvider } from '../components/ModalProvider/ModalProvider';
import useStorageServiceHook from './useStorageService.hook';
import { useCallback } from 'react';
import { TableActionCreator } from '../components/TableList/tableTypes.types';
import { IStorageItem, StorageItemFilterOption } from '../redux/products/products.types';
import { useProductsSelector } from '../redux/selectors.store';
import ProductForm from '../components/Forms/FormCreateProduct';
import ProductOverview from '../components/Modals/ProductOverview';
import { omit } from 'lodash';

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
            ModalChildren: ProductOverview,
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
      {
        name: 'editProduct',
        title: 'Змінити',
        icon: 'edit',
        iconSize: '90%',
        type: 'onlyIcon',
        disabled: !ctx?.selectedRow?._id,
        onClick: async () => {
          const modal = modals.handleOpenModal({
            ModalChildren: ProductForm,
            modalChildrenProps: {
              title: 'Копіювати',
              filterOptions: StorageItemTypeFilterOptions,
              defaultState: omit(
                state.products.find(p => p._id === ctx?.selectedRow?._id),
                ['_id', 'createdAt', 'updatedAt']
              ),
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
      {
        name: 'copyProduct',
        title: 'Копіювати',
        icon: 'copy',
        iconSize: '90%',
        type: 'onlyIcon',
        disabled: !ctx?.selectedRow?._id,
        onClick: async () => {
          const modal = modals.handleOpenModal({
            ModalChildren: ProductForm,
            modalChildrenProps: {
              title: 'Змінити',
              filterOptions: StorageItemTypeFilterOptions,
              defaultState: omit(
                state.products.find(p => p._id === ctx?.selectedRow?._id),
                ['createdAt', 'updatedAt']
              ),
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
