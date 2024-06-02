import styled, { css, DefaultTheme, ThemedStyledProps } from 'styled-components';
import { Property } from 'csstype';

export interface FlexBaseProps {
  display?: Property.Display;
  flex?: Property.Flex;
  flexWrap?: Property.FlexWrap;
  fxDirection?: Property.FlexDirection;
  alignItems?: Property.AlignItems;
  justifyContent?: Property.JustifyContent;
  gap?: number;

  alignSelf?: Property.AlignSelf;

  maxWidth?: Property.MaxWidth;
  maxHeight?: Property.MaxHeight;
  minWidth?: Property.MinWidth;
  minHeight?: Property.MinHeight;
  width?: Property.Width;
  height?: Property.Height;

  padding?: Property.Padding;
  margin?: Property.Margin;

  borderBottom?: Property.BorderBottom;

  borderRadius?: Property.BorderRadius;
  border?: Property.Border;

  fillWidth?: boolean;
  fillHeight?: boolean;

  overflow?: Property.Overflow;
  background?: Property.Background;

  isActive?: boolean;
}

export interface FlexBoxProps extends FlexBaseProps {
  xsStyles?: FlexBaseProps;
  xlStyles?: FlexBaseProps;
}

export interface FlexProps extends FlexBaseProps {
  sStyles?: FlexBaseProps;
  xsStyles?: FlexBaseProps;
  xlStyles?: FlexBaseProps;
}

type MediasStylesKey = keyof Pick<FlexProps, 'sStyles' | 'xsStyles' | 'xlStyles'>;
function createFlexBoxStyles({ query, key }: { query: string; key: MediasStylesKey }) {
  return css<FlexProps>`
    ${p => ''}
    @media screen and (${query}) {
      display: ${({ display = '', ...p }) => p[key]?.display || display};
      flex-direction: ${({ fxDirection = 'column', ...p }) => p[key]?.fxDirection || fxDirection};
      align-items: ${({ alignItems, ...p }) => p[key]?.alignItems || alignItems};
      justify-content: ${({ justifyContent, ...p }) => p[key]?.justifyContent || justifyContent};
      flex: ${({ flex = '', ...p }) => p[key]?.flex || flex};
      flex-wrap: ${({ flexWrap = '', ...p }) => p[key]?.flexWrap || flexWrap};
      border-bottom: ${({ borderBottom = 0, ...p }) => p[key]?.borderBottom || borderBottom};
      border: ${({ border = 0, ...p }) => p[key]?.border || border};
      gap: ${({ gap = 0, ...p }) => p[key]?.gap || gap}px;
      padding: ${({ padding = 0, ...p }) => p[key]?.padding || padding};
      margin: ${({ margin = 0, ...p }) => p[key]?.margin || margin};
      align-self: ${({ alignSelf, ...p }) => p[key]?.alignSelf || alignSelf};
      max-width: ${({ maxWidth = null, ...p }) => p[key]?.maxWidth || maxWidth};
      max-height: ${({ maxHeight = null, ...p }) => p[key]?.maxWidth || maxHeight};

      min-width: ${({ minWidth = null, ...p }) => p[key]?.minWidth || minWidth};
      min-height: ${({ minHeight = null, ...p }) => p[key]?.minHeight || minHeight};

      width: ${({ width = 'auto', fillWidth, ...p }) =>
        (p[key]?.fillWidth ? '100%' : p[key]?.width) || (fillWidth ? '100%' : width)};
      height: ${({ height = 'auto', fillHeight, ...p }) =>
        (p[key]?.fillHeight ? '100%' : p[key]?.height) || (fillHeight ? '100%' : height)};
      background: ${({ background, ...p }) => p[key]?.background || background};
      border-radius: ${({ borderRadius = 0, ...p }) => p[key]?.borderRadius || borderRadius};
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

function getMediaStyles(key: MediasStylesKey) {
  switch (key) {
    case 'sStyles': {
      return (props: ThemedStyledProps<FlexProps, DefaultTheme>) => (props[key] ? S_Styles : undefined);
    }
    case 'xsStyles': {
      return (props: ThemedStyledProps<FlexProps, DefaultTheme>) => (props[key] ? XS_Styles : undefined);
    }
    case 'xlStyles': {
      return (props: ThemedStyledProps<FlexProps, DefaultTheme>) => (props[key] ? XL_Styles : undefined);
    }
  }
}

export const FlexBoxCss = css<FlexBoxProps>`
  display: flex;

  flex-direction: ${({ fxDirection = 'column' }) => fxDirection};
  align-items: ${({ alignItems = '' }) => alignItems};
  justify-content: ${({ justifyContent = '' }) => justifyContent};
  flex: ${({ flex = '' }) => flex};
  flex-wrap: ${({ flexWrap = '' }) => flexWrap};
  border-bottom: ${({ borderBottom = 0 }) => borderBottom};
  border: ${({ border = 'none' }) => border};
  gap: ${({ gap = 0 }) => gap}px;
  padding: ${({ padding = 0 }) => padding};
  margin: ${({ margin = 0 }) => margin};
  align-self: ${({ alignSelf = '' }) => alignSelf};
  max-width: ${({ maxWidth }) => maxWidth ?? ''};
  min-width: ${({ minWidth }) => minWidth ?? ''};
  max-height: ${({ maxHeight }) => maxHeight ?? ''};
  min-height: ${({ minHeight }) => minHeight ?? ''};
  width: ${({ width = 'auto', fillWidth }) => (fillWidth ? '100%' : width)};
  height: ${({ height = 'auto', fillHeight }) => (fillHeight ? '100%' : height)};
  background: ${({ background = 'none' }) => background};
  border-radius: ${({ borderRadius = 'none' }) => borderRadius};
  overflow: ${({ overflow }) => overflow};
  border: ${p => p.border};

  cursor: default;

  ${getMediaStyles('sStyles')};
  ${getMediaStyles('xsStyles')};
  ${getMediaStyles('xlStyles')};
`;
export const FlexBox = styled.div<FlexBoxProps>`
  ${FlexBoxCss}
`;

export const FlexFieldSet = styled.fieldset<FlexBoxProps>`
  ${FlexBoxCss}
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
