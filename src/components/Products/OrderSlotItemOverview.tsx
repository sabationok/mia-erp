import { IOrderSlotItem } from '../../redux/orders/orders.types';
import FlexBox from '../atoms/FlexBox';
import styled from 'styled-components';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';

export interface OrderSlotItemOverviewProps {
  item: IOrderSlotItem;
  index: number;
  onSelect?: () => void;
  onRemove?: () => void;
  disabled?: boolean;
}
const OrderSlotItemOverview: React.FC<OrderSlotItemOverviewProps> = ({ disabled, onSelect, onRemove }) => {
  return (
    <Card>
      {!disabled && (
        <Buttons justifyContent={'space-between'} gap={4}>
          <ButtonIcon variant={'onlyIcon'} iconSize={'100%'} size={'24px'} icon={'info'} />
          {onRemove && (
            <ButtonIcon
              variant={'onlyIcon'}
              iconSize={'100%'}
              size={'24px'}
              icon={'delete'}
              disabled={!onRemove}
              onClick={onRemove}
            />
          )}
          {onSelect && (
            <ButtonIcon
              variant={'onlyIcon'}
              iconSize={'100%'}
              size={'24px'}
              icon={'doneAll'}
              disabled={!onSelect}
              onClick={onSelect}
            />
          )}
        </Buttons>
      )}
    </Card>
  );
};
const Card = styled(FlexBox)<{ isSelected?: boolean; disabled?: boolean }>`
  display: grid;
  grid-template-columns: 80px 1fr min-content;
  grid-template-rows: 120px;

  position: relative;

  padding: 8px;
  border-bottom: 2px solid ${({ theme }) => theme.fieldBackgroundColor};

  transition: all ${({ theme }) => theme.globals.timingFunctionMain};
  pointer-events: ${({ disabled }) => disabled && 'none'};
  cursor: default;

  &:hover {
    box-shadow: 0 4px 6px 4px rgba(0, 0, 0, 0.16), 0 4px 6px 4px rgba(210, 210, 210, 0.25);
  }

  &::after {
    display: block;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    z-index: 5;

    background-color: ${({ theme, isSelected }) => (isSelected ? theme.accentColor.base : 'transparent')};
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr max-content min-content;
    max-height: 100%;
  }
`;
const CardGridBox = styled(FlexBox)`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(3, 1fr);

  //max-width: 270px;
  height: 100%;
  border-top: 1px solid ${({ theme }) => theme.trBorderClr};
`;
const CardGridBoxInner = styled(FlexBox)<{ gridArea: string; isLastInRow?: boolean }>`
  justify-content: space-between;

  grid-area: ${({ gridArea = '' }) => gridArea};

  padding: 4px 6px;

  border-right: 1px solid ${({ theme, isLastInRow }) => (!isLastInRow ? theme.trBorderClr : 'transparent')};
  border-bottom: 1px solid ${({ theme }) => theme.trBorderClr};

  & .text {
    color: ${({ theme }) => theme.fontColor};

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  & .title {
    color: ${({ theme }) => theme.globals.inputPlaceholderColor};
  }

  //outline: 1px solid tomato;
`;
const Buttons = styled(FlexBox)`
  @media screen and (max-width: 480px) {
    flex-direction: row;
    justify-content: flex-end;
  }
`;

const ImageBox = styled(FlexBox)`
  height: 100%;
  width: 100%;

  object-position: center;
  object-fit: fill;
  overflow: hidden;

  background-color: ${({ theme }) => theme.fieldBackgroundColor};
`;
export default OrderSlotItemOverview;
