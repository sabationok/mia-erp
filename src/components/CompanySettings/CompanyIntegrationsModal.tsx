import ModalForm, { ModalFormProps } from '../ModalForm';
import FlexBox from '../atoms/FlexBox';
import { useEffect, useMemo, useState } from 'react';
import { enumToFilterOptions } from '../../utils/fabrics';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import ModalFilter, { FilterOption } from '../ModalForm/ModalFilter';

export interface CompanyIntegrationsProps extends Omit<ModalFormProps, 'onSubmit'> {}
enum CompanyIncomeIntegrationsTabs {
  Stores = 'Stores',
  Payments = 'Payments',
  Deliveries = 'Deliveries',
}
enum CompanyIntegrationType {
  In = 'In',
  Out = 'Out',
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
  CompanyIncomeIntegrationsTabs,
  <V = any, Name = any>(props: {
    onClose?: () => void;
    compId: string;
    name: Name;
    options?: FilterOption[];
    onChangeValue?: (info: { name: any; value: V }) => void;
  }) => JSX.Element
> = {
  [CompanyIncomeIntegrationsTabs.Deliveries]: TestTabComp,
  [CompanyIncomeIntegrationsTabs.Payments]: TestTabComp,
  [CompanyIncomeIntegrationsTabs.Stores]: TestTabComp,
};

const tabs = enumToFilterOptions(CompanyIntegrationType);
const tabsByTypeIn = enumToFilterOptions(CompanyIncomeIntegrationsTabs);
const tabsByTypeOut = enumToFilterOptions(CompanyIncomeIntegrationsTabs);
interface State {
  type: CompanyIntegrationType;
  in: CompanyIncomeIntegrationsTabs;
  out: CompanyIncomeIntegrationsTabs;
}
const CompanyIntegrationsModal: React.FC<CompanyIntegrationsProps> = ({ onClose, ...props }) => {
  const [current, setCurrent] = useState<State>({
    type: tabs[0].value,
    in: tabsByTypeIn[0].value,
    out: tabsByTypeOut[0].value,
  });

  const RenderInTabs = useMemo(() => {
    return (
      current.type === 'In' &&
      current?.in &&
      (RenderTabComponent[current?.in] || RenderTabComponent[CompanyIncomeIntegrationsTabs.Deliveries])
    );
  }, [current]);
  const RenderOutTabs = useMemo(() => {
    return (
      current.type === 'Out' &&
      current?.out &&
      (RenderTabComponent[current?.out] || RenderTabComponent[CompanyIncomeIntegrationsTabs.Deliveries])
    );
  }, [current]);

  const handleSetCurrent = <Name extends keyof State = any>({ name, value }: { name: Name; value: State[Name] }) => {
    setCurrent(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    console.log(current);
  }, [current]);

  return (
    <ModalForm fillWidth fillHeight title={'Company settings'} onClose={onClose} {...props} filterOptions={tabs}>
      {RenderInTabs && (
        <RenderInTabs
          name={'in'}
          onClose={onClose}
          compId={current.in}
          onChangeValue={handleSetCurrent}
          options={tabsByTypeIn}
        />
      )}
      {RenderOutTabs && (
        <RenderOutTabs
          onClose={onClose}
          name={'out'}
          compId={current.out}
          onChangeValue={handleSetCurrent}
          options={tabsByTypeOut}
        />
      )}
    </ModalForm>
  );
};

export default CompanyIntegrationsModal;
