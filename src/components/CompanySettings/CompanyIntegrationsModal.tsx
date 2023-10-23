import { ModalFormProps } from '../ModalForm';
import FlexBox from '../atoms/FlexBox';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { enumToFilterOptions } from '../../utils/fabrics';
import { ExtServProviderBase, IntegrationProviderTypeEnum } from '../../redux/integrations/integrations.types';
import _ from 'lodash';
import styled from 'styled-components';
import { ModalHeader } from '../atoms';
import InvoicesIntegrationsTab from './integrations/InvoicesIntegrationsTab';
import ShipmentsIntegrationsTab from './integrations/ShipmentsIntegrationsTab';
import ModalFilter from '../ModalForm/ModalFilter';
import { AppQueryParams, createApiCall } from '../../api';
import IntegrationsApi from '../../api/integrations.api';

export interface CompanyIntegrationsProps extends Omit<ModalFormProps, 'onSubmit'> {}

const CompanyIntegrationsTabs = _.pick(IntegrationProviderTypeEnum, ['invoices', 'shipments']);

// const TestTabComp = (props: IntegrationTabProps) => {
//   return (
//     <FlexBox flex={1} fillWidth alignItems={'center'} justifyContent={'center'}>
//       <ButtonIcon variant={'filledLarge'} onClick={props?.onClose}>{`Закрити ${props.compId}`}</ButtonIcon>
//     </FlexBox>
//   );
// };

export interface IntegrationTabProps {
  onClose?: () => void;
  compId: string;
}

const tabsMap: Record<
  IntegrationProviderTypeEnum | string,
  <P = any>(props: IntegrationTabProps & P) => ReactElement<P> | null
> = {
  [CompanyIntegrationsTabs.invoices]: InvoicesIntegrationsTab,
  [CompanyIntegrationsTabs.shipments]: ShipmentsIntegrationsTab,
};

const tabs = enumToFilterOptions(CompanyIntegrationsTabs);

const useIntegrationsService = () => {
  const [integrationProviders, setIntegrationProviders] = useState<ExtServProviderBase[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadProviders = ({ params }: { params?: AppQueryParams } = {}) =>
    createApiCall(
      { data: params, onSuccess: setIntegrationProviders, onLoading: setIsLoading },
      IntegrationsApi.getAllIntegrationProviders,
      IntegrationsApi
    );

  return {
    loadProviders,
    integrationProviders,
    isLoading,
  };
};

const CompanyIntegrationsModal: React.FC<CompanyIntegrationsProps> = ({ onClose, ...props }) => {
  const [current, setCurrent] = useState(tabs[0].value);
  const { loadProviders, integrationProviders } = useIntegrationsService();

  const RenderTab = useMemo(() => {
    return tabsMap[current] || tabsMap[tabs[0].value];
  }, [current]);

  useEffect(() => {
    if (integrationProviders.length === 0) {
      loadProviders();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Container overflow={'hidden'}>
      <StHeader title={'Company settings'} onClose={onClose} />

      <ModalFilter filterOptions={tabs} onFilterValueSelect={info => setCurrent(info?.value)} />

      <FlexBox flex={1} padding={'8px 0'}>
        <RenderTab onClose={onClose} compId={current} />
      </FlexBox>
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
