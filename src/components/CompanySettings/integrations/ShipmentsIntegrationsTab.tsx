import FlexBox from '../../atoms/FlexBox';
import { IntegrationTabProps } from '../CompanyIntegrationsModal';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';

export interface ShipmentsIntegrationsTabProps extends IntegrationTabProps {}

const ShipmentsIntegrationsTab: React.FC<ShipmentsIntegrationsTabProps> = ({ onClose, compId, ...props }) => {
  return (
    <FlexBox fillWidth flex={1}>
      <ButtonIcon variant={'filledSmall'} onClick={onClose}>
        {'Close '}
        {compId}
      </ButtonIcon>
    </FlexBox>
  );
};

export default ShipmentsIntegrationsTab;
