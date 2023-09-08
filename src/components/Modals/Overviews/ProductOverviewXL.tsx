import { IProduct } from '../../../redux/products/products.types';
import FlexBox from '../../atoms/FlexBox';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import styled from 'styled-components';
import { Text } from '../../atoms/Text';
import { nanoid } from '@reduxjs/toolkit';
import { useProductsSelector } from '../../../redux/selectors.store';
import t from '../../../lang';

export interface ProductOverviewXLProps {
  product?: IProduct;
  onEdit?: () => void;
  onDelete?: () => void;
  onArchive?: () => void;
  onHide?: () => void;
  onOpenRightSide?: () => void;
  className?: string;
}
export interface OverviewRenderCellReturnData {
  value?: string | number;
  title?: string;
  gridArea?: keyof IProduct;
  getValue?: () => React.ReactNode;
}

export type OpenOverlayHandler = <Props = any>(params: OpenOverlayHandlerParams<Props>) => OpenOverlayHandlerReturn;
export interface OpenOverlayHandlerParams<Props = any> {
  RenderComponent: React.FC<OverlayRenderComponentProps<Props>>;
  props?: OverlayRenderComponent<Props>;
}
export interface OverlayStackItemData<Props = any> {
  RenderComponent: React.FC<OverlayRenderComponentProps<Props>>;
  props?: OverlayRenderComponent<Props>;
  id: string;
}
export interface OverlayRenderComponent<Props = any> extends React.FC<OverlayRenderComponentProps<Props>> {}
export type OverlayRenderComponentProps<Props = any> = OpenOverlayHandlerReturn & Props;
export interface OpenOverlayHandlerReturn {
  onClose?: () => void;
  index?: number;
  id?: string;
}
const ProductPropertiesOverview: React.FC<OverlayRenderComponentProps<{ title?: string }>> = ({ onClose }) => {
  const product = useProductsSelector().currentProduct;
  const [selected, setSelected] = useState<Record<string, string>>({});

  const handleSelect = (parentId: string, id: string) => {
    setSelected(prev => {
      return { ...prev, [parentId]: id };
    });
  };

  const renderTemplate = useMemo(() => {
    return product?.template?.childrenList?.map(prop => {
      return (
        <PropertyBox key={`property-${prop._id}`} gap={8} fillWidth padding={'8px 0 0'}>
          <Text style={{ flex: 1, paddingLeft: 12 }} $weight={500}>
            {prop.label}
          </Text>

          <FlexBox fillWidth padding={'8px 0'} fxDirection={'row'} gap={6} flexWrap={'wrap'}>
            {prop.childrenList?.map(value => (
              <ValueTag
                key={`prop-value-${value._id}`}
                variant={selected[prop._id] === value._id ? 'filledSmall' : 'outlinedSmall'}
                padding={'6px 8px'}
                fontWeight={500}
                onClick={() => handleSelect(prop._id, value._id)}
              >
                {value.label}
              </ValueTag>
            ))}
          </FlexBox>
        </PropertyBox>
      );
    });
  }, [product?.template?.childrenList, selected]);

  return (
    <PropertiesContainer flex={1} fillWidth padding={'0 8px'}>
      <PropertiesHeader alignItems={'center'} justifyContent={'space-between'} fxDirection={'row'} gap={6} fillWidth>
        <FlexBox fxDirection={'row'} padding={'4px 0'} alignItems={'center'} fillHeight>
          <CellText $weight={600} $size={18}>
            {product?.template?.label || 'Title'}
          </CellText>
        </FlexBox>

        <ButtonIcon variant={'onlyIcon'} onClick={onClose} icon={'close'}></ButtonIcon>
      </PropertiesHeader>

      <PropertiesBox flex={1}>{renderTemplate}</PropertiesBox>

      <FlexBox padding={'6px'}>
        <ButtonIcon fontWeight={600} variant={'outlinedLarge'} textTransform={'uppercase'} endIcon={'SmallArrowRight'}>
          {'Додати'}
        </ButtonIcon>
      </FlexBox>
    </PropertiesContainer>
  );
};

const PropertiesContainer = styled(FlexBox)`
  background-color: ${p => p.theme.tableBackgroundColor};
`;
const PropertiesBox = styled(FlexBox)``;
const PropertiesHeader = styled(FlexBox)`
  border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
`;

const PropertyBox = styled(FlexBox)`
  border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
`;
const ValueTag = styled(ButtonIcon)`
  //color: ${p => p.theme.accentColor.base};
  width: max-content;
  // border-radius: 2px;
  // border: 2px solid ${p => p.theme.accentColor.light};
  //
  // &:hover {
  //   border: 2px solid ${p => p.theme.accentColor.base};
  // }
`;
const ProductOverviewXL: React.FC<ProductOverviewXLProps> = ({ className, ...p }) => {
  const lastStackItemRef = useRef<HTMLDivElement>(null);
  const [overlayStack, setOverlayStack] = useState<OverlayStackItemData[]>([]);

  const handleCloseStackItem = useCallback((id: string) => {
    return () => {
      setOverlayStack(pStack => pStack.filter(el => el.id !== id));
    };
  }, []);
  const createOverlayComponent: OpenOverlayHandler = useCallback(
    params => {
      const id = nanoid(8);
      if (typeof params.RenderComponent === 'function') {
        setOverlayStack(pStack => [
          ...pStack,
          {
            ...params,
            id,
          },
        ]);
      }

      const returnData: OpenOverlayHandlerReturn = {
        onClose: handleCloseStackItem(id),
        id,
      };
      return returnData;
    },
    [handleCloseStackItem]
  );

  const renderCells = useMemo(
    () =>
      productOverviewCells.map(cell => {
        if (cell.renderCell) {
          return cell.renderCell(cell, createOverlayComponent, p.product);
        }
        const value = cell.getValue && cell.getValue(p.product);
        return renderTextCell(cell.title, value);
      }),
    [createOverlayComponent, p.product]
  );

  const renderStack = useMemo(() => {
    return overlayStack.map(({ RenderComponent, props, id }) => (
      <RenderComponent key={`overlay-${id}`} {...props} onClose={handleCloseStackItem(id)} />
    ));
  }, [handleCloseStackItem, overlayStack]);

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

      <Backdrop fillWidth fillHeight isActive={overlayStack.length > 0} ref={lastStackItemRef} overflow={'hidden'}>
        {renderStack}
      </Backdrop>
    </Container>
  );
};
const Container = styled(FlexBox)`
  position: relative;
  overflow: hidden;
`;
const Backdrop = styled(FlexBox)`
  position: absolute;

  top: 0;
  left: ${p => (p.isActive ? 0 : '100%')};
  z-index: 20;

  background-color: ${p => p.theme.backdropColor};

  transition: all ${p => p.theme.globals.timingFunctionMain};
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
  getValue?: (product?: IProduct) => string | number;
}
export type RenderOverviewCell<T = any> = (
  cell: ProductOverviewCell,
  setOverlayContent: OpenOverlayHandler,
  data?: T
) => React.ReactNode;
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
const renderVariationsTemplateCell: RenderOverviewCell<IProduct> = (cell, setOverlayContent, product) => {
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
        {product?.template ? (
          <ButtonIcon
            variant={'textExtraSmall'}
            onClick={() => {
              setOverlayContent({ RenderComponent: ProductPropertiesOverview });
            }}
          >
            {'Перегляд'}
          </ButtonIcon>
        ) : null}

        <CellText $disabled={!product?.template?.label} $weight={500}>{`${product?.template?.label}`}</CellText>
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
    renderCell: renderVariationsTemplateCell,
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
