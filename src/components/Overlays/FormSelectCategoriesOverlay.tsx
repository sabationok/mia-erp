import styled from 'styled-components';
import FlexBox from '../atoms/FlexBox';
import { useDirectorySelector, useProductsSelector } from '../../redux/selectors.store';
import { ServiceName, useAppServiceProvider } from '../../hooks/useAppServices.hook';
import { FormEventHandler, useEffect, useMemo, useState } from 'react';
import { getIdRef, sortIds } from '../../utils';
import FormProductCategories from '../Forms/offers/FormProductCategories';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import { OverlayFooter, OverlayForm, OverlayHeader } from './index';
import { CreatedOverlay } from '../../Providers/Overlay/OverlayStackProvider';

export interface FormSelectCategoriesOverlayProps extends CreatedOverlay {}

const FormProductCategoriesOverlay = ({ onClose }: FormSelectCategoriesOverlayProps) => {
  const { currentOffer } = useProductsSelector();
  const { directory } = useDirectorySelector(ApiDirType.CATEGORIES_PROD);
  const service = useAppServiceProvider()[ServiceName.offers];
  const initIds = sortIds(currentOffer?.categories?.map(c => c._id));

  const [categoriesIds, setCategoriesIds] = useState<string[]>(initIds);

  const handleFormSubmit: FormEventHandler = ev => {
    ev.preventDefault();

    currentOffer &&
      service.updateById({
        data: { ...getIdRef(currentOffer), data: { categories: categoriesIds }, refreshCurrent: true },
        onSuccess: (data, meta) => {
          onClose && onClose();
        },
      });
  };

  const canSubmit = useMemo(() => {
    return sortIds(categoriesIds)?.join('.') !== initIds?.join('.');
  }, [categoriesIds, initIds]);

  useEffect(() => {
    if (currentOffer?.categories) {
      setCategoriesIds(currentOffer?.categories.map(c => c._id));
    }
  }, [currentOffer?.categories]);

  return (
    <OverlayForm onSubmit={handleFormSubmit}>
      <OverlayHeader title={'Категорії'} onBackPress={onClose} canSubmit={canSubmit} okButton />

      <Content padding={'0 0 8px 0'} flex={1}>
        <FormProductCategories onChange={setCategoriesIds} options={directory} defaultData={categoriesIds} />
      </Content>

      <OverlayFooter canSubmit={canSubmit} />
    </OverlayForm>
  );
};

const Content = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.sideBarBorderColor};
  border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
`;
export default FormProductCategoriesOverlay;
