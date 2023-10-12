import { useModalProvider } from '../components/ModalProvider/ModalProvider';
import { useCallback } from 'react';
import { TableActionCreator } from '../components/TableList/tableTypes.types';
import { IProduct, ProductTypeEnum } from '../redux/products/products.types';
import FormCreateProduct from '../components/Forms/FormProduct/FormCreateProduct';
import { productsFilterOptions } from '../data/modalFilterOptions.data';
import { useNavigate } from 'react-router-dom';
import { ServiceName, useAppServiceProvider } from './useAppServices.hook';
import { ToastService } from '../services';
import { createProductFormData } from '../utils/dataTransform';
import { createApiCall, ProductsApi } from '../api';

export type ProductsActionsCreator = TableActionCreator<IProduct>;

const useProductsActionsCreator = (): ProductsActionsCreator => {
  const service = useAppServiceProvider()[ServiceName.products];
  const navigate = useNavigate();
  // const state = useProductsSelector();
  const modals = useModalProvider();

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
          const res = await createApiCall({ data: ctx?.selectedRow?._id }, ProductsApi.getFullInfoById, ProductsApi);
          if (!res?.data.data) {
            return;
          }
          console.log(res?.data.data);
          const formData = createProductFormData(res?.data.data);

          const modal = modals.handleOpenModal({
            ModalChildren: FormCreateProduct,
            modalChildrenProps: {
              title: 'Змінити',
              _id: ctx?.selectedRow?._id,
              filterOptions: productsFilterOptions,
              defaultState: formData,
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
        onClick: async () => {
          const res = await createApiCall({ data: ctx?.selectedRow?._id }, ProductsApi.getFullInfoById, ProductsApi);
          if (!res?.data.data) {
            return;
          }
          const formData = createProductFormData(res?.data.data);

          const modal = modals.handleOpenModal({
            ModalChildren: FormCreateProduct,
            modalChildrenProps: {
              title: 'Змінити',
              filterOptions: productsFilterOptions,
              defaultState: formData,

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

    [modals, navigate, service]
  );
};

export default useProductsActionsCreator;

// const currentProduct=useProductsSelector().currentProduct

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
