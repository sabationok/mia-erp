import styled, { css } from 'styled-components';

export const InputStyles = css<{ error?: boolean; success?: boolean }>`
  padding: 5px 8px;

  width: 100%;
  height: 28px;

  color: ${({ error, success, theme }) =>
    (error && theme.globals.colors.error) || (success && theme.globals.colors.success) || 'inherit'};

  background-color: transparent;
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

const InputField = styled.fieldset`
  ${InputStyles}
`;

const InputText = styled.input<{ error?: boolean; success?: boolean }>`
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
