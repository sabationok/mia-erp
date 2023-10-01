import ModalForm, { ModalFormProps } from '../ModalForm';
import FlexBox from '../atoms/FlexBox';
import { useMemo, useState } from 'react';
import { enumToFilterOptions } from '../../utils/fabrics';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';

export interface CompanyIntegrationsProps extends Omit<ModalFormProps, 'onSubmit'> {}
enum CompanyIntegrationsTabs {
  Banks = 'Banks',
  DeliveryAgents = 'Delivery agents',
}

const TestTabComp: React.FC<{ onClose?: () => void; compId: CompanyIntegrationsTabs }> = (props, context) => {
  return (
    <FlexBox flex={1} fillWidth alignItems={'center'} justifyContent={'center'}>
      <ButtonIcon variant={'filledLarge'} onClick={props.onClose}>{`Закрити ${props.compId}`}</ButtonIcon>
    </FlexBox>
  );
};

const RenderTabComponent: Record<
  CompanyIntegrationsTabs,
  React.FC<{ onClose?: () => void; compId: CompanyIntegrationsTabs }>
> = {
  [CompanyIntegrationsTabs.DeliveryAgents]: TestTabComp,
  [CompanyIntegrationsTabs.Banks]: TestTabComp,
};

const tabs = enumToFilterOptions(CompanyIntegrationsTabs);
const CompanyIntegrationsModal: React.FC<CompanyIntegrationsProps> = ({ onClose, ...props }) => {
  const [current, setCurrent] = useState<CompanyIntegrationsTabs>(tabs[0]?.v);

  const RenderTab = useMemo(() => {
    return RenderTabComponent[current] || RenderTabComponent[CompanyIntegrationsTabs.DeliveryAgents];
  }, [current]);

  return (
    <ModalForm
      fillWidth
      fillHeight
      title={'Company settings'}
      onClose={onClose}
      {...props}
      filterOptions={tabs}
      onOptSelect={(_, v) => {
        setCurrent(v);
      }}
    >
      <RenderTab onClose={onClose} compId={current} />
    </ModalForm>
  );
};

export default CompanyIntegrationsModal;
