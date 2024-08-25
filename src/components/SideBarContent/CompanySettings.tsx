import { useModalProvider } from '../../Providers/ModalProvider/ModalProvider';
import { IDirectoryListItem } from './Directories';
import { Text } from '../atoms/Text';
import { Container, ListItem, Trigger } from './styles';

export interface CompanySettingsProps {
  options: IDirectoryListItem[];
}
const CompanySettings: React.FC<CompanySettingsProps> = ({ options }) => {
  const modal = useModalProvider();

  return (
    <Container>
      {[...options].map(({ title, iconId, ModalChildren, modalChildrenProps, disabled }, idx) => (
        <ListItem key={title}>
          <Trigger
            variant="def"
            onClick={() => {
              ModalChildren && modal.create(ModalChildren, modalChildrenProps);
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
