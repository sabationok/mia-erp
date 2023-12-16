import { ModalFormProps } from '../ModalForm';
import { useEffect, useMemo, useState } from 'react';
import { enumToFilterOptions } from '../../utils/fabrics';
import ModalFilter from '../atoms/ModalFilter';
import { CompanySettingsTabBaseProps } from './settings-tabs/companySettingsTabs.types';
import DeliveryPolicyTab from './settings-tabs/DeliveryPolicyTab';
import InvoicingPolicyTab from './settings-tabs/InvoicingPolicyTab';
import WarehousingPolicyTab from './settings-tabs/WarehousingPolicyTab';
import FlexBox from '../atoms/FlexBox';
import styled from 'styled-components';
import { OverlayHeader } from '../Forms/FormProduct/components';
import { ICompany } from '../../types/companies.types';
import { useAppServiceProvider } from '../../hooks/useAppServices.hook';
import { AppModuleName } from '../../redux/reduxTypes.types';
import { usePermissionsSelector } from '../../redux/selectors.store';
import FiscalizationPolicyTab from './settings-tabs/FiscalizationPolicyTab';

export interface CompanySettingsProps extends Omit<ModalFormProps, 'onSubmit'> {}
enum CompanySettingsTabs {
  Invoicing = 'Invoicing',
  Delivery = 'Delivery',
  Warehousing = 'Warehousing',
  Fiscalization = 'Fiscalization',
  // Supplement = 'Supplement',
}

const tabs = enumToFilterOptions(CompanySettingsTabs);

const RenderTabComponent: Record<CompanySettingsTabs, React.FC<CompanySettingsTabBaseProps>> = {
  [CompanySettingsTabs.Delivery]: DeliveryPolicyTab,
  [CompanySettingsTabs.Invoicing]: InvoicingPolicyTab,
  [CompanySettingsTabs.Warehousing]: WarehousingPolicyTab,
  [CompanySettingsTabs.Fiscalization]: FiscalizationPolicyTab,

  // [CompanySettingsTabs.Supplement]: SupplementPolicyTab,
};

const CompanySettingsModal: React.FC<CompanySettingsProps> = ({ onClose, ...props }) => {
  const service = useAppServiceProvider()[AppModuleName.companies];
  const permission = usePermissionsSelector().permission;
  const [current, setCurrent] = useState<CompanySettingsTabs>(tabs[0].value);
  const [currentCompany, setCurrentCompany] = useState<ICompany>();

  useEffect(() => {
    service.getById({
      data: { _id: permission.company?._id },
      onSuccess: data => {
        setCurrentCompany(data);
      },
    });
  }, [permission.company?._id, service]);

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

      <RenderTab onClose={onClose} compId={current} company={currentCompany} />
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
