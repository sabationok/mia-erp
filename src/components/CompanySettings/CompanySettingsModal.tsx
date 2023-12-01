import { ModalFormProps } from '../ModalForm';
import { useMemo, useState } from 'react';
import { enumToFilterOptions } from '../../utils/fabrics';
import ModalFilter from '../ModalForm/ModalFilter';
import { CompanySettingsTabBaseProps } from './settings-tabs/companySettingsTabs.types';
import DeliveryPolicyTab from './settings-tabs/DeliveryPolicyTab';
import InvoicingPolicyTab from './settings-tabs/InvoicingPolicyTab';
import WarehousingPolicyTab from './settings-tabs/WarehousingPolicyTab';
import FlexBox from '../atoms/FlexBox';
import styled from 'styled-components';
import { OverlayHeader } from '../Forms/FormProduct/components';

export interface CompanySettingsProps extends Omit<ModalFormProps, 'onSubmit'> {}
enum CompanySettingsTabs {
  Invoicing = 'Invoicing',
  Delivery = 'Delivery',
  Warehousing = 'Warehousing',
  // Supplement = 'Supplement',
}

const tabs = enumToFilterOptions(CompanySettingsTabs);

const RenderTabComponent: Record<CompanySettingsTabs, React.FC<CompanySettingsTabBaseProps>> = {
  [CompanySettingsTabs.Delivery]: DeliveryPolicyTab,
  [CompanySettingsTabs.Invoicing]: InvoicingPolicyTab,
  [CompanySettingsTabs.Warehousing]: WarehousingPolicyTab,
  // [CompanySettingsTabs.Supplement]: SupplementPolicyTab,
};

const CompanySettingsModal: React.FC<CompanySettingsProps> = ({ onClose, ...props }) => {
  const [current, setCurrent] = useState<CompanySettingsTabs>(CompanySettingsTabs.Warehousing);

  const RenderTab = useMemo(() => {
    return RenderTabComponent[current] || RenderTabComponent.Invoicing;
  }, [current]);

  return (
    <ModalBox>
      <OverlayHeader title={'Company settings'} onClosePress={onClose} />

      <ModalFilter
        filterOptions={tabs}
        preventFilter={true}
        onOptSelect={(_, v) => {
          setCurrent(v);
        }}
      />

      <RenderTab onClose={onClose} compId={current} />
    </ModalBox>
  );
};

const ModalBox = styled(FlexBox)`
  width: 450px;
  max-width: 100%;

  height: 100vh;

  max-height: 90vh;
  min-height: 280px;

  padding: 0 8px;

  background: ${p => p.theme.modalBackgroundColor};

  overflow: hidden;
`;

export default CompanySettingsModal;
