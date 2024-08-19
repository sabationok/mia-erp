import styled, { css } from 'styled-components';
import { Property } from 'csstype';
import { CSSProperties } from 'react';
import { PrefixKeys } from '../../../types/utils.types';

export interface TextInputProps
  extends PrefixKeys<
    Pick<
      CSSProperties,
      | 'minWidth'
      | 'maxWidth'
      | 'height'
      | 'width'
      | 'maxHeight'
      | 'minHeight'
      | 'padding'
      | 'fontWeight'
      | 'fontSize'
      | 'textAlign'
    >
  > {
  $isError?: boolean;
  $isSuccess?: boolean;
  $isWarn?: boolean;

  $stateIs?: {
    error?: boolean;
    success?: boolean;
    warn?: boolean;
  };

  $align?: Property.TextAlign;
  $weight?: Property.FontWeight;
}
export const inputCssStyles = css<TextInputProps>`
  padding: ${p => p.$padding ?? '5px 8px'};

  height: ${p => p.$height ?? '28px'};
  width: ${p => p.$width ?? '100%'};
  font-weight: ${p => p.$weight ?? p.$fontWeight ?? 500};

  text-align: ${({ $align = 'left' }) => $align};

  color: ${({ $isError, $isSuccess, theme }) =>
    ($isError && theme.globals.colors.error) || ($isSuccess && theme.globals.colors.success) || 'inherit'};

  background-color: inherit;
  border-radius: 4px;

  border: 1px solid
    ${({ theme, ...p }) =>
      (p.$isError && theme.globals.colors.error) ||
      (p.$isSuccess && theme.globals.colors.success) ||
      (p.$isWarn && theme.globals.colors.warning) ||
      theme.globals.inputBorder};

  &:hover {
    border-color: ${({ theme }) => theme.accentColor.base};
    box-shadow: 0 0 3px ${({ theme }) => theme.accentColor.base};
  }

  &:focus,
  &:focus-visible {
    border-color: ${({ theme }) => theme.accentColor.base};
    box-shadow: 0 0 5px ${({ theme }) => theme.accentColor.base};
    outline: 1px solid ${({ theme }) => theme.accentColor.base};
  }

  &::placeholder {
    font-size: inherit;
    color: ${({ theme }) => theme.globals.inputPlaceholderColor};
  }

  transition: all ${({ theme }) => theme.globals.timingFunctionMain};

  &[disabled] {
    pointer-events: none;
    opacity: 70%;
  }

  @media screen and (max-width: 480px) {
    height: 40px;
    font-size: 15px;
  }
`;

export const InputText = styled.input<TextInputProps>`
  ${inputCssStyles};
`;

export const Textarea = styled.input<TextInputProps>`
  ${inputCssStyles};
`;

export default InputText;
