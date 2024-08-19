export const PolicyTab = () => {
  return null;
};
// import { useCompaniesSelector } from 'redux/selectors.store';
// import { CompanySettingsTabBaseProps } from './companySettingsTabs.types';
// import { useTranslatedMethodsList } from '../../../hooks/useTranslatedMethodsList.hook';
// import { useCallback, useState } from 'react';
// import { Path, useForm } from 'react-hook-form';
// import { _enumToTabs } from '../../../utils';
// import TabSelector from 'components/atoms/TabSelector';
// import FlexBox, { FlexForm } from 'components/atoms/FlexBox';
// import CustomSelect from 'components/atoms/Inputs/CustomSelect';
// import InputLabel from 'components/atoms/Inputs/InputLabel';
// import ButtonSwitch from '../../atoms/ButtonSwitch';
// import ModalFooter from '../../atoms/Modal/ModalFooter';
// import { t } from 'lang';
//
// export interface PolicyTabProps<T extends string, F extends Record<string, any>> extends CompanySettingsTabBaseProps {}
//
// function DefaultPolicyTab<T extends string, F extends Record<string, any>>(props: PolicyTabProps<T, F>) {
//   const { onClose, onSubmit, policyEnum, policyFormKey, policyBooleanFields, methodsSelector, formDefaultValues } =
//     props;
//
//   const company = useCompaniesSelector().current;
//   const methods = useTranslatedMethodsList(methodsSelector(), { withFullLabel: true });
//
//   const [current, setCurrent] = useState<T>(policyEnum.sales);
//   const [loading, setLoading] = useState<boolean>(false);
//
//   const form = useForm<F>({
//     defaultValues: formDefaultValues || company?.[policyFormKey],
//   });
//
//   const formValues = form.watch();
//
//   const registerSwitch = useCallback(
//     (name: keyof F[T]) => {
//       const value = formValues[current];
//       return {
//         name: name as Exclude<keyof F[T], symbol>,
//         onChange(v: boolean) {
//           form.setValue(`${current}.${String(name)}` as Path<F>, v as never, { shouldDirty: true });
//         },
//         value: value && (value[name] as boolean),
//       };
//     },
//     [current, form, formValues]
//   );
//
//   const onValid = (fData: F) => {
//     if (onSubmit) {
//       return onSubmit({ name: policyFormKey, data: fData });
//     }
//   };
//
//   const tabs = _enumToTabs(policyEnum);
//
//   return (
//     <>
//       <TabSelector
//         options={tabs}
//         onChangeIndex={index => {
//           const v = tabs[index].value;
//           if (v) setCurrent(v);
//         }}
//       />
//
//       <FlexForm flex={1} overflow={'hidden'}id={policyFormKey} onSubmit={form.handleSubmit(onValid)}>
//         <FlexBox overflow={'auto'} flex={1} fillWidth padding={'0 4px 8px'}>
//           <CustomSelect
//             onSelect={option => {
//               option._id && form.setValue(`${current}.methodId` as Path<F>, option._id as never);
//             }}
//             selectedValue={formValues[current]?.methodId}
//             {...{
//               options: methods,
//               label: t('Default method'),
//               placeholder: t('Select default method'),
//             }}
//           />
//
//           {policyBooleanFields.map(field => (
//             <InputLabel key={field as string} label={t(`${String(field)} for ${current.toUpperCase()}`)}>
//               <ButtonSwitch {...registerSwitch(field as string)} />
//             </InputLabel>
//           ))}
//         </FlexBox>
//
//       </FlexForm>
//     </>
//   );
// }
//
// export default DefaultPolicyTab;
