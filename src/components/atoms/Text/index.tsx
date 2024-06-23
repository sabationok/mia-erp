import { Property } from 'csstype';
import FontType, { FontWeight } from './text.types';
import styled, { css } from 'styled-components';

export interface BaseTypographyProps {
  $display?: Property.Display;
  $isActive?: boolean;
  $disabled?: boolean;
  $size?: Property.FontSize | number;
  $whiteSpase?: Property.WhiteSpace;
  $padding?: Property.Padding;
  $margin?: Property.Margin;

  $family?: FontType;
  $lineHeight?: Property.LineHeight;
  $weight?: FontWeight;
  $align?: Property.TextAlign;
  $textTransform?: Property.TextTransform;
  $fontStyle?: Property.FontStyle;
  $textDecoration?: Property.TextDecoration;
  color?: Property.Color;

  $ellipsisMode?: boolean;
  $lines?: number;
  $whiteSpace?: Property.WhiteSpace;

  margin?: Property.Margin;
}

export interface TypographyProps extends BaseTypographyProps {
  $xsStyles?: BaseTypographyProps;
  $xlStyles?: BaseTypographyProps;
  $xxlStyles?: BaseTypographyProps;
}

// ! DEFAULT VALUES

export const TextFlexCss = css<BaseTypographyProps>`
  display: ${p => (p.$lines ? 'flex' : p.$display ? p.$display : 'inline-block')};

  font-family: ${({ $family = 'Montserrat' }) => $family};
  font-size: ${({ $size }) => (typeof $size === 'number' ? `${$size ?? 14}px` : $size) || '14px'};

  font-weight: ${({ $weight = 0 }) => $weight};

  text-align: ${({ $align = 'left' }) => $align};
  text-transform: ${({ $textTransform }) => $textTransform};
  color: ${({ color, ...p }) => color};
  padding: ${({ $padding, ...p }) => $padding ?? 0};
  margin: ${({ $margin, ...p }) => $margin ?? 0};

  cursor: inherit;

  white-space: ${p => (p.$lines || p.$ellipsisMode ? 'nowrap' : p.$whiteSpase ?? 'unset')};
  overflow: ${p => (p.$lines || p.$ellipsisMode ? 'hidden' : 'unset')};
  text-overflow: ${p => (p.$lines || p.$ellipsisMode ? 'ellipsis' : 'unset')};

  -webkit-line-clamp: ${p => p.$lines ?? 2}; /* number of lines to show */
  line-clamp: ${p => p.$lines ?? 2};
  -webkit-box-orient: ${p => (p.$lines ? 'vertical' : 'unset')};
`;
// ${({ $xsStyles }) => {
//   if ($xsStyles) return XsStyles;
// }};
//
// ${({ $xlStyles }) => {
//   if ($xlStyles) return XlStyles;
// }};
//
// ${({ $xxlStyles }) => {
//   if ($xxlStyles) return XxlStyles;
// }};

export const Text = styled.span<BaseTypographyProps>`
  ${TextFlexCss}
`;

//overflow: hidden;
//text-overflow: ellipsis;
//display: -webkit-box;
//-webkit-line-clamp: 2;
//line-clamp: 2;
//-webkit-box-orient: vertical;
