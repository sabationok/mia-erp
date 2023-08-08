import { IOrderSlot } from '../../redux/orders/orders.types';
import FlexBox from '../atoms/FlexBox';
import styled from 'styled-components';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import { useMemo, useState } from 'react';
import { IProduct, IStorageItem } from '../../redux/products/products.types';
import { IPriceListItem } from '../../redux/priceManagement/priceManagement.types';

export interface OrderSlotOverviewProps {
  slot?: IOrderSlot;
  price?: IPriceListItem;
  dataForSlot?: IProduct;
  index?: number;
  onSelect?: () => void;
  onRemove?: () => void;
  disabled?: boolean;
}

const createOverviewCellsData = (
  dataForSlot?: IStorageItem,
  activePriceData?: IPriceListItem
): {
  value?: string | number;
  title?: string;
  borderBottom?: boolean;
  gridArea?:
    | 'label'
    | 'sku'
    | 'qty'
    | 'price'
    | 'discount'
    | 'total'
    | 'currency'
    | 'ttnCost'
    | 'ttn'
    | 'transporter'
    | 'category'
    | 'brand'
    | 'type'
    | '_';
  isLastInRow?: boolean;
}[] => [
  {
    title: 'Назва',
    value: dataForSlot?.label,
    gridArea: 'label',
  },
  {
    title: 'Артикул | SKU',
    value: dataForSlot?.sku,
    gridArea: 'sku',
    isLastInRow: true,
  },
  {
    title: 'Категорія',
    value: dataForSlot?.category?.label,
    gridArea: 'category',
  },
  {
    title: 'Бренд',
    value: dataForSlot?.brand?.label,
    gridArea: 'brand',
  },
  {
    title: 'Тип',
    value: dataForSlot?.type,
    gridArea: 'type',
    isLastInRow: true,
  },
  { borderBottom: true, isLastInRow: true, gridArea: '_' },
  {
    title: 'Кількість',
    value: '',
    gridArea: 'qty',
  },
  {
    title: 'Ціна',
    value: activePriceData?.price,
    gridArea: 'price',
  },
  {
    title: 'Знижка',
    value: activePriceData?.discount,
    gridArea: 'discount',
  },
  {
    title: 'Сума',
    value: '',
    gridArea: 'total',
  },
  {
    title: 'Валюта',
    value: '',
    gridArea: 'currency',
    isLastInRow: true,
  },
];
const OrderSlotOverview: React.FC<OrderSlotOverviewProps> = ({ dataForSlot, price, disabled, onSelect, onRemove }) => {
  const [countedData, setCountedData] = useState<IPriceListItem & { qty?: number }>();
  const cells = useMemo(() => createOverviewCellsData(dataForSlot, countedData), [countedData, dataForSlot]);

  return (
    <Card disabled={disabled}>
      <ImageBox>
        <img
          src={
            (dataForSlot?.images && dataForSlot?.images[0]?.img_1x) ||
            'https://cdn.create.vista.com/api/media/medium/186787692/stock-photo-profile-young-stylish-man-eyeglasses?token='
          }
          style={{ objectFit: 'contain' }}
          alt={''}
          width={'100%'}
          height={'100%'}
        />
      </ImageBox>
      <CardGridBox>
        {cells.map(({ borderBottom, title, value, gridArea, isLastInRow }) => (
          <CardGridBoxInner key={`cardCell-${title}`} gridArea={gridArea || '1/1/1/9'} isLastInRow={isLastInRow}>
            {!borderBottom && (
              <>
                <div
                  className={'text title'}
                  style={{
                    textAlign: 'start',
                    fontSize: 10,
                  }}
                >
                  {!borderBottom && (title || 'Title')}
                </div>
                <div
                  className={'text'}
                  style={{
                    textAlign: 'end',
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                >
                  {value || '-'}
                </div>
              </>
            )}
          </CardGridBoxInner>
        ))}
      </CardGridBox>
      {!disabled && (
        <Buttons justifyContent={'space-between'} gap={4}>
          <ButtonIcon variant={'onlyIcon'} iconSize={'100%'} size={'24px'} icon={'info'} disabled />
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
  gap: 8px;

  height: fit-content;

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
    grid-template-rows: 150px max-content min-content;
    max-height: 100%;
  }
`;
const CardGridBox = styled(FlexBox)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 40px);
  grid-template-areas:
    'label label label sku sku'
    'category category brand brand type'
    '_ _ _ _ _'
    'qty price discount total currency';

  //max-width: 270px;
  height: max-content;
  border-top: 1px solid ${({ theme }) => theme.trBorderClr};
`;
const CardGridBoxInner = styled(FlexBox)<{ borderBottom?: boolean; gridArea: string; isLastInRow?: boolean }>`
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
  height: fit-content;

  width: 100%;
  object-position: center;
  object-fit: fill;
  overflow: hidden;

  background-color: ${({ theme }) => theme.fieldBackgroundColor};

  @media screen and (max-width: 480px) {
    width: 100px;
    margin: auto;
  }
`;
export default OrderSlotOverview;
