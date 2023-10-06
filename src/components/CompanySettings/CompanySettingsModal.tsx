import ModalForm, { ModalFormProps } from '../ModalForm';
import FlexBox from '../atoms/FlexBox';
import { useMemo, useState } from 'react';
import { enumToFilterOptions } from '../../utils/fabrics';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import { useAppForm } from '../../hooks';
import { ICompanyConfigsFormData } from '../../redux/companies/companies.types';
import { useWarehousesSelector } from '../../redux/selectors.store';
import { FilterOption } from '../ModalForm/ModalFilter';
import CustomSelect from '../atoms/Inputs/CustomSelect/CustomSelect';
import { t } from '../../lang';

export interface CompanySettingsProps extends Omit<ModalFormProps, 'onSubmit'> {}
enum CompanySettingsTabs {
  Defaults = 'Defaults',
  Info = 'Info',
}

const tabs = enumToFilterOptions(CompanySettingsTabs);
interface CompanySettingsTabsBaseProps {
  onClose?: () => void;
  compId: CompanySettingsTabs;
}
const TestTabComp: React.FC<CompanySettingsTabsBaseProps> = props => {
  return (
    <FlexBox flex={1} fillWidth alignItems={'center'} justifyContent={'center'}>
      <ButtonIcon variant={'filledLarge'} onClick={props.onClose}>{`Закрити ${props.compId}`}</ButtonIcon>
    </FlexBox>
  );
};
const CompanyConfigsTab = ({ onClose }: CompanySettingsTabsBaseProps) => {
  const form = useAppForm<ICompanyConfigsFormData>();

  const warehouses = useWarehousesSelector().warehouses;
  const warehousesSelectOptions = useMemo(
    (): FilterOption<string>[] => warehouses.map(w => ({ ...w, value: w._id })),
    [warehouses]
  );

  // const onValid = (data: ICompanyConfigsFormData) => {};

  return (
    <FlexBox>
      <CustomSelect
        {...form.registerSelect('warehouse', {
          options: warehousesSelectOptions,
          label: t('warehouse'),
          placeholder: t('Select warehouse'),
        })}
      />
    </FlexBox>
  );
};
const RenderTabComponent: Record<CompanySettingsTabs, React.FC<CompanySettingsTabsBaseProps>> = {
  [CompanySettingsTabs.Defaults]: CompanyConfigsTab,
  [CompanySettingsTabs.Info]: TestTabComp,
};

const CompanySettingsModal: React.FC<CompanySettingsProps> = ({ onClose, ...props }) => {
  const [current, setCurrent] = useState<CompanySettingsTabs>(tabs[0]?.value);

  const RenderTab = useMemo(() => {
    return RenderTabComponent[current] || RenderTabComponent.Defaults;
  }, [current]);

  return (
    <ModalForm
      fillHeight
      title={'Company settings'}
      onClose={onClose}
      {...props}
      fillWidth={false}
      filterOptions={tabs}
      defaultFilterValue={current}
      onOptSelect={(_, v) => {
        setCurrent(v);
      }}
    >
      <RenderTab onClose={onClose} compId={current} />
    </ModalForm>
  );
};

export default CompanySettingsModal;
