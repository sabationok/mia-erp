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
    ctx => {
      const currentId = ctx.selectedRow?._id;
      return [
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
          disabled: !currentId,
          type: 'onlyIcon',
          href: `/app/${router.params.permissionId}/offers/` + currentId,
        },

        {
          name: 'editProduct',
          title: 'Змінити',
          icon: 'edit',
          iconSize: '90%',
          type: 'onlyIcon',
          disabled: !currentId,
          onClick: () => {
            if (currentId) {
              service.getOne({
                data: { data: { params: { _id: currentId } } },
                onLoading: ctx.onRefresh,
                onSuccess: ({ data }) => {
                  router.push({ query: { offerId: data._id } });
                  modals.create(EditOfferModal, {
                    _id: data._id,
                  });
                },
              });
            }
          },
        },
        {
          name: 'copyProduct',
          title: 'Копіювати',
          icon: 'copy',
          iconSize: '90%',
          type: 'onlyIcon',
          disabled: !currentId,
          onClick: () => {
            currentId &&
              modals.create(EditOfferModal, {
                _id: currentId,
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
      ];
    },

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
