import ModalForm, { ModalFormProps } from '../ModalForm';
import { useMemo, useState } from 'react';
import { enumToFilterOptions } from '../../utils/fabrics';
import ModalFilter from '../ModalForm/ModalFilter';
import { CompanySettingsTabBaseProps } from './settings-tabs/companySettingsTabs.types';
import DeliveryPolicyTab from './settings-tabs/DeliveryPolicyTab';
import InvoicingPolicyTab from './settings-tabs/InvoicingPolicyTab';
import WarehousingPolicyTab from './settings-tabs/WarehousingPolicyTab';
import SupplementPolicyTab from './settings-tabs/SupplementPolicyTab';

export interface CompanySettingsProps extends Omit<ModalFormProps, 'onSubmit'> {}
enum CompanySettingsTabs {
  Invoicing = 'Invoicing',
  Delivery = 'Delivery',
  Warehousing = 'Warehousing',
  Supplement = 'Supplement',
}

const tabs = enumToFilterOptions(CompanySettingsTabs);

const RenderTabComponent: Record<CompanySettingsTabs, React.FC<CompanySettingsTabBaseProps>> = {
  [CompanySettingsTabs.Delivery]: DeliveryPolicyTab,
  [CompanySettingsTabs.Invoicing]: InvoicingPolicyTab,
  [CompanySettingsTabs.Warehousing]: WarehousingPolicyTab,
  [CompanySettingsTabs.Supplement]: SupplementPolicyTab,
};

const CompanySettingsModal: React.FC<CompanySettingsProps> = ({ onClose, ...props }) => {
  const [current, setCurrent] = useState<CompanySettingsTabs>(tabs[0]?.value);

  const RenderTab = useMemo(() => {
    return RenderTabComponent[current] || RenderTabComponent.Invoicing;
  }, [current]);

  return (
    <ModalForm title={'Company settings'} {...props} onClose={onClose} fillHeight fillWidth={false} footer={false}>
      <ModalFilter
        filterOptions={tabs}
        defaultFilterValue={current}
        onOptSelect={(_, v) => {
          setCurrent(v);
        }}
      />

      <RenderTab onClose={onClose} compId={current} />
    </ModalForm>
  );
};

export default CompanySettingsModal;
