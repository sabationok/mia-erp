import styled, { css, ExecutionContext } from 'styled-components';
import { Property } from 'csstype';
import { CSSProperties } from 'react';

export interface FlexBaseProps
  extends Pick<
    CSSProperties,
    | 'display'
    | 'flex'
    | 'flexWrap'
    | 'alignItems'
    | 'justifyContent'
    | 'alignSelf'
    | 'justifySelf'
    | 'maxWidth'
    | 'maxHeight'
    | 'minWidth'
    | 'minHeight'
    | 'width'
    | 'height'
    | 'padding'
    | 'margin'
    | 'borderBottom'
    | 'borderTop'
    | 'borderRadius'
    | 'border'
    | 'overflow'
    | 'background'
  > {
  fxDirection?: Property.FlexDirection;
  gap?: number;

  fillWidth?: boolean;
  fillHeight?: boolean;

  isActive?: boolean;

  $display?: Property.Display;
  $flex?: Property.Flex;
  $flexWrap?: Property.FlexWrap;
  $fxDirection?: Property.FlexDirection;
  $alignItems?: Property.AlignItems;
  $justifyContent?: Property.JustifyContent;
  $alignSelf?: Property.AlignSelf;
  $gap?: number;

  $maxWidth?: Property.Width;
  $maxHeight?: Property.Width;
  $minWidth?: Property.Width;
  $minHeight?: Property.Width;
  width?: Property.Width;
  height?: Property.Height;
  $padding?: Property.Padding;
  margin?: Property.Margin;
  $fillWidth?: boolean;
  $fillHeight?: boolean;

  $borderBottom?: Property.BorderBottom;
  $borderRadius?: Property.BorderRadius;
  $border?: Property.Border;
  $background?: Property.Background;
  overflow?: Property.Overflow;

  $isActive?: boolean;
}

export interface FlexBoxProps extends FlexBaseProps {
  sStyles?: FlexBaseProps;
  xsStyles?: FlexBaseProps;
  xlStyles?: FlexBaseProps;
}

type MediaStylesKey = keyof Pick<FlexBoxProps, 'sStyles' | 'xsStyles' | 'xlStyles'>;

function createFlexBoxStyles({ query, key }: { query: string; key: MediaStylesKey }) {
  return css<FlexBoxProps>`
    ${p => ''}
    @media screen and (${query}) {
      display: ${({ display = '', ...p }) => p[key]?.display || display};
      flex-direction: ${({ fxDirection = 'column', ...p }) => p[key]?.fxDirection || fxDirection};
      align-items: ${({ alignItems, ...p }) => p[key]?.alignItems || alignItems};
      justify-content: ${({ justifyContent, ...p }) => p[key]?.justifyContent || justifyContent};
      flex: ${({ flex = '', ...p }) => p[key]?.flex || flex};
      flex-wrap: ${({ flexWrap = '', ...p }) => p[key]?.flexWrap || flexWrap};

      border-top: ${({ borderTop, ...p }) => p[key]?.borderTop || borderTop};
      border-bottom: ${({ borderBottom, ...p }) => p[key]?.borderBottom || borderBottom};
      border: ${({ border, ...p }) => p[key]?.border || border};

      gap: ${({ gap = 0, ...p }) => p[key]?.gap ?? gap}px;
      stroke: ${p => []};
      padding: ${({ padding = 0, ...p }) => p[key]?.padding ?? padding};
      margin: ${({ margin = 0, ...p }) => p[key]?.margin ?? margin};

      align-self: ${({ alignSelf, ...p }) => p[key]?.alignSelf || alignSelf};
      justify-self: ${({ justifySelf, ...p }) => p[key]?.justifySelf || justifySelf};

      max-width: ${({ maxWidth = null, ...p }) => p[key]?.maxWidth || maxWidth};
      max-height: ${({ maxHeight = null, ...p }) => p[key]?.maxWidth || maxHeight};

      min-width: ${({ minWidth = null, ...p }) => p[key]?.minWidth || minWidth};
      min-height: ${({ minHeight = null, ...p }) => p[key]?.minHeight || minHeight};

      width: ${({ width = 'auto', fillWidth, ...p }) =>
        (p[key]?.fillWidth ? '100%' : p[key]?.width) || (fillWidth ? '100%' : width)};
      height: ${({ height = 'auto', fillHeight, ...p }) =>
        (p[key]?.fillHeight ? '100%' : p[key]?.height) || (fillHeight ? '100%' : height)};

      background: ${({ background, ...p }) => p[key]?.background || background};

      border-radius: ${({ borderRadius = 0, ...p }) => p[key]?.borderRadius ?? borderRadius};
      overflow: ${({ overflow = '', ...p }) => p[key]?.overflow || overflow};
    }
  `;
}

