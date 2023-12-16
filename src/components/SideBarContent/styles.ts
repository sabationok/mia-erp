import styled from 'styled-components';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import { Text } from '../atoms/Text';

export const Container = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 32px;
  width: 100%;
  max-width: 100%;
  /* padding: 8px; */

  /* background-color: ${({ theme }) => theme.backgroundColorSecondary}; */
`;

export const ListItem = styled.li`
  overflow: hidden;
  //width: 100%;
`;
export const Trigger = styled(ButtonIcon)`
  position: relative;

  justify-content: flex-start;

  width: 100%;
  height: 100%;

  padding: 4px 8px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;

    width: 3px;
    height: 0;

    background-color: transparent;

    transform: translateY(-50%);
    transition: all ${({ theme }) => theme.globals.timingFunctionLong};
  }

  &:hover {
    //background-color: rgba(254, 254, 254, 0.25);
    color: ${({ theme: { accentColor } }) => accentColor.base};
    &::before {
      height: 100%;
      background-color: ${({ theme: { accentColor } }) => accentColor.base};
    }
  }

  &.active {
    &::before {
      height: 80%;
      background-color: ${({ theme: { accentColor } }) => accentColor.base};
    }
  }

  ${Text} {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    max-width: 100%;
  }

  &[disabled] {
    opacity: 70%;
  }
`;
