import { CompanySettingsTabBaseProps } from './companySettingsTabs.types';
import {
  ICompanyInvoicingPolicyFormData,
  InvoicingPolicyJsonData,
  InvoicingPolicyTypeEnum,
} from '../../../types/companies.types';
import { useTranslatedMethodsList } from '../../../hooks/useTranslatedMethodsList.hook';
import { useCompaniesSelector, useInvoicesSelector } from '../../../redux/selectors.store';
import FlexBox, { FlexForm } from '../../atoms/FlexBox';
import InputLabel from '../../atoms/Inputs/InputLabel';
import { t } from '../../../lang';
import ButtonSwitch from '../../atoms/ButtonSwitch';
import CustomSelect from '../../atoms/Inputs/CustomSelect/CustomSelect';
import ModalFooter from '../../ModalForm/ModalFooter';
import { enumToTabs } from '../../../utils';
import { useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { AppModuleName } from '../../../redux/reduxTypes.types';
import { useCallback, useState } from 'react';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import ModalFilter from '../../ModalForm/ModalFilter';
import { useForm } from 'react-hook-form';

export interface InvoicingPolicyTabProps extends CompanySettingsTabBaseProps {
  onSubmit?: AppSubmitHandler<{
    data: ICompanyInvoicingPolicyFormData[InvoicingPolicyTypeEnum];
    tab: InvoicingPolicyTypeEnum;
  }>;
}

const tabs = enumToTabs(InvoicingPolicyTypeEnum);

const InvoicingPolicyTab = ({ onClose, onSubmit }: InvoicingPolicyTabProps) => {
  const company = useCompaniesSelector().current;
  const service = useAppServiceProvider()[AppModuleName.companies];

  const methods = useTranslatedMethodsList(useInvoicesSelector().methods, { withFullLabel: true });

  const [current, setCurrent] = useState<InvoicingPolicyTypeEnum>(InvoicingPolicyTypeEnum.sales);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<ICompanyInvoicingPolicyFormData>({
    defaultValues: company?.invoicingPolicy as ICompanyInvoicingPolicyFormData,
  });

  const formValues = form.watch();

  const registerSwitch = useCallback(
    (name: keyof Omit<InvoicingPolicyJsonData, 'method'>) => {
      const value = formValues[current];

      return {
        name: name,
        onChange(v: boolean) {
          form.setValue(`${current}.${name}`, v, { shouldTouch: true });
        },
        value: value && value[name],
      };
    },
    [current, form, formValues]
  );

  const onValid = (fData: ICompanyInvoicingPolicyFormData) => {
    if (company?._id) {
      service.update({
        data: { _id: company?._id, data: { invoicingPolicy: { [current]: fData[current] } } },
        onLoading: setLoading,
        onSuccess: data => {
          console.log(data);
          onClose && onClose();
        },
      });
    }
  };

  return (
    <>
      <ModalFilter filterOptions={tabs} onChangeIndex={index => setCurrent(tabs[index].value)} />

      <FlexForm flex={1} overflow={'hidden'} onSubmit={form.handleSubmit(onValid)}>
        <FlexBox overflow={'auto'} flex={1} fillWidth padding={'0 4px 8px'}>
          <CustomSelect
            onSelect={option => form.setValue(`${current}.method`, option.value)}
            selectedValue={formValues[current]?.method}
            {...{
              options: methods,
              label: t('Default method'),
              placeholder: t('Select default method'),
            }}
          />

          <InputLabel label={t(`Auto creating invoice for ${current.toUpperCase()}`)}>
            <ButtonSwitch {...registerSwitch('autoCreate')} />
          </InputLabel>

          <InputLabel label={t('Client can select method')}>
            <ButtonSwitch {...registerSwitch('selectByClient')} />
          </InputLabel>

          <InputLabel label={t(`Auto publishing invoice for ${current.toUpperCase()}`)}>
            <ButtonSwitch {...registerSwitch('autoPublish')} />
          </InputLabel>
        </FlexBox>

        <ModalFooter onSubmitPassed isLoading={loading}></ModalFooter>
      </FlexForm>
    </>
  );
};

export default InvoicingPolicyTab;
