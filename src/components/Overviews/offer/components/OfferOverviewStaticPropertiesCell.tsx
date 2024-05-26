import { RenderOverviewCellComponent } from '../../components/overview-types';
import { OfferEntity } from '../../../../types/offers/offers.types';
import { useProductsSelector } from '../../../../redux/selectors.store';
import React, { useMemo, useRef } from 'react';
import FormSelectPropertiesOverlay from '../../../Overlays/FormSelectPropertiesOverlay';
import FlexBox from '../../../atoms/FlexBox';
import { t } from '../../../../lang';
import { CellStyledComp } from '../../components/CellStyles';
import { OverviewCellHeader } from '../../components/OverviewCellHeader';
import { OverviewPropertyComponent } from '../../components/OverviewPropertyComponent';
import { PropertyEntity, PropertyValueEntity } from '../../../../types/offers/properties.types';

export const OfferOverviewStaticProperties: RenderOverviewCellComponent<OfferEntity> = ({
  cell,
  overlayHandler,
  data,
}) => {
  const state = useProductsSelector();
  const selectedIds = useRef(new Set(data?.properties?.map(prop => prop._id)));
  const selectedParentIds = useRef(new Set(data?.properties?.map(prop => prop?.parent?._id)));

  // const rootList = useMemo(() => {
  //   const _rootIds = state.propertiesByTypeKeysMap[data?.type ?? 'group'];
  //   const _items: PropertyBaseEntity[] = [];
  //
  //   for (const _id of _rootIds) {
  //     const item = state.propertiesDataMap?.[_id];
  //     item && _items.push(item);
  //   }
  //
  //   return _items;
  // }, [data?.type, state.propertiesByTypeKeysMap, state.propertiesDataMap]);
  const { propertiesList, valuesListMap } = useMemo(() => {
    const _propertiesList: PropertyEntity[] = [];

    const _valuesListMap: Record<string, PropertyValueEntity[]> = {};

    for (const propValue of data?.properties ?? []) {
      const parent = state.propertiesDataMap?.[propValue._id];

      if (parent && selectedParentIds.current.has(parent._id)) {
        _propertiesList.push(parent);
        if (_valuesListMap[parent._id]) {
          _valuesListMap[parent._id].push(propValue);
        } else {
          _valuesListMap[parent._id] = [];
        }
      }
    }

    return { propertiesList: _propertiesList, valuesListMap: _valuesListMap };
  }, [data?.properties, state.propertiesDataMap]);

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
