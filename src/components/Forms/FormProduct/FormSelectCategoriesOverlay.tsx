import { OverlayHandlerReturn } from '../../AppPages/PageProductOverview/PageCurrentProductProvider';
import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import { useDirectoriesSelector, useProductsSelector } from '../../../redux/selectors.store';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { FormEventHandler, useEffect, useMemo, useState } from 'react';
import { getIdRef } from '../../../utils/data-transform';
import FormProductCategories from './FormProductCategories';
import { ApiDirType } from '../../../redux/APP_CONFIGS';
import { OverlayFooter, OverlayForm, OverlayHeader } from './components';

export interface FormSelectCategoriesOverlayProps extends OverlayHandlerReturn {}

const FormProductCategoriesOverlay = ({ onClose }: FormSelectCategoriesOverlayProps) => {
  const { currentProduct } = useProductsSelector();
  const { directory } = useDirectoriesSelector(ApiDirType.CATEGORIES_PROD);
  const service = useAppServiceProvider()[ServiceName.products];
  const [state, setState] = useState<string[]>([]);

  const handleFormSubmit: FormEventHandler = ev => {
    ev.preventDefault();

    currentProduct &&
      service.updateById({
        data: { ...getIdRef(currentProduct), data: { categories: state }, refreshCurrent: true },
        onSuccess: (data, meta) => {
          onClose && onClose();
        },
      });
  };

  const canSubmit = useMemo(() => {
    const initialString = currentProduct?.categories?.map(c => c._id)?.toString();
    const currentString = state.toString();

    return initialString !== currentString;
  }, [currentProduct?.categories, state]);

  useEffect(() => {
    if (currentProduct?.categories) {
      setState(currentProduct?.categories.map(c => c._id));
    }
  }, [currentProduct?.categories]);

  return (
    <OverlayForm onSubmit={handleFormSubmit}>
      <OverlayHeader title={'Категорії'} onClose={onClose} canSubmit={canSubmit} showSubmitButton />

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
