import FlexBox from '../../atoms/FlexBox';
import React, { useMemo } from 'react';
import { RenderOverviewCellComponent } from '../ProductOverviewXL';
import FormCreateVariation from '../../Forms/FormVariation';
import { IProperty } from '../../../redux/products/properties.types';
import styled from 'styled-components';
import { Text } from '../../atoms/Text';
import { useProductsSelector } from '../../../redux/selectors.store';
import FormSelectProperties from '../../Forms/FormSelectProperties';
import { IProduct } from '../../../redux/products/products.types';

export const OverviewTextCell: RenderOverviewCellComponent = ({ cell, data }) => {
  const value = cell.getValue ? cell.getValue(data) : null;

  return (
    <Cell padding={'4px'}>
      <CellText $isTitle $size={12}>
        {cell?.title}
      </CellText>

      <FlexBox
        fillWidth
        flex={1}
        fxDirection={'row'}
        justifyContent={'flex-end'}
        alignItems={'flex-end'}
        overflow={'hidden'}
        style={{ minHeight: 24 }}
      >
        <CellText $weight={500}>{value || 'не визначено'}</CellText>
      </FlexBox>
    </Cell>
  );
};

export const VariationsTemplateCell: RenderOverviewCellComponent = ({ cell, setOverlayContent, data }) => {
  return (
    <Cell padding={'4px'}>
      <FlexBox alignItems={'center'} fxDirection={'row'} justifyContent={'space-between'} gap={8}>
        <CellText $isTitle $size={12}>
          {cell.title}
        </CellText>

        {data?.template && (
          <OverlayOpenButton
            type={'button'}
            onClick={() => {
              setOverlayContent({ RenderComponent: FormCreateVariation, props: { create: true } });
            }}
          >
            {'Створити'}
          </OverlayOpenButton>
        )}
      </FlexBox>

      <FlexBox
        fillWidth
        fxDirection={'row'}
        gap={8}
        height={'24px'}
        justifyContent={'flex-end'}
        alignItems={'flex-end'}
        overflow={'hidden'}
      >
        <CellText $disabled={!data?.template?.label} $weight={500}>{`${data?.template?.label}`}</CellText>
      </FlexBox>
    </Cell>
  );
};
const PropertyComponent: React.FC<{ item: IProperty; selectedItems?: string[]; data?: IProduct; index: number }> = ({
  item,
  data,
  selectedItems,
  index,
}) => {
  const renderValues = useMemo(() => {
    return item.childrenList
      ?.filter(el => selectedItems?.includes(el._id))
      ?.map((value, index) => {
        return (
          <FlexBox padding={'4px 12px'} border={'1px solid lightgrey'} borderRadius={'4px'} key={`prop-v-${value._id}`}>
            {value.label}
          </FlexBox>
        );
      });
  }, [selectedItems, item.childrenList]);

  return (
    <FlexBox className={'PROPERTY'} gap={8}>
      <FlexBox alignItems={'center'} fxDirection={'row'} justifyContent={'flex-end'} fillWidth gap={8}>
        <CellText $size={14} $weight={600}>
          {item?.label}
        </CellText>
      </FlexBox>

      <FlexBox fillWidth fxDirection={'row'} flexWrap={'wrap'} gap={8}>
        {renderValues && renderValues?.length > 0 ? renderValues : '---'}
      </FlexBox>
    </FlexBox>
  );
};
export const StaticProperties: RenderOverviewCellComponent = ({ cell, setOverlayContent, data }) => {
  const templates = useProductsSelector().properties;

  const availableProperties = useMemo(() => {
    return templates.find(t => t._id === data?.template?._id)?.childrenList?.filter(prop => !prop.isSelectable);
  }, [data?.template?._id, templates]);

  const selectedItems = useMemo(() => {
    return data?.properties?.map(p => p._id);
  }, [data?.properties]);

  const renderProperties = useMemo(() => {
    return availableProperties?.map((prop, index) => {
      return (
        <PropertyComponent
          key={`prop-${prop?._id}`}
          {...{ index, setOverlayContent, item: prop, selectedItems }}
        ></PropertyComponent>
      );
    });
  }, [availableProperties, setOverlayContent, selectedItems]);

  return (
    <Cell
      padding={'4px'}
      gap={8}
      style={{ minHeight: renderProperties && renderProperties?.length > 0 ? 'max-content' : 50 }}
    >
      <FlexBox alignItems={'center'} fxDirection={'row'} justifyContent={'space-between'} gap={8}>
        <CellText $isTitle $size={12}>
          {cell?.title}
        </CellText>

        <OverlayOpenButton
          type={'button'}
          onClick={() => {
            setOverlayContent({ RenderComponent: FormSelectProperties, props: { update: data?._id } });
          }}
        >
          {'Змінити'}
        </OverlayOpenButton>
      </FlexBox>

      <FlexBox
        fillWidth
        gap={8}
        className={'PROPERTIES_LIST'}
        alignItems={renderProperties && renderProperties?.length > 0 ? 'stretch' : 'flex-end'}
      >
        {renderProperties && renderProperties?.length > 0 ? (
          renderProperties
        ) : (
          <CellText $weight={500}>{'не визначено'}</CellText>
        )}
      </FlexBox>
    </Cell>
  );
};

const OverlayOpenButton = styled.button`
  display: flex;
  align-items: center;

  border: 0;
  background-color: transparent;

  font-family: inherit;
  font-weight: 500;
  font-size: 12px;
  padding: 0 6px;
  color: ${p => p.theme.accentColor.base};

  cursor: pointer;
`;

const Cell = styled(FlexBox)`
  min-height: 50px;
  border-top: 1px solid ${p => p.theme.sideBarBorderColor};
`;

const CellText = styled(Text)<{ $isTitle?: boolean }>`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;

  color: ${p =>
    p.$isTitle
      ? p.theme.globals.inputPlaceholderColor
      : p.$disabled
      ? p.theme.globals.inputPlaceholderColor
      : undefined};
`;
