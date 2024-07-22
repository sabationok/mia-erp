import styled from 'styled-components';
import { inputCssStyles } from './InputText';

const TextareaPrimary = styled.textarea<{ error?: boolean }>`
  ${inputCssStyles};

  height: 44px;

  resize: none;

  @media screen and (max-width: 480px) {
    height: 70px;
    font-size: 14px;
  }
`;

export default TextareaPrimary;
