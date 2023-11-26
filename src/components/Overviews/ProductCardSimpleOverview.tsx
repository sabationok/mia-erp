import styled from 'styled-components';
import FlexBox from '../atoms/FlexBox';
import { useMemo } from 'react';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import { IProduct } from '../../types/products.types';
import { t } from '../../lang';
import { MaybeNull } from '../../types/utils.types';

export interface ProductCardForSelectorProps {
  product: IProduct;
  isSelected?: boolean;
  onSelect?: () => void;
  onRemove?: () => void;
  disabled?: boolean;
}

const ProductCardSimpleOverview: React.FC<ProductCardForSelectorProps> = ({
  product,
  disabled,
  isSelected,
  onSelect,
  onRemove,
}) => {
  const cells = useMemo(
    (): { value?: MaybeNull<string>; title?: string; gridArea: string; isLastInRow?: boolean }[] => [
      {
        title: t('Label'),
        value: product.label,
        gridArea: '1/1/1/9',
      },
      {
        title: t('SKU'),
        value: product.sku,
        gridArea: '1/9/1/13',
        isLastInRow: true,
      },
      {
        title: t('Bar-code'),
        value: product.barCode,
        gridArea: '2/1/2/5',
      },
      {
        title: t('Label'),
        value: product.brand?.label,
        gridArea: '2/5/2/9',
      },
      {
        title: t('Type'),
        value: product.type,
        gridArea: '2/9/2/13',
        isLastInRow: true,
      },
      {
        title: t('Description'),
        value: product.description,
        gridArea: '3/1/3/13',
        isLastInRow: true,
      },
    ],
    [product.barCode, product.brand?.label, product.description, product.label, product.sku, product.type]
  );

  return (
    <Card fillWidth gap={8} isSelected={isSelected} disabled={disabled}>
      <ImageBox>
        <img
          src={product?.images ? product?.images[0]?.img_preview : ''}
          style={{ objectFit: 'contain' }}
          alt={product?.label}
          width={'100%'}
          height={'100%'}
        />
      </ImageBox>

      <FlexBox gap={8} flex={1}>
        <CardGridBox>
          {cells.map(({ title, value, gridArea, isLastInRow }) => (
            <CardGridBoxInner key={`cardCell-${title}`} gridArea={gridArea || '1/1/1/9'} isLastInRow={isLastInRow}>
              <div
                className={'text title'}
                style={{
                  textAlign: 'start',
                  fontSize: 10,
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
                {value || '-'}
              </div>
            </CardGridBoxInner>
          ))}
        </CardGridBox>
      </FlexBox>

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

  padding: 8px 0;
  //border-bottom: 2px solid ${({ theme }) => theme.fieldBackgroundColor};

  transition: all ${({ theme }) => theme.globals.timingFunctionMain};
  pointer-events: ${({ disabled }) => disabled && 'none'};
  cursor: default;

  //&:hover {
  //  box-shadow: 0 4px 6px 4px rgba(0, 0, 0, 0.16), 0 4px 6px 4px rgba(210, 210, 210, 0.25);
  //}

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

  //@media screen and (max-width: 480px) {
  //  grid-template-columns: 1fr;
  //  grid-template-rows: 1fr max-content min-content;
  //  max-height: 100%;
  //}

  //border: 1px solid tomato;
`;
const CardGridBox = styled(FlexBox)`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(3, 1fr);

  //max-width: 270px;
  height: 100%;
  border-top: 1px solid ${({ theme }) => theme.trBorderClr};
`;

// const CardGridArea = styled(FlexBox)`
//   display: grid;
//   grid-template-columns: repeat(6, 1fr);
//   grid-template-rows: repeat(5, min-content);
//   grid-template-areas:
//     'img img label label sku sku'
//     'img img brand brand type type'
//     'atr_1 atr_1  atr_2  atr_2 qty qty'
//     'price bonuses discount total total currency'
//     'warehouse warehouse warehouse warehouse warehouse warehouse';
//
//   //max-width: 270px;
//   height: max-content;
//   border-top: 1px solid ${({ theme }) => theme.trBorderClr};
//
//   @media screen and (max-width: 480px) {
//     grid-template-columns: repeat(6, 1fr);
//     grid-template-rows: repeat(5, min-content);
//     grid-template-areas:
//       'label label label label sku sku'
//       'category category brand brand type type'
//       'atr_1 atr_1 atr_1 atr_2 atr_2 atr_2'
//       'qty qty price price bonuses discount'
//       'total total total total currency currency'
//       'warehouse warehouse warehouse warehouse warehouse warehouse';
//   }
// `;
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
export default ProductCardSimpleOverview;
