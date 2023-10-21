import { IOrderTempSlot } from '../../../../redux/orders/orders.types';
import { useMemo } from 'react';
import OrderSlotOverview from '../../../Overviews/OrderSlotOverview';
import FormAccordionItem from '../../components/FormAccordionItem';
import styled, { useTheme } from 'styled-components';
import FlexBox from '../../../atoms/FlexBox';
import ButtonIcon from '../../../atoms/ButtonIcon/ButtonIcon';
import { t } from 'lang';
import { Text } from '../../../atoms/Text';

const OrderGroupItem = ({
  slots,
  onRemove,
  onUpdate,
  renderHeader,
  title,
  onAddSlotPress,
}: {
  slots: IOrderTempSlot[];
  renderHeader?: React.ReactNode;
  title?: React.ReactNode;
  onRemove?: (id: string) => void;
  onUpdate?: (slot: IOrderTempSlot) => void;
  onAddSlotPress?: () => void;
}) => {
  const theme = useTheme();
  const renderSlots = useMemo(() => {
    return slots.map(slot => (
      <OrderSlotOverview
        key={`slot_${slot?.tempId}`}
        slot={slot}
        editable
        onRemovePress={() => slot?.tempId && onRemove && onRemove(slot?.tempId)}
        onUpdate={onUpdate}
      />
    ));
  }, [onRemove, onUpdate, slots]);

  const renderHeaderComp = useMemo(() => {
    return (
      <FlexBox fxDirection={'row'} fillHeight gap={8} alignItems={'center'} padding={'2px 0'}>
        {renderHeader || (
          <Text $weight={500} $size={15}>
            {title}
          </Text>
        )}
        <FlexBox height={'80%'} border={`1px solid ${theme.modalBorderColor}`}></FlexBox>

        <ButtonIcon
          variant={'textExtraSmall'}
          style={{ minWidth: 'fit-content', height: '100%', fontWeight: 600 }}
          disabled={!onAddSlotPress}
          onClick={onAddSlotPress}
        >
          {t('Add')}
        </ButtonIcon>
      </FlexBox>
    );
  }, [renderHeader, theme.modalBorderColor, title]);

  return (
    <StAccordionItem open renderHeader={renderHeaderComp} title={title}>
      {renderSlots}
    </StAccordionItem>
  );
};

const StAccordionItem = styled(FormAccordionItem)`
  & .header {
  }
  & .content {
    padding: 0;
  }
`;
export default OrderGroupItem;
