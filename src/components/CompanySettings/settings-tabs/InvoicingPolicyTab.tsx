import { CompanySettingsTabBaseProps } from './companySettingsTabs.types';
import { useTranslatedMethodsList } from '../../../hooks/useTranslatedMethodsList.hook';
import { useInvoicesSelector } from '../../../redux/selectors.store';
import FlexBox, { FlexForm } from '../../atoms/FlexBox';
import InputLabel from '../../atoms/Inputs/InputLabel';
import { t } from '../../../i18e';
import ButtonSwitch from '../../atoms/ButtonSwitch';
import CustomSelect from '../../atoms/Inputs/CustomSelect';
import { _enumToTabs } from '../../../utils';
import { useCallback, useState } from 'react';
import TabSelector from '../../atoms/TabSelector';
import { useForm } from 'react-hook-form';
import { InvoicingPolicy } from 'types/companies/policies';

export interface InvoicingPolicyTabProps extends CompanySettingsTabBaseProps<'invoicing'> {}

const tabs = _enumToTabs(InvoicingPolicy.TypeEnum);

const InvoicingPolicyTab = ({ policyFormKey, isSubmitting, onSubmit, company }: InvoicingPolicyTabProps) => {
  const methods = useTranslatedMethodsList(useInvoicesSelector().methods, { withFullLabel: true });

  const [current, setCurrent] = useState<InvoicingPolicy.TypeEnum>(InvoicingPolicy.TypeEnum.sales);

  const form = useForm<InvoicingPolicy.FormData>({
    defaultValues: company?.invoicingPolicy ?? {},
  });

  const formValues = form.watch();

  const registerSwitch = useCallback(
    (name: keyof Omit<InvoicingPolicy.JsonData, 'methodId'>) => {
      const value = formValues[current];

      return {
        name: name,
        onChange(v: boolean) {
          form.setValue(`${current}.${name}`, v as never, { shouldDirty: true });
        },
        value: value && value[name],
      };
    },
    [current, form, formValues]
  );

  const onValid = (fData: InvoicingPolicy.FormData) => {
    if (onSubmit) {
      return onSubmit({ name: policyFormKey, data: fData });
    }
  };

  return (
    <>
      <TabSelector
        options={tabs}
        onChangeIndex={index => {
          const v = tabs[index].value;
          if (v) setCurrent(v);
        }}
      />

      <FlexForm flex={1} overflow={'hidden'} id={policyFormKey} onSubmit={form.handleSubmit(onValid)}>
        <FlexBox overflow={'auto'} flex={1} fillWidth padding={'0 4px 8px'}>
          <CustomSelect
            onSelect={option => {
              option._id && form.setValue(`${current}.methodId`, option._id);
            }}
            selectedValue={formValues[current]?.methodId}
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
      </FlexForm>
    </>
  );
};

export default InvoicingPolicyTab;
