import FormProductImagesComponent from './FormProductImagesComponent';
import { FormEventHandler, useState } from 'react';
import { OverlayHandlerReturn } from '../../AppPages/PageProductOverview/PageCurrentProductProvider';
import { IProduct, IProductImage } from '../../../redux/products/products.types';
import styled from 'styled-components';
import { useProductsSelector } from '../../../redux/selectors.store';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { ExtractId } from '../../../utils/dataTransform';
import FlexBox from 'components/atoms/FlexBox';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';

export interface FormProductImagesOverlayProps extends OverlayHandlerReturn {
  product?: IProduct;
}

const FormProductImagesOverlay: React.FC<FormProductImagesOverlayProps> = ({ onClose }) => {
  const currentProduct = useProductsSelector().currentProduct;
  const service = useAppServiceProvider()[ServiceName.products];

  const [state, setState] = useState<Partial<IProductImage>[]>(currentProduct?.images || []);

  const handleFormSubmit: FormEventHandler = ev => {
    ev.preventDefault();

    currentProduct &&
      service.updateById({
        data: { ...ExtractId(currentProduct), data: { images: state as IProductImage[] }, refreshCurrent: true },
        onSuccess: (data, meta) => {
          onClose && onClose();
        },
      });
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Header></Header>

      <Content flex={1} fillWidth>
        <FormProductImagesComponent initialData={state} onChangeState={setState} />
      </Content>

      <Footer fxDirection={'row'} gap={8} padding={'8px 0'} justifyContent={'stretch'}>
        <ButtonIcon variant={'onlyIconFilled'} icon={'close'} size={'36px'} onClick={onClose} />

        <ButtonIcon variant={'outlinedLarge'} type={'submit'} textTransform={'uppercase'} fontWeight={600}>
          {'Прийняти'}
        </ButtonIcon>
      </Footer>
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
const Header = styled(FlexBox)``;
const Content = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.sideBarBorderColor};
  border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
`;
const Footer = styled(FlexBox)``;
export default FormProductImagesOverlay;
