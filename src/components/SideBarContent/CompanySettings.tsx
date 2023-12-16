import * as React from 'react';
import { useModalProvider } from '../ModalProvider/ModalProvider';
import { IDirectoryListItem } from './Directories';
import { Text } from '../atoms/Text';
import { Container, ListItem, Trigger } from './styles';

export interface IDirectoriesProps {
  options: IDirectoryListItem[];
}

export interface Props {
  options: IDirectoryListItem[];
}
const CompanySettings: React.FC<Props> = ({ options }) => {
  const modal = useModalProvider();

  return (
    <Container>
      {[...options].map(({ title, iconId, ModalChildren, modalChildrenProps, disabled }, idx) => (
        <ListItem key={title}>
          <Trigger
            variant="def"
            onClick={() => {
              modal.open({ ModalChildren, modalChildrenProps });
            }}
          >
            <Text $align={'left'} $weight={500} $size={13}>
              {title}
            </Text>
          </Trigger>
        </ListItem>
      ))}
    </Container>
  );
};

export default CompanySettings;
