import { IProduct, IProductMeasurement } from '../../redux/products/products.types';
import FlexBox from '../atoms/FlexBox';
import React, { useMemo } from 'react';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import styled from 'styled-components';
import t from '../../lang';
import { usePageCurrentProduct } from '../AppPages/PageProductOverview/PageCurrentProductProvider';
import { useProductsSelector } from '../../redux/selectors.store';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Cells from './components/Cells';
import { OverviewCellProps } from './components/Cells';
import { OverlayHeader } from '../Forms/FormProduct/components';
import numberWithSpaces from '../../utils/numbers';

export interface ProductOverviewXLProps {
  product?: IProduct;
  onEdit?: () => void;
  onDelete?: () => void;
  onArchive?: () => void;
  onHide?: () => void;
  onRefresh?: () => void;
  onCreateVariation?: (data: Record<string, string>, onSuccess?: () => void) => void;
  onOpenRightSide?: () => void;
  className?: string;
}

const ProductOverviewXL: React.FC<ProductOverviewXLProps> = ({ className, ...p }) => {
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
      <OverlayHeader
        title={'Перегляд продукту'}
        onClose={() => {
          if (product && location?.pathname) {
            const newPath = location?.pathname?.replace(`/${product?._id}`, '');

            newPath && navigate(newPath);
          }
        }}
      />

      <Content fillWidth flex={1} overflow={'auto'}>
        {renderCells}
      </Content>

      <Footer fillWidth fxDirection={'row'} gap={6} padding={'6px 0'}>
        <ButtonIcon
          size={'36px'}
          variant={'onlyIcon'}
          iconSize={'85%'}
          icon={'edit'}
          disabled={!p?.onEdit}
          onClick={p?.onEdit}
        />

        <ButtonIcon
          variant={'onlyIcon'}
          size={'36px'}
          iconSize={'85%'}
          icon={p?.product?.visible ? 'visibilityOn' : 'visibilityOff'}
          disabled={!p?.onHide}
          onClick={p?.onHide}
        />

        <DeleteBtn
          variant={'onlyIcon'}
          size={'36px'}
          iconSize={'85%'}
          icon={'delete'}
          disabled={!p?.onDelete}
          onClick={p?.onDelete}
        />

        <FlexBox fxDirection={'row'} gap={6} margin={'0 0 0 auto'}>
          <ButtonIcon
            size={'36px'}
            variant={'onlyIcon'}
            iconSize={'85%'}
            icon={'refresh'}
            disabled={!p?.onRefresh}
            onClick={p?.onRefresh}
          />

          <OpenBtn
            size={'36px'}
            variant={'onlyIcon'}
            iconSize={'85%'}
            icon={'SmallArrowLeft'}
            disabled={!p?.onOpenRightSide}
            onClick={p?.onOpenRightSide}
          />
        </FlexBox>
      </Footer>
    </Container>
  );
};

const Container = styled(FlexBox)`
  position: relative;
  overflow: hidden;

  background-color: ${p => p.theme.sideBarBackgroundColor};
`;

const Content = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.sideBarBorderColor};
  border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
`;
const Footer = styled(FlexBox)``;
const DeleteBtn = styled(ButtonIcon)`
  fill: ${p => p.theme.globals.colors.error};
`;
const OpenBtn = styled(ButtonIcon)`
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export default ProductOverviewXL;

const productOverviewCells: OverviewCellProps<IProduct>[] = [
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
    title: 'Категорії',
    CellComponent: Cells.CategoriesCell,
    gridArea: 'categories',
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
    getValue: product => {
      try {
        const data: IProductMeasurement = product?.measurement ? JSON.parse(product?.measurement as string) : {};
        const arr = [
          `${t('unit')}: ${data?.unit || 0}`,
          `${t('min')}: ${data?.min || 0}`,
          `${t('max')}: ${data?.max || 0}`,
          `${t('step')}: ${data?.step || 0}`,
        ];

        return arr.join(' | ');
      } catch (e) {
        return '';
      }
    },
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
    getValue: product =>
      `${product?.defaults?.warehouse?.label || '---'} | ${product?.defaults?.warehouse?.code || '---'}`,
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
      const arr = [
        `${t('price')}: ${numberWithSpaces(product?.defaults?.price?.price || 0)}`,
        `${t('cost')}: ${numberWithSpaces(product?.defaults?.price?.cost || 0)}`,
        `${t('discount')}: ${numberWithSpaces(product?.defaults?.price?.discountAmount || 0)}`,
        `${t('cashback')}: ${numberWithSpaces(product?.defaults?.price?.cashbackAmount || 0)}`,
      ];

      return arr.join(' | ');
    },
    gridArea: 'measurement',
  },

  {
    title: 'Створено',
    CellComponent: Cells.OverviewTextCell,
    getValue: product => `${product?.author?.name}`,
    gridArea: 'createdAt',
  },
  {
    title: 'Оновлено',
    CellComponent: Cells.OverviewTextCell,
    getValue: product => `${product?.editor?.name}`,
    gridArea: 'updatedAt',
  },

  {
    title: 'Фото',
    CellComponent: Cells.ImagesCell,
    gridArea: 'images',
  },
];
