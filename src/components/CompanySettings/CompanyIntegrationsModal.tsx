import { ModalFormProps } from '../ModalForm';
import FlexBox from '../atoms/FlexBox';
import { useMemo, useState } from 'react';
import { enumToFilterOptions } from '../../utils/fabrics';
import styled from 'styled-components';
import { ModalHeader } from '../atoms';
import ModalFilter from '../ModalForm/ModalFilter';
import ModalFooter from '../ModalForm/ModalFooter';
import InputIntegrationsTab from './integrations/InputIntegrationsTab';
import { IntegrationTypeEnum } from '../../redux/integrations/integrations.types';
import OutputIntegrationsTab from './integrations/OutputIntegrationsTab';

export interface CompanyIntegrationsProps extends Omit<ModalFormProps, 'onSubmit'> {}

const integrationTypeTabs = enumToFilterOptions(IntegrationTypeEnum);

const CompanyIntegrationsModal: React.FC<CompanyIntegrationsProps> = ({ onClose, ...props }) => {
  const [integrationType, setIntegrationType] = useState(integrationTypeTabs[0].value);

  const renderModalContent = useMemo(() => {
    if (integrationType === 'input') {
      return <InputIntegrationsTab />;
    }
    if (integrationType === 'output') {
      return <OutputIntegrationsTab />;
    }
  }, [integrationType]);

  return (
    <Container overflow={'hidden'} fillWidth>
      <StHeader title={'External services'} onClose={onClose} />

      <ModalFilter filterOptions={integrationTypeTabs} onOptSelect={info => setIntegrationType(info?.value)} />

      {renderModalContent}

      <ModalFooter onClick={onClose}></ModalFooter>
    </Container>
  );
};

const Container = styled(FlexBox)`
  padding: 0 8px;

  max-width: 100%;
  width: 480px;

  height: 98vh;
  max-height: 100%;

  background-color: ${p => p.theme.modalBackgroundColor};
`;
const StHeader = styled(ModalHeader)`
  border-bottom: 1px solid ${p => p.theme.modalBorderColor};
`;

export default CompanyIntegrationsModal;
