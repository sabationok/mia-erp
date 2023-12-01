import { CompanySettingsTabBaseProps } from './companySettingsTabs.types';
import { useAppForm } from '../../../hooks';
import { ICompanyFormData, ICompanyInvoicingPolicyFormData } from '../../../types/companies.types';
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

export interface InvoicingPolicyTabProps extends CompanySettingsTabBaseProps {}

const InvoicingPolicyTab = ({ onClose }: InvoicingPolicyTabProps) => {
  const company = usePermissionsSelector().permission.company;

  const form = useAppForm<ICompanyFormData>({ defaultValues: company as never });

  const methods = useTranslatedMethodsList(useInvoicesSelector().methods);

  const formValues = form.watch();
  const registerSwitch = (name: keyof Omit<ICompanyInvoicingPolicyFormData, 'method'>) => {
    return {
      name: name,
      onChange(v: boolean) {
        form.setValue(`invoicingPolicy.${name}`, v, { shouldTouch: true });
      },
      value: formValues?.deliveryPolicy ? formValues?.deliveryPolicy[name] : false,
    };
  };

  const onValid = (fData: ICompanyFormData) => {
    console.log(toReqData(fData));
  };
  return (
    <SettingsStyles.Form onSubmit={form.handleSubmit(onValid)}>
      <FlexBox overflow={'auto'} flex={1} fillWidth padding={'0 8px 8px'}>
        <InputLabel label={t('Auto creating invoice for order')}>
          <ButtonSwitch />
        </InputLabel>

        <CustomSelect
          {...form.registerSelect('deliveryPolicy.method', {
            options: methods,
            label: t('Default method'),
            placeholder: t('Select default method'),
          })}
        />

        <InputLabel label={t('Client can select method')}>
          <ButtonSwitch />
        </InputLabel>

        <InputLabel label={t('Auto publishing invoice for order')}>
          <ButtonSwitch />
        </InputLabel>
      </FlexBox>

      <ModalFooter onClick={onClose} onSubmitPassed isLoading={false}></ModalFooter>
    </SettingsStyles.Form>
  );
};

export default InvoicingPolicyTab;
