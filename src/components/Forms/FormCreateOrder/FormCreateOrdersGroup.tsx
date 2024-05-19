import { ModalFormProps } from '../../ModalForm';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { enumToFilterOptions, toInputValueDate, useStepsHandler } from '../../../utils';
import TabSelector from '../../atoms/TabSelector';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import { ModalHeader } from '../../atoms';
import { t } from '../../../lang';
import StepsController from '../components/StepsController';
import OrderGroupsStuffingStep from './steps/OrderGroupsStuffingStep';
import OrderInfoStep from './steps/OrderInfoStep';
import { ICreateOrderInfoFormState, IOrderTempSlot, OrderEntity } from '../../../types/orders/orders.types';
import { useOrdersSelector } from '../../../redux/selectors.store';
import { ToastService } from '../../../services';
import _ from 'lodash';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { orderInfoBaseSchema } from '../validation';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import * as fns from 'date-fns';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import { createApiCall, OrdersApi } from '../../../api';

export interface FormCreateOrdersGroupProps
  extends Omit<ModalFormProps<any, any, FormCreateOrdersGroupStepsData>, 'onSubmit'> {
  onSubmit?: AppSubmitHandler<FormCreateOrdersGroupStepsData>;
}

export interface FormCreateOrdersGroupStepsData {
  slots?: IOrderTempSlot[];
  info?: ICreateOrderInfoFormState;

  orders?: OrderEntity[];
}

export enum FormCreateOrdersGroupStepsEnum {
  Stuffing = 'Stuffing',
  Info = 'Info',
}

const steps = enumToFilterOptions(FormCreateOrdersGroupStepsEnum);

const stepsProcessInitialState: Record<FormCreateOrdersGroupStepsEnum | string, boolean> = {
  [FormCreateOrdersGroupStepsEnum.Stuffing]: true,
  [FormCreateOrdersGroupStepsEnum.Info]: false,
};
const FormCreateOrdersGroup: React.FC<FormCreateOrdersGroupProps> = ({ onClose }) => {
  const service = useAppServiceProvider()[ServiceName.orders];
  const currentGroupFormState = useOrdersSelector().ordersGroupFormData;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { stepsMap, stepIdx, setNextStep, setPrevStep, getCurrentStep, isLast } = useStepsHandler(steps);
  const [isStepFinished, setIsStepFinished] =
    useState<Record<FormCreateOrdersGroupStepsEnum | string, boolean>>(stepsProcessInitialState);

  const handleValidStatus = (name: keyof typeof FormCreateOrdersGroupStepsEnum) => (value: boolean) => {
    setIsStepFinished(p => ({ ...p, [FormCreateOrdersGroupStepsEnum[name]]: value }));
  };

  const formOrderInfo = useForm<ICreateOrderInfoFormState>({
    defaultValues: {
      ...currentGroupFormState.info,
      invoiceInfo: {
        ...currentGroupFormState.info?.invoiceInfo,
        expireAt: currentGroupFormState.info?.invoiceInfo?.expireAt ?? toInputValueDate(fns.addDays(new Date(), 1)),
      },
    },
    resolver: yupResolver(orderInfoBaseSchema),
    reValidateMode: 'onSubmit',
  });
  const { watch, handleSubmit } = formOrderInfo;
  const orderInfoFormValues = watch();

  const renderStep = useMemo(() => {
    if (stepsMap?.Stuffing) {
      return <OrderGroupsStuffingStep onChangeValidStatus={handleValidStatus('Stuffing')} />;
    }
    if (stepsMap?.Info) {
      return <OrderInfoStep onChangeValidStatus={handleValidStatus('Info')} isGroup />;
    }
  }, [stepsMap?.Info, stepsMap?.Stuffing]);

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

  const onValidSubmit = (data: ICreateOrderInfoFormState) => {
    if (!isLast) {
      ToastService.error('Form data is not valid');
      return;
    }

    createApiCall(
      {
        data: {
          data: {
            info: service.toOrderInfoReqData(orderInfoFormValues, {
              omitPathArr: [],
            }),
            slots: service.toOrderSlotsReqData(currentGroupFormState.slots),
          },
        },
        onSuccess: data => {
          console.log(data);
        },
        onError: error => {
          console.log(error);
        },
        onLoading: setIsSubmitting,
      },
      OrdersApi.createManyOrdersGroupedByWarehouse
    );
  };
  const onErrorSubmit = (errors: FieldErrors<ICreateOrderInfoFormState>) => {
    console.log(onErrorSubmit.name, errors);
  };

  return (
    <FormProvider {...formOrderInfo}>
      <Form onSubmit={handleSubmit(onValidSubmit, onErrorSubmit)}>
        <ModalHeader title={t('Create orders group by warehouse')} onBackPress={onClose} />

        <Content fillWidth flex={1} overflow={'hidden'}>
          <TabSelector filterOptions={steps} asStepper currentIndex={stepIdx} optionProps={{ fitContentH: true }} />

          {renderStep}
        </Content>

        <Footer padding={'8px'}>
          <StepsController
            steps={steps}
            onNextPress={handleNextPress}
            onPrevPress={handlePrevPress}
            currentIndex={stepIdx}
            canGoNext={true}
            canSubmit={isLast}
            submitButton
            isLoading={isSubmitting}
            onCancelPress={stepIdx === 0 ? onClose : undefined}
          />
        </Footer>
      </Form>
    </FormProvider>
  );
};
const Form = styled.form`
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
