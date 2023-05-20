import styled from 'styled-components';
import { Input } from 'antd';

const InputText = styled(Input)<{ error?: boolean }>`
  padding: 5px 8px;

  width: 100%;
  height: 26px;

  color: ${({ error, theme }) => (error ? 'tomato' : 'inherit')};

  background-color: transparent;
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.globals.inputBorder};

  &::placeholder {
    font-family: inherit, sans-serif;
  }
`;

export default InputText;
