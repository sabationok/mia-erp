import { IProduct } from '../../redux/products/products.types';
import FlexBox from '../atoms/FlexBox';
import React, { useMemo } from 'react';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import styled from 'styled-components';
import { Text } from '../atoms/Text';
import t from '../../lang';
import { OverlayHandler, usePageCurrentProduct } from '../AppPages/PageProductOverview/PageCurrentProductProvider';
import { useProductsSelector } from '../../redux/selectors.store';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Cells from './components/Cells';

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

export type RenderOverviewCellComponent = React.FC<{
  cell: ProductOverviewCell;
  setOverlayContent: OverlayHandler;
  data?: IProduct;
}>;

export interface ProductOverviewCell {
  value?: string | number;
  title?: string;
  gridArea?: keyof IProduct;
  CellComponent?: RenderOverviewCellComponent;
  getValue?: (product?: IProduct) => string | number | undefined;
}

const ProductOverviewXL: React.FC<ProductOverviewXLProps> = ({ className, onOpenRightSide, ...p }) => {
  const product = useProductsSelector().currentProduct;
  const page = usePageCurrentProduct();
  const navigate = useNavigate();
  const location = useLocation();

  const renderCells = useMemo(
    () =>
      productOverviewCells.map(({ CellComponent, ...cell }) => {
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
        return (
          <Cells.OverviewTextCell
            key={cell.title}
            setOverlayContent={page.createOverlayComponent}
            cell={cell}
            data={product}
          />
        );
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

export default ProductOverviewXL;

const productOverviewCells: ProductOverviewCell[] = [
  {
    title: 'Назва',
    CellComponent: Cells.OverviewTextCell,
    getValue: product => product?.label,
    gridArea: 'label',
  },
  {
    title: 'Тип',
    CellComponent: Cells.OverviewTextCell,
    getValue: product => product?.type,
    gridArea: 'type',
  },
  {
    title: 'Артикул | SKU',
    CellComponent: Cells.OverviewTextCell,
    getValue: product => product?.sku,
    gridArea: 'sku',
  },
  {
    title: 'Штрих-код',
    CellComponent: Cells.OverviewTextCell,
    getValue: product => product?.barCode,
    gridArea: 'barCode',
  },

  {
    title: 'Категорія',
    CellComponent: Cells.OverviewTextCell,
    getValue: product => `${product?.category?.parent?.label || ''}/${product?.category?.label}`,
    gridArea: 'category',
  },
  {
    title: 'Бренд',
    CellComponent: Cells.OverviewTextCell,
    getValue: product => product?.brand?.label,
    gridArea: 'brand',
  },
  {
    title: 'Опис',
    CellComponent: Cells.OverviewTextCell,
    getValue: product => product?.description,
    gridArea: 'description',
  },
  {
    title: 'Вимірювання',
    CellComponent: Cells.OverviewTextCell,
    getValue: product => product?.measurement?.units,
    gridArea: 'measurement',
  },
  // * PROPERTIES
  {
    title: t('variationsTemplate'),
    CellComponent: Cells.VariationsTemplateCell,
    gridArea: 'template',
  },
  { title: 'Додаткові характеристики', CellComponent: Cells.StaticProperties, gridArea: 'properties' },
  // * DEFAULTS
  {
    title: 'Склад за замовчуванням',
    CellComponent: Cells.OverviewTextCell,
    getValue: product => product?.defaults?.warehouse?.label,
    gridArea: 'measurement',
  },
  {
    title: 'Постачальник за замовчуванням',
    CellComponent: Cells.OverviewTextCell,
    getValue: product => product?.defaults?.supplier?.label,
    gridArea: 'measurement',
  },
  {
    title: 'Ціна за замовчуванням',
    CellComponent: Cells.OverviewTextCell,
    getValue: product => {
      const { discount, price, cost, currency } = product?.defaults?.price || {};

      return `Price: ${price || 0} | Cost: ${cost || 0} | Discount: ${discount || 0} | Currency: ${currency || '---'}`;
    },
    gridArea: 'measurement',
  },
];
