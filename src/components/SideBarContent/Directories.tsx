import { useModalService } from 'components/ModalProvider/ModalProvider';
import { useMemo } from 'react';
import { ModalChildrenProps, Modals } from '../Modals';
import { Text } from '../atoms/Text';
import { IconIdType } from '../../img/sprite';
import { Container, ListItem, Trigger } from './styles';

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
            <Text $align={'left'} $weight={500} $size={13}>
              {title}
            </Text>
          </Trigger>
        </ListItem>
      )),
    [modalS, options]
  );
  return <Container>{renderList}</Container>;
};

export default Directories;
