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
import { Text } from '../atoms/Text';
import ModalFooter from '../ModalForm/ModalFooter';

export interface CompanyIntegrationsProps extends Omit<ModalFormProps, 'onSubmit'> {}

const ExtServiceTabs = _.pick(ExtIntegrationServiceTypeEnum, ['invoices', 'shipments']);

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
  ExtIntegrationServiceTypeEnum | string,
  <P = any>(props: IntegrationTabProps & P) => ReactElement<P> | null
> = {
  [ExtServiceTabs.invoices]: InvoicesIntegrationsTab,
  [ExtServiceTabs.shipments]: ShipmentsIntegrationsTab,
};

const tabs = enumToFilterOptions(ExtServiceTabs);

const useExtServProvidersQuery = () => {
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
};

const CompanyIntegrationsModal: React.FC<CompanyIntegrationsProps> = ({ onClose, ...props }) => {
  const [current, setCurrent] = useState(tabs[0].value);
  const { loadProviders, extServProviders } = useExtServProvidersQuery();

  const RenderTab = useMemo(() => {
    return tabsMap[current] || tabsMap[tabs[0].value];
  }, [current]);

  useEffect(() => {
    if (extServProviders.length === 0) {
      loadProviders();
    }
    // eslint-disable-next-line
  }, []);

  const renderProviders = useMemo(() => {
    return extServProviders.map(prov => {
      const availableSubServices = prov.services
        ? Object.entries(prov.services).map(([k, v]: [k: string, v?: string[]]) => {
            return (
              <FlexBox key={k} gap={6}>
                <Text>{k}</Text>

                <FlexBox fxDirection={'row'} gap={8} border={'1px solid tomato'} borderBottom={'4px'}>
                  {v?.map(() => {
                    return (
                      <Text key={k} $size={12} $weight={500}>
                        {v}
                      </Text>
                    );
                  })}
                </FlexBox>
              </FlexBox>
            );
          })
        : null;

      return (
        <FlexBox>
          <FlexBox>{prov?.label}</FlexBox>

          <FlexBox margin={'5px 8px'}>{availableSubServices}</FlexBox>
        </FlexBox>
      );
    });
  }, [extServProviders]);

  return (
    <Container overflow={'hidden'}>
      <StHeader title={'Company settings'} onClose={onClose} />

      <ModalFilter filterOptions={tabs} onFilterValueSelect={info => setCurrent(info?.value)} />

      <FlexBox flex={1} padding={'8px 0'} overflow={'auto'}>
        {renderProviders}
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
