import { CompanySettingsTabBaseProps } from './companySettingsTabs.types';
import { useAppForm } from '../../../hooks';
import { DeliveryPolicyJsonData, ICompanyInvoicingPolicyFormData } from '../../../types/companies.types';
import { useTranslatedMethodsList } from '../../../hooks/useTranslatedMethodsList.hook';
import { useInvoicesSelector, usePermissionsSelector } from '../../../redux/selectors.store';
import FlexBox from '../../atoms/FlexBox';
import InputLabel from '../../atoms/Inputs/InputLabel';
import { t } from '../../../lang';
import ButtonSwitch from '../../atoms/ButtonSwitch';
import CustomSelect from '../../atoms/Inputs/CustomSelect/CustomSelect';
import { SettingsStyles } from '../components/styles';
import ModalFooter from '../../ModalForm/ModalFooter';
import { toReqData } from '../../../utils';
import { useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { AppModuleName } from '../../../redux/reduxTypes.types';
import { useState } from 'react';
import { DeliveryPolicyTabs } from './DeliveryPolicyTab';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';

export interface InvoicingPolicyTabProps extends CompanySettingsTabBaseProps {
  onSubmit?: AppSubmitHandler<{
    data: ICompanyInvoicingPolicyFormData[keyof ICompanyInvoicingPolicyFormData];
    tab: keyof ICompanyInvoicingPolicyFormData;
  }>;
}

const InvoicingPolicyTab = ({ onClose, onSubmit }: InvoicingPolicyTabProps) => {
  const company = usePermissionsSelector().permission.company;
  const service = useAppServiceProvider()[AppModuleName.companies];
  const [current, setCurrent] = useState<keyof ICompanyInvoicingPolicyFormData>(DeliveryPolicyTabs.sales);

  const [loading, setLoading] = useState<boolean>(false);

  const form = useAppForm<ICompanyInvoicingPolicyFormData>({
    defaultValues: company?.deliveryPolicy as ICompanyInvoicingPolicyFormData,
    shouldUnregister: true,
  });

  const methods = useTranslatedMethodsList(useInvoicesSelector().methods, { withFullLabel: true });

  const formValues = form.watch();

  const registerSwitch = (name: keyof Omit<DeliveryPolicyJsonData, 'method'>) => {
    return {
      name: name,
      onChange(v: boolean) {
        form.setValue(`${current}.${name}`, v, { shouldTouch: true });
      },
      value: formValues?.sales ? formValues?.sales[name] : false,
    };
  };

  const onValid = (fData: ICompanyInvoicingPolicyFormData) => {
    onSubmit && onSubmit({ data: fData[current], tab: current });

    console.log(toReqData(fData));
    if (company?._id) {
      service.update({
        data: { _id: company?._id, id: company?._id, data: { deliveryPolicy: { [current]: formValues[current] } } },
        logRes: true,
        onLoading: setLoading,
      });
    }
  };

  return (
    <SettingsStyles.Form onSubmit={form.handleSubmit(onValid)}>
      <FlexBox overflow={'auto'} flex={1} fillWidth padding={'0 8px 8px'}>
        <CustomSelect
          onSelect={option => form.setValue(`${current}.method`, option.value)}
          options={methods}
          {...{
            label: t('Default method'),
            placeholder: t('Select default method'),
          }}
        />

        <InputLabel label={t('Auto creating invoice for order')}>
          <ButtonSwitch />
        </InputLabel>

        <InputLabel label={t('Client can select method')}>
          <ButtonSwitch />
        </InputLabel>

        <InputLabel label={t('Auto publishing invoice for order')}>
          <ButtonSwitch />
        </InputLabel>
      </FlexBox>

      <ModalFooter onClick={onClose} onSubmitPassed isLoading={loading}></ModalFooter>
    </SettingsStyles.Form>
  );
};

export default InvoicingPolicyTab;
