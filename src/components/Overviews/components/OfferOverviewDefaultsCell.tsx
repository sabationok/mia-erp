import { RenderOverviewCellComponent } from './overview-types';
import { IProduct } from '../../../types/products.types';
import { useTheme } from 'styled-components';
import React, { useMemo } from 'react';
import { t } from '../../../lang';
import FlexBox from '../../atoms/FlexBox';
import { Text } from '../../atoms/Text';
import { checks, numberWithSpaces } from '../../../utils';
import { CellStyledComp } from './CellStyles';
import { OverviewCellHeader } from './OverviewCellHeader';
import FormProductDefaultsOverlay from '../../Forms/FormProduct/FormProductDefaultsOverlay';

import { IPriceListItem } from '../../../types/priceManagement.types';
import { MaybeNull } from '../../../types/utils.types';

export const OfferOverviewDefaultsCell: RenderOverviewCellComponent<IProduct> = ({ data, cell, setOverlayContent }) => {
  const theme = useTheme();
  const warehouse = data?.warehouse;
  const supplier = data?.supplier;

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
          <Text $size={11}>{`${item?.title}: `}</Text>
          <Text $size={12} $weight={600} $align={'right'}>
            {item?.value ?? '---'}
          </Text>
        </FlexBox>
      );
    });
  }, [data?.variation]);

  const priceInfoCellsData = useMemo(() => createPriceOverviewTagsData(data?.price), [data?.price]);

  const renderPriceInfo = useMemo(() => {
    return priceInfoCellsData.map((item, index) => {
      return (
        <FlexBox
          key={item?.title}
          fxDirection={'row'}
          justifyContent={'space-between'}
          padding={'4px 6px'}
          gap={6}
          fillWidth
        >
          <Text $size={11}>{`${item?.title}: `}</Text>
          <Text $size={12} $weight={600}>
            {numberWithSpaces(item?.amount || 0)}
            {checks.isNum(item?.percentage) && ` | ${numberWithSpaces(item?.percentage)}%`}
          </Text>
        </FlexBox>
      );
    });
  }, [priceInfoCellsData]);

  return (
    <CellStyledComp.Cell style={{ minHeight: 'max-content' }}>
      <OverviewCellHeader
        title={cell?.title}
        onOpenOverlayPress={() => {
          setOverlayContent({
            RenderComponent: FormProductDefaultsOverlay,
          });
        }}
      />

      <FlexBox fillWidth>
        <CellStyledComp.CellText $size={13} $weight={600} style={{ color: theme?.fontColorHeader }}>
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
              <Text $size={11}>{`${info.label}`}</Text>
              <Text $size={12} $weight={600}>
                {info?.value || '---'}
              </Text>
            </FlexBox>
          ))}
        </FlexBox>
      </FlexBox>

      <FlexBox fillWidth>
        <CellStyledComp.CellText $size={13} $weight={600} style={{ color: theme?.fontColorHeader }}>
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
            <Text $size={11}>{`${info.label}`}</Text>
            <Text $size={12} $weight={600}>
              {info?.value || '---'}
            </Text>
          </FlexBox>
        ))}
      </FlexBox>

      <FlexBox fillWidth gap={6}>
        <CellStyledComp.CellText $size={13} $weight={600} style={{ color: theme?.fontColorHeader }}>
          {t('variation')}
        </CellStyledComp.CellText>

        <FlexBox fillWidth>{renderVariationTags}</FlexBox>
      </FlexBox>

      <FlexBox fillWidth gap={6}>
        <CellStyledComp.CellText $size={13} $weight={600} style={{ color: theme?.fontColorHeader }}>
          {t('price')}
        </CellStyledComp.CellText>
        <FlexBox fillWidth>{renderPriceInfo}</FlexBox>
      </FlexBox>
    </CellStyledComp.Cell>
  );
};

export function createPriceOverviewTagsData(
  price?: IPriceListItem
): { title: string; amount?: number; percentage?: number }[] {
  return [
    { title: t('Input'), amount: price?.in },
    { title: t('Output'), amount: price?.out },
    {
      title: t('Commission'),
      ...price?.commission,
    },
    {
      title: t('Markup'),
      ...price?.markup,
    },
    {
      title: t('Discount'),
      ...price?.discount,
    },
    {
      title: t('Bonus'),
      ...price?.bonus,
    },
    {
      title: t('Cashback'),
      ...price?.cashback,
    },
  ];
}
