import { OverlayHandlerReturn } from '../../AppPages/PageProductOverview/PageCurrentProductProvider';
import styled, { useTheme } from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import { useDirectoriesSelector, useProductsSelector } from '../../../redux/selectors.store';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { FormEventHandler, useEffect, useState } from 'react';
import { ExtractId } from '../../../utils/dataTransform';
import FormProductCategories from './FormProductCategories';
import { ApiDirType } from '../../../redux/APP_CONFIGS';
import { OverlayForm, OverlayHeader } from './components';

export interface FormSelectCategoriesOverlayProps extends OverlayHandlerReturn {}

const FormProductCategoriesOverlay = ({ onClose }: FormSelectCategoriesOverlayProps) => {
  const { currentProduct } = useProductsSelector();
  const { directory } = useDirectoriesSelector(ApiDirType.CATEGORIES_PROD);
  const service = useAppServiceProvider()[ServiceName.products];
  const theme = useTheme();

  const [state, setState] = useState<string[]>();

  useEffect(() => {
    if (currentProduct?.categories) {
      setState(currentProduct?.categories.map(c => c._id));
    }
  }, [currentProduct?.categories]);

  const handleFormSubmit: FormEventHandler = ev => {
    ev.preventDefault();

    currentProduct &&
      service.updateById({
        data: { ...ExtractId(currentProduct), data: { categories: state }, refreshCurrent: true },
        onSuccess: (data, meta) => {
          onClose && onClose();
        },
      });
  };

  return (
    <OverlayForm onSubmit={handleFormSubmit}>
      <OverlayHeader title={'Категорії'} onClose={onClose} showSubmitButton />

      <Content padding={'0 0 8px 0'} flex={1}>
        <FormProductCategories onChange={setState} options={directory} defaultData={state} />
      </Content>
    </OverlayForm>
  );
};

const Content = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.sideBarBorderColor};
  border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
`;
export default FormProductCategoriesOverlay;
