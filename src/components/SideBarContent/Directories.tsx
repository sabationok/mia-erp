import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import styled from 'styled-components';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import { useMemo } from 'react';

export interface IDirectory {
  title: string;
  iconId: string;
  ModalChildren: React.FC;
  modalChildrenProps: any;
  disabled: boolean;
}

export interface IDirectoriesProps {
  options: IDirectory[];
}

const Directories: React.FC<IDirectoriesProps> = ({ options = [] }) => {
  const modal = useModalProvider();

  const renderList = useMemo(
    () =>
      options.map(({ title, iconId, ModalChildren, modalChildrenProps, disabled }, idx) => (
        <ListItem key={title}>
          <StButtonIcon
            variant="def"
            disabled={disabled}
            onClick={() => {
              modal.handleOpenModal({ ModalChildren, modalChildrenProps });
            }}
          >
            {title}
          </StButtonIcon>
        </ListItem>
      )),
    [modal, options]
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

const ListItem = styled.li``;
const StButtonIcon = styled(ButtonIcon)`
  justify-content: start;

  width: 100%;
  height: 100%;

  padding: 4px 12px;

  &[disabled] {
    opacity: 60%;
  }
`;

export default Directories;
