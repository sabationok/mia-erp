import { RenderOverviewCellComponent } from './overview-types';
import { IProduct } from '../../../types/products.types';
import React, { useMemo } from 'react';
import { formAddImageSetTabs } from '../../Forms/FormProduct/FormAddImageSet';
import ImagePreviewSmall from '../../atoms/ImagePreviewSmall';
import FormProductImages from '../../Forms/FormProduct/FormProductImagesOverlay';
import FlexBox from '../../atoms/FlexBox';
import { CellStyledComp } from './CellStyles';
import { OverviewCellHeader } from './OverviewCellHeader';

export const OfferOverviewImagesCell: RenderOverviewCellComponent<IProduct> = ({ data, cell, setOverlayContent }) => {
  const renderImageSets = useMemo(() => {
    return data?.images?.map((set, index) => {
      return (
        <CellStyledComp.ImagesSetBox key={`set_${set?._id || index}`} fxDirection={'row'} gap={2} overflow={'auto'}>
          {formAddImageSetTabs.map(el => (
            <ImagePreviewSmall key={`img_${el.value}`} src={set[el.value] || ''} title={el.label} disabled />
          ))}
        </CellStyledComp.ImagesSetBox>
      );
    });
  }, [data?.images]);

  return (
    <CellStyledComp.Cell style={{ minHeight: 'max-content', padding: '4px 0' }}>
      <OverviewCellHeader
        title={cell?.title}
        onOpenOverlayPress={() => {
          setOverlayContent({ RenderComponent: FormProductImages });
        }}
      />

      <FlexBox gap={2} height={'max-content'} padding={'8px 0'} style={{ minHeight: 26 }}>
        {renderImageSets}
      </FlexBox>
    </CellStyledComp.Cell>
  );
};
