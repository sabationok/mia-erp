import { ModalFormProps } from '../ModalForm';
import FlexBox from '../atoms/FlexBox';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { enumToFilterOptions } from '../../utils/fabrics';
import styled from 'styled-components';
import { ModalHeader } from '../atoms';
import InvoicingIntegrationsTab from './integrations/InvoicingIntegrationsTab';
import ShipmentsIntegrationsTab from './integrations/ShipmentsIntegrationsTab';
import ModalFilter from '../ModalForm/ModalFilter';
import { AppQueryParams } from '../../api';
import { ExtIntegrationServiceTypeEnum, ExtServiceBase } from '../../redux/integrations/integrations.types';
import ModalFooter from '../ModalForm/ModalFooter';
import { useAppServiceProvider } from '../../hooks/useAppServices.hook';
import _ from 'lodash';
import CommunicationIntegrationsTab from './integrations/CommunicationIntegrationsTab';

export interface CompanyIntegrationsProps extends Omit<ModalFormProps, 'onSubmit'> {}

const ExtServiceTabs = _.pick(ExtIntegrationServiceTypeEnum, ['invoicing', 'shipment', 'communication']);

const tabs = enumToFilterOptions(ExtServiceTabs);
export interface IntegrationTabProps {
  onClose?: () => void;
  compId: string;
  providers: ExtServiceBase[];
  currentService?: ExtServiceBase;
}

const tabsMap: Record<
  ExtIntegrationServiceTypeEnum | string,
  <P = any>(props: IntegrationTabProps & P) => ReactElement<P> | null
> = {
  [ExtServiceTabs.invoicing]: InvoicingIntegrationsTab,
  [ExtServiceTabs.shipment]: ShipmentsIntegrationsTab,
  [ExtServiceTabs.communication]: CommunicationIntegrationsTab,
};

const CompanyIntegrationsModal: React.FC<CompanyIntegrationsProps> = ({ onClose, ...props }) => {
  const [currentType, setCurrentType] = useState(tabs[0].value);
  const [providerType, setProviderType] = useState<string>();

  const { loadExtServices, extServProviders } = useExtServProvidersQuery();

  const providers = useMemo(() => {
    return extServProviders.filter(prov => prov?.originServices && prov?.originServices[currentType]);
  }, [currentType, extServProviders]);

  const currentServiceData = useMemo(() => {
    return providers?.find(pr => pr.value === providerType);
  }, [providerType, providers]);

  const TabComponent = useMemo(() => tabsMap[currentType], [currentType]);

  useEffect(() => {
    if (extServProviders.length === 0) {
      loadExtServices().then(d => {});
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!providerType && providers) {
      providers[0] && setProviderType(providers[0]?.value);
    }
  }, [providerType, providers]);

  return (
    <Container overflow={'hidden'} fillWidth>
      <StHeader title={'External services'} onClose={onClose} />

      <ModalFilter filterOptions={tabs} onOptSelect={info => setCurrentType(info?.value)} />

      <ModalFilter filterOptions={providers} onFilterValueSelect={info => setProviderType(info.value)} />

      <FlexBox flex={1} fillWidth overflow={'auto'}>
        <TabComponent compId={currentType} providers={providers} currentService={currentServiceData} />
      </FlexBox>

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

export function useExtServProvidersQuery() {
  const [extServProviders, setExtServProviders] = useState<ExtServiceBase[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    integrations: { getAllExtServices },
  } = useAppServiceProvider();

  const loadExtServices = ({ params }: { params?: AppQueryParams } = {}) => {
    return getAllExtServices({
      data: { params },
      onSuccess: setExtServProviders,
      onLoading: setIsLoading,
    });
  };

  return {
    loadExtServices,
    extServProviders,
    isLoading,
  };
}
