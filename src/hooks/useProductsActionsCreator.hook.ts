import { useModalProvider } from '../components/ModalProvider/ModalProvider';
import { useCallback } from 'react';
import { TableActionCreator } from '../components/TableList/tableTypes.types';
import { IProduct } from '../types/products.types';
import { useNavigate } from 'react-router-dom';
import { ServiceName, useAppServiceProvider } from './useAppServices.hook';
import { t } from '../lang';
import EditOfferModal from '../components/Modal/EditOfferModal';
import CreateOfferModal from '../components/Modal/CreateOfferModal';

export type ProductsActionsCreator = TableActionCreator<IProduct>;

const useProductsActionsCreator = (): ProductsActionsCreator => {
  const service = useAppServiceProvider()[ServiceName.products];
  const navigate = useNavigate();
  const modals = useModalProvider();

  return useCallback(
    ctx => [
      {
        name: 'refreshData',
        title: t('Refresh data'),
        icon: 'refresh',
        type: 'onlyIcon',
        onClick: () => {
          service.getAll({ data: { refresh: true }, onLoading: ctx.onRefresh });
        },
      },
      { separator: true },

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
        onClick: () => {
          ctx?.selectedRow?._id &&
            modals.handleOpenModal({
              ModalChildren: EditOfferModal,
              modalChildrenProps: {
                title: 'Змінити',
                _id: ctx?.selectedRow?._id,

                // defaultState: formData,
                // onSubmit: (data, o) => {
                //   service.updateById({
                //     data,
                //     onSuccess(d) {
                //       o?.closeAfterSave && modal?.onClose();
                //       ToastService.success(`Product updated`);
                //     },
                //     onError: e => {
                //       console.error('Product apdate action', e);
                //     },
                //   });
                // },
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
          ctx?.selectedRow?._id &&
            modals.handleOpenModal({
              ModalChildren: EditOfferModal,
              modalChildrenProps: {
                _id: ctx?.selectedRow?._id,
                copy: true,
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
          modals.open({
            ModalChildren: CreateOfferModal,
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
