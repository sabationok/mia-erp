import { useModalProvider } from '../Providers/ModalProvider/ModalProvider';
import { useCallback } from 'react';
import { TableActionsCreator } from '../components/TableList/tableTypes.types';
import { OfferEntity } from '../types/offers/offers.types';
import { ServiceName, useAppServiceProvider } from './useAppServices.hook';
import { t } from '../lang';
import EditOfferModal from '../components/Modals/EditOfferModal';
import CreateOfferModal from '../components/Modals/CreateOfferModal';
import { useAppRouter } from './useRouter.hook';
import { useOffersSelector } from '../redux/selectors.store';
import { UseLoadersReturn } from '../Providers/Loaders/useLoaders.hook';

export type OffersActionsCreator = TableActionsCreator<OfferEntity>;

export const useOffersActionsCreator = ({
  loaders,
}: { loaders?: UseLoadersReturn<'refresh' | 'offer'> } = {}): OffersActionsCreator => {
  const service = useAppServiceProvider().get(ServiceName.offers);
  const router = useAppRouter();
  const modals = useModalProvider();
  const stateMap = useOffersSelector().dataMap;

  return useCallback(
    ctx => {
      const currentId = ctx.selectedRow?._id;
      const Offer = currentId ? stateMap?.[currentId] : undefined;

      return [
        {
          name: 'refreshData',
          title: t('Refresh data'),
          icon: 'refresh',
          type: 'onlyIcon',
          onClick: () => {
            service.getAll({
              data: { refresh: true },
              onLoading: loaders ? loaders.onLoading('refresh') : ctx.onRefresh,
            });
          },
        },
        { separator: true },

        {
          name: 'review',
          title: 'Перегляд продукту',
          icon: 'openInNew',
          disabled: !currentId,
          type: 'onlyIcon',
          navTo: `/app/${router.params.permissionId}/offers/` + currentId,
        },

        {
          name: 'edit',
          title: 'Змінити',
          icon: 'edit',
          iconSize: '90%',
          type: 'onlyIcon',
          disabled: !currentId,
          onClick: () => {
            if (Offer) {
              modals.create(EditOfferModal, {
                offer: Offer,
              });
            } else if (currentId) {
              service.getOne({
                data: { data: { params: { _id: currentId } } },
                onLoading: loaders ? loaders.onLoading('offer') : ctx.onRefresh,
                onSuccess: ({ data }) => {
                  // router.push({ query: { offerId: data._id } });

                  modals.create(EditOfferModal, {
                    offer: data,
                  });
                },
              });
            }
          },
        },
        {
          name: 'copy',
          title: 'Копіювати',
          icon: 'copy',
          iconSize: '90%',
          type: 'onlyIcon',
          disabled: !Offer,
          onClick: () => {
            Offer &&
              modals.create(EditOfferModal, {
                offer: Offer,
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

    [loaders, modals, router, service, stateMap]
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
