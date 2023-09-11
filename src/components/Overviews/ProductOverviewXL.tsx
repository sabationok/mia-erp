import { IProduct } from '../../redux/products/products.types';
import FlexBox from '../atoms/FlexBox';
import React, { useMemo } from 'react';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import styled from 'styled-components';
import { Text } from '../atoms/Text';
import t from '../../lang';
import FormCreateVariation from '../Forms/FormVariation';
import { OverlayHandler, usePageCurrentProduct } from '../AppPages/PageCurrentProductProvider';
import { useProductsSelector } from '../../redux/selectors.store';
import { useLocation, useNavigate } from 'react-router-dom';

export interface ProductOverviewXLProps {
  product?: IProduct;
  onEdit?: () => void;
  onDelete?: () => void;
  onArchive?: () => void;
  onHide?: () => void;
  onCreateVariation?: (data: Record<string, string>, onSuccess?: () => void) => void;
  onOpenRightSide?: () => void;
  className?: string;
}
export interface OverviewRenderCellReturnData {
  value?: string | number;
  title?: string;
  gridArea?: keyof IProduct;
  getValue?: () => React.ReactNode;
}
export interface ProductOverviewCell {
  value?: string | number;
  title?: string;
  gridArea?: keyof IProduct;
  renderCell?: RenderOverviewCell<IProduct>;
  CellComponent?: React.FC<{ data?: IProduct; cell: ProductOverviewCell; setOverlayContent: OverlayHandler }>;
  getValue?: (product?: IProduct) => string | number;
}
export type RenderOverviewCell<T = any> = (
  cell: ProductOverviewCell,
  setOverlayContent: OverlayHandler,
  data?: T
) => React.ReactNode;
const ProductOverviewXL: React.FC<ProductOverviewXLProps> = ({ className, onOpenRightSide, ...p }) => {
  const product = useProductsSelector().currentProduct;
  const page = usePageCurrentProduct();
  const navigate = useNavigate();
  const location = useLocation();

  const renderCells = useMemo(
    () =>
      productOverviewCells.map(({ CellComponent, ...cell }) => {
        if (cell.renderCell) {
          return cell.renderCell(cell, page.createOverlayComponent, product);
        }
        if (CellComponent) {
          return (
            <CellComponent
              key={cell.title}
              setOverlayContent={page.createOverlayComponent}
              cell={cell}
              data={product}
            />
          );
        }
        const value = cell.getValue && cell.getValue(product);
        return renderTextCell(cell.title, value);
      }),
    [page.createOverlayComponent, product]
  );

  return (
    <Container fillWidth flex={1} className={className} padding={'0 8px'}>
      <Header alignItems={'center'} justifyContent={'space-between'} fxDirection={'row'} gap={6} fillWidth>
        <FlexBox fxDirection={'row'} padding={'4px 0'} alignItems={'center'} fillHeight>
          <Text $weight={600} $size={18}>
            {'Перегляд продукту'}
          </Text>
        </FlexBox>

        <ButtonIcon
          variant={'onlyIcon'}
          icon={'close'}
          onClick={() => {
            if (product && location?.pathname) {
              const newPath = location?.pathname?.replace(`/${product?._id}`, '');

              newPath && navigate(newPath);
            }
          }}
        />
      </Header>

      <FlexBox fillWidth flex={1} overflow={'auto'}>
        {renderCells}
      </FlexBox>

      <Footer fillWidth fxDirection={'row'} gap={6} padding={'6px 0'}>
        <ButtonIcon size={'36px'} variant={'onlyIcon'} iconSize={'85%'} icon={'edit'} onClick={p?.onEdit} />

        <ButtonIcon
          variant={'onlyIcon'}
          size={'36px'}
          iconSize={'85%'}
          icon={p?.product?.visible ? 'visibilityOn' : 'visibilityOff'}
          onClick={p?.onHide}
        />

        <DeleteBtn variant={'onlyIcon'} size={'36px'} iconSize={'85%'} icon={'delete'} onClick={p?.onDelete} />

        <OpenBtn
          size={'36px'}
          variant={'onlyIcon'}
          iconSize={'85%'}
          icon={'SmallArrowLeft'}
          onClick={onOpenRightSide}
        />
      </Footer>
    </Container>
  );
};

