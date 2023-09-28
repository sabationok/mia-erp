import FlexBox from '../../atoms/FlexBox';
import { useEffect, useMemo, useState } from 'react';
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
import { transformVariationTableData } from '../../../utils/tables';
import { Text } from '../../atoms/Text';
import { OnRowClickHandler } from '../../TableList/tableTypes.types';
import { OnlyUUID } from '../../../redux/global.types';
import { IProduct } from '../../../redux/products/products.types';

export interface FormProductSelectorForPricingProps {
  title?: string;
  onSubmit?: (data?: IProduct) => void;
  onSelect?: (data?: IProduct) => void;
  selected?: IProduct;
  disabled?: boolean;
  variation?: IVariation;
  onChange?: (p?: IProduct, v?: IVariation) => void;
}

const FormProductSelectorForPricing: React.FC<FormProductSelectorForPricingProps> = ({
  onSelect,
  disabled,
  onSubmit,
  selected,
  onChange,
  variation,
  ...props
}) => {
  const modals = useModalProvider();
  const prService = useAppServiceProvider()[ServiceName.products];
  const { currentProduct, properties: templates } = useProductsSelector();
  const [loadedVariations, setLoadedVariations] = useState<IVariation[]>([]);
  const [currentVariation, setCurrentVariation] = useState<OnlyUUID | undefined>(currentProduct?.defaults?.variation);
  const [selectedProduct, setSelectedProduct] = useState<OnlyUUID | undefined>(currentProduct);

  const tableTitles = useMemo(() => {
    const t = templates.find(t => t._id === currentProduct?.template?._id);
    return t ? createTableTitlesFromTemplate(t) : undefined;
  }, [currentProduct?.template?._id, templates]);

  const transformedTableData = useMemo(() => {
    return currentProduct?.variations ? currentProduct?.variations.map(v => transformVariationTableData(v)) : [];
  }, [currentProduct?.variations]);

  const handleTableRowClick: OnRowClickHandler<IVariation> = data => {
    setCurrentVariation(prev => {
      const newData = data?._id ? { _id: data?._id } : prev;
      onChange && onChange(selectedProduct, newData);
      return newData;
    });
  };

  useEffect(() => {
    if (variation) {
      setCurrentVariation(variation);
    }
  }, [variation]);
  const onSelectProduct = (product: IProduct, onSuccessLoad?: () => void) => {
    setSelectedProduct(product);

    prService.getProductFullInfo({
      data: ExtractId(product),
      onSuccess: data => {
        prService.getAllVariationsByProductId({
          data: { product: ExtractId(data), refreshCurrent: true },
          onSuccess: setLoadedVariations,
        });

        onSuccessLoad && onSuccessLoad();
      },
    });
  };

  const onOpenSelectorClick = () => {
    const modal = modals.handleOpenModal({
      Modal: Modals.SelectProductModal,
      props: {
        onSelect: p => {
          onSelectProduct(p, modal?.onClose);
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
      // padding={'8px 0 8px'}
    >
      {currentProduct && (
        <FlexBox fillWidth>
          <ProductCardSimpleOverview product={currentProduct} disabled />
        </FlexBox>
      )}

      <ButtonIcon variant={'outlinedSmall'} disabled={disabled} onClick={onOpenSelectorClick}>
        {`${currentProduct ? 'Change' : 'Select'} product for pricing`}
      </ButtonIcon>

      <Text $weight={500}>{'Оберіть варіацію для оцінки'}</Text>

      <FlexBox style={{ minWidth: 250, maxHeight: 250 }} overflow={'hidden'} flex={1}>
        <TableList
          tableTitles={tableTitles}
          tableData={transformedTableData}
          selectedRow={currentVariation}
          isSearch={false}
          isFilter={false}
          onRowClick={handleTableRowClick}
        />
      </FlexBox>
    </FlexBox>
  );
};

export default FormProductSelectorForPricing;
