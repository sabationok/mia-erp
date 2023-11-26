import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import styled from 'styled-components';
import { useModalService } from 'components/ModalProvider/ModalProvider';
import { useMemo } from 'react';
import { ModalChildrenProps, Modals } from '../Modals';
import { Text } from '../atoms/Text';
import { IconIdType } from '../../img/sprite';

export interface IDirectoryListItem<M extends Modals = any, P = any> {
  title: string;
  iconId?: string | IconIdType;
  Modal?: M;
  props?: ModalChildrenProps[M];
  ModalChildren?: React.FC<P>;
  modalChildrenProps?: P;
  disabled?: boolean;
}

export interface IDirectoriesProps {
  options: IDirectoryListItem[];
}

const Directories: React.FC<IDirectoriesProps> = ({ options = [] }) => {
  const modalS = useModalService();

  const renderList = useMemo(
    () =>
      options.map(({ title, iconId, ModalChildren, modalChildrenProps, disabled, Modal, props }, idx) => (
        <ListItem key={title} title={title}>
          <Trigger
            variant="def"
            disabled={disabled}
            onClick={() => {
              modalS.open({ ModalChildren, modalChildrenProps, Modal, props });
            }}
          >
            <Text $align={'left'} $weight={500} $size={12}>
              {title}
            </Text>
          </Trigger>
        </ListItem>
      )),
    [modalS, options]
  );
  return <Container>{renderList}</Container>;
};

const Container = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 26px;
  width: 100%;
  max-width: 100%;
  /* padding: 8px; */

  /* background-color: ${({ theme }) => theme.backgroundColorSecondary}; */
`;

const ListItem = styled.li`
  overflow: hidden;
  //width: 100%;
`;

const Trigger = styled(ButtonIcon)`
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

export default Directories;
