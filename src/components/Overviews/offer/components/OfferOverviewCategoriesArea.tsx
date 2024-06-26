import { RenderOverviewAreaComponent } from '../../components/overview-types';
import { OfferEntity } from '../../../../types/offers/offers.types';
import { useDirectorySelector } from '../../../../redux/selectors.store';
import { ApiDirType } from '../../../../redux/APP_CONFIGS';
import React, { useMemo } from 'react';
import { AreaStyledComp } from '../../components/CellStyles';
import { OverviewAreaHeader } from '../../components/OverviewAreaHeader';
import OfferCategoriesOverlay from '../../../Overlays/FromSelectCategoriesOverlay';
import FlexBox from '../../../atoms/FlexBox';
import { OfferCategoryEntity } from '../../../../types/dir.types';
import { useOverlayService } from '../../../../Providers/Overlay/OverlayStackProvider';
import { useModalService } from '../../../../Providers/ModalProvider/ModalProvider';

export const OfferOverviewCategoriesArea: RenderOverviewAreaComponent<OfferEntity> = ({ cell, data }) => {
  const overlaySrv = useOverlayService();
  const modalSrv = useModalService();

  const categories = useDirectorySelector(ApiDirType.CATEGORIES_PROD).directory;
  const selectedCategoryIds = useMemo(() => {
    return data?.categories?.map(el => el._id) ?? [];
  }, [data?.categories]);

  const renderItems = useMemo(() => {
    return categories.map(c => {
      return <NotActiveTreeDataItem key={`cat_${c._id}`} selectedIds={selectedCategoryIds} item={c} />;
    });
  }, [categories, selectedCategoryIds]);

  return (
    <AreaStyledComp.Cell style={{ minHeight: 'max-content' }}>
      <OverviewAreaHeader
        title={cell?.title}
        openOverlayButtonTitle={'Змінити'}
        onOpenOverlayPress={() => {
          if (overlaySrv.create) {
            overlaySrv.create(OfferCategoriesOverlay);
          } else {
            modalSrv.create(OfferCategoriesOverlay);
          }
        }}
      />

      <FlexBox
        fillWidth
        fxDirection={'row'}
        justifyContent={'flex-end'}
        flexWrap={'wrap'}
        // overflow={'hidden'}
        gap={8}
        style={{ height: 'max-content', minHeight: 26 }}
      >
        {renderItems}
      </FlexBox>
    </AreaStyledComp.Cell>
  );
};

const NotActiveTreeDataItem: React.FC<{
  item: OfferCategoryEntity;
  lvl?: number;
  index?: number;
  selectedIds: string[];
}> = ({ item, lvl = 0, selectedIds }) => {
  const renderChildren = useMemo(() => {
    return item?.childrenList?.map((item, index) => {
      return (
        <NotActiveTreeDataItem
          key={`item_lvl_${lvl}_${item._id}`}
          item={item}
          index={index}
          lvl={lvl + 1}
          selectedIds={selectedIds}
        />
      );
    });
  }, [item?.childrenList, lvl, selectedIds]);

  const isSelected = useMemo(() => {
    return selectedIds.includes(item._id);
  }, [item._id, selectedIds]);
  return (
    <>
      {isSelected && (
        <AreaStyledComp.CategoryItem fxDirection={'row'} alignItems={'center'} padding={'0 2px 0 12px'} gap={2}>
          {item?.parent?.label && `${item?.parent?.label}/`}
          {`${item?.label}`}
        </AreaStyledComp.CategoryItem>
      )}
      {renderChildren}
    </>
  );
};
