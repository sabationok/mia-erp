import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { Property } from 'csstype';

export interface FlexBoxBaseProps {
  fxDirection?: Property.FlexDirection;
  alignItems?: Property.AlignItems;
  justifyContent?: Property.JustifyContent;
  background?: Property.Background;
  gap?: number;
  alignSelf?: Property.AlignSelf;
  maxWidth?: string;
  maxHeight?: string;
  width?: Property.Width;
  height?: Property.Height;
  padding?: Property.Padding;
  borderBottom?: Property.BorderBottom;
  borderRadius?: Property.BorderRadius;
  border?: Property.Border;
  fillWidth?: boolean;
  fillHeight?: boolean;
  margin?: string;
  flex?: Property.Flex;
  flexWrap?: Property.FlexWrap;
  overflow?: Property.Overflow;

  css?: FlattenSimpleInterpolation;
}
export interface FlexBoxProps extends FlexBoxBaseProps {
  xsStyles?: FlexBoxBaseProps;
  xlStyles?: FlexBoxBaseProps;
}

const XsStyles = css<FlexBoxProps>`
  @media (max-width: 480px) {
    flex-direction: ${({ xsStyles, fxDirection = 'column' }) => xsStyles?.fxDirection || fxDirection};
    align-items: ${({ xsStyles, alignItems = 'flex-start' }) => xsStyles?.alignItems || alignItems};
    justify-content: ${({ xsStyles, justifyContent = 'flex-start' }) => xsStyles?.justifyContent || justifyContent};
    flex: ${({ xsStyles, flex = '' }) => xsStyles?.flex || flex};
    flex-wrap: ${({ xsStyles, flexWrap = '' }) => xsStyles?.flexWrap || flexWrap};
    border-bottom: ${({ xsStyles, borderBottom = 'none' }) => xsStyles?.borderBottom || borderBottom};
    border: ${({ xsStyles, border = 'none' }) => xsStyles?.border || border};
    gap: ${({ xsStyles, gap = 0 }) => xsStyles?.gap || gap}px;
    padding: ${({ xsStyles, padding = 0 }) => xsStyles?.padding || padding};
    align-self: ${({ xsStyles, alignSelf = 'none' }) => xsStyles?.alignSelf || alignSelf};
    max-width: ${({ xsStyles, maxWidth = null }) => xsStyles?.maxWidth || (maxWidth ? maxWidth : 'none')};
    max-height: ${({ xsStyles, maxHeight = null }) => xsStyles?.maxWidth || (maxHeight ? maxHeight : 'none')};
    width: ${({ xsStyles, width = 'auto', fillWidth }) =>
      (xsStyles?.fillWidth ? '100%' : xsStyles?.width) || (fillWidth ? '100%' : width)};
    height: ${({ xsStyles, height = 'auto', fillHeight }) =>
      (xsStyles?.fillHeight ? '100%' : xsStyles?.height) || (fillHeight ? '100%' : height)};
    background: ${({ xsStyles, background = 'none' }) => xsStyles?.background || background};
    border-radius: ${({ xsStyles, borderRadius = 'none' }) => xsStyles?.borderRadius || borderRadius};
    overflow: ${({ xsStyles, overflow = '' }) => xsStyles?.overflow || overflow};
  }
`;

