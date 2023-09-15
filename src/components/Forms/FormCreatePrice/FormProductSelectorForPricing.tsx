import FlexBox from '../../atoms/FlexBox';
import { useMemo, useState } from 'react';
import { useModalProvider } from '../../ModalProvider/ModalProvider';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import ProductCardSimpleOverview from '../../Overviews/ProductCardSimpleOverview';
import { Modals } from '../../ModalProvider/Modals';
import TableList from '../../TableList/TableList';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { IVariation } from '../../../redux/products/variations.types';
import { useProductsSelector } from '../../../redux/selectors.store';
import { ExtractId } from '../../../utils/dataTransform';
import { createTableTitlesFromTemplate } from '../../../utils';

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
  const prService = useAppServiceProvider()[ServiceName.products];
  const { currentProduct, properties: templates } = useProductsSelector();
  // const [currentProduct, setCurrentProduct] = useState<IProduct | undefined>(selected);
  const [loadedVariations, setLoadedVariations] = useState<IVariation[] | undefined>();
  const [currentVariation, setCurrentVariation] = useState<IVariation | undefined>();

  const tableTitles = useMemo(() => {
    const t = templates.find(t => t._id === currentProduct?.template?._id);
    return t ? createTableTitlesFromTemplate(t) : undefined;
  }, [currentProduct?.template?._id, templates]);
  const onOpenSelectorClick = () => {
    const modal = modals.handleOpenModal({
      Modal: Modals.SelectProductModal,
      props: {
        onSelect: p => {
          prService
            .getProductFullInfo({
              data: ExtractId(p),
              onSuccess: data => {
                prService.getAllVariationsByProductId({
                  data: { product: ExtractId(data), refreshCurrent: true },
                });
              },
            })
            .then(d => {
              console.log(d);
            });

          onSelect && onSelect(p);
          modal?.onClose();
        },
        selected: currentProduct,
      },
    });
  };

  return (
    <FlexBox
      gap={8}
      maxHeight={'100%'}
      fxDirection={'column'}
      fillWidth
      flex={1}
      // alignItems={'stretch'}
      // overflow={'hidden'}
      padding={'8px 0 8px'}
    >
      {currentProduct && (
        <FlexBox fillWidth>
          <ProductCardSimpleOverview product={currentProduct} disabled />
        </FlexBox>
      )}

      <ButtonIcon variant={'outlinedSmall'} disabled={disabled} onClick={onOpenSelectorClick}>
        {`${currentProduct ? 'Change' : 'Select'} product for pricing`}
      </ButtonIcon>

      <FlexBox style={{ minWidth: 250, maxHeight: 250 }} overflow={'hidden'} flex={1}>
        <TableList
          tableTitles={tableTitles}
          isSearch={false}
          isFilter={false}
          onRowClick={data => {
            console.log('onRowClick variation for pricing', data);
          }}
        />
      </FlexBox>
    </FlexBox>
  );
};

export default FormProductSelectorForPricing;
