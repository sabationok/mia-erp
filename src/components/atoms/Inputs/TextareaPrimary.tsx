import styled from 'styled-components';

import { Input } from 'antd';

const { TextArea } = Input;

const TextareaPrimary = styled(TextArea)<{ error?: boolean }>`
  padding: 5px 8px;

  font-family: inherit, sans-serif;

  width: 100%;
  height: 96px;

  color: ${({ error, theme }) => (error ? 'tomato' : 'inherit')};

  background-color: transparent;
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.globals.inputBorder};

  resize: none;

  &::placeholder {
    font-family: inherit, sans-serif;
  }
`;

export default TextareaPrimary;
