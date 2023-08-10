import { IProduct } from '../../../redux/products/products.types';
import FlexBox from '../../atoms/FlexBox';
import { useState } from 'react';
import { useModalProvider } from '../../ModalProvider/ModalProvider';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import ProductCardSimpleOverview from '../../Overviews/ProductCardSimpleOverview';
import { Modals } from '../../ModalProvider/Modals';

export interface FormProductSelectorForPricingProps<D = any> {
  title?: string;
  onSubmit?: (data?: D) => void;
  onSelect?: (data?: D) => void;
  selected?: D;
  disabled?: boolean;
}

const FormProductSelectorForPricing: React.FC<FormProductSelectorForPricingProps> = ({
  onSelect,
  disabled,
  onSubmit,
  selected,
  ...props
}) => {
  const modals = useModalProvider();
  const [current, setCurrent] = useState<IProduct | undefined>(selected);

  const onOpenSelectorClick = () => {
    const modal = modals.handleOpenModal({
      Modal: Modals.SelectProductModal,
      props: {
        onSelect: p => {
          setCurrent(p);
          onSelect && onSelect(p);
          modal?.onClose();
        },
        selected: current,
      },
    });
  };

  return (
    <FlexBox
      gap={8}
      maxHeight={'100%'}
      fxDirection={'column'}
      fillWidth
      // alignItems={'stretch'}
      overflow={'hidden'}
      padding={'8px 0 8px'}
    >
      {current && (
        <FlexBox fillWidth>
          <ProductCardSimpleOverview product={current} disabled />
        </FlexBox>
      )}
      <ButtonIcon variant={'outlinedSmall'} disabled={disabled} onClick={onOpenSelectorClick}>
        {`${current ? 'Change' : 'Select'} product for pricing`}
      </ButtonIcon>
    </FlexBox>
  );
};

export default FormProductSelectorForPricing;
