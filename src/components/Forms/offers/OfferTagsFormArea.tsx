import { OfferFormAreaProps } from './types';
import { OfferEntity, OfferFullFormData } from '../../../types/offers/offers.types';
import { AccordionForm } from '../../atoms/FormArea/AccordionForm';
import { AppTagsSelect } from '../../atoms/AppTagsSelect';
import { useCurrentOffer } from '../../../hooks';
import { useOfferLoadersProvider } from '../../Modals/CreateOfferModal';
import { idsFromRefs, sortIds } from '../../../utils';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { FormEventHandler, useEffect, useMemo, useState } from 'react';
import { TagTypeEnum } from '../../../types/directories.types';
import { isArray } from 'lodash';

type OfferField = OfferFullFormData['tagsIds'] | OfferFullFormData['tags'];

export interface OfferTagsFormAreaProps extends OfferFormAreaProps<OfferField> {
  onSelect?: (id: string) => void;
  onChange?: (ids: string[]) => void;
  onSuccess?: (data: { data: OfferEntity }) => void;
}

const OfferTagsFormArea = ({ disabled, offer }: OfferTagsFormAreaProps) => {
  const Offer = useCurrentOffer(offer);
  const loaders = useOfferLoadersProvider();
  const initIds = sortIds(Offer?.tags?.map(p => p._id));
  const service = useAppServiceProvider()[ServiceName.offers];
  const [selectedIds, setSelectedIds] = useState<string[]>(initIds);

  const canSubmit = useMemo(() => {
    return !!selectedIds?.length && initIds?.join(',') !== sortIds(selectedIds).join(',');
  }, [initIds, selectedIds]);

  const handleFormSubmit: FormEventHandler = ev => {
    ev.preventDefault();
    ev.stopPropagation();

    Offer &&
      service.updateById({
        onLoading: loaders.onLoading('tags'),
        // onSuccess: (data, meta) => {},
        data: {
          data: {
            _id: Offer._id,
            data: { tagsIds: selectedIds },
          },
        },
      });
  };

  useEffect(() => {
    if (Offer?.tags) {
      setSelectedIds(idsFromRefs(Offer?.tags));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <AccordionForm
      label={'Tags'}
      isOpen={false}
      disabled={disabled}
      onSubmit={handleFormSubmit}
      canSubmit={canSubmit}
      isLoading={loaders.isLoading.tags}
    >
      <AppTagsSelect
        filterValue={{ type: TagTypeEnum.OFFER }}
        hideFilter
        value={selectedIds}
        onChangeIds={({ value }) => {
          setSelectedIds(isArray(value) ? value : [value]);
        }}
      />
    </AccordionForm>
  );
};
export default OfferTagsFormArea;

// const Inner = styled.div``;
// const ContainerChild = styled.div`
//   @container sidebar (width < calc(64 px + 12 ch)) {
//     display: none;
//   }
// `;
