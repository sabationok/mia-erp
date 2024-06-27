import { RenderOverviewCellComponent } from '../../components/overview-types';
import { OfferEntity } from '../../../../types/offers/offers.types';
import React, { useMemo } from 'react';
import ImagePreviewSmall from '../../../atoms/ImagePreviewSmall';
import FormProductImages from '../../../Overlays/FormOfferImagesOverlay';
import FlexBox from '../../../atoms/FlexBox';
import { AreaStyledComp } from '../../components/CellStyles';
import { OverviewCellHeader } from '../../components/OverviewCellHeader';
import { formAddImageSetTabs } from '../../../../data';

export const OfferOverviewImagesArea: RenderOverviewCellComponent<OfferEntity> = ({ data, cell, overlayHandler }) => {
  const renderImageSets = useMemo(() => {
    return data?.images?.map((imgsSet, index) => {
      return (
        <AreaStyledComp.ImagesSetBox
          key={`set_${imgsSet?._id || index}`}
          minHeight={'max-content'}
          fxDirection={'row'}
          gap={8}
          overflow={'auto'}
        >
          {formAddImageSetTabs.map(
            el =>
              el.value && (
                <ImagePreviewSmall key={`img_${el.value}`} title={el.label} src={imgsSet[el.value] || ''} disabled />
              )
          )}
        </AreaStyledComp.ImagesSetBox>
      );
    });
  }, [data?.images]);

  return (
    <AreaStyledComp.Cell style={{ minHeight: 'max-content', padding: '4px 0' }}>
      <OverviewCellHeader
        title={cell?.title}
        onOpenOverlayPress={() => {
          overlayHandler({ RenderComponent: FormProductImages, props: { offer: data } });
        }}
      />

      <FlexBox gap={8} height={'max-content'} padding={'8px 0'} style={{ minHeight: 26 }}>
        {renderImageSets}
      </FlexBox>
    </AreaStyledComp.Cell>
  );
};
