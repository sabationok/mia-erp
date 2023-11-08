import FormProductImagesComponent from './FormProductImagesComponent';
import { FormEventHandler, useState } from 'react';
import { OverlayHandlerReturn } from '../../AppPages/PageProductOverview/PageCurrentProductProvider';
import { IProduct, IProductImage } from '../../../redux/products/products.types';
import styled, { useTheme } from 'styled-components';
import { useProductsSelector } from '../../../redux/selectors.store';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { getIdRef } from '../../../utils/dataTransform';
import { OverlayFooter, OverlayHeader } from './components';

export interface FormProductImagesOverlayProps extends OverlayHandlerReturn {
  product?: IProduct;
}

const FormProductImagesOverlay: React.FC<FormProductImagesOverlayProps> = ({ onClose }) => {
  const currentProduct = useProductsSelector().currentProduct;
  const service = useAppServiceProvider()[ServiceName.products];
  const theme = useTheme();

  const [state, setState] = useState<Partial<IProductImage>[]>(currentProduct?.images || []);

  const handleFormSubmit: FormEventHandler = ev => {
    ev.preventDefault();

    currentProduct &&
      service.updateById({
        data: { ...getIdRef(currentProduct), data: { images: state as IProductImage[] }, refreshCurrent: true },
        onSuccess: (data, meta) => {
          onClose && onClose();
        },
      });
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <FormProductImagesComponent
        initialData={state}
        onClose={onClose}
        onChangeState={setState}
        contentContainerStyle={{
          flex: 1,
          borderTop: `1px solid ${theme.sideBarBorderColor}`,
          borderBottom: `1px solid ${theme.sideBarBorderColor}`,
        }}
        renderHeader={<OverlayHeader title={'Зображення'} onClose={onClose} showSubmitButton />}
        FooterComponent={props => {
          return <OverlayFooter onCreatePress={props.onAddNewImageSetPress} />;
        }}
      />
    </Form>
  );
};

const Form = styled.form`
  flex: 1;

  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 480px;

  padding: 0 8px;

  background-color: ${p => p.theme.sideBarBackgroundColor};
`;
// const Content = styled(FlexBox)`
//   border-top: 1px solid ${p => 'tomato' || p.theme.sideBarBorderColor};
//   border-bottom: 1px solid ${p => 'tomato' || p.theme.sideBarBorderColor};
// `;
export default FormProductImagesOverlay;
