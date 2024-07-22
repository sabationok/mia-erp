import styled, { css } from 'styled-components';
import { Property } from 'csstype';

export interface TextInputProps {
  $isError?: boolean;
  $isSuccess?: boolean;
  $align?: Property.TextAlign;
  $width?: Property.Width;
  $minWidth?: Property.MinWidth;
  $maxWidth?: Property.MaxWidth;

  $height?: Property.Height;
  $maxHeight?: Property.MinHeight;
  $minHeight?: Property.MaxHeight;

  $padding?: Property.Padding;

  $weight?: Property.FontWeight;
  $fontSize?: Property.FontWeight;
}
export const inputCssStyles = css<TextInputProps>`
  padding: ${p => p.$padding ?? '5px 8px'};

  height: ${p => p.$height ?? '28px'};
  width: ${p => p.$width ?? '100%'};
  font-weight: ${p => p.$weight ?? 500};

  text-align: ${({ $align = 'left' }) => $align};

  color: ${({ $isError, $isSuccess, theme }) =>
    ($isError && theme.globals.colors.error) || ($isSuccess && theme.globals.colors.success) || 'inherit'};

  background-color: inherit;
  border-radius: 4px;

  border: 1px solid
    ${({ $isError, $isSuccess, theme }) =>
      ($isError && theme.globals.colors.error) ||
      ($isSuccess && theme.globals.colors.success) ||
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

export const InputField = styled.fieldset<TextInputProps>`
  ${inputCssStyles};
`;

export const InputText = styled.input<TextInputProps>`
  ${inputCssStyles};
`;

export default InputText;