const XlStyles = css<FlexBoxProps>`
  @media (max-width: 768px) {
    flex-direction: ${({ xlStyles, fxDirection = 'column' }) => xlStyles?.fxDirection || fxDirection};
    align-items: ${({ xlStyles, alignItems = 'flex-start' }) => xlStyles?.alignItems || alignItems};
    justify-content: ${({ xlStyles, justifyContent = 'flex-start' }) => xlStyles?.justifyContent || justifyContent};
    flex: ${({ xlStyles, flex = '' }) => xlStyles?.flex || flex};
    flex-wrap: ${({ xlStyles, flexWrap = '' }) => xlStyles?.flexWrap || flexWrap};
    border-bottom: ${({ xlStyles, borderBottom = 'none' }) => xlStyles?.borderBottom || borderBottom};
    border: ${({ xlStyles, border = 'none' }) => xlStyles?.border || border};
    gap: ${({ xlStyles, gap = 0 }) => xlStyles?.gap || gap}px;
    padding: ${({ xlStyles, padding = 0 }) => xlStyles?.padding || padding};
    align-self: ${({ xlStyles, alignSelf = 'none' }) => xlStyles?.alignSelf || alignSelf};
    max-width: ${({ xlStyles, maxWidth = null }) => xlStyles?.maxWidth || (maxWidth ? maxWidth : 'none')};
    max-height: ${({ xlStyles, maxHeight = null }) => xlStyles?.maxWidth || (maxHeight ? maxHeight : 'none')};
    width: ${({ xlStyles, width = 'auto', fillWidth }) =>
      (xlStyles?.fillWidth ? '100%' : xlStyles?.width) || (fillWidth ? '100%' : width)};
    height: ${({ xlStyles, height = 'auto', fillHeight }) =>
      (xlStyles?.fillHeight ? '100%' : xlStyles?.height) || (fillHeight ? '100%' : height)};
    background: ${({ xlStyles, background = 'none' }) => xlStyles?.background || background};
    border-radius: ${({ xlStyles, borderRadius = 'none' }) => xlStyles?.borderRadius || borderRadius};
    overflow: ${({ xlStyles, overflow = '' }) => xlStyles?.overflow || overflow};
  }
`;

const FlexBox = styled.div<FlexBoxProps>`
  display: flex;

  flex-direction: ${({ fxDirection = 'column' }) => fxDirection};
  align-items: ${({ alignItems = '' }) => alignItems};
  justify-content: ${({ justifyContent = '' }) => justifyContent};
  flex: ${({ flex = '' }) => flex};
  flex-wrap: ${({ flexWrap = '' }) => flexWrap};
  border-bottom: ${({ borderBottom = 'none' }) => borderBottom};
  border: ${({ border = 'none' }) => border};
  gap: ${({ gap = 0 }) => gap}px;
  padding: ${({ padding = 0 }) => padding};
  margin: ${({ margin = 0 }) => margin};
  align-self: ${({ alignSelf = 'none' }) => alignSelf};
  max-width: ${({ maxWidth = null }) => (maxWidth ? maxWidth : 'none')};
  max-height: ${({ maxHeight = null }) => (maxHeight ? maxHeight : 'none')};
  width: ${({ width = 'auto', fillWidth }) => (fillWidth ? '100%' : width)};
  height: ${({ height = 'auto', fillHeight }) => (fillHeight ? '100%' : height)};
  background: ${({ background = 'none' }) => background};
  border-radius: ${({ borderRadius = 'none' }) => borderRadius};
  overflow: ${({ overflow }) => overflow};

  ${({ xsStyles }) => {
    if (xsStyles) return XsStyles;
  }};
  ${({ xlStyles }) => {
    if (xlStyles) return XlStyles;
  }};

  ${p => p?.css}
`;

export const PrimaryBox = styled(FlexBox)`
  border-radius: 10px;
  border: 1px solid #e9e7dd;
  background: #f7f6f0;
  @media screen and (min-width: 960px) {
    max-height: calc(100% - 27px);
  }
`;
export const FieldBox = styled(FlexBox)`
  flex-direction: row;
  align-items: center;

  height: 26px;
  min-width: 50px;
  overflow: hidden;

  background: ${({ theme }) => theme.field.backgroundColor};
  border-radius: 2px;

  cursor: default;

  &:hover {
    background: ${({ theme }) => theme.field.backgroundColorHover};
  }

  &:active {
    background: ${({ theme, onClick }) => (onClick ? theme.field.backgroundColorPressed : '')};
  }

  & .innerBox {
    color: ${({ theme }) => theme.accentColor.base};

    padding: 2px 4px;

    background: ${({ theme }) => theme.field.innerBackgroundColor};
    border-radius: 2px;
  }

  transition: all ${({ theme }) => theme.globals.timingFunctionMain};
`;

export default FlexBox;
