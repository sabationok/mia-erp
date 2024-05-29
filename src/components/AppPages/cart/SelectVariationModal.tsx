import { OverlayFooter } from 'components/atoms';
import VariationsTab from '../offers/tabs/VariationsTab';
import { FooterSummary } from './FooterSummary';
import ModalBase from '../../atoms/Modal';
import { countOrderSlotValues } from '../../../utils';
import { useMemo, useState } from 'react';
import { useCart } from '../../../Providers/CartProvider';
import { useLoaders } from '../../../Providers/Loaders/useLoaders.hook';
import { useTheme } from 'styled-components';
import { useAppQuery, useCurrentOffer } from '../../../hooks';
import { VariationEntity } from '../../../types/offers/variations.types';
import { OfferEntity } from '../../../types/offers/offers.types';
import { WarehouseEntity } from '../../../types/warehousing/warehouses.types';
import { useModalProvider } from '../../../Providers/ModalProvider/ModalProvider';

export const SelectVariationModal = ({
  offer,
  warehouse,
  slotId,
}: {
  offer?: OfferEntity;
  warehouse?: WarehouseEntity;
  slotId?: string;
}) => {
  const query = useAppQuery();
  const modalSrv = useModalProvider();
  const Offer = useCurrentOffer(offer);
  const [selected, setSelected] = useState<VariationEntity>();
  const theme = useTheme();
  const loaders = useLoaders();
  const cart = useCart();
  const currentSlot = cart.actions.getSlotByVariationId(selected?._id);

  const counted = useMemo(() => {
    return countOrderSlotValues({
      ...currentSlot,
      quantity: 1,
      ...(selected?.price ?? offer?.price),
      offer: offer,
      variation: selected,
      warehouse: warehouse ?? offer?.warehouse,
    });
  }, [cart.actions, offer, selected, warehouse]);

  return (
    <ModalBase title={`Select variation | ${Offer?.label}`} fillHeight>
      <VariationsTab offer={Offer} onSelect={setSelected} selected={selected} />

      <FooterSummary slot={counted} />

      <OverlayFooter
        canAccept={!!selected}
        onAcceptPress={() => {
          if (selected?._id) {
            if (counted?.tempId?.includes(selected?._id)) {
              counted.quantity !== currentSlot.quantity && cart.actions.update(counted);
            } else if (counted?.warehouse) {
              cart.actions.addSlot(counted);
            }

            // modalSrv.clearStack();
          } else {
          }
        }}
      />
    </ModalBase>
  );
};
