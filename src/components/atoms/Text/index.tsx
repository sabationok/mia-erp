import { Property } from 'csstype';
import FontType, { FontWeight } from './text.types';
import styled, { css } from 'styled-components';

export interface TextProps {
  $lines?: number;
  $display?: Property.Display;
  $isActive?: boolean;
  $disabled?: boolean;
  $family?: FontType;
  $size?: Property.FontSize | number;
  $weight?: FontWeight;
  $align?: Property.TextAlign;
  $whiteSpase?: Property.WhiteSpace;
  $textTransform?: Property.TextTransform;
  $ellipsisMode?: boolean;
  $padding?: Property.Padding;
  $margin?: Property.Margin;

  color?: Property.Color;
}

// ! DEFAULT VALUES

export const TextFlexCss = css<TextProps>`
  display: ${p => (p.$lines ? 'flex' : p.$display ? p.$display : 'inline-block')};

  font-family: ${({ $family = 'Montserrat' }) => $family};
  font-size: ${({ $size }) => (typeof $size === 'number' ? `${$size ?? 14}px` : $size) || '14px'};

  font-weight: ${({ $weight = 0 }) => $weight};

  text-align: ${({ $align = 'left' }) => $align};
  text-transform: ${({ $textTransform }) => $textTransform};
  color: ${({ color, ...p }) => color || 'inherit'};
  padding: ${({ $padding, ...p }) => $padding ?? 0};
  margin: ${({ $margin, ...p }) => $margin ?? 0};

  cursor: inherit;

  text-overflow: ${p => (p.$ellipsisMode ? 'ellipsis' : 'unset')};
  overflow: ${p => (p.$ellipsisMode ? 'hidden' : 'unset')};
  white-space: ${p => (p.$ellipsisMode ? 'nowrap' : p.$whiteSpase ?? 'unset')};

  -webkit-line-clamp: ${p => p.$lines ?? 2}; /* number of lines to show */
  line-clamp: ${p => p.$lines ?? 2};
  -webkit-box-orient: ${p => (p.$lines ? 'vertical' : 'unset')};
`;

export const Text = styled.span<TextProps>`
  ${TextFlexCss}
`;

//overflow: hidden;
//text-overflow: ellipsis;
//display: -webkit-box;
//-webkit-line-clamp: 2;
//line-clamp: 2;
//-webkit-box-orient: vertical;
