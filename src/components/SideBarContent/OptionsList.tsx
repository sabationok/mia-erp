import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import styled from 'styled-components';
import { useModalProvider } from 'Providers/ModalProvider/ModalProvider';
import { useMemo } from 'react';

export interface IOptionsListItemProps {
  title: string;
  iconId: string;
  ModalChildren: React.FC<any>;
  modalChildrenProps: any;
  disabled: boolean;
}

export interface IIOptionsListProps {
  options: IOptionsListItemProps[];
}

const OptionsList: React.FC<IIOptionsListProps & React.HTMLAttributes<HTMLUListElement>> = ({ options = [] }) => {
  const modal = useModalProvider();

  const renderList = useMemo(
    () =>
      options?.map(({ title, iconId, ModalChildren, modalChildrenProps, disabled = true }, idx) => (
        <ListItem key={title || iconId || idx}>
          <StButtonIcon
            variant="defNoEffects"
            onClick={() => modal.openModal({ ModalChildren, modalChildrenProps })}
            disabled={disabled}
          >
            {title}
          </StButtonIcon>
        </ListItem>
      )),
    [modal, options]
  );

  return <List>{renderList}</List>;
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

  transition: none;
`;

export default OptionsList;
