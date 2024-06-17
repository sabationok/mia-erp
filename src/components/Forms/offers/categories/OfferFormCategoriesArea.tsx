import { FormEventHandler, useEffect, useMemo, useState } from 'react';
import { AccordionForm } from '../../../atoms/FormArea/AccordionForm';
import styled from 'styled-components';
import { FlexUl } from '../../../atoms/FlexBox';
import { ServiceName, useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import { OfferFormAreaProps } from '../types';
import { useOfferLoadersProvider } from '../../../Modals/CreateOfferModal';
import { t } from '../../../../lang';
import { OfferEntity, OfferFormRelatedFieldKeyEnum, OfferFullFormData } from '../../../../types/offers/offers.types';
import { idsFromRefs, sortIds } from '../../../../utils';
import OfferCategoriesSelector from './OfferCategoriesSelector';
import { useCurrentOffer } from '../../../../hooks';

export interface OfferFormCategoriesAreaProps
  extends OfferFormAreaProps<OfferFullFormData[OfferFormRelatedFieldKeyEnum.categoriesIds]> {
  onSelect?: (id: string) => void;
  onChange?: (ids: string[]) => void;
  onSuccess?: (data: OfferEntity) => void;
}

export const OfferFormCategoriesArea = ({ offer, disabled }: OfferFormCategoriesAreaProps) => {
  const Offer = useCurrentOffer(offer);
  const loaders = useOfferLoadersProvider();
  const initIds = sortIds(Offer?.categories?.map(p => p._id));
  const service = useAppServiceProvider()[ServiceName.offers];
  const [categoriesIds, setCategoriesIds] = useState<string[]>(initIds);

  const canSubmit = useMemo(() => {
    return !!categoriesIds?.length && initIds?.join(',') !== sortIds(categoriesIds).join(',');
  }, [initIds, categoriesIds]);

  const handleFormSubmit: FormEventHandler = ev => {
    ev.preventDefault();

    Offer &&
      service.updateById({
        onLoading: loaders.onLoading('categories'),
        data: {
          data: {
            _id: Offer._id,
            data: { categoriesIds },
          },
        },
        onSuccess: (data, meta) => {},
      });
  };

  useEffect(() => {
    if (Offer?.categories) {
      setCategoriesIds(idsFromRefs(Offer?.categories));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <AccordionForm
      label={t('Categories')}
      onSubmit={handleFormSubmit}
      disabled={disabled}
      isLoading={loaders.isLoading?.categories}
      canSubmit={canSubmit}
      maxHeight={'300px'}
      isOpen={false}
    >
      <ListBox flex={1} overflow={'auto'}>
        <OfferCategoriesSelector onChangeIds={setCategoriesIds} offer={Offer} />
      </ListBox>
    </AccordionForm>
  );
};
const ListBox = styled(FlexUl)`
  padding-bottom: 8px;
`;
