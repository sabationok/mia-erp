import { ModalFormProps } from '../ModalForm';
import FlexBox from '../atoms/FlexBox';
import { ReactElement, useMemo, useState } from 'react';
import { enumToFilterOptions } from '../../utils/fabrics';
import { IntegrationProviderTypeEnum } from '../../redux/integrations/integrations.types';
import _ from 'lodash';
import styled from 'styled-components';
import { ModalHeader } from '../atoms';
import InvoicesIntegrationsTab from './integrations/InvoicesIntegrationsTab';
import ShipmentsIntegrationsTab from './integrations/ShipmentsIntegrationsTab';
import ModalFilter from '../ModalForm/ModalFilter';

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

const CompanyIntegrationsModal: React.FC<CompanyIntegrationsProps> = ({ onClose, ...props }) => {
  const [current, setCurrent] = useState(tabs[0].value);

  const RenderTab = useMemo(() => {
    return tabsMap[current] || tabsMap[tabs[0].value];
  }, [current]);

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
