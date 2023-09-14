import FlexBox from '../../atoms/FlexBox';
import React, { useMemo } from 'react';
import { RenderOverviewCellComponent } from '../ProductOverviewXL';
import FormCreateVariation from '../../Forms/FormVariation';
import { IPropertyValue } from '../../../redux/products/properties.types';
import styled from 'styled-components';
import { Text } from '../../atoms/Text';
import { useProductsSelector } from '../../../redux/selectors.store';
import FormSelectProperties from '../../Forms/FormSelectProperties';

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
const PropertyComponent: React.FC<{ item: IPropertyValue; index: number }> = ({ item, index }) => {
  return (
    <FlexBox padding={'4px'} fxDirection={'row'} gap={8}>
      <FlexBox alignItems={'center'} fxDirection={'row'} justifyContent={'space-between'} gap={8}>
        <CellText $size={12}>{item?.parent?.label}</CellText>
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
        <CellText>{`${item?.label}`}</CellText>
      </FlexBox>
    </FlexBox>
  );
};
export const Properties: RenderOverviewCellComponent = ({ cell, setOverlayContent, data }) => {
  const templates = useProductsSelector().properties;

  const renderList = useMemo(() => {
    const arr = data?.properties
      ? data?.properties
      : templates[0]?.childrenList && templates[0]?.childrenList[0]?.childrenList
      ? [...templates[0]?.childrenList[0]?.childrenList]
      : [];

    return arr.map((prop, index) => {
      return (
        <PropertyComponent key={`prop-${prop?._id}`} {...{ index, setOverlayContent, item: prop }}></PropertyComponent>
      );
    });
  }, [data?.properties, setOverlayContent, templates]);

  return (
    <Cell padding={'4px'}>
      <FlexBox alignItems={'center'} fxDirection={'row'} justifyContent={'space-between'} gap={8}>
        <CellText $isTitle $size={12}>
          {cell?.title}
        </CellText>

        <OverlayOpenButton
          type={'button'}
          onClick={() => {
            setOverlayContent({ RenderComponent: FormSelectProperties, props: { create: true } });
          }}
        >
          {'Змінити'}
        </OverlayOpenButton>
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
        {renderList}
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
