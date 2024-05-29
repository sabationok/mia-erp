import { useModalProvider } from '../Providers/ModalProvider/ModalProvider';
import { useCallback } from 'react';
import { TableActionsCreator } from '../components/TableList/tableTypes.types';
import { OfferEntity } from '../types/offers/offers.types';
import { ServiceName, useAppServiceProvider } from './useAppServices.hook';
import { t } from '../lang';
import EditOfferModal from '../components/Modals/EditOfferModal';
import CreateOfferModal from '../components/Modals/CreateOfferModal';
import { useAppRouter } from './useRouter.hook';

export type OffersActionsCreator = TableActionsCreator<OfferEntity>;

const useOffersActionsCreator = (): OffersActionsCreator => {
  const service = useAppServiceProvider()[ServiceName.offers];
  const router = useAppRouter();
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
        href: `/app/${router.params.permissionId}/offers/` + ctx.selectedRow?._id,
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
            modals.create(EditOfferModal, {
              title: 'Змінити',
              _id: ctx?.selectedRow?._id,
              fillHeight: true,

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
            modals.create(EditOfferModal, {
              _id: ctx?.selectedRow?._id,
              copy: true,
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
          modals.create(CreateOfferModal);
        },
      },
    ],

    [modals, router, service]
  );
};

export default useOffersActionsCreator;

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
