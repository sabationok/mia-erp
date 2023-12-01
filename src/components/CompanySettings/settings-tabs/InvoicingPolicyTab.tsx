import { CompanySettingsTabBaseProps } from './companySettingsTabs.types';
import { useAppForm } from '../../../hooks';
import { ICompanyFormData } from '../../../types/companies.types';
import { useTranslatedMethodsList } from '../../../hooks/useTranslatedMethodsList.hook';
import { useInvoicesSelector } from '../../../redux/selectors.store';
import FlexBox from '../../atoms/FlexBox';
import InputLabel from '../../atoms/Inputs/InputLabel';
import { t } from '../../../lang';
import ButtonSwitch from '../../atoms/ButtonSwitch';
import CustomSelect from '../../atoms/Inputs/CustomSelect/CustomSelect';

export interface InvoicingPolicyTabProps extends CompanySettingsTabBaseProps {}

const InvoicingPolicyTab = ({}: InvoicingPolicyTabProps) => {
  const form = useAppForm<ICompanyFormData>();

  const methods = useTranslatedMethodsList(useInvoicesSelector().methods);

  return (
    <FlexBox>
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
  );
};

export default InvoicingPolicyTab;
