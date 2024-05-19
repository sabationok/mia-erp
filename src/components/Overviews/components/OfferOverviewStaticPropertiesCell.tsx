import { RenderOverviewCellComponent } from './overview-types';
import { OfferEntity } from '../../../types/offers/offers.types';
import { useProductsSelector } from '../../../redux/selectors.store';
import React, { useMemo, useState } from 'react';
import FormSelectPropertiesOverlay from '../../Overlays/FormSelectPropertiesOverlay';
import FlexBox from '../../atoms/FlexBox';
import { t } from '../../../lang';
import { CellStyledComp } from './CellStyles';
import { OverviewCellHeader } from './OverviewCellHeader';
import { OverviewPropertyComponent } from './OverviewPropertyComponent';

export const OfferOverviewStaticProperties: RenderOverviewCellComponent<OfferEntity> = ({
  cell,
  overlayHandler,
  data,
}) => {
  const templates = useProductsSelector().properties;
  const [currentId, setCurrentId] = useState<string>(templates[0]?._id);

  const template = useMemo(() => {
    return templates.find(t => t._id === currentId);
  }, [currentId, templates]);

  const availableProperties = useMemo(() => {
    return template?.childrenList?.filter(prop => !prop.isSelectable);
  }, [template?.childrenList]);

  const selectedItems = useMemo(() => {
    return data?.properties?.map(p => p._id);
  }, [data?.properties]);

  const renderProperties = useMemo(() => {
    return availableProperties?.map((prop, index) => {
      return (
        <OverviewPropertyComponent
          key={`prop-${prop?._id}`}
          {...{ index, overlayHandler: overlayHandler, item: prop, selectedItems, data }}
        />
      );
    });
  }, [availableProperties, overlayHandler, selectedItems, data]);

  return (
    <CellStyledComp.Cell
      padding={'4px 4px 8px'}
      gap={8}
      className={'PROPERTIES_LIST_CELL'}
      style={{ minHeight: renderProperties && renderProperties?.length > 0 ? 'max-content' : 50 }}
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

      <FlexBox fillWidth gap={8} alignItems={renderProperties && renderProperties?.length > 0 ? 'stretch' : 'flex-end'}>
        {renderProperties && renderProperties?.length > 0 ? (
          renderProperties
        ) : (
          <CellStyledComp.CellText $weight={500}>{t('undefined')}</CellStyledComp.CellText>
        )}

        {/*{renderPropertiesFromVariations}*/}
      </FlexBox>
    </CellStyledComp.Cell>
  );
};
