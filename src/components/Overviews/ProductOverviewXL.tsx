import { OfferEntity } from '../../types/offers/offers.types';
import FlexBox from '../atoms/FlexBox';
import React, { useMemo, useState } from 'react';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import styled from 'styled-components';
import { t } from '../../lang';
import { usePageCurrentProduct } from '../AppPages/PageProductOverview/PageOfferProvider';
import { OverlayHeader } from '../Forms/FormProduct/components';
import { checks, enumToFilterOptions, toAppDateFormat } from '../../utils';
import { IMeasurement } from '../../types/utils.types';
import TabSelector from '../atoms/TabSelector';
import { OverviewCellProps } from './components/overview-types';
import { OverviewCells } from './components/Cells';
import { useOverlayService } from '../../Providers/Overlay/OverlayStackProvider';
import { useAppRouter } from '../../hooks';

export interface ProductOverviewXLProps {
  product?: OfferEntity;
  onEdit?: () => void;
  onDelete?: () => void;
  onArchive?: () => void;
  onHide?: () => void;
  onRefresh?: () => void;
  onCreateVariation?: (data: Record<string, string>, onSuccess?: () => void) => void;
  onOpenRightSide?: () => void;
  className?: string;
}

export enum ProductOverviewTabsEnum {
  General = 'General',
  Properties = 'Properties',
  Defaults = 'Defaults',
  Images = 'Images',
  Futures = 'Futures',
  Cms = 'Cms',
}
export const ProductOverviewTabsList = enumToFilterOptions(ProductOverviewTabsEnum);
const ProductOverviewXL: React.FC<ProductOverviewXLProps> = ({ className, ...p }) => {
  const router = useAppRouter();
  const page = usePageCurrentProduct();
  const offer = page.currentOffer;
  const overlaySrv = useOverlayService();

  const [currentTab, setCurrentTab] = useState<ProductOverviewTabsEnum>(ProductOverviewTabsEnum.General);

  const renderCells = useMemo(
    () =>
      offerOverviewCellsMap[currentTab]?.map(({ CellComponent, ...cell }) => {
        if (CellComponent) {
          return <CellComponent key={cell.title} overlayHandler={overlaySrv.open} cell={cell} data={offer} />;
        }
        return <OverviewCells.Text key={cell.title} overlayHandler={overlaySrv.open} cell={cell} data={offer} />;
      }),
    [currentTab, overlaySrv.open, offer]
  );

  return (
    <Container fillWidth flex={1} className={className} padding={'0 8px'}>
      <OverlayHeader title={t('Offer overview')} onBackPress={router.goBack} />

      <TabSelector
        optionProps={{ fitContentH: true }}
        filterOptions={ProductOverviewTabsList}
        onOptSelect={option => {
          router.replace({ hash: option?.value });
          setCurrentTab(option?.value);
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

const productOverviewCells: OverviewCellProps<OfferEntity, ProductOverviewTabsEnum>[] = [
  {
    title: t('Label'),
    CellComponent: OverviewCells.Text,
    getValue: data => data?.label,
    gridArea: 'label',
    tab: ProductOverviewTabsEnum.General,
  },
  {
    title: t('status'),
    CellComponent: OverviewCells.OfferStatusChanger,
    getValue: data => data?.approved as string | null | undefined,
    gridArea: 'approved',
    tab: ProductOverviewTabsEnum.General,
  },
  {
    title: t('Type'),
    CellComponent: OverviewCells.Text,
    getValue: data => data?.type,
    gridArea: 'type',
    tab: ProductOverviewTabsEnum.General,
  },
  {
    title: t('SKU'),
    CellComponent: OverviewCells.Text,
    getValue: data => data?.sku,
    gridArea: 'sku',
    tab: ProductOverviewTabsEnum.General,
  },
  {
    title: t('Bar-code'),
    CellComponent: OverviewCells.Text,
    getValue: data => data?.barCode,
    gridArea: 'barCode',
    tab: ProductOverviewTabsEnum.General,
  },

  {
    title: t('Categories'),
    CellComponent: OverviewCells.OfferCategories,
    gridArea: 'categories',
    tab: ProductOverviewTabsEnum.General,
  },

  {
    title: t('Brand'),
    CellComponent: OverviewCells.Text,
    getValue: data => data?.brand?.label,
    gridArea: 'brand',
    tab: ProductOverviewTabsEnum.General,
  },
  {
    title: t('Measurement'),
    CellComponent: OverviewCells.Text,
    gridArea: 'measurement',
    getValue: product => {
      try {
        const data: IMeasurement = product?.measurement ? JSON.parse(product?.measurement as string) : {};
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
    tab: ProductOverviewTabsEnum.General,
  },
  {
    title: t('Description'),
    CellComponent: OverviewCells.Text,
    getValue: data => data?.description,
    gridArea: 'description',
    tab: ProductOverviewTabsEnum.General,
  },

  // * FUTURES

  {
    title: t('Negative sales'),
    CellComponent: OverviewCells.Text,
    getValue: product => (product?.futures?.negativeSale ? 'Yes' : 'No'),
    gridArea: 'reservation',
    tab: ProductOverviewTabsEnum.Futures,
  },

  {
    title: t('Reservation'),
    CellComponent: OverviewCells.Text,
    getValue: product => (product?.futures?.reservation?.isAvailable ? 'Yes' : 'No'),
    gridArea: 'reservation',
    tab: ProductOverviewTabsEnum.Futures,
  },

  {
    title: t('Custom production'),
    CellComponent: OverviewCells.Text,
    getValue: product => (product?.futures?.customProduction?.isAvailable ? 'Yes' : 'No'),
    gridArea: 'customProduction',
    tab: ProductOverviewTabsEnum.Futures,
  },

  {
    title: t('Custom order'),
    CellComponent: OverviewCells.Text,
    getValue: product => (product?.futures?.customOrder?.isAvailable ? 'Yes' : 'No'),
    gridArea: 'customOrder',
    tab: ProductOverviewTabsEnum.Futures,
  },

  {
    title: t('Pre-order'),
    CellComponent: OverviewCells.Text,
    getValue: product => (product?.futures?.preOrder?.isAvailable ? 'Yes' : 'No'),
    gridArea: 'preOrder',
    tab: ProductOverviewTabsEnum.Futures,
  },

  {
    title: t('Is promo'),
    CellComponent: OverviewCells.Text,
    getValue: data => data?.futures?.isPromo,
    gridArea: 'isPromo',
    tab: ProductOverviewTabsEnum.Futures,
  },

  // * PROPERTIES
  {
    title: t('Properties'),
    CellComponent: OverviewCells.OfferStaticProperties,
    gridArea: 'properties',
    tab: ProductOverviewTabsEnum.Properties,
  },

  // * DEFAULTS
  {
    title: t('Default values'),
    CellComponent: OverviewCells.OfferDefaults,
    gridArea: 'defaults',
    tab: ProductOverviewTabsEnum.Defaults,
  },

  {
    title: t('Created by / Date / Time'),
    CellComponent: OverviewCells.Text,
    getValue: product =>
      product?.author
        ? `${product?.author?.email} / ${
            product?.createdAt && checks.isStr(product?.createdAt)
              ? toAppDateFormat(Date.parse(product?.createdAt))
              : ''
          }`
        : null,
    gridArea: 'created',
    tab: ProductOverviewTabsEnum.General,
  },
  {
    title: t('Updated by / Date / Time'),
    CellComponent: OverviewCells.Text,
    getValue: product =>
      product?.editor
        ? `${product?.editor?.email} / ${
            product?.updatedAt && checks.isStr(product?.updatedAt)
              ? toAppDateFormat(Date.parse(product?.updatedAt))
              : ''
          }`
        : null,
    gridArea: 'updated',
    tab: ProductOverviewTabsEnum.General,
  },

  {
    title: t('Images'),
    CellComponent: OverviewCells.OfferImages,
    gridArea: 'images',
    tab: ProductOverviewTabsEnum.Images,
  },
];

const offerOverviewCellsMap: Record<
  ProductOverviewTabsEnum | string,
  OverviewCellProps<OfferEntity, ProductOverviewTabsEnum>[]
> = {};
productOverviewCells.forEach(item => {
  const tab = item.tab;
  if (tab) {
    if (offerOverviewCellsMap[tab]) {
      offerOverviewCellsMap[tab].push(item);
    } else {
      offerOverviewCellsMap[tab] = [item];
    }
  }
});
