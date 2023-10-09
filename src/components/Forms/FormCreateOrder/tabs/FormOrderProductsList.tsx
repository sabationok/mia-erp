import FlexBox from '../../../atoms/FlexBox';
import { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import FormAddOrderSlot from '../components/FormAddOrderSlot';
import { OnlyUUID } from '../../../../redux/global.types';
import { IOrderSlot, IOrderSlotBase } from '../../../../redux/orders/orders.types';
import OrderSlotOverview from '../../../Modals/Overviews/OrderSlotOverview';
import { nanoid } from '@reduxjs/toolkit';

export interface FormCreateOrderProductsListProps {
  onSelect: (item: IOrderSlot) => void;
  onRemove: (item: OnlyUUID) => void;
  list?: IOrderSlot[];
}
const FormOrderProductsList: React.FC<FormCreateOrderProductsListProps> = ({ onSelect, onRemove, list }) => {
  const [data, setData] = useState<(Partial<IOrderSlot> & { tempId?: string })[]>(list || []);

  const handleSelect = useCallback((item: IOrderSlotBase) => {
    // onSelect && onSelect(item);
    setData(prev => [...prev, { ...item, tempId: nanoid(8) }]);
  }, []);

  const handleRemove = useCallback((id?: string) => {
    // onRemove && onRemove();
    setData(prev => prev.filter(el => (el?._id || el.tempId) !== id));
  }, []);

  const renderProducts = useMemo(() => {
    return data?.map((p, idx) => (
      <OrderSlotOverview key={idx.toString()} index={idx} slot={p} onRemove={() => handleRemove(p?._id || p?.tempId)} />
    ));
  }, [data, handleRemove]);

  return (
    <Container flex={1}>
      <FlexBox flex={1} overflow={'auto'}>
        <FlexBox>{renderProducts}</FlexBox>
      </FlexBox>

      <FormAddOrderSlot onSelect={handleSelect} />
    </Container>
  );
};

const Container = styled(FlexBox)`
  position: relative;
  overflow: hidden;
`;
export default FormOrderProductsList;
