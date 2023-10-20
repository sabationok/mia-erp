import { ModalFormProps } from '../../ModalForm';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { enumToFilterOptions } from '../../../utils/fabrics';
import ModalFilter from '../../ModalForm/ModalFilter';
import { useStepsHandler } from '../../../utils/createStepChecker';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import { ModalHeader } from '../../atoms';
import { t } from '../../../lang';
import StepsController from '../components/StepsController';
import OrderGroupsStuffingStep from './steps/OrderGroupsStuffingStep';
import OrderInfoStep from './steps/OrderInfoStep';
import { ICreateOrderBaseFormState, IOrderTempSlot } from '../../../redux/orders/orders.types';
import { useForm } from 'react-hook-form';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { useOrdersSelector } from '../../../redux/selectors.store';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validation = yup.object().shape({
  manager: yup
    .object()
    .shape({
      _id: yup.string(),
    })
    .required(),
  customer: yup
    .object()
    .shape({
      _id: yup.string(),
    })
    .required(),
  customerCommunicationMethods: yup
    .object()
    .shape({
      _id: yup.string(),
    })
    .required(),
  receiver: yup
    .object()
    .shape({
      _id: yup.string(),
    })
    .required(),
  receiverCommunicationMethods: yup
    .object()
    .shape({
      _id: yup.string(),
    })
    .required(),
  status: yup.string(),
  destination: yup.string(),
  shipmentMethod: yup
    .object()
    .shape({
      _id: yup.string(),
    })
    .required(),
  paymentMethod: yup
    .object()
    .shape({
      _id: yup.string(),
    })
    .required(),
});

export interface FormCreateOrdersGroupProps
  extends Omit<ModalFormProps<any, any, ICreateOrderBaseFormState>, 'onSubmit' | 'onSelect'> {
  onSubmit?: AppSubmitHandler<FormCreateOrdersGroupFormData>;
}
export interface FormCreateOrdersGroupFormData {
  info: ICreateOrderBaseFormState;
  slots: IOrderTempSlot[];
}
export enum FormCreateOrdersGroupStepsEnum {
  Stuffing = 'Stuffing',
  Info = 'Info',
  Orders = 'Orders',
  Invoices = 'Invoices',
}

const steps = enumToFilterOptions(FormCreateOrdersGroupStepsEnum);

const stepsProcessInitialState: Record<FormCreateOrdersGroupStepsEnum | string, boolean> = {
  [FormCreateOrdersGroupStepsEnum.Stuffing]: true,
  [FormCreateOrdersGroupStepsEnum.Info]: true,
  [FormCreateOrdersGroupStepsEnum.Orders]: true,
  [FormCreateOrdersGroupStepsEnum.Invoices]: false,
};
const FormCreateOrdersGroup: React.FC<FormCreateOrdersGroupProps> = ({ onSubmit, onClose, ...p }) => {
  const service = useAppServiceProvider()[ServiceName.orders];
  const currentGroupFormState = useOrdersSelector().ordersGroupFormData;
  const { stepsMap, stepIdx, setNextStep, setPrevStep, stepsCount, getCurrentStep } = useStepsHandler(steps);

  const [isStepFinished, setIsStepFinished] =
    useState<Record<FormCreateOrdersGroupStepsEnum | string, boolean>>(stepsProcessInitialState);

  const form = useForm<ICreateOrderBaseFormState>({
    defaultValues: currentGroupFormState,
    resolver: yupResolver(validation),
    reValidateMode: 'onChange',
  });
  const handleFinishStep = (name: FormCreateOrdersGroupStepsEnum) => () => {
    setIsStepFinished(p => ({ ...p, [name]: true }));
  };

  const renderStep = useMemo(() => {
    if (stepsMap[FormCreateOrdersGroupStepsEnum.Stuffing]) {
      return <OrderGroupsStuffingStep onFinish={handleFinishStep(FormCreateOrdersGroupStepsEnum.Stuffing)} />;
    }
    if (stepsMap[FormCreateOrdersGroupStepsEnum.Info]) {
      return <OrderInfoStep isGroup form={form} onFinish={handleFinishStep(FormCreateOrdersGroupStepsEnum.Info)} />;
    }
    if (stepsMap[FormCreateOrdersGroupStepsEnum.Orders]) {
      return <></>;
    }
    if (stepsMap[FormCreateOrdersGroupStepsEnum.Invoices]) {
      return <></>;
    }
  }, [form, stepsMap]);

  useEffect(() => {
    console.log('errors', form.formState.errors);
  }, [form.formState.errors]);

  const canSubmit = useMemo(() => {
    if (stepsMap[FormCreateOrdersGroupStepsEnum.Orders]) {
      return true;
    }
    if (stepsMap[FormCreateOrdersGroupStepsEnum.Info]) {
      return form?.formState?.isValid;
    }
    return false;
  }, [form?.formState?.isValid, stepsMap]);

  const canGoNext = useMemo(() => {
    return isStepFinished[getCurrentStep().value];
  }, [getCurrentStep, isStepFinished]);

  const handlePrevPress = useCallback(() => {
    if (getCurrentStep().value === 'Info') {
      service.updateCurrentGroupFormData(form.getValues());
    }
    setPrevStep();
  }, [form, getCurrentStep, service, setPrevStep]);
  const handleNextPress = useCallback(() => {
    if (getCurrentStep().value === 'Info') {
      console.log(getCurrentStep());

      service.updateCurrentGroupFormData(form.getValues());
      return;
    }
    setNextStep();
  }, [form, getCurrentStep, service, setNextStep]);

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
          onNextPress={handleNextPress}
          onPrevPress={handlePrevPress}
          onCancelPress={stepIdx === 0 ? onClose : undefined}
          canGoNext={canGoNext}
          canAccept={canSubmit}
          currentIndex={stepIdx}
          onAcceptPress={() => {
            console.log(form.getValues());
          }}
        />
      </Footer>
    </Form>
  );
};
const Form = styled.div`
  color: ${p => p.theme.fontColorSidebar};

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