const Container = styled(FlexBox)`
  position: relative;
  overflow: hidden;
`;
const Header = styled(FlexBox)`
  height: 32px;
`;
const Footer = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.sideBarBorderColor};
`;
const DeleteBtn = styled(ButtonIcon)`
  fill: ${p => p.theme.globals.colors.error};
`;
const OpenBtn = styled(ButtonIcon)`
  margin-left: auto;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;
const OverlayOpenButton = styled.button`
  display: flex;
  align-items: center;

  border: 0;
  background-color: transparent;

  font-family: inherit;
  font-weight: 500;
  font-size: 12px;
  padding: 0 6px;
  color: ${p => p.theme.accentColor.base};

  cursor: pointer;
`;

const Cell = styled(FlexBox)`
  min-height: 50px;
  border-top: 1px solid ${p => p.theme.sideBarBorderColor};
`;

const CellText = styled(Text)<{ $isTitle?: boolean }>`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;

  color: ${p =>
    p.$isTitle
      ? p.theme.globals.inputPlaceholderColor
      : p.$disabled
      ? p.theme.globals.inputPlaceholderColor
      : undefined};
`;
export default ProductOverviewXL;

const renderTextCell = (title?: string, value?: string | number) => {
  return (
    <Cell key={title} padding={'4px'}>
      <CellText $isTitle $size={12}>
        {title}
      </CellText>

      <FlexBox
        fillWidth
        flex={1}
        fxDirection={'row'}
        justifyContent={'flex-end'}
        alignItems={'flex-end'}
        overflow={'hidden'}
        style={{ minHeight: 24 }}
      >
        <CellText $disabled={!value} $weight={500}>
          {value || 'не визначено'}
        </CellText>
      </FlexBox>
    </Cell>
  );
};
const VariationsTemplateCell: React.FC<{
  cell: ProductOverviewCell;
  setOverlayContent: OverlayHandler;
  data?: IProduct;
}> = ({ cell, setOverlayContent, data }) => {
  return (
    <Cell key={cell.title} padding={'4px'}>
      <FlexBox alignItems={'center'} fxDirection={'row'} justifyContent={'space-between'} gap={8}>
        <CellText $isTitle $size={12}>
          {cell.title}
        </CellText>

        {data?.template && (
          <OverlayOpenButton
            type={'button'}
            onClick={() => {
              setOverlayContent({ RenderComponent: FormCreateVariation, props: { create: true } });
            }}
          >
            {'Перегляд'}
          </OverlayOpenButton>
        )}
      </FlexBox>

      <FlexBox
        fillWidth
        fxDirection={'row'}
        gap={8}
        height={'24px'}
        justifyContent={'flex-end'}
        alignItems={'flex-end'}
        overflow={'hidden'}
      >
        <CellText $disabled={!data?.template?.label} $weight={500}>{`${data?.template?.label}`}</CellText>
      </FlexBox>
    </Cell>
  );
};

const productOverviewCells: ProductOverviewCell[] = [
  {
    title: 'Назва',
    renderCell: (cell, _, product) => renderTextCell(cell.title, product?.label),
    gridArea: 'label',
  },
  {
    title: 'Тип',
    renderCell: (cell, _, product) => renderTextCell(cell.title, product?.type),
    gridArea: 'type',
  },
  {
    title: 'Артикул | SKU',
    renderCell: (cell, _, product) => renderTextCell(cell.title, product?.sku),
    gridArea: 'sku',
  },
  {
    title: 'Штрих-код',
    renderCell: (cell, _, product) => renderTextCell(cell.title, product?.barCode),
    gridArea: 'barCode',
  },
  {
    title: t('variationsTemplate'),
    CellComponent: VariationsTemplateCell,
    gridArea: 'template',
  },
  {
    title: 'Категорія',
    renderCell: (cell, _, product) =>
      renderTextCell(cell.title, `${product?.category?.parent?.label || ''}/${product?.category?.label}`),
    gridArea: 'category',
  },
  {
    title: 'Бренд',
    renderCell: (cell, _, product) => renderTextCell(cell.title, product?.brand?.label),
    gridArea: 'brand',
  },

  {
    title: 'Опис',
    renderCell: (cell, _, product) => renderTextCell(cell.title, product?.description),
    gridArea: 'description',
  },
];
