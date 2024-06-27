import { OfferEntity } from '../../../types/offers/offers.types';
import FlexBox from '../../atoms/FlexBox';
import React, { useMemo, useState } from 'react';
import ButtonIcon from '../../atoms/ButtonIcon';
import styled from 'styled-components';
import { t } from '../../../lang';
import { usePageCurrentOffer } from '../../AppPages/offers/PageOfferProvider';
import { DrawerHeader } from '../../Overlays';
import TabSelector from '../../atoms/TabSelector';
import { useOverlayService } from '../../../Providers/Overlay/OverlayStackProvider';
import { useAppRouter } from '../../../hooks';
import { OverviewTextCell } from '../components/OverviewTextCell';
import { enumToFilterOptions, toAppDateFormat } from '../../../utils';
import { OverviewCellProps } from '../components/overview-types';
import { IMeasurement, PartialRecord } from '../../../types/utils.types';
import { isString } from 'lodash';
import { OfferOverviewCategoriesArea } from './components/OfferOverviewCategoriesArea';
import { OfferOverviewStaticProperties } from './components/OfferOverviewStaticPropertiesCell';
import { OfferOverviewDefaultsArea } from './components/OfferOverviewDefaultsArea';
import { OfferOverviewImagesArea } from './components/OfferOverviewImagesArea';
import { Text } from '../../atoms/Text';
import { OfferOverviewTagsArea } from './components/OfferOverviewTagsArea';

export enum OfferOverviewTabsEnum {
  General = 'General',
  Properties = 'Properties',
  Defaults = 'Defaults',
  Images = 'Images',
  Futures = 'Futures',
  Cms = 'Cms',
}

export const ProductOverviewTabsList = enumToFilterOptions(OfferOverviewTabsEnum);

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

