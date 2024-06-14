import { RenderOverviewCellComponent } from '../../components/overview-types';
import { OfferEntity } from '../../../../types/offers/offers.types';
import { useTheme } from 'styled-components';
import React, { useMemo } from 'react';
import { t } from '../../../../lang';
import FlexBox from '../../../atoms/FlexBox';
import { Text } from '../../../atoms/Text';
import { CellStyledComp } from '../../components/CellStyles';
import { OverviewCellHeader } from '../../components/OverviewCellHeader';
import OfferDefaultsOverlay from '../../../Overlays/OfferDefaultsOverlay';

import { PriceEntity } from '../../../../types/price-management/price-management.types';
import { MaybeNull } from '../../../../types/utils.types';
import { toPrice } from '../../../../utils/numbers';

export const OfferOverviewDefaultsCell: RenderOverviewCellComponent<OfferEntity> = ({ data, cell, overlayHandler }) => {
  const theme = useTheme();
  const warehouse = data?.warehouse;
  const supplier = data?.supplier;
  const price = data?.price;

  const renderVariationTags = useMemo(() => {
    const variation = data?.variation;
    const tagsData: { title: string; value?: MaybeNull<number | string> }[] = [
      { title: t('Label'), value: variation?.label },
      { title: t('Bar-code'), value: variation?.barCode },
      {
        title: t('SKU'),
        value: variation?.sku,
      },
      {
        title: t('Props q-ty'),
        value: variation?.properties?.length,
      },
    ];

    return tagsData.map((item, index) => {
      return (
        <FlexBox
          key={item?.title}
          fxDirection={'row'}
          justifyContent={'space-between'}
          padding={'4px 6px'}
          gap={6}
          fillWidth
        >
          <Text $size={14}>{`${item?.title}: `}</Text>
          <Text $size={14} $weight={600} $align={'right'}>
            {item?.value ?? '---'}
          </Text>
        </FlexBox>
      );
    });
  }, [data?.variation]);

  const renderPriceInfo = useMemo(() => {
    return createPriceOverviewTagsData(price).map((item, index) => {
      return (
        <FlexBox
          key={item?.title}
          fxDirection={'row'}
          justifyContent={'space-between'}
          padding={'4px 6px'}
          gap={6}
          fillWidth
        >
          <Text>{`${item?.title}: `}</Text>
          <Text $weight={600}>
            {item?.amount}

            {item?.percentage && ` | ${item?.percentage}%`}
          </Text>
        </FlexBox>
      );
    });
  }, [price]);

  return (
    <CellStyledComp.Cell style={{ minHeight: 'max-content' }}>
      <OverviewCellHeader
        title={cell?.title}
        onOpenOverlayPress={() => {
          overlayHandler({
            RenderComponent: OfferDefaultsOverlay,
          });
        }}
      />

      <FlexBox fillWidth>
        <CellStyledComp.CellText $weight={600} style={{ color: theme?.fontColorHeader }}>
          {t('warehouse')}
        </CellStyledComp.CellText>

        <FlexBox fillWidth flexWrap={'wrap'} fxDirection={'row'}>
          {[
            { label: t('Label'), value: warehouse?.label },
            { label: t('Code'), value: warehouse?.code },
          ].map(info => (
            <FlexBox
              key={info.label}
              fxDirection={'row'}
              justifyContent={'space-between'}
              padding={'4px 6px'}
              gap={6}
              fillWidth
            >
              <Text>{`${info.label}`}</Text>
              <Text $weight={600}>{info?.value || '---'}</Text>
            </FlexBox>
          ))}
        </FlexBox>
      </FlexBox>

      <FlexBox fillWidth>
        <CellStyledComp.CellText $weight={600} style={{ color: theme?.fontColorHeader }}>
          {t('supplier')}
        </CellStyledComp.CellText>

        {[
          { label: t('Label'), value: supplier?.label },
          { label: t('Code'), value: supplier?.code },
        ].map(info => (
          <FlexBox
            key={info.label}
            fxDirection={'row'}
            justifyContent={'space-between'}
            padding={'4px 6px'}
            gap={6}
            fillWidth
          >
            <Text>{`${info.label}`}</Text>
            <Text $weight={600}>{info?.value || '---'}</Text>
          </FlexBox>
        ))}
      </FlexBox>

      <FlexBox fillWidth gap={6}>
        <CellStyledComp.CellText $weight={600} style={{ color: theme?.fontColorHeader }}>
          {t('variation')}
        </CellStyledComp.CellText>

        <FlexBox fillWidth>{renderVariationTags}</FlexBox>
      </FlexBox>

      <FlexBox fillWidth gap={6}>
        <CellStyledComp.CellText $weight={600} style={{ color: theme?.fontColorHeader }}>
          {t('price')}
        </CellStyledComp.CellText>

        <FlexBox fillWidth>{renderPriceInfo}</FlexBox>
      </FlexBox>
    </CellStyledComp.Cell>
  );
};

export function createPriceOverviewTagsData(
  price?: PriceEntity
): { title: string; amount?: number | string; percentage?: number | string }[] {
  return [
    { title: t('Input'), amount: toPrice(price?.in) },
    { title: t('Output'), amount: toPrice(price?.out) },
    {
      title: t('Commission'),
      amount: toPrice(price?.commission?.amount),
      percentage: price?.commission?.percentage ? toPrice(price?.commission?.percentage) : undefined,
    },
    {
      title: t('Markup'),
      amount: toPrice(price?.markup?.amount),
      percentage: price?.markup?.percentage ? toPrice(price?.markup?.percentage) : undefined,
    },
  ];
}
