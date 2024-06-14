import FormOfferImagesComponent from '../Forms/offers/images/FormOfferImagesComponent';
import { FormEventHandler, useState } from 'react';
import { OfferEntity, OfferImageSlotEntity } from '../../types/offers/offers.types';
import styled, { useTheme } from 'styled-components';
import { useOffersSelector } from '../../redux/selectors.store';
import { ServiceName, useAppServiceProvider } from '../../hooks/useAppServices.hook';
import { getIdRef } from '../../utils';
import { DrawerHeader, OverlayFooter } from './index';
import { CreatedOverlay } from '../../Providers/Overlay/OverlayStackProvider';

export interface FormProductImagesOverlayProps extends CreatedOverlay {
  product?: OfferEntity;
}

const FormProductImagesOverlay: React.FC<FormProductImagesOverlayProps> = ({ onClose }) => {
  const currentProduct = useOffersSelector().currentOffer;
  const service = useAppServiceProvider()[ServiceName.offers];
  const [state, setState] = useState<Partial<OfferImageSlotEntity>[]>(currentProduct?.images || []);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();

  const handleFormSubmit: FormEventHandler = ev => {
    ev.preventDefault();
    ev.stopPropagation();

    currentProduct &&
      service.updateById({
        data: { data: { ...getIdRef(currentProduct), data: { images: state as OfferImageSlotEntity[] } } },
        onSuccess: () => {
          onClose && onClose();
        },
        onLoading: setLoading,
      });
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <FormOfferImagesComponent
        initialData={state}
        onClose={onClose}
        onChangeState={setState}
        contentContainerStyle={{
          flex: 1,
          borderTop: `1px solid ${theme.sideBarBorderColor}`,
          borderBottom: `1px solid ${theme.sideBarBorderColor}`,
        }}
        renderHeader={<DrawerHeader title={'Зображення'} onBackPress={onClose} okButton canSubmit={state.length > 0} />}
        FooterComponent={props => {
          return (
            <OverlayFooter onCreatePress={props.onAddNewImageSetPress} loading={loading} canSubmit={state.length > 0} />
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
// const Content = styled(FlexBox)`
//   border-top: 1px solid ${p => 'tomato' || p.theme.sideBarBorderColor};
//   border-bottom: 1px solid ${p => 'tomato' || p.theme.sideBarBorderColor};
// `;
export default FormProductImagesOverlay;
