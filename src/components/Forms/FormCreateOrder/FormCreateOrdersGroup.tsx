import ModalForm, { ModalFormProps } from '../../ModalForm';
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
import { ICreateOrderInfoFormState, IOrder, IOrderTempSlot } from '../../../redux/orders/orders.types';
import { useOrdersSelector } from '../../../redux/selectors.store';
import { ToastService } from '../../../services';
import _ from 'lodash';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { orderInfoBaseSchema } from '../validation';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { useModalService } from '../../ModalProvider/ModalProvider';

export interface FormCreateOrdersGroupProps
  extends Omit<ModalFormProps<any, any, FormCreateOrdersGroupStepsData>, 'onSubmit'> {
  onSubmit?: AppSubmitHandler<FormCreateOrdersGroupStepsData>;
}
export interface FormCreateOrdersGroupStepsData {
  slots?: IOrderTempSlot[];
  info?: ICreateOrderInfoFormState;

  orders?: IOrder[];
}
export enum FormCreateOrdersGroupStepsEnum {
  Stuffing = 'Stuffing',
  Info = 'Info',
  // Confirmation = 'Confirmation',
  // Invoices = 'Invoices',
}

const steps = enumToFilterOptions(FormCreateOrdersGroupStepsEnum);

const stepsProcessInitialState: Record<FormCreateOrdersGroupStepsEnum | string, boolean> = {
  [FormCreateOrdersGroupStepsEnum.Stuffing]: true,
  [FormCreateOrdersGroupStepsEnum.Info]: false,
  // [FormCreateOrdersGroupStepsEnum.Confirmation]: false,
  // [FormCreateOrdersGroupStepsEnum.Invoices]: false,
};
const FormCreateOrdersGroup: React.FC<FormCreateOrdersGroupProps> = ({ onSubmit, onClose }) => {
  const service = useAppServiceProvider()[ServiceName.orders];
  const currentGroupFormState = useOrdersSelector().ordersGroupFormData;
  const { stepsMap, stepIdx, setNextStep, setPrevStep, getCurrentStep, isLast } = useStepsHandler(steps);
  const [isStepFinished, setIsStepFinished] =
    useState<Record<FormCreateOrdersGroupStepsEnum | string, boolean>>(stepsProcessInitialState);
  const modalS = useModalService();

  const handleValidStatus = (name: keyof typeof FormCreateOrdersGroupStepsEnum) => (value: boolean) => {
    setIsStepFinished(p => ({ ...p, [FormCreateOrdersGroupStepsEnum[name]]: value }));
  };

  const formOrderInfo = useForm<ICreateOrderInfoFormState>({
    defaultValues: currentGroupFormState.info,
    resolver: yupResolver(orderInfoBaseSchema),
    reValidateMode: 'onChange',
  });

  const orderInfoFormValues = formOrderInfo.watch();

  const renderStep = useMemo(() => {
    if (stepsMap?.Stuffing) {
      return <OrderGroupsStuffingStep onChangeValidStatus={handleValidStatus('Stuffing')} />;
    }
    if (stepsMap?.Info) {
      return (
        <OrderInfoStep isGroup getFormMethods={() => formOrderInfo} onChangeValidStatus={handleValidStatus('Info')} />
      );
    }
  }, [formOrderInfo, stepsMap?.Info, stepsMap?.Stuffing]);

  const canGoNext = useMemo(() => {
    return isStepFinished[getCurrentStep().value];
  }, [getCurrentStep, isStepFinished]);

  const handlePrevPress = () => {
    if (getCurrentStep().value === 'Info') {
      service.updateCurrentGroupFormInfoData(_.cloneDeep(orderInfoFormValues));
    }
    setPrevStep();
  };

  const handleNextPress = () => {
    if (getCurrentStep().value === 'Info') {
      service.updateCurrentGroupFormInfoData(_.cloneDeep(orderInfoFormValues));
    }
    if (canGoNext) {
      setNextStep();
    } else {
      ToastService.error(`${t('Step is not finished')}: "${getCurrentStep().value.toUpperCase()}"`);
    }
  };
  const canAccept = useMemo(() => {
    if (stepsMap.Stuffing) {
      return isStepFinished.Stuffing;
    }
    if (stepsMap.Info) {
      return isStepFinished.Info;
    }

    return false;
  }, [isStepFinished.Info, isStepFinished.Stuffing, stepsMap.Info, stepsMap.Stuffing]);

  const handleAcceptPress = () => {
    if (!canAccept) {
      ToastService.error('Form is not valid');
      return;
    }
    if (stepsMap.Info) {
      modalS.open({
        ModalChildren: (p: { onClose?: () => void; compId?: string }) => {
          return (
            <ModalForm
              {...p}
              title={t('Accept orders?')}
              onSubmit={() => {
                window.confirm('You accept?') && p?.onClose && p?.onClose();
              }}
            >
              <FlexBox fillWidth></FlexBox>
            </ModalForm>
          );
        },
      });
    }

    console.log(getCurrentStep());
    console.log(currentGroupFormState);
  };

  return (
    <FormProvider {...formOrderInfo}>
      <Form>
        <ModalHeader title={t('Create orders group by warehouse')} onBackPress={onClose} />

        <Content fillWidth flex={1} overflow={'hidden'}>
          <ModalFilter filterOptions={steps} asStepper currentIndex={stepIdx} optionProps={{ fitContentH: true }} />

          {renderStep}
        </Content>

        <Footer padding={'8px'}>
          <StepsController
            steps={steps}
            onNextPress={handleNextPress}
            onPrevPress={handlePrevPress}
            currentIndex={stepIdx}
            canGoNext={true}
            canAccept={isLast}
            onAcceptPress={handleAcceptPress}
            onCancelPress={stepIdx === 0 ? onClose : undefined}
          />
        </Footer>
      </Form>
    </FormProvider>
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
