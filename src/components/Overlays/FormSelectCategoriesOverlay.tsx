import styled from 'styled-components';
import FlexBox from '../atoms/FlexBox';
import { useDirectorySelector, useProductsSelector } from '../../redux/selectors.store';
import { ServiceName, useAppServiceProvider } from '../../hooks/useAppServices.hook';
import { FormEventHandler, useEffect, useMemo, useState } from 'react';
import { getIdRef } from '../../utils/data-transform';
import FormProductCategories from '../Forms/offers/FormProductCategories';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import { OverlayFooter, OverlayForm, OverlayHeader } from './index';

export interface FormSelectCategoriesOverlayProps extends OverlayHandlerReturn {}

const FormProductCategoriesOverlay = ({ onClose }: FormSelectCategoriesOverlayProps) => {
  const { currentOffer } = useProductsSelector();
  const { directory } = useDirectorySelector(ApiDirType.CATEGORIES_PROD);
  const service = useAppServiceProvider()[ServiceName.offers];
  const [state, setState] = useState<string[]>([]);

  const handleFormSubmit: FormEventHandler = ev => {
    ev.preventDefault();

    currentOffer &&
      service.updateById({
        data: { ...getIdRef(currentOffer), data: { categories: state }, refreshCurrent: true },
        onSuccess: (data, meta) => {
          onClose && onClose();
        },
      });
  };

  const canSubmit = useMemo(() => {
    const initialString = currentOffer?.categories?.map(c => c._id)?.toString();
    const currentString = state.toString();

    return initialString !== currentString;
  }, [currentOffer?.categories, state]);

  useEffect(() => {
    if (currentOffer?.categories) {
      setState(currentOffer?.categories.map(c => c._id));
    }
  }, [currentOffer?.categories]);

  return (
    <OverlayForm onSubmit={handleFormSubmit}>
      <OverlayHeader title={'Категорії'} onBackPress={onClose} canSubmit={canSubmit} okButton />

      <Content padding={'0 0 8px 0'} flex={1}>
        <FormProductCategories onChange={setState} options={directory} defaultData={state} />
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
