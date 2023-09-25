import FormProductImagesComponent from './FormProductImagesComponent';
import { FormEventHandler, useState } from 'react';
import { OverlayHandlerReturn } from '../../AppPages/PageProductOverview/PageCurrentProductProvider';
import { IProduct, IProductImage } from '../../../redux/products/products.types';
import styled, { useTheme } from 'styled-components';
import { useProductsSelector } from '../../../redux/selectors.store';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { ExtractId } from '../../../utils/dataTransform';
import FlexBox from 'components/atoms/FlexBox';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import { Text } from '../../atoms/Text';

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
        data: { ...ExtractId(currentProduct), data: { images: state as IProductImage[] }, refreshCurrent: true },
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
        renderHeader={
          <FlexBox
            fillWidth
            fxDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'stretch'}
            height={'32px'}
          >
            <ButtonIcon variant={'textExtraSmall'} icon={'SmallArrowLeft'} onClick={onClose}>
              {'Back'}
            </ButtonIcon>

            <FlexBox justifyContent={'center'}>
              <Text $weight={600} $size={16}>
                {'Фото'}
              </Text>
            </FlexBox>
          </FlexBox>
        }
        FooterComponent={props => {
          return (
            <Footer fxDirection={'row'} gap={8} padding={'8px 0'} justifyContent={'stretch'} fillWidth>
              <ButtonIcon
                variant={'onlyIcon'}
                icon={'plus'}
                size={'36px'}
                iconSize={'80%'}
                onClick={props.onAddNewImageSetPress}
              />

              <ButtonIcon
                variant={'filledLarge'}
                flex={1}
                type={'submit'}
                style={{ padding: '0 12px' }}
                textTransform={'uppercase'}
                fontWeight={600}
                endIcon={'SmallArrowRight'}
                endIconSize={'24px'}
              >
                {'Прийняти'}
              </ButtonIcon>
            </Footer>
          );
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
const Header = styled(FlexBox)``;
const Content = styled(FlexBox)`
  border-top: 1px solid ${p => 'tomato' || p.theme.sideBarBorderColor};
  border-bottom: 1px solid ${p => 'tomato' || p.theme.sideBarBorderColor};
`;
const Footer = styled(FlexBox)``;
export default FormProductImagesOverlay;
