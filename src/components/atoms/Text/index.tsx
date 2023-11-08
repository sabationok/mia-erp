import { Property } from 'csstype';
import FontType, { FontWeight } from './text.types';
import styled from 'styled-components';

export interface TextProps {
  $isActive?: boolean;
  $disabled?: boolean;
  $family?: FontType;
  $size?: number;
  $weight?: FontWeight;
  $align?: Property.TextAlign;
  $textTransform?: Property.TextTransform;
  $ellipsisMode?: boolean;
  $padding?: Property.Padding;
  $margin?: Property.Margin;
}

// ! DEFAULT VALUES

export const Text = styled.span<TextProps>`
  font-family: ${({ $family = 'Montserrat' }) => $family};
  font-size: ${({ $size = '14' }) => $size}px;

  font-weight: ${({ $weight = 400 }) => $weight};

  text-align: ${({ $align = 'left' }) => $align};
  text-transform: ${({ $textTransform }) => $textTransform};
  color: ${({ color, ...p }) => color || 'inherit'};
  padding: ${({ $padding, ...p }) => $padding ?? 0};
  margin: ${({ $margin, ...p }) => $margin ?? 0};

  cursor: inherit;

  text-overflow: ${p => (p.$ellipsisMode ? 'ellipsis' : 'unset')};
  overflow: ${p => (p.$ellipsisMode ? 'hidden' : 'unset')};
  white-space: ${p => (p.$ellipsisMode ? 'nowrap' : 'unset')};
`;
