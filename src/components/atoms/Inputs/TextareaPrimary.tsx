import styled from 'styled-components';
import { InputStyles } from './InputText';

const TextareaPrimary = styled.textarea<{ error?: boolean }>`
  ${InputStyles};
  height: 96px;

  resize: none;
`;

export default TextareaPrimary;
