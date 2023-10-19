import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import styled from 'styled-components';
import { useModalService } from 'components/ModalProvider/ModalProvider';
import { useMemo } from 'react';
import { ModalChildrenProps, Modals } from '../Modals';
import { Text } from '../atoms/Text';

export interface IDirectoryListItem<M extends Modals = any, P = any> {
  title: string;
  iconId?: string;
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
  grid-auto-rows: 32px;
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
  justify-content: flex-start;

  width: 100%;
  height: 100%;

  padding: 4px 12px;

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
