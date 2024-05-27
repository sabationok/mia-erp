import { FormEventHandler, useEffect, useMemo, useState } from 'react';
import { AccordionForm } from '../../FormArea/AccordionForm';
import styled from 'styled-components';
import { FlexUl } from '../../../atoms/FlexBox';
import { ServiceName, useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import { OfferFormAreaProps } from '../types';
import { useOfferLoadersProvider } from '../../../Modals/CreateOfferModal';
import { t } from '../../../../lang';
import { IProductFullFormData, OfferEntity } from '../../../../types/offers/offers.types';
import { getIdRef, sortIds } from '../../../../utils';
import OfferCategoriesSelector from '../categories/OfferCategoriesSelector';
import { useCurrentOffer } from '../../../../hooks';

export interface OfferFormCategoriesAreaProps extends OfferFormAreaProps<IProductFullFormData['categories']> {
  onSelect?: (id: string) => void;
  onChange?: (ids: string[]) => void;
  onSuccess?: (data: OfferEntity) => void;
}

export const OfferFormCategoriesArea = ({ offer, disabled }: OfferFormCategoriesAreaProps) => {
  const currentOffer = useCurrentOffer(offer);
  const loaders = useOfferLoadersProvider();
  const initIds = sortIds(currentOffer?.categories?.map(p => p._id));
  const service = useAppServiceProvider()[ServiceName.offers];
  const [categoriesIds, setCategoriesIds] = useState<string[]>(initIds);

  const canSubmit = useMemo(() => {
    return !!categoriesIds?.length && initIds?.join(',') !== sortIds(categoriesIds).join(',');
  }, [initIds, categoriesIds]);

  const handleFormSubmit: FormEventHandler = ev => {
    ev.preventDefault();

    currentOffer &&
      service.updateById({
        onLoading: loaders.onLoading('categories'),
        data: { ...getIdRef(currentOffer), data: { categories: categoriesIds }, refreshCurrent: true },
        onSuccess: (data, meta) => {},
      });
  };

  useEffect(() => {
    if (currentOffer?.categories) {
      setCategoriesIds(currentOffer?.categories.map(c => c._id));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <AccordionForm
      label={t('Categories')}
      onSubmit={handleFormSubmit}
      disabled={disabled}
      // onReset={handleReset}
      isLoading={loaders.isLoading?.properties}
      canSubmit={canSubmit}
      maxHeight={'300px'}
      isOpen={false}
    >
      <ListBox flex={1} overflow={'auto'}>
        <OfferCategoriesSelector onChangeIds={setCategoriesIds} offer={currentOffer} />
      </ListBox>
    </AccordionForm>
  );
};
const ListBox = styled(FlexUl)`
  padding-bottom: 8px;
`;
