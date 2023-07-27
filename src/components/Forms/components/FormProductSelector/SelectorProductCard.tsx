import styled from 'styled-components';
import FlexBox from '../../../atoms/FlexBox';
import { useEffect, useMemo } from 'react';
import ButtonIcon from '../../../atoms/ButtonIcon/ButtonIcon';
import { IProduct } from '../../../../redux/products/products.types';

export interface ProductCardForSelectorProps {
  product: IProduct;
  isSelected?: boolean;
  onSelect?: () => void;
  disabled?: boolean;
}

const SelectorProductCard: React.FC<ProductCardForSelectorProps> = ({ product, disabled, isSelected, onSelect }) => {
  const logProduct = () => {
    console.log(product);
  };

  useEffect(logProduct, [product]);

  const cells = useMemo(
    (): { value?: string; title?: string; gridArea: string; isLastInRow?: boolean }[] => [
      {
        title: 'Назва',
        value: product.label,
        gridArea: '1/1/1/9',
      },
      {
        title: 'Артикул | SKU',
        value: product.sku,
        gridArea: '1/9/1/13',
        isLastInRow: true,
      },
      {
        title: 'Категорія',
        value: product.category?.label,
        gridArea: '2/1/2/5',
      },
      {
        title: 'Бренд',
        value: product.brand?.label,
        gridArea: '2/5/2/9',
      },
      {
        title: 'Постачальник',
        value: product.brand?.label,
        gridArea: '2/9/2/13',

        isLastInRow: true,
      },
      {
        title: 'Опис',
        value: product.brand?.label,
        gridArea: '3/1/3/13',
        isLastInRow: true,
      },
    ],
    [product.brand?.label, product.category?.label, product.label, product.sku]
  );

  return (
    <Card fillWidth gap={8} isSelected={isSelected} disabled={disabled}>
      <ImageBox>
        <img
          src={
            (product?.images && product?.images[0]?.img_1x) ||
            'https://cdn.create.vista.com/api/media/medium/186787692/stock-photo-profile-young-stylish-man-eyeglasses?token='
          }
          alt={''}
          width={'100%'}
          height={'100%'}
        />
      </ImageBox>

      <FlexBox gap={8} flex={1}>
        <CardGridBox>
          {cells.map(({ title, value, gridArea, isLastInRow }) => (
            <CardGridBoxInner key={`cardCell-${title}`} gridArea={gridArea || '1/1/1/9'} isLastInRow={isLastInRow}>
              <div
                className={'text'}
                style={{
                  textAlign: 'start',
                  fontSize: 10,
                  color: 'rgba(0,0,0,0.5)',
                }}
              >
                {title || 'Title'}
              </div>
              <div
                className={'text'}
                style={{
                  textAlign: 'end',
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                {value || '---'}
              </div>
            </CardGridBoxInner>
          ))}
        </CardGridBox>
      </FlexBox>

      {!disabled && (
        <FlexBox justifyContent={'space-between'}>
          <ButtonIcon variant={'onlyIcon'} iconSize={'100%'} size={'24px'} />
          <ButtonIcon variant={'onlyIcon'} iconSize={'100%'} size={'24px'} icon={'info'} />

          <ButtonIcon variant={'onlyIconFilled'} iconSize={'100%'} size={'24px'} icon={'done'} onClick={onSelect} />
        </FlexBox>
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
  border-bottom: 2px solid ${({ theme, isSelected }) => theme.fieldBackgroundColor};
  box-shadow: ${({ theme, isSelected }) => (isSelected ? '0px 2px 6px 0px rgba(0, 0, 0, 0.16)' : '')};

  transition: all ${({ theme, isSelected }) => theme.globals.timingFunctionMain};
  pointer-events: ${({ disabled }) => disabled && 'none'};
  cursor: default;

  &:hover {
    box-shadow: ${({ theme }) => '0px 2px 6px 0px rgba(0, 0, 0, 0.16)'};
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
`;
const CardGridBox = styled(FlexBox)`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(3, 1fr);

  //max-width: 270px;
  height: 100%;
`;
const CardGridBoxInner = styled(FlexBox)<{ gridArea: string; isLastInRow?: boolean }>`
  justify-content: space-between;

  grid-area: ${({ gridArea = '' }) => gridArea};

  padding: 4px 6px;

  border-right: 1px solid ${({ theme, isLastInRow }) => (!isLastInRow ? theme.tableRowStroke : 'transparent')};
  border-bottom: 1px solid ${({ theme }) => theme.tableRowStroke};

  & .text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  //outline: 1px solid tomato;
`;

const ImageBox = styled(FlexBox)`
  height: 100%;
  width: 100%;
  overflow: hidden;

  background-color: ${({ theme }) => theme.fieldBackgroundColor};
`;
export default SelectorProductCard;
