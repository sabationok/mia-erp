import FlexBox from '../../atoms/FlexBox';
import { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import FormAddOrderSlot from './FormAddOrderSlot';
import { OnlyUUID } from '../../../redux/global.types';
import { ExtractId } from '../../../utils/dataTransform';
import { IOrderSlot } from '../../../redux/orders/orders.types';
import OrderSlotOverview from '../../Products/OrderSlotOverview';

export interface FormCreateOrderProductsListProps {
  onSelect: (item: IOrderSlot) => void;
  onRemove: (item: OnlyUUID) => void;
  list?: IOrderSlot[];
}
const FormCreateOrderProductsList: React.FC<FormCreateOrderProductsListProps> = ({ onSelect, onRemove, list }) => {
  const [data, setData] = useState<IOrderSlot[]>(list || []);

  const handleSelect = useCallback(
    (item: IOrderSlot) => {
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
      <OrderSlotOverview key={idx.toString()} index={idx} slot={p} onRemove={() => handleRemove(ExtractId(p))} />
    ));
  }, [data, handleRemove]);

  return (
    <Container flex={1}>
      <FlexBox flex={1} overflow={'auto'}>
        <FlexBox>{renderProducts}</FlexBox>
      </FlexBox>

      <Footer>
        <FormAddOrderSlot onSelect={handleSelect} />
      </Footer>
    </Container>
  );
};

const Container = styled(FlexBox)`
  position: relative;
  overflow: hidden;
`;
const Footer = styled(FlexBox)`
  border-top: 1px solid ${({ theme }) => theme.modalBorderColor};
  background-color: ${({ theme }) => theme.modalBackgroundColor};
`;
export default FormCreateOrderProductsList;
