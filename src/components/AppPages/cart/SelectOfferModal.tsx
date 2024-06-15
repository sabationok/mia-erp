import { WarehouseEntity } from '../../../types/warehousing/warehouses.types';
import { CreatedModal, useModalService } from '../../../Providers/ModalProvider/ModalProvider';
import { useCart } from '../../../Providers/CartProvider';
import { useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { AppModuleName } from '../../../redux/reduxTypes.types';
import { useAppRouter } from '../../../hooks';
import { useEffect, useMemo, useState } from 'react';
import { OfferEntity } from '../../../types/offers/offers.types';
import { useOffersTableSettings } from '../offers/PageOffers';
import { countOrderSlotValues, setValueByPath } from '../../../utils';
import DrawerBase from '../../atoms/OverlayBase';
import TableList from '../../TableList/TableList';
import { FooterSummary } from './FooterSummary';
import { OverlayFooter } from '../../atoms';
import { SelectVariationModal } from './SelectVariationModal';
import { GetAllOffersQuery } from '../../../api';
import { CartSlotId } from '../../../redux/cart/cart.slice';

export default function SelectOfferModal({
  warehouse,
  slotId,
  onClose,
}: { warehouse?: WarehouseEntity; slotId?: CartSlotId } & CreatedModal) {
  const cart = useCart();
  const service = useAppServiceProvider().get(AppModuleName.offers);
  const { getAll } = service;
  const currentSlot = cart.actions.getSlotWithMethods(slotId);
  // const offersState = useProductsSelector();
  const router = useAppRouter();
  // const loaders = useLoaders();
  const [selected, setSelected] = useState<OfferEntity>();
  const [quantity, setQuantity] = useState(currentSlot?.quantity ?? 1);

  const modalSrv = useModalService();

  const { tableConfig, isLoading, searchParams } = useOffersTableSettings({
    searchState: warehouse?.label
      ? { search: warehouse?.label ?? '', param: { dataPath: 'warehouse.label', label: 'Склад' } }
      : undefined,
  });

  const counted = useMemo(() => {
    return countOrderSlotValues({ ...currentSlot, quantity: quantity, ...selected?.price });
  }, [currentSlot, quantity, selected?.price]);

  useEffect(() => {
    const params: GetAllOffersQuery = setValueByPath(searchParams?.param?.dataPath, searchParams?.search);

    if (warehouse) {
      getAll({
        data: {
          refresh: true,
          params: params,
        },
      });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <DrawerBase title={'Select offer'} fillHeight okButton onBackPress={onClose}>
      <TableList
        {...tableConfig}
        isLoading={isLoading?.offers}
        checkBoxes={false}
        selectedRow={selected}
        onRowClick={data => {
          if (data?.rowData) {
            data?.rowData?._id &&
              router.push({
                query: {
                  offerId: data?.rowData?._id,
                },
              });
            setSelected(data?.rowData);
          }
        }}
      />

      {selected && <FooterSummary slot={counted} onChangeQuantity={setQuantity} />}

      <OverlayFooter
        canAccept={!!selected}
        onAcceptPress={() => {
          if (selected) {
            modalSrv.create(SelectVariationModal, {
              offer: selected,
            });
          }
        }}
      />
    </DrawerBase>
  );
}
