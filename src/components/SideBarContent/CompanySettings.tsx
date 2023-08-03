import * as React from 'react';
import styled from 'styled-components';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import { useModalProvider } from '../ModalProvider/ModalProvider';
import { IDirectory } from './Directories';

export interface IDirectoriesProps {
  options: IDirectory[];
}

export interface Props {
  options: IDirectory[];
}
const CompanySettings: React.FC<Props> = ({ options }) => {
  const modal = useModalProvider();

  return (
    <Container>
      {[...options].map(({ title, iconId, ModalChildren, modalChildrenProps, disabled }, idx) => (
        <ListItem key={title}>
          <StButtonIcon
            variant="def"
            onClick={() => {
              console.log({ ModalChildren, modalChildrenProps });
              modal.handleOpenModal({ ModalChildren, modalChildrenProps });
            }}
          >
            {title}
          </StButtonIcon>
        </ListItem>
      ))}
    </Container>
  );
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
`;
export default CompanySettings;
