import styled, { css } from 'styled-components';

export const InputStyles = css<{ error?: boolean; success?: boolean }>`
  padding: 5px 8px;

  width: 100%;
  height: 26px;

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
    color: ${({ theme }) => theme.globals.inputPlaceholderColor};
  }

  transition: all ${({ theme }) => theme.globals.timingFunctionMain};
`;

const InputText = styled.input<{ error?: boolean; success?: boolean }>`
  ${InputStyles}// &:hover {
                  //   border-color: ${({ theme }) => theme.accentColor.base};
                  //   box-shadow: 0 0 5px ${({ theme }) => theme.accentColor.light};
          // }
`;

export default InputText;
