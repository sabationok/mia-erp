import { RenderOverviewAreaComponent } from '../../components/overview-types';
import { OfferEntity } from '../../../../types/offers/offers.types';
import { useOffersSelector } from '../../../../redux/selectors.store';
import React, { useMemo } from 'react';
import FormSelectPropertiesDrawer from '../../../Overlays/FormSelectPropertiesDrawer';
import FlexBox from '../../../atoms/FlexBox';
import { t } from '../../../../lang';
import { AreaStyledComp } from '../../components/CellStyles';
import { OverviewAreaHeader } from '../../components/OverviewAreaHeader';
import { OverviewPropertyComponent } from '../../components/OverviewPropertyComponent';
import { PropertyValueEntity } from '../../../../types/offers/properties.types';
import { useCurrentOffer } from '../../../../hooks';

export const OfferOverviewStaticPropertiesArea: RenderOverviewAreaComponent<OfferEntity> = ({
  cell,
  overlayHandler,
  data,
}) => {
  const state = useOffersSelector();
  const Offer = useCurrentOffer(data);

  const { propertiesList, valuesListMap, ...idsSet } = useMemo(() => {
    const _propertiesMap: Record<string, PropertyValueEntity> = {};
    const _propertiesIdsSet = new Set<string>([]);

    const _valuesListMap: Record<string, PropertyValueEntity[]> = {};
    const _valuesIdsSet = new Set<string>([]);

    for (const value of Offer?.properties ?? []) {
      const propId = value.parent?._id;

      if (propId) {
        const parent = propId ? state.propertiesDataMap?.[propId] : undefined;
        _propertiesIdsSet.add(propId);

        if (parent) {
          _propertiesMap[propId] = parent;
        }

        const valueId = value._id;
        _valuesIdsSet.add(valueId);

        const _value = valueId ? state.propertiesDataMap?.[valueId] || value : value;
        if (!_valuesListMap[propId]) {
          _valuesListMap[propId] = [];
        }
        _valuesListMap[propId].push(_value);
      }
    }

    return {
      properties: _propertiesIdsSet,
      values: _valuesIdsSet,
      propertiesList: Object.values(_propertiesMap),
      valuesListMap: _valuesListMap,
    };
  }, [Offer?.properties, state.propertiesDataMap]);

  const renderProperties = useMemo(() => {
    return propertiesList?.map((prop, index) => {
      const list = valuesListMap[prop._id];

      return (
        <OverviewPropertyComponent
          key={`prop-${prop?._id}`}
          {...{ index, overlayHandler: overlayHandler, item: prop, items: list, data }}
        />
      );
    });
  }, [propertiesList, overlayHandler, valuesListMap, data]);

  return (
    <AreaStyledComp.Cell
      padding={'4px 4px 8px'}
      gap={8}
      className={'PROPERTIES_LIST_CELL'}
      style={{ minHeight: renderProperties && renderProperties?.length > 0 ? 'max-content' : 50 }}
    >
      <OverviewAreaHeader
        title={cell?.title}
        onOpenOverlayPress={() => {
          overlayHandler({
            RenderComponent: FormSelectPropertiesDrawer,
            props: { offer: data },
          });
        }}
      />

      <FlexBox fillWidth gap={8} alignItems={renderProperties && renderProperties?.length > 0 ? 'stretch' : 'flex-end'}>
        {idsSet.properties?.size ? (
          renderProperties
        ) : (
          <AreaStyledComp.CellText $weight={500}>{t('undefined')}</AreaStyledComp.CellText>
        )}
      </FlexBox>
    </AreaStyledComp.Cell>
  );
};
