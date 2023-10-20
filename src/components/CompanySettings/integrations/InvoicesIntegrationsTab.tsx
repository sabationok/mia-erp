import FlexBox from '../../atoms/FlexBox';
import { IntegrationTabProps } from '../CompanyIntegrationsModal';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';

export interface InvoicesIntegrationsTabProps extends IntegrationTabProps {}

const InvoicesIntegrationsTab: React.FC<InvoicesIntegrationsTabProps> = ({ onClose, compId, ...props }) => {
  return (
    <FlexBox fillWidth flex={1}>
      <ButtonIcon variant={'filledSmall'} onClick={onClose}>
        {'Close '}
        {compId}
      </ButtonIcon>
    </FlexBox>
  );
};

export default InvoicesIntegrationsTab;
