import { IOrderSlot } from '../../redux/orders/orders.types';
import FlexBox from '../atoms/FlexBox';
import styled from 'styled-components';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import { ChangeEventHandler, useEffect, useMemo, useState } from 'react';
import { IProduct, IStorageItem } from '../../redux/products/products.types';
import { IPriceListItem } from '../../redux/priceManagement/priceManagement.types';
import { IProductVariation } from '../TableVariations';
import { isUndefined } from 'lodash';
import numberWithSpaces from '../../utils/numbers';
import { IWarehouseDirItem } from '../Directories/dir.types';

export interface OrderSlotOverviewProps {
  slot?: IOrderSlot;
  price?: IPriceListItem;
  dataForSlot?: IProduct;
  warehouse?: IWarehouseDirItem;
  index?: number;
  onSelect?: () => void;
  onRemove?: () => void;
  disabled?: boolean;
  variation?: IProductVariation;
}

const createOverviewCellsData = (
  dataForSlot?: IStorageItem,
  countedPrice?: IPriceListItem & { qty?: number; total?: number },
  variation?: IProductVariation,
  warehouse?: IWarehouseDirItem
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
    | 'bonuses'
    | 'total'
    | 'currency'
    | 'ttnCost'
    | 'ttn'
    | 'transporter'
    | 'category'
    | 'brand'
    | 'type'
    | 'atr_1'
    | 'atr_2'
    | 'warehouse'
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
  { title: 'Атрибут 1', value: variation?.atr_1?.label, gridArea: 'atr_1' },
  { title: 'Атрибут 2', value: variation?.atr_2?.label, gridArea: 'atr_2' },
  {
    title: 'Кількість',
    value: numberWithSpaces(countedPrice?.qty),
    gridArea: 'qty',
    isLastInRow: true,
  },
  {
    title: 'Ціна',
    value: numberWithSpaces(Number(countedPrice?.price || 0)),
    gridArea: 'price',
  },
  {
    title: 'Бонуси',
    value: numberWithSpaces(countedPrice?.discount || 0),
    gridArea: 'discount',
  },
  {
    title: 'Знижка',
    value: numberWithSpaces(countedPrice?.discount || 0),
    gridArea: 'bonuses',
  },
  {
    title: 'Сума',
    value: numberWithSpaces(countedPrice?.total || 0),
    gridArea: 'total',
  },
  {
    title: 'Валюта',
    value: countedPrice?.currency,
    gridArea: 'currency',
    isLastInRow: true,
  },
  { title: 'Склад', value: warehouse?.label, gridArea: 'warehouse', isLastInRow: true },
];
const CountSelector = ({
  value = 0,
  onInputChange,
  width,
  height = '20px',
  disabled,
  className,
  autoFocus,
  onChange,
}: {
  value?: number;
  onInputChange: ChangeEventHandler<HTMLInputElement>;
  onChange?: (number: number) => void;
  height?: string;
  width?: string;
  disabled?: boolean;
  className?: string;
  autoFocus?: boolean;
}) => {
  const [count, setCount] = useState(value);
  const handleIncrementChange = (increment: number) => () => {
    setCount(prev => {
      onChange && onChange(prev + increment);
      return prev + increment;
    });
  };

  return (
    <FlexBox fxDirection={'row'} gap={4} width={width} alignItems={'center'}>
      <ButtonIcon variant={'onlyIcon'} size={height} icon={'minus'} onClick={handleIncrementChange(-1)} />
      <StyledInput
        value={count}
        disabled={disabled}
        className={className}
        onChange={({ target: { value } }) => {
          setCount(Number(value));
          onChange && onChange(Number(value));
        }}
        autoFocus={autoFocus}
      />
      <ButtonIcon variant={'onlyIcon'} size={height} icon={'plus'} onClick={handleIncrementChange(1)} />
    </FlexBox>
  );
};
const OrderSlotOverview: React.FC<OrderSlotOverviewProps> = ({
  dataForSlot,
  variation,
  price,
  disabled,
  onSelect,
  onRemove,
}) => {
  const [quantity, setQuantity] = useState(0);
  const [countedData, setCountedData] = useState<(IPriceListItem & { qty?: number; total?: number }) | undefined>(
    price || undefined
  );
  const cells = useMemo(
    () => createOverviewCellsData(dataForSlot, countedData, variation),
    [countedData, dataForSlot, variation]
  );

  useEffect(() => {
    if (!isUndefined(price)) {
      setCountedData({ ...price, qty: quantity, total: price?.price ? quantity * price?.price : 0 });
    }
  }, [price, quantity]);

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
      <CardGridArea>
        {cells.map(({ borderBottom, title, value, gridArea, isLastInRow }) => (
          <CardGridBox key={`cardCell-${title}`} gridArea={gridArea || ''} isLastInRow={isLastInRow}>
            {!borderBottom && (
              <>
                <div className={'title'}>{!borderBottom && (title || 'Title')}</div>
                {gridArea !== 'qty' ? (
                  <div className={'text'}>{value || '-'}</div>
                ) : (
                  <CountSelector
                    value={quantity}
                    disabled={false}
                    className={'text'}
                    autoFocus
                    onChange={setQuantity}
                    onInputChange={({ target }) => {
                      setQuantity(Number(target.value));
                    }}
                  />
                )}
              </>
            )}
          </CardGridBox>
        ))}
      </CardGridArea>

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
  grid-template-columns: ${({ disabled }) => (disabled ? `80px 1fr` : `80px 1fr min-content`)};
  gap: 8px;

  height: fit-content;

  position: relative;

  padding: 8px;
  border-bottom: 2px solid ${({ theme }) => theme.fieldBackgroundColor};

  transition: all ${({ theme }) => theme.globals.timingFunctionMain};
  cursor: default;

  &:hover {
    box-shadow: ${({ disabled }) =>
      !disabled && '0 4px 6px 4px rgba(0, 0, 0, 0.16), 0 4px 6px 4px rgba(210, 210, 210, 0.25)'};
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
const CardGridArea = styled(FlexBox)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(5, min-content);
  grid-template-areas:
    'label label label label sku sku'
    'category category brand brand type type'
    'atr_1 atr_1  atr_2  atr_2 qty qty'
    'price bonuses discount total total currency'
    'warehouse warehouse warehouse warehouse warehouse warehouse';

  //max-width: 270px;
  height: max-content;
  border-top: 1px solid ${({ theme }) => theme.trBorderClr};

  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(5, min-content);
    grid-template-areas:
      'label label label label sku sku'
      'category category brand brand type type'
      'atr_1 atr_1 atr_1 atr_2 atr_2 atr_2'
      'qty qty price price bonuses discount'
      'total total total total currency currency'
      'warehouse warehouse warehouse warehouse warehouse warehouse';
  }
`;
const CardGridBox = styled(FlexBox)<{ borderBottom?: boolean; gridArea: string; isLastInRow?: boolean }>`
  justify-content: space-between;
  height: 40px;
  width: 100%;
  overflow: hidden;
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

    text-align: right;
    font-weight: 600;
    font-size: 12px;
  }

  & .title {
    font-size: 10px;
    line-height: 1.5;
    color: ${({ theme }) => theme.globals.inputPlaceholderColor};
  }
  @media screen and (max-width: 480px) {
    height: 50px;
    & .text {
      font-size: 16px;
    }
    & .title {
      font-size: 12px;
    }
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
const StyledInput = styled.input`
  flex: 1;
  width: 100%;

  border: 0;
  color: inherit;
  background: transparent;
  text-align: center;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;

  border-radius: 2px;
  &:focus {
    box-shadow: 0 1px 8px ${({ theme }) => theme.accentColor.base};
  }
`;
export default OrderSlotOverview;
