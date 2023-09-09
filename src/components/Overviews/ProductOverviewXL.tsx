import { IProduct } from '../../redux/products/products.types';
import FlexBox from '../atoms/FlexBox';
import React, { useMemo } from 'react';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import styled from 'styled-components';
import { Text } from '../atoms/Text';
import t from '../../lang';
import FormCreateVariation from '../Forms/FormVariation';
import { OverlayHandler, usePageCurrentProduct } from '../AppPages/PageCurrentProductProvider';

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

export type RenderOverviewCell<T = any> = (
  cell: ProductOverviewCell,
  setOverlayContent: OverlayHandler,
  data?: T
) => React.ReactNode;
const ProductOverviewXL: React.FC<ProductOverviewXLProps> = ({ className, ...p }) => {
  const page = usePageCurrentProduct();

  const renderCells = useMemo(
    () =>
      productOverviewCells.map(({ CellComponent, ...cell }) => {
        if (cell.renderCell) {
          return cell.renderCell(cell, page.createOverlayComponent, p.product);
        }
        if (CellComponent) {
          return (
            <CellComponent
              key={cell.title}
              setOverlayContent={page.createOverlayComponent}
              cell={cell}
              data={p.product}
            />
          );
        }
        const value = cell.getValue && cell.getValue(p.product);
        return renderTextCell(cell.title, value);
      }),
    [page.createOverlayComponent, p.product]
  );

  return (
    <Container fillWidth flex={1} className={className}>
      <FlexBox fillWidth flex={1} overflow={'auto'}>
        {renderCells}
      </FlexBox>

      <Footer fillWidth fxDirection={'row'} gap={6} padding={'8px'}>
        <ButtonIcon size={'32px'} variant={'onlyIcon'} iconSize={'85%'} icon={'edit'} onClick={p?.onEdit} />

        <ButtonIcon
          variant={'onlyIcon'}
          size={'32px'}
          iconSize={'85%'}
          icon={p?.product?.visible ? 'visibilityOn' : 'visibilityOff'}
          onClick={p?.onHide}
        />

        <DeleteBtn variant={'onlyIcon'} size={'32px'} iconSize={'85%'} icon={'delete'} onClick={p?.onDelete} />

        <OpenBtn
          size={'32px'}
          variant={'onlyIcon'}
          iconSize={'85%'}
          icon={'SmallArrowLeft'}
          onClick={p?.onOpenRightSide}
        />
      </Footer>
    </Container>
  );
};

const Container = styled(FlexBox)`
  position: relative;
  overflow: hidden;
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

const Cell = styled(FlexBox)`
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
export interface ProductOverviewCell {
  value?: string | number;
  title?: string;
  gridArea?: keyof IProduct;
  renderCell?: RenderOverviewCell<IProduct>;
  CellComponent?: React.FC<{ data?: IProduct; cell: ProductOverviewCell; setOverlayContent: OverlayHandler }>;
  getValue?: (product?: IProduct) => string | number;
}

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
      <CellText $isTitle $size={12}>
        {cell.title}
      </CellText>

      <FlexBox
        fillWidth
        fxDirection={'row'}
        gap={8}
        justifyContent={'space-between'}
        alignItems={'center'}
        overflow={'hidden'}
      >
        {data?.template ? (
          <ButtonIcon
            variant={'textExtraSmall'}
            onClick={() => {
              setOverlayContent({ RenderComponent: FormCreateVariation, props: { onSubmit: () => {}, create: true } });
            }}
          >
            {'Перегляд'}
          </ButtonIcon>
        ) : null}

        <CellText $disabled={!data?.template?.label} $weight={500}>{`${data?.template?.label}`}</CellText>
      </FlexBox>
    </Cell>
  );
};

const productOverviewCells: ProductOverviewCell[] = [
  {
    title: 'Назва',
    renderCell: (cell, setOverlayContent, product) => renderTextCell(cell.title, product?.label),
    gridArea: 'label',
  },
  {
    title: 'Тип',
    renderCell: (cell, setOverlayContent, product) => renderTextCell(cell.title, product?.type),
    gridArea: 'type',
  },
  {
    title: 'Артикул | SKU',
    renderCell: (cell, setOverlayContent, product) => renderTextCell(cell.title, product?.sku),
    gridArea: 'sku',
  },
  {
    title: 'Штрих-код',
    renderCell: (cell, setOverlayContent, product) => renderTextCell(cell.title, product?.barCode),
    gridArea: 'barCode',
  },
  {
    title: t('variationsTemplate'),
    CellComponent: VariationsTemplateCell,
    gridArea: 'template',
  },
  {
    title: 'Категорія',
    renderCell: (cell, setOverlayContent, product) => renderTextCell(cell.title, product?.category?.label),
    gridArea: 'category',
  },
  {
    title: 'Бренд',
    renderCell: (cell, setOverlayContent, product) => renderTextCell(cell.title, product?.brand?.label),
    gridArea: 'brand',
  },

  {
    title: 'Опис',
    renderCell: (cell, setOverlayContent, product) => renderTextCell(cell.title, product?.description),
    gridArea: 'description',
  },
];
