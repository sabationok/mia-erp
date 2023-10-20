import ModalForm, { ModalFormProps } from '../ModalForm';
import FlexBox from '../atoms/FlexBox';
import { ReactElement, useMemo, useState } from 'react';
import { enumToFilterOptions } from '../../utils/fabrics';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import PaymentIntegrationsTab from './integrations/PaymentIntegrationsTab';

export interface CompanyIntegrationsProps extends Omit<ModalFormProps, 'onSubmit'> {}
enum CompanyIntegrationsTabs {
  Payments = 'Payments',
  Deliveries = 'Deliveries',
  Stores = 'Stores',
}

const TestTabComp = (props: IntegrationTabProps) => {
  return (
    <FlexBox flex={1} fillWidth alignItems={'center'} justifyContent={'center'}>
      <ButtonIcon variant={'filledLarge'} onClick={props?.onClose}>{`Закрити ${props.compId}`}</ButtonIcon>
    </FlexBox>
  );
};
export interface IntegrationTabProps {
  onClose?: () => void;
  compId: string;
}

const RenderTabComponent: Record<
  CompanyIntegrationsTabs,
  <P = any>(props: IntegrationTabProps & P) => ReactElement<P> | null
> = {
  [CompanyIntegrationsTabs.Deliveries]: TestTabComp,
  [CompanyIntegrationsTabs.Payments]: PaymentIntegrationsTab,
  [CompanyIntegrationsTabs.Stores]: TestTabComp,
};

const tabs = enumToFilterOptions(CompanyIntegrationsTabs);

const CompanyIntegrationsModal: React.FC<CompanyIntegrationsProps> = ({ onClose, ...props }) => {
  const [current, setCurrent] = useState(tabs[0].value);

  const RenderTab = useMemo(() => {
    return RenderTabComponent[current] || RenderTabComponent[tabs[0].value];
  }, [current]);

  return (
    <ModalForm
      fillWidth
      fillHeight
      title={'Company settings'}
      onClose={onClose}
      {...props}
      filterOptions={tabs}
      onFilterValueSelect={info => setCurrent(info?.value)}
    >
      <RenderTab onClose={onClose} compId={current} />
    </ModalForm>
  );
};

export default CompanyIntegrationsModal;
