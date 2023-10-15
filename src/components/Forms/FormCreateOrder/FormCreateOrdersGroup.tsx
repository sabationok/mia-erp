import { ModalFormProps } from '../../ModalForm';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { enumToFilterOptions } from '../../../utils/fabrics';
import ModalFilter from '../../ModalForm/ModalFilter';
import { useStepsHandler } from '../../../utils/createStepChecker';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import { ModalHeader } from '../../atoms';
import { t } from '../../../lang';
import StepsController from '../components/StepsController';
import OrderGroupsStuffingStep from './steps/OrderGroupsStuffingStep';
import OrderInfoStep from './steps/OrderInfoStep';
import { ICreateOrderBaseFormState } from '../../../redux/orders/orders.types';
import { useForm } from 'react-hook-form';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { useOrdersSelector } from '../../../redux/selectors.store';

export interface FormCreateOrdersGroupProps extends Omit<ModalFormProps, 'onSubmit' | 'onSelect'> {
  onSubmit?: AppSubmitHandler<FormCreateOrdersGroupFormData>;
}
export interface FormCreateOrdersGroupFormData {
  info: ICreateOrderBaseFormState;
}
export enum FormCreateOrdersGroupStepsEnum {
  Stuffing = 'Stuffing',
  Info = 'Info',
  // Shipments = 'Shipments',
  Summary = 'Summary',
  Invoices = 'Invoices',
}

const steps = enumToFilterOptions(FormCreateOrdersGroupStepsEnum);
const stepsProcessInitialState: Record<FormCreateOrdersGroupStepsEnum | string, boolean> = {
  [FormCreateOrdersGroupStepsEnum.Stuffing]: true,
  [FormCreateOrdersGroupStepsEnum.Info]: false,
  [FormCreateOrdersGroupStepsEnum.Summary]: false,
  [FormCreateOrdersGroupStepsEnum.Invoices]: false,
};
const FormCreateOrdersGroup: React.FC<FormCreateOrdersGroupProps> = ({ onSubmit, onClose, ...p }) => {
  const service = useAppServiceProvider()[ServiceName.orders];
  const currentGroupFormState = useOrdersSelector().ordersGroupFormData;
  const { stepsMap, stepIdx, setStepIdx, stepsCount, getCurrentStep } = useStepsHandler(steps);
  const [isStepFinished, setIsStepFinished] =
    useState<Record<FormCreateOrdersGroupStepsEnum | string, boolean>>(stepsProcessInitialState);

  const form = useForm<ICreateOrderBaseFormState>({ defaultValues: currentGroupFormState });
  const handleFinishStep = (name: FormCreateOrdersGroupStepsEnum) => () => {
    setIsStepFinished(p => ({ ...p, [name]: true }));
  };

  const renderStep = useMemo(() => {
    if (stepsMap[FormCreateOrdersGroupStepsEnum.Stuffing]) {
      return <OrderGroupsStuffingStep onFinish={handleFinishStep(FormCreateOrdersGroupStepsEnum.Stuffing)} />;
    }
    if (stepsMap[FormCreateOrdersGroupStepsEnum.Info]) {
      return <OrderInfoStep form={form} onFinish={handleFinishStep(FormCreateOrdersGroupStepsEnum.Info)} />;
    }
    if (stepsMap[FormCreateOrdersGroupStepsEnum.Summary]) {
      return <></>;
    }
    if (stepsMap[FormCreateOrdersGroupStepsEnum.Invoices]) {
      return <></>;
    }
  }, [form, stepsMap]);

  const canSubmit = useMemo(() => {
    if (stepsMap[FormCreateOrdersGroupStepsEnum.Summary]) {
      return true;
    }
    return false;
  }, [stepsMap]);

  const canGoNext = useMemo(() => {
    return isStepFinished[getCurrentStep().value];
  }, [getCurrentStep, isStepFinished]);

  return (
    <Form>
      <ModalHeader title={t('Create orders group')} onBackPress={onClose} />

      <Content fillWidth flex={1} overflow={'hidden'}>
        <ModalFilter filterOptions={steps} asStepper currentIndex={stepIdx} optionProps={{ fitContentH: true }} />

        {renderStep}
      </Content>

      <Footer padding={'8px'}>
        <StepsController
          steps={steps}
          onNextPress={({ index }) => {
            if (getCurrentStep().value === 'Info') {
              service.updateCurrentGroupFormData(form.getValues());
            }
            setStepIdx(index);
          }}
          onPrevPress={({ index }) => {
            if (getCurrentStep().value === 'Info') {
              service.updateCurrentGroupFormData(form.getValues());
            }
            setStepIdx(index);
          }}
          onCancelPress={stepIdx === 0 ? onClose : undefined}
          canGoNext={canGoNext}
          canSubmit={canSubmit}
          currentIndex={stepIdx}
          onAcceptPress={
            stepIdx + 1 === stepsCount
              ? () => {
                  // onSubmit && onSubmit(formData);
                  onClose && onClose();
                }
              : undefined
          }
        />
      </Footer>
    </Form>
  );
};
const Form = styled.form`
  display: flex;
  flex-direction: column;

  width: 98vw;
  height: 98vh;
  padding: 0 8px;

  background-color: ${p => p.theme.modalBackgroundColor};
`;

const Content = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.modalBorderColor};
  border-bottom: 1px solid ${p => p.theme.modalBorderColor};
`;

const Footer = styled(FlexBox)``;
export default FormCreateOrdersGroup;
