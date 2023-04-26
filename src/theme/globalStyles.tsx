import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

  /* ПОСИЛАННЯ */
  a {
    text-decoration: none;
    color: inherit;

    outline-color: ${({ theme }) => theme.accentColor.base};
  }

  /* КНОПКИ */
  button {
    user-select: none;

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.accentColor.base};
    }
  }

  /* ІНПУТИ */
  label,
  textarea,
  input {
    &:focus,
    &:focus-visible {
      border-color: ${({ theme }) => theme.accentColor.base};
      outline: 2px solid ${({ theme }) => theme.accentColor.base};
    }
  }

  @media screen and (min-width: 480px) {
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    ::-webkit-scrollbar-track {
      // background-color: var(--bckgrndDarkClr_secondary);
      background-color: transparent;
      // border-radius: 6px;
    }

    ::-webkit-scrollbar-button {
      height: 0;
      width: 0;
      overflow: hidden;
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.accentColor.base};
      border-radius: 0;
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: ${({ theme }) => theme.accentColor.hover};
    }

    ::-webkit-scrollbar-thumb:active {
      background-color: ${({ theme }) => theme.accentColor.pressed};
    }

    ::-webkit-scrollbar-corner {
      background-color: transparent;
    }
  }
`;
export default GlobalStyles;