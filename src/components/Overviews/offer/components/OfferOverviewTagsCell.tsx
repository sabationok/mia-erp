import { RenderOverviewCellComponent } from '../../components/overview-types';
import { OfferEntity } from '../../../../types/offers/offers.types';
import React, { useMemo } from 'react';
import FormSelectPropertiesOverlay from '../../../Overlays/FormSelectPropertiesOverlay';
import FlexBox from '../../../atoms/FlexBox';
import { t } from '../../../../lang';
import { CellStyledComp } from '../../components/CellStyles';
import { OverviewCellHeader } from '../../components/OverviewCellHeader';
import { useCurrentOffer } from '../../../../hooks';

export const OfferOverviewTagsCell: RenderOverviewCellComponent<OfferEntity> = ({ cell, overlayHandler, data }) => {
  const Offer = useCurrentOffer(data);

  const renderValues = useMemo(() => {
    return Offer?.tags?.map((value, index) => {
      return (
        <CellStyledComp.CategoryItem key={`prop-v-${value._id}`} className={'PROP_VALUE'} maxWidth={'130px'}>
          {value.label}
        </CellStyledComp.CategoryItem>
      );
    });
  }, [Offer?.tags]);

  return (
    <CellStyledComp.Cell
      padding={'4px 4px 8px'}
      gap={8}
      className={'TAGS_LIST_CELL'}
      style={{ minHeight: 'max-content' }}
    >
      <OverviewCellHeader
        title={cell?.title}
        onOpenOverlayPress={() => {
          overlayHandler({
            RenderComponent: FormSelectPropertiesOverlay,
            props: { offer: data },
          });
        }}
      />

      <FlexBox fillWidth gap={8} alignItems={'stretch'}>
        {Offer?.tags?.length ? (
          renderValues
        ) : (
          <CellStyledComp.CellText $weight={500}>{t('undefined')}</CellStyledComp.CellText>
        )}
      </FlexBox>
    </CellStyledComp.Cell>
  );
};
