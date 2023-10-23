import styled from 'styled-components';
import { InputStyles } from './InputText';

const TextareaPrimary = styled.textarea<{ error?: boolean }>`
  ${InputStyles};

  height: 44px;

  resize: none;

  @media screen and (max-width: 480px) {
    height: 70px;
    font-size: 14px;
  }
`;

export default TextareaPrimary;
