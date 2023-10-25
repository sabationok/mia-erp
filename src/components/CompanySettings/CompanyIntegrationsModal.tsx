import { ModalFormProps } from '../ModalForm';
import FlexBox from '../atoms/FlexBox';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { enumToFilterOptions } from '../../utils/fabrics';
import _ from 'lodash';
import styled from 'styled-components';
import { ModalHeader } from '../atoms';
import InvoicesIntegrationsTab from './integrations/InvoicesIntegrationsTab';
import ShipmentsIntegrationsTab from './integrations/ShipmentsIntegrationsTab';
import ModalFilter from '../ModalForm/ModalFilter';
import { AppQueryParams, createApiCall } from '../../api';
import IntegrationsApi from '../../api/integrations.api';
import { ExtIntegrationServiceTypeEnum, ExtServiceBase } from '../../redux/integrations/integrations.types';
import ModalFooter from '../ModalForm/ModalFooter';

export interface CompanyIntegrationsProps extends Omit<ModalFormProps, 'onSubmit'> {}

const ExtServiceTabs = _.pick(ExtIntegrationServiceTypeEnum, ['invoicing', 'shipment']);

export interface IntegrationTabProps {
  onClose?: () => void;
  compId: string;
  providers: ExtServiceBase[];
}

const tabsMap: Record<
  ExtIntegrationServiceTypeEnum | string,
  <P = any>(props: IntegrationTabProps & P) => ReactElement<P> | null
> = {
  [ExtServiceTabs.invoicing]: InvoicesIntegrationsTab,
  [ExtServiceTabs.shipment]: ShipmentsIntegrationsTab,
};

const tabs = enumToFilterOptions(ExtServiceTabs);

const CompanyIntegrationsModal: React.FC<CompanyIntegrationsProps> = ({ onClose, ...props }) => {
  const [currentType, setCurrentType] = useState(tabs[0].value);
  const { loadProviders, extServProviders } = useExtServProvidersQuery();

  const providers = useMemo(() => {
    return extServProviders.filter(prov => prov?.services && prov.services[currentType]);
  }, [currentType, extServProviders]);

  useEffect(() => {
    if (extServProviders.length === 0) {
      loadProviders();
    }
    // eslint-disable-next-line
  }, []);

  const TabComponent = useMemo(() => tabsMap[currentType], [currentType]);

  return (
    <Container overflow={'hidden'} fillWidth>
      <StHeader title={'Company settings'} onClose={onClose} />

      <ModalFilter filterOptions={tabs} onOptSelect={info => setCurrentType(info?.value)} />

      <FlexBox flex={1} fillWidth overflow={'auto'}>
        <TabComponent compId={currentType} providers={providers} />
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

  const loadProviders = ({ params }: { params?: AppQueryParams } = {}) =>
    createApiCall(
      { data: params, onSuccess: setExtServProviders, onLoading: setIsLoading, logResData: true },
      IntegrationsApi.getAllExtIntegrationServices,
      IntegrationsApi
    );

  return {
    loadProviders,
    extServProviders,
    isLoading,
  };
}
