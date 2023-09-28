import styled, { css } from 'styled-components';
import { Property } from 'csstype';

export interface TextInputProps {
  error?: boolean;
  success?: boolean;
  align?: Property.TextAlign;
}
export const InputStyles = css<TextInputProps>`
  padding: 5px 8px;

  width: 100%;
  height: 28px;

  text-align: ${({ align = 'left' }) => align};

  color: ${({ error, success, theme }) =>
    (error && theme.globals.colors.error) || (success && theme.globals.colors.success) || 'inherit'};

  background-color: inherit;
  border-radius: 2px;
  border: 1px solid
    ${({ error, success, theme }) =>
      (error && theme.globals.colors.error) || (success && theme.globals.colors.success) || theme.globals.inputBorder};

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
    height: 34px;
    font-size: 14px;
  }
`;

const InputField = styled.fieldset<TextInputProps>`
  ${InputStyles}
`;

const InputText = styled.input<TextInputProps>`
  ${InputStyles};
`;
const StyledInput = styled.input`
  ${InputStyles};

  padding: 0;
  border: 0;
  box-shadow: none;

  &:hover {
    border: 0;
    box-shadow: none;
  }
`;
export { InputField, StyledInput };
export default InputText;
