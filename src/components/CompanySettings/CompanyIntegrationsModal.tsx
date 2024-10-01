import { ModalFormProps } from '../ModalForm';
import FlexBox from '../atoms/FlexBox';
import { useMemo, useState } from 'react';
import { enumToFilterOptions } from '../../utils/fabrics';
import TabSelector from '../atoms/TabSelector';
import ModalFooter from '../atoms/Modal/ModalFooter';
import InputIntegrationsTab from './integrations/InputIntegrationsTab';
import { IntegrationTypeEnum } from '../../types/integrations.types';
import OutputIntegrationsTab from './integrations/OutputIntegrationsTab';
import ModalBase from '../atoms/Modal';

export interface CompanyIntegrationsProps extends Omit<ModalFormProps, 'onSubmit'> {}

const integrationTypeTabs = enumToFilterOptions(IntegrationTypeEnum);

const CompanyIntegrationsModal: React.FC<CompanyIntegrationsProps> = ({ onClose }) => {
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
    <ModalBase fillHeight title={'External services'} onClose={onClose}>
      <TabSelector options={integrationTypeTabs} onOptSelect={info => setIntegrationType(info?.value)} />

      <FlexBox overflow={'auto'} flex={1} fillWidth>
        {renderModalContent}
      </FlexBox>

      <ModalFooter onClick={onClose} hasOnSubmit={false}></ModalFooter>
    </ModalBase>
  );
};

export default CompanyIntegrationsModal;
