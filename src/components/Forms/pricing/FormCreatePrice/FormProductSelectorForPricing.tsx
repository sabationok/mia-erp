import FlexBox from '../../../atoms/FlexBox';
import { useEffect, useMemo, useState } from 'react';
import { useModalProvider } from '../../../ModalProvider/ModalProvider';
import ButtonIcon from '../../../atoms/ButtonIcon/ButtonIcon';
import ProductCardSimpleOverview from '../../../Overviews/ProductCardSimpleOverview';
import { Modals } from '../../../Modals';
import TableList from '../../../TableList/TableList';
import { ServiceName, useAppServiceProvider } from 'hooks/useAppServices.hook';
import { VariationEntity } from 'types/offers/variations.types';
import { useProductsSelector } from 'redux/selectors.store';
import { createTableTitlesFromProperties, getIdRef } from 'utils';
import { transformVariationTableData } from 'utils/tables';
import { OnRowClickHandler } from '../../../TableList/tableTypes.types';
import { OnlyUUID } from 'redux/global.types';
import { OfferEntity } from 'types/offers/offers.types';
import InputLabel from '../../../atoms/Inputs/InputLabel';
import styled from 'styled-components';

export interface FormProductSelectorForPricingProps {
  title?: string;
  onSubmit?: (data?: OfferEntity) => void;
  onSelect?: (data?: OfferEntity) => void;
  selected?: OfferEntity;
  disabled?: boolean;
  variation?: VariationEntity;
  onChange?: (p?: OfferEntity, v?: VariationEntity) => void;
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
  const { currentOffer, properties: templates } = useProductsSelector();
  const setLoadedVariations = useState<VariationEntity[]>([])[1];
  const [currentVariation, setCurrentVariation] = useState<OnlyUUID | undefined>(currentOffer?.defaults?.variation);
  const [selectedProduct, setSelectedProduct] = useState<OnlyUUID | undefined>(currentOffer);

  const tableTitles = useMemo(() => {
    const t = templates.find(t => t._id === currentOffer?.template?._id);
    return t ? createTableTitlesFromProperties(t) : undefined;
  }, [currentOffer?.template?._id, templates]);

  const transformedTableData = useMemo(() => {
    return currentOffer?.variations ? currentOffer?.variations.map(v => transformVariationTableData(v)) : [];
  }, [currentOffer?.variations]);

  const handleTableRowClick: OnRowClickHandler<VariationEntity> = data => {
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
  const onSelectProduct = (product: OfferEntity, onSuccessLoad?: () => void) => {
    setSelectedProduct(product);

    prService.getProductFullInfo({
      data: getIdRef(product),
      onSuccess: data => {
        prService.getAllVariationsByProductId({
          data: { product: getIdRef(data), refreshCurrent: true },
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
        selected: currentOffer,
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
      {currentOffer && (
        <FlexBox fillWidth>
          <ProductCardSimpleOverview product={currentOffer} disabled />
        </FlexBox>
      )}

      <ButtonIcon variant={'outlinedSmall'} disabled={disabled} onClick={onOpenSelectorClick}>
        {`${currentOffer ? 'Change' : 'Select'} product for pricing`}
      </ButtonIcon>

      {/*<Text $weight={500}>{'Оберіть варіацію для оцінки'}</Text>*/}

      {transformedTableData?.length > 0 && (
        <InputLabel label={'Оберіть варіацію для оцінки'}>
          <ScrollBox
            style={{ minWidth: 180, maxHeight: 500, height: 300 }}
            padding={'0 2px'}
            overflow={'hidden'}
            flex={1}
          >
            <TableList
              tableTitles={tableTitles}
              tableData={transformedTableData}
              selectedRow={currentVariation}
              isSearch={false}
              isFilter={false}
              onRowClick={handleTableRowClick}
            />
          </ScrollBox>
        </InputLabel>
      )}
    </FlexBox>
  );
};

const ScrollBox = styled(FlexBox)`
  &::-webkit-scrollbar {
    width: 2px;
    height: 2px;
  }
`;

export default FormProductSelectorForPricing;
