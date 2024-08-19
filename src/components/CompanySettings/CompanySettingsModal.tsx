import { ModalFormProps } from '../ModalForm';
import { useCallback, useEffect, useState } from 'react';
import { enumToFilterOptions } from '../../utils/fabrics';
import TabSelector from '../atoms/TabSelector';
import { CompanySettingsTabBaseProps, CompanySettingsTabs } from './settings-tabs/companySettingsTabs.types';
import DeliveryPolicyTab from './settings-tabs/DeliveryPolicyTab';
import InvoicingPolicyTab from './settings-tabs/InvoicingPolicyTab';
import WarehousingPolicyTab from './settings-tabs/WarehousingPolicyTab';
import { useAppServiceProvider } from '../../hooks/useAppServices.hook';
import { AppModuleName } from '../../redux/reduxTypes.types';
import { useCompaniesSelector, usePermissionsSelector } from '../../redux/selectors.store';
import FiscalPolicyTab from './settings-tabs/FiscalPolicyTab';
import PaymentPolicyTab from './settings-tabs/PaymentPolicyTab';
import ModalFooter from '../atoms/Modal/ModalFooter';
import { useLoaders } from '../../Providers/Loaders/useLoaders.hook';
import ModalBase from '../atoms/Modal';
import { toReqData } from '../../utils';

export interface CompanySettingsProps extends Omit<ModalFormProps, 'onSubmit'> {}

const tabs = enumToFilterOptions(CompanySettingsTabs);

const RenderTabComponent: Record<CompanySettingsTabs, React.FC<CompanySettingsTabBaseProps>> = {
  [CompanySettingsTabs.invoicing]: InvoicingPolicyTab,
  [CompanySettingsTabs.payment]: PaymentPolicyTab,
  [CompanySettingsTabs.fiscalization]: FiscalPolicyTab,
  [CompanySettingsTabs.delivery]: DeliveryPolicyTab,
  [CompanySettingsTabs.warehousing]: WarehousingPolicyTab,
};

const CompanySettingsModal: React.FC<CompanySettingsProps> = ({ onClose, ...props }) => {
  const service = useAppServiceProvider()[AppModuleName.companies];
  const permission = usePermissionsSelector().permission;
  const currentCompany = useCompaniesSelector().dataMap[permission.company?._id ?? ''];
  const [current, setCurrent] = useState<CompanySettingsTabs>(tabs[0].value);
  const loaders = useLoaders<CompanySettingsTabs>();

  useEffect(() => {
    service.getOne({
      data: {
        params: { _id: permission?.company?._id },
      },
    });
  }, [permission?.company?._id, service]);

  const onSubmit: CompanySettingsTabBaseProps['onSubmit'] = ({ name, data }) => {
    if (currentCompany?._id) {
      service.update({
        data: {
          data: {
            data: {
              _id: currentCompany?._id,
              [`${name}Policy`]: toReqData(data),
            },
          },
        },
        onLoading: loaders.onLoading(current),
      });
    } else {
      console.log(currentCompany);
    }
  };

  const RenderTab = useCallback(
    (props: CompanySettingsTabBaseProps) => {
      const Tab = RenderTabComponent[current] || RenderTabComponent.invoicing;

      return <Tab {...props} />;
    },
    [current]
  );

  useEffect(() => {
    console.log({ currentCompany });
  }, [currentCompany]);
  return (
    <ModalBase fillHeight title={'Company settings'}>
      <TabSelector
        options={tabs}
        preventDefault={true}
        onOptSelect={(_, v) => {
          setCurrent(v);
        }}
      />

      <RenderTab
        onClose={onClose}
        compId={`${current}Policy`}
        onSubmit={onSubmit}
        company={currentCompany}
        policyFormKey={current}
        isInFocus={true}
        isSubmitting={loaders.isLoading[current]}
        onErrorSubmit={errors => {
          console.error(errors);
        }}
        onValidSubmit={data => {
          console.log(data);
          onSubmit({ name: current, data });
        }}
      />

      <ModalFooter hasOnSubmit formId={current} isLoading={loaders.isLoading[current]}></ModalFooter>
    </ModalBase>
  );
};

export default CompanySettingsModal;
