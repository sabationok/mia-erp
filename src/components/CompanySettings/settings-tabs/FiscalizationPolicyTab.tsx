import { CompanySettingsTabBaseProps } from './companySettingsTabs.types';
import {
  FiscalizationPolicyTypeEnum,
  ICompanyFiscalizationPolicyFormData,
  ICompanyInvoicingPolicyFormData,
  InvoicingPolicyTypeEnum,
} from '../../../types/companies.types';
import { useCompaniesSelector } from '../../../redux/selectors.store';
import FlexBox, { FlexForm } from '../../atoms/FlexBox';
import ModalFooter from '../../atoms/Modal/ModalFooter';
import { useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { AppModuleName } from '../../../redux/reduxTypes.types';
import { useState } from 'react';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { useForm } from 'react-hook-form';

export interface FiscalizationPolicyTabProps extends CompanySettingsTabBaseProps {
  onSubmit?: AppSubmitHandler<{
    data: ICompanyInvoicingPolicyFormData[InvoicingPolicyTypeEnum];
    tab: InvoicingPolicyTypeEnum;
  }>;
}

// const tabs = enumToTabs(InvoicingPolicyTypeEnum);

const FiscalizationPolicyTab = ({ onClose, onSubmit }: FiscalizationPolicyTabProps) => {
  const company = useCompaniesSelector().current;
  const service = useAppServiceProvider()[AppModuleName.companies];

  // const methods = useTranslatedMethodsList(useInvoicesSelector().methods, { withFullLabel: true });

  const [current] = useState<FiscalizationPolicyTypeEnum>(FiscalizationPolicyTypeEnum.sales);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<ICompanyFiscalizationPolicyFormData>({
    defaultValues: company?.invoicingPolicy as ICompanyFiscalizationPolicyFormData,
  });

  // const formValues = form.watch();

  // const registerSwitch = useCallback(
  //   (name: keyof Pick<FiscalizationPolicyJsonData, 'autoPublish'>) => {
  //     const value = formValues[current];
  //
  //     return {
  //       name: name,
  //       onChange(v: boolean) {
  //         form.setValue(`${current}.autoPublish`, v, { shouldTouch: true });
  //       },
  //       value: value && value[name],
  //     };
  //   },
  //   [current, form, formValues]
  // );

  const onValid = (fData: ICompanyFiscalizationPolicyFormData) => {
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
      {/*<ModalFilter filterOptions={tabs} onChangeIndex={index => setCurrent(tabs[index].value)} />*/}

      <FlexForm flex={1} overflow={'hidden'} onSubmit={form.handleSubmit(onValid)}>
        <FlexBox overflow={'auto'} flex={1} fillWidth padding={'0 4px 8px'}>
          {/*<CustomSelect*/}
          {/*  onSelect={option => form.setValue(`${current}.method`, option.value)}*/}
          {/*  selectedValue={formValues[current]?.method}*/}
          {/*  {...{*/}
          {/*    options: methods,*/}
          {/*    label: t('Default method'),*/}
          {/*    placeholder: t('Select default method'),*/}
          {/*  }}*/}
          {/*/>*/}

          {/*<InputLabel label={t(`Auto creating invoice for ${current.toUpperCase()}`)}>*/}
          {/*  <ButtonSwitch {...registerSwitch('autoCreate')} />*/}
          {/*</InputLabel>*/}

          {/*<InputLabel label={t('Client can select method')}>*/}
          {/*  <ButtonSwitch {...registerSwitch('selectByClient')} />*/}
          {/*</InputLabel>*/}

          {/*<InputLabel label={t(`Auto publishing invoice for ${current.toUpperCase()}`)}>*/}
          {/*  <ButtonSwitch {...registerSwitch('autoPublish')} />*/}
          {/*</InputLabel>*/}
        </FlexBox>

        <ModalFooter hasOnSubmit isLoading={loading} />
      </FlexForm>
    </>
  );
};

export default FiscalizationPolicyTab;
