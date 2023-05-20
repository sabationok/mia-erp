import styled from 'styled-components';
import { Input } from 'antd';

const InputText = styled(Input)<{ error?: boolean; success?: boolean }>`
  padding: 5px 8px;

  width: 100%;
  height: 26px;

  color: ${({ error, success, theme }) =>
    (error && theme.globals.colors.error) ||
    (success && theme.globals.colors.success) ||
    'inherit'};

  background-color: transparent;
  border-radius: 2px;
  border: 1px solid
    ${({ error, success, theme }) =>
      (error && theme.globals.colors.error) ||
      (success && theme.globals.colors.success) ||
      theme.globals.inputBorder};

  &::placeholder {
    font-family: inherit, sans-serif;
    color: ${({ theme }) => theme.globals.inputPlaceholderColor};
  }
`;

export default InputText;