const S_Styles = createFlexBoxStyles({ query: 'max-width: 480px', key: 'sStyles' });

const XS_Styles = createFlexBoxStyles({
  query: 'max-width: 960px',
  key: 'xsStyles',
});

const XL_Styles = createFlexBoxStyles({
  query: 'min-width: 960px',
  key: 'xlStyles',
});

function getMediaStyles(key: MediaStylesKey) {
  switch (key) {
    case 'sStyles': {
      return (props: ExecutionContext & FlexBoxProps) => (props[key] ? S_Styles : undefined);
    }
    case 'xsStyles': {
      return (props: ExecutionContext & FlexBoxProps) => (props[key] ? XS_Styles : undefined);
    }
    case 'xlStyles': {
      return (props: ExecutionContext & FlexBoxProps) => (props[key] ? XL_Styles : undefined);
    }
  }
}

export const FlexBoxCss = css<FlexBoxProps>`
  display: flex;

  flex-direction: ${({ fxDirection = 'column' }) => fxDirection};

  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};

  flex: ${({ flex = '' }) => flex};
  flex-wrap: ${({ flexWrap }) => flexWrap};

  gap: ${({ gap = 0 }) => gap}px;

  padding: ${({ padding = 0 }) => padding};
  margin: ${({ margin = 0 }) => margin};

  align-self: ${({ alignSelf }) => alignSelf};
  justify-self: ${({ justifySelf }) => justifySelf};

  max-width: ${({ maxWidth }) => maxWidth ?? ''};
  min-width: ${({ minWidth }) => minWidth ?? ''};

  max-height: ${({ maxHeight }) => maxHeight ?? ''};
  min-height: ${({ minHeight }) => minHeight ?? ''};

  width: ${({ width = 'auto', fillWidth }) => (fillWidth ? '100%' : width)};
  height: ${({ height = 'auto', fillHeight }) => (fillHeight ? '100%' : height)};

  background: ${({ background }) => background};
  border-radius: ${({ borderRadius }) => borderRadius};
  overflow: ${({ overflow }) => overflow};

  border-top: ${({ borderTop }) => borderTop};
  border-bottom: ${({ borderBottom }) => borderBottom};
  border: ${({ border }) => border};

  cursor: default;

  ${getMediaStyles('sStyles')};
  ${getMediaStyles('xsStyles')};
  ${getMediaStyles('xlStyles')};
`;
export const FlexBox = styled.div<FlexBoxProps>`
  ${FlexBoxCss}
`;

export const FlexFooter = styled.footer<FlexBoxProps>`
  ${FlexBoxCss}
`;
export const FlexHeader = styled.header<FlexBoxProps>`
  ${FlexBoxCss}
`;
export const FlexMain = styled.main<FlexBoxProps>`
  ${FlexBoxCss}
`;

export const FlexFieldSet = styled.fieldset<FlexBoxProps>`
  min-inline-size: unset;

  ${FlexBoxCss};
  border: 0;
  &[disabled] {
    & input,
    & button,
    & textarea {
      pointer-events: none;
      user-select: none;
      opacity: 75%;
    }
  }
`;

export const FlexLabel = styled.label<FlexBoxProps>`
  ${FlexBoxCss};
`;
export const FlexUl = styled.ul<FlexBoxProps>`
  ${FlexBoxCss}
`;
export const FlexLi = styled.li<FlexBoxProps>`
  ${FlexBoxCss}
`;

export const FlexForm = styled.form<FlexBoxProps>`
  ${FlexBoxCss}
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

export interface GridBoxProps extends FlexBoxProps {
  $columns?: string[] | Property.GridTemplateColumns;
  $rows?: string[] | Property.GridTemplateRows;
  $autoColumns?: string[] | Property.GridAutoColumns;
  $autoRows?: string[] | Property.GridAutoRows;
}
export const SimpleGridBox = styled.div<GridBoxProps>`
  ${FlexBoxCss};
  display: grid;
  grid-template-columns: ${p => (Array.isArray(p.$columns) ? p.$columns?.join(' ') : p.$columns)};
  grid-template-rows: ${p => (Array.isArray(p.$rows) ? p.$rows?.join(' ') : p.$rows)};

  grid-auto-columns: ${p => (Array.isArray(p.$autoColumns) ? p.$autoColumns?.join(' ') : p.$autoColumns)};
  grid-auto-rows: ${p => (Array.isArray(p.$autoRows) ? p.$autoRows?.join(' ') : p.$autoRows)};
`;
