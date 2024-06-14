import { RenderOverviewCellComponent } from '../../components/overview-types';
import { OfferEntity } from '../../../../types/offers/offers.types';
import React, { useMemo } from 'react';
import ImagePreviewSmall from '../../../atoms/ImagePreviewSmall';
import FormProductImages from '../../../Overlays/FormProductImagesOverlay';
import FlexBox from '../../../atoms/FlexBox';
import { CellStyledComp } from '../../components/CellStyles';
import { OverviewCellHeader } from '../../components/OverviewCellHeader';
import { formAddImageSetTabs } from '../../../../data';

export const OfferOverviewImagesCell: RenderOverviewCellComponent<OfferEntity> = ({ data, cell, overlayHandler }) => {
  const renderImageSets = useMemo(() => {
    return data?.images?.map((imgsSet, index) => {
      return (
        <CellStyledComp.ImagesSetBox key={`set_${imgsSet?._id || index}`} fxDirection={'row'} gap={2} overflow={'auto'}>
          {formAddImageSetTabs.map(
            el => el.value && <ImagePreviewSmall key={`img_${el.value}`} src={imgsSet[el.value] || ''} disabled />
          )}
        </CellStyledComp.ImagesSetBox>
      );
    });
  }, [data?.images]);

  return (
    <CellStyledComp.Cell style={{ minHeight: 'max-content', padding: '4px 0' }}>
      <OverviewCellHeader
        title={cell?.title}
        onOpenOverlayPress={() => {
          overlayHandler({ RenderComponent: FormProductImages });
        }}
      />

      <FlexBox gap={2} height={'max-content'} padding={'8px 0'} style={{ minHeight: 26 }}>
        {renderImageSets}
      </FlexBox>
    </CellStyledComp.Cell>
  );
};
