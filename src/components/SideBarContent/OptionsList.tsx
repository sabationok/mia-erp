import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import styled from 'styled-components';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';

export interface IOptionsListItemProps {
  title: string;
  iconId: string;
  ModalChildren: React.FC;
  modalChildrenProps: any;
  disabled: boolean;
}

export interface IIOptionsListProps {
  options: IOptionsListItemProps[];
}

const OptionsList: React.FC<IIOptionsListProps & React.HTMLAttributes<HTMLUListElement>> = ({ options = [] }) => {
  const modal = useModalProvider();

  return (
    <List>
      {[...options].map(({ title, iconId, ModalChildren, modalChildrenProps, disabled }, idx) => (
        <ListItem key={title}>
          <StButtonIcon
            variant='def'
            onClick={() => {
              modal.handleOpenModal({ ModalChildren, modalChildrenProps });
            }}
          >
            {title}
          </StButtonIcon>
        </ListItem>
      ))}
    </List>
  );
};

const List = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 32px;
  width: 100%;
  max-width: 100%;
`;

const ListItem = styled.li``;
const StButtonIcon = styled(ButtonIcon)`
  justify-content: start;

  width: 100%;
  height: 100%;

  padding: 4px 12px;
`;

export default OptionsList;
