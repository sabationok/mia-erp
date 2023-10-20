import ModalForm, { ModalFormProps } from '../ModalForm';
import FlexBox from '../atoms/FlexBox';
import { useMemo, useState } from 'react';
import { enumToFilterOptions } from '../../utils/fabrics';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import ModalFilter, { FilterOption } from '../ModalForm/ModalFilter';

export interface CompanyIntegrationsProps extends Omit<ModalFormProps, 'onSubmit'> {}
enum CompanyIntegrationsTabs {
  Payments = 'Payments',
  Deliveries = 'Deliveries',
  Stores = 'Stores',
}

const TestTabComp = <V = any, Name = any>(props: {
  onClose?: () => void;
  compId: string;
  name?: Name;
  options?: FilterOption[];
  onChangeValue?: (info: { name: Name; value: V }) => void;
}) => {
  return (
    <FlexBox flex={1} fillWidth alignItems={'center'} justifyContent={'center'}>
      <ModalFilter filterOptions={props.options} onFilterValueSelect={props?.onChangeValue} name={props?.name} />

      <ButtonIcon variant={'filledLarge'} onClick={props.onClose}>{`Закрити ${props.compId}`}</ButtonIcon>
    </FlexBox>
  );
};

const RenderTabComponent: Record<
  CompanyIntegrationsTabs,
  <V = any, Name = any>(props: {
    onClose?: () => void;
    compId: string;
    name: Name;
    options?: FilterOption[];
    onChangeValue?: (info: { name: any; value: V }) => void;
  }) => JSX.Element
> = {
  [CompanyIntegrationsTabs.Deliveries]: TestTabComp,
  [CompanyIntegrationsTabs.Payments]: TestTabComp,
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
      <RenderTab name={'in'} onClose={onClose} compId={current} />
    </ModalForm>
  );
};

export default CompanyIntegrationsModal;
