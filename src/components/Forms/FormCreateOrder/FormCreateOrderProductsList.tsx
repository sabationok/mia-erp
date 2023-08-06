import FlexBox from '../../atoms/FlexBox';
import { useCallback, useMemo, useState } from 'react';
import ProductCardSimpleOverview from '../../Products/ProductCardSimpleOverview';
import styled from 'styled-components';
import FormProductSelectorForOrder from './FormProductSelectorForOrder';
import { OnlyUUID } from '../../../redux/global.types';
import { IProduct } from '../../../redux/products/products.types';
import { ExtractId } from '../../../utils/dataTransform';
import { IOrderSlotItem } from '../../../redux/orders/orders.types';

export interface FormCreateOrderProductsListProps {
  onSelect: (item: IProduct | IOrderSlotItem) => void;
  onRemove: (item: OnlyUUID) => void;
  list?: IProduct[];
}
const FormCreateOrderProductsList: React.FC<FormCreateOrderProductsListProps> = ({ onSelect, onRemove, list }) => {
  const [data, setData] = useState<(IProduct | IOrderSlotItem)[]>(list || []);

  const handleSelect = useCallback(
    (item: IProduct | IOrderSlotItem) => {
      onSelect && onSelect(item);
      setData(prev => [...prev, item]);
    },
    [onSelect]
  );
  const handleRemove = useCallback(
    (item: OnlyUUID) => {
      onRemove && onRemove(item);
      setData(prev => prev.filter(el => el._id !== item._id));
    },
    [onRemove]
  );

  const renderProducts = useMemo(() => {
    return data?.map((p, idx) => (
      <ProductCardSimpleOverview key={idx.toString()} product={p} onRemove={() => handleRemove(ExtractId(p))} />
    ));
  }, [data, handleRemove]);

  return (
    <Container flex={1}>
      <FlexBox flex={1} overflow={'auto'}>
        <FlexBox>{renderProducts}</FlexBox>
      </FlexBox>

      <Footer>
        <FormProductSelectorForOrder onSelect={handleSelect} />
      </Footer>
    </Container>
  );
};

const Container = styled(FlexBox)`
  position: relative;
  overflow: hidden;
`;
const Footer = styled(FlexBox)`
  //padding: 0 16px 0;

  border-top: 1px solid ${({ theme }) => theme.modalBorderColor};
  background-color: ${({ theme }) => theme.modalBackgroundColor};
`;
export default FormCreateOrderProductsList;
