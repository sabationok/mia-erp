import { RenderOverviewAreaComponent } from '../../components/overview-types';
import { OfferEntity } from '../../../../types/offers/offers.types';
import React, { useMemo } from 'react';
import FlexBox from '../../../atoms/FlexBox';
import { t } from '../../../../lang';
import { AreaStyledComp } from '../../components/CellStyles';
import { OverviewAreaHeader } from '../../components/OverviewAreaHeader';
import { useCurrentOffer } from '../../../../hooks';
import FormSelectOfferTagsDrawer from '../../../Overlays/FormSelectOfferTagsDrawer';

export const OfferOverviewTagsArea: RenderOverviewAreaComponent<OfferEntity> = ({ cell, overlayHandler, data }) => {
  const Offer = useCurrentOffer(data);
  const renderValues = useMemo(() => {
    return Offer?.tags?.map((value, index) => {
      return (
        <AreaStyledComp.CategoryItem
          key={`prop-v-${value._id}`}
          className={'TagItem'}
          width={'fit-content'}
          maxWidth={'130px'}
        >
          {value.label}
        </AreaStyledComp.CategoryItem>
      );
    });
  }, [Offer?.tags]);

  return (
    <AreaStyledComp.Cell
      padding={'4px 4px 8px'}
      gap={8}
      className={'TAGS_LIST_CELL'}
      style={{ minHeight: 'max-content' }}
    >
      <OverviewAreaHeader
        title={cell?.title}
        onOpenOverlayPress={() => {
          overlayHandler({
            RenderComponent: FormSelectOfferTagsDrawer,
            props: { offer: data },
          });
        }}
      />

      <FlexBox fillWidth gap={8} fxDirection={'row'} alignItems={'stretch'}>
        {Offer?.tags?.length ? (
          renderValues
        ) : (
          <AreaStyledComp.CellText $weight={500}>{t('undefined')}</AreaStyledComp.CellText>
        )}
      </FlexBox>
    </AreaStyledComp.Cell>
  );
};