const OfferOverviewXL: React.FC<ProductOverviewXLProps> = ({ className, ...p }) => {
  const router = useAppRouter();
  const page = usePageCurrentOffer();
  const offer = page.currentOffer;
  const overlaySrv = useOverlayService();
  const cellsMap = getOfferOverviewCellsMap();

  const [currentTab, setCurrentTab] = useState<OfferOverviewTabsEnum>(OfferOverviewTabsEnum.General);

  const renderCells = useMemo(
    () =>
      !cellsMap[currentTab]
        ? null
        : cellsMap[currentTab]?.map(({ CellComponent, ...cell }) => {
            if (CellComponent) {
              return <CellComponent key={cell.title} overlayHandler={overlaySrv.open} cell={cell} data={offer} />;
            }
            return <OverviewTextCell key={cell.title} overlayHandler={overlaySrv.open} cell={cell} data={offer} />;
          }),
    [cellsMap, currentTab, overlaySrv.open, offer]
  );

  return (
    <Container fillWidth flex={1} className={className} padding={'0 8px'}>
      <DrawerHeader title={t('Offer overview')} onBackPress={router.goBack} />

      <TabSelector
        optionProps={{ fitContentH: true }}
        options={ProductOverviewTabsList}
        onOptSelect={option => {
          router.replace({ hash: option?.value });
          option?.value && setCurrentTab(option?.value);
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
const offerOverviewCells: OverviewCellProps<OfferEntity, OfferOverviewTabsEnum>[] = [
  {
    title: t('Label'),
    getValue: data => data?.label,
    gridArea: 'label',
    tab: OfferOverviewTabsEnum.General,
  },
  {
    title: t('status'),
    getValue: data => data?.approved as string | null | undefined,
    gridArea: 'approved',
    tab: OfferOverviewTabsEnum.General,
  },
  {
    title: t('Type'),
    getValue: data => data?.type,
    gridArea: 'type',
    tab: OfferOverviewTabsEnum.General,
  },
  {
    title: t('SKU'),
    getValue: data => data?.sku,
    gridArea: 'sku',
    tab: OfferOverviewTabsEnum.General,
  },
  {
    title: t('Bar-code'),
    getValue: data => data?.barCode,
    gridArea: 'barCode',
    tab: OfferOverviewTabsEnum.General,
  },

  // * PROPERTIES
  {
    title: t('Categories'),
    CellComponent: OfferOverviewCategoriesArea,
    gridArea: 'categories',
    tab: OfferOverviewTabsEnum.Properties,
  },
  {
    title: t('Properties'),
    CellComponent: OfferOverviewStaticProperties,
    gridArea: 'properties',
    tab: OfferOverviewTabsEnum.Properties,
  },
  {
    title: t('Tags'),
    CellComponent: OfferOverviewTagsArea,
    gridArea: 'tags',
    tab: OfferOverviewTabsEnum.Properties,
  },

  {
    title: t('Brand'),
    getValue: data => data?.brand?.label,
    gridArea: 'brand',
    tab: OfferOverviewTabsEnum.General,
  },
  {
    title: t('Measurement'),
    gridArea: 'measurement',
    getValue: product => {
      try {
        const data: IMeasurement = isString(product?.measurement)
          ? JSON.parse(product?.measurement as string)
          : product?.measurement;
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
    tab: OfferOverviewTabsEnum.General,
  },
  {
    title: t('Description'),
    getValue: data => data?.description,
    gridArea: 'description',
    tab: OfferOverviewTabsEnum.General,
  },

  // * FUTURES

  {
    title: t('Negative sales'),
    getValue: product => (product?.futures?.negativeSale ? 'Yes' : 'No'),
    gridArea: 'reservation',
    tab: OfferOverviewTabsEnum.Futures,
  },

  {
    title: t('Reservation'),
    getValue: product => (product?.futures?.reservation?.isAvailable ? 'Yes' : 'No'),
    gridArea: 'reservation',
    tab: OfferOverviewTabsEnum.Futures,
  },

  {
    title: t('Custom production'),
    getValue: product => (product?.futures?.customProduction?.isAvailable ? 'Yes' : 'No'),
    gridArea: 'customProduction',
    tab: OfferOverviewTabsEnum.Futures,
  },

  {
    title: t('Custom order'),
    getValue: product => (product?.futures?.customOrder?.isAvailable ? 'Yes' : 'No'),
    gridArea: 'customOrder',
    tab: OfferOverviewTabsEnum.Futures,
  },

  {
    title: t('Pre-order'),
    getValue: product => (product?.futures?.preOrder?.isAvailable ? 'Yes' : 'No'),
    gridArea: 'preOrder',
    tab: OfferOverviewTabsEnum.Futures,
  },

  // {
  //   title: t('Is promo'),
  //   getValue: data => data?.futures?.isPromo,
  //   gridArea: 'isPromo',
  //   tab: OfferOverviewTabsEnum.Futures,
  // },

  // * DEFAULTS
  {
    title: t('Default values'),
    CellComponent: OfferOverviewDefaultsArea,
    gridArea: 'defaults',
    tab: OfferOverviewTabsEnum.Defaults,
  },

  {
    title: t('Created by / Date / Time'),
    getValue: product => {
      return [
        { title: 'Created by', value: product?.author?.user?.email },
        {
          title: 'Created at',
          value:
            product?.createdAt && isString(product?.createdAt) ? toAppDateFormat(Date.parse(product?.createdAt)) : '',
        },
      ].map(item => {
        return (
          <FlexBox key={item.title} gap={4} fillWidth justifyContent={'space-between'} fxDirection={'row'}>
            <Text>{item.title ?? t('undefined')}</Text>
            <Text>{item.value ?? t('undefined')}</Text>
          </FlexBox>
        );
      });
    },
    gridArea: 'created',
    tab: OfferOverviewTabsEnum.General,
  },
  {
    title: t('Updated by / Date / Time'),
    getValue: product => {
      return [
        { title: 'Updated by', value: product?.editor?.user?.email },
        {
          title: 'Updated at',
          value:
            product?.updatedAt && isString(product?.updatedAt) ? toAppDateFormat(Date.parse(product?.updatedAt)) : '',
        },
      ].map(item => {
        return (
          <FlexBox key={item.title} gap={4} fillWidth justifyContent={'space-between'} fxDirection={'row'}>
            <Text>{item.title ?? t('undefined')}</Text>
            <Text>{item.value ?? t('undefined')}</Text>
          </FlexBox>
        );
      });
    },
    gridArea: 'updated',
    tab: OfferOverviewTabsEnum.General,
  },

  {
    title: t('Images'),
    CellComponent: OfferOverviewImagesArea,
    gridArea: 'images',
    tab: OfferOverviewTabsEnum.Images,
  },
];

function getOfferOverviewCellsMap(): PartialRecord<
  OfferOverviewTabsEnum | string,
  OverviewCellProps<OfferEntity, OfferOverviewTabsEnum>[]
> {
  const offerOverviewCellsMap: PartialRecord<
    OfferOverviewTabsEnum | string,
    OverviewCellProps<OfferEntity, OfferOverviewTabsEnum>[]
  > = {};
  offerOverviewCells.forEach(item => {
    const tab = item.tab;
    if (tab) {
      if (offerOverviewCellsMap[tab]) {
        offerOverviewCellsMap[tab]?.push(item);
      } else {
        offerOverviewCellsMap[tab] = [item];
      }
    }
  });
  return offerOverviewCellsMap;
}

export default OfferOverviewXL;
