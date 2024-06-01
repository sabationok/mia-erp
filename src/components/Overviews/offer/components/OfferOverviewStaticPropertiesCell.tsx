import { RenderOverviewCellComponent } from '../../components/overview-types';
import { OfferEntity } from '../../../../types/offers/offers.types';
import { useOffersSelector } from '../../../../redux/selectors.store';
import React, { useMemo, useRef } from 'react';
import FormSelectPropertiesOverlay from '../../../Overlays/FormSelectPropertiesOverlay';
import FlexBox from '../../../atoms/FlexBox';
import { t } from '../../../../lang';
import { CellStyledComp } from '../../components/CellStyles';
import { OverviewCellHeader } from '../../components/OverviewCellHeader';
import { OverviewPropertyComponent } from '../../components/OverviewPropertyComponent';
import { PropertyEntity, PropertyValueEntity } from '../../../../types/offers/properties.types';
import { useCurrentOffer } from '../../../../hooks';

export const OfferOverviewStaticProperties: RenderOverviewCellComponent<OfferEntity> = ({
  cell,
  overlayHandler,
  data,
}) => {
  const state = useOffersSelector();
  const currentOffer = useCurrentOffer(data);
  const valuesIdsSet = useRef(new Set(currentOffer?.properties?.map(prop => prop._id) ?? []));
  const selectedParentIdsSet = useRef(new Set(currentOffer?.properties?.map(prop => prop?.parent?._id) ?? []));

  const { propertiesList, valuesListMap } = useMemo(() => {
    const _propertiesList: PropertyEntity[] = [];

    const _valuesListMap: Record<string, PropertyValueEntity[]> = {};

    for (const propId of Array.from(selectedParentIdsSet.current)) {
      const parent = propId ? state.propertiesDataMap?.[propId] : undefined;

      if (parent) {
        _propertiesList.push(parent);
        _valuesListMap[parent._id] = [];
      }
    }
    for (const valueId of Array.from(valuesIdsSet.current)) {
      const value = valueId ? state.propertiesDataMap?.[valueId] : undefined;

      if (value && value.parent?._id) {
        _valuesListMap[value.parent?._id].push(value);
      }
    }

    return { propertiesList: _propertiesList, valuesListMap: _valuesListMap };
  }, [state.propertiesDataMap]);

  const renderProperties = useMemo(() => {
    return propertiesList?.map((prop, index) => {
      return (
        <OverviewPropertyComponent
          key={`prop-${prop?._id}`}
          {...{ index, overlayHandler: overlayHandler, item: prop, selectedItems: valuesListMap[prop._id], data }}
        />
      );
    });
  }, [propertiesList, overlayHandler, valuesListMap, data]);

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
        {propertiesList?.length > 0 ? (
          renderProperties
        ) : (
          <CellStyledComp.CellText $weight={500}>{t('undefined')}</CellStyledComp.CellText>
        )}
      </FlexBox>
    </CellStyledComp.Cell>
  );
};
