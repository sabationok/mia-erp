import { useModalProvider } from '../components/ModalProvider/ModalProvider';
import { useCallback } from 'react';
import { TableActionCreator } from '../components/TableList/tableTypes.types';
import { IProduct, ProductTypeEnum } from '../redux/products/products.types';
import { useProductsSelector } from '../redux/selectors.store';
import FormCreateProduct from '../components/Forms/FormCreateProduct';
import { productsFilterOptions } from '../data/directories.data';
import { useNavigate } from 'react-router-dom';
import { ServiceName, useAppServiceProvider } from './useAppServices.hook';
import { ToastService } from '../services';
import { createProductFromData } from '../utils/dataTransform';

export type ProductsActionsCreator = TableActionCreator<IProduct>;

const useProductsActionsCreator = (): ProductsActionsCreator => {
  const service = useAppServiceProvider()[ServiceName.products];
  const navigate = useNavigate();
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
          ctx.selectedRow?._id && navigate(ctx.selectedRow?._id);
          // modals.handleOpenModal({
          //   ModalChildren: ProductOverview,
          //   modalChildrenProps: {
          //     title: 'Перегляд продукту',
          //     product: state.products.find(el => el._id === ctx.selectedRow?._id),
          //     // filterOptions: productsFilterOptions,
          //     // defaultOption: StorageItemTypeFilterOptions.findIndex(el => el.value === product?.type),
          //     // onSubmit: data => {
          //     //   service.updateById({
          //     //     data,
          //     //     onSuccess(d) {},
          //     //   });
          //     // },
          //   },
          // });
        },
      },
      {
        name: 'editProduct',
        title: 'Змінити',
        icon: 'edit',
        iconSize: '90%',
        type: 'onlyIcon',
        disabled: !ctx?.selectedRow?._id,
        onClick: () => {
          const product = state.products.find(p => p._id === ctx?.selectedRow?._id);

          const modal = modals.handleOpenModal({
            ModalChildren: FormCreateProduct,
            modalChildrenProps: {
              title: 'Копіювати',
              _id: ctx?.selectedRow?._id,
              filterOptions: productsFilterOptions,
              defaultState: product ? createProductFromData(product) : undefined,
              onSubmit: (data, o) => {
                service.updateById({
                  data,
                  onSuccess(d) {
                    o?.closeAfterSave && modal?.onClose();
                    ToastService.success(`Product updated`);
                  },
                  onError: e => {
                    console.error('Product apdate action', e);
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
        onClick: () => {
          const product = state.products.find(p => p._id === ctx?.selectedRow?._id);

          const modal = modals.handleOpenModal({
            ModalChildren: FormCreateProduct,
            modalChildrenProps: {
              title: 'Змінити',
              filterOptions: productsFilterOptions,
              defaultState: product ? createProductFromData(product) : undefined,

              onSubmit: (data, o) => {
                service.updateById({
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
        onClick: () => {
          const modal = modals.handleOpenModal({
            ModalChildren: FormCreateProduct,
            modalChildrenProps: {
              title: 'Створити',
              filterOptions: productsFilterOptions,
              defaultState: { type: ProductTypeEnum.GOODS },
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

    [modals, navigate, service, state.products]
  );
};

export default useProductsActionsCreator;
