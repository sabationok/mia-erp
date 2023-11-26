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
import {
  ICreateOrderInfoDto,
  ICreateOrderInfoFormState,
  ICreateOrdersGroupDto,
  IOrder,
  IOrderTempSlot,
} from '../../../redux/orders/orders.types';
import { useOrdersSelector } from '../../../redux/selectors.store';
import { ToastService } from '../../../services';
import _ from 'lodash';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { orderInfoBaseSchema } from '../validation';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { createApiCall, OrdersApi } from '../../../api';
import { getIdRef, toInputValueDate } from '../../../utils';

import * as fns from 'date-fns';
import { FieldErrors } from 'react-hook-form/dist/types/errors';

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
};
const FormCreateOrdersGroup: React.FC<FormCreateOrdersGroupProps> = ({ onSubmit, onClose }) => {
  const service = useAppServiceProvider()[ServiceName.orders];
  const currentGroupFormState = useOrdersSelector().ordersGroupFormData;
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
        expiredAt: currentGroupFormState.info?.invoiceInfo?.expiredAt ?? toInputValueDate(fns.addDays(new Date(), 1)),
      },
    },
    resolver: yupResolver(orderInfoBaseSchema),
    reValidateMode: 'onChange',
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
      ToastService.error('Form is not valid');
      return;
    }

    console.debug('onValidSubmit data');
    console.log(data);
    console.debug('onValidSubmit orderInfoFormValues');
    console.log(orderInfoFormValues);

    createApiCall(
      {
        data: {
          data: {
            info: transformOrderInfoForReq(orderInfoFormValues),
            slots: transformOrderSlotsForReq(currentGroupFormState.slots),
          },
        },
        onSuccess: data => {
          console.log(data);
        },
        onError: error => {
          console.log(error);
        },
        onLoading: loading => {},
      },
      OrdersApi.createManyOrdersGroupedByWarehouse,
      OrdersApi
    );
  };
  const onErrorSubmit = (errors: FieldErrors<ICreateOrderInfoFormState>) => {
    console.debug(onErrorSubmit.name, errors);
  };

  return (
    <FormProvider {...formOrderInfo}>
      <Form onSubmit={handleSubmit(onValidSubmit, onErrorSubmit)}>
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
            canSubmit={isLast}
            submitButton
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

function transformOrderInfoForReq(input: ICreateOrderInfoFormState): ICreateOrdersGroupDto['info'] {
  const output: ICreateOrdersGroupDto['info'] = {};

  const objectsArr = Object.keys(input).map(key => {
    const value = input[key as keyof typeof input];
    if (value && typeof value === 'object' && value.hasOwnProperty('_id') && '_id' in value) {
      return { [key]: getIdRef(value) };
    }
    return { [key]: value };
  });
  Object.assign(output, ...objectsArr);

  if (input?.invoiceInfo) {
    if (input.invoiceInfo) {
      let invoiceInfo: ICreateOrderInfoDto['invoiceInfo'] = {};

      if (input.invoiceInfo?.method) {
        invoiceInfo = {
          method: getIdRef(input.invoiceInfo.method),
          expiredAt: input.invoiceInfo?.expiredAt,
        };
        output.invoiceInfo = invoiceInfo;
      }
    }
  }
  if (input?.deliveryInfo) {
    const deliveryInfo: ICreateOrderInfoDto['deliveryInfo'] = {};
    if (input.deliveryInfo.method) {
      deliveryInfo.method = getIdRef(input.deliveryInfo.method);
    }

    if (input?.deliveryInfo?.invoiceInfo) {
      if (input?.deliveryInfo?.invoiceInfo?.method) {
        deliveryInfo.invoiceInfo = {
          method: getIdRef(input.deliveryInfo.invoiceInfo.method),
          expiredAt: input.deliveryInfo.invoiceInfo?.expiredAt,
        };
      }
    }

    output.deliveryInfo = deliveryInfo;
  }

  console.debug('Transform Order Info For Req'.toUpperCase());
  console.log({ input });
  console.log({ output });
  return output;
}
export function _transformOrderInfoForReq(input: ICreateOrderInfoFormState): ICreateOrdersGroupDto['info'] {
  console.debug('Transform Order Info For Req'.toUpperCase());
  console.log({ input });

  function transformObject(obj: any) {
    const result: any = {};

    for (const key in obj) {
      if (obj[key] instanceof Object) {
        result[key] = transformObject(obj[key]);
      } else if (key === 'method') {
        result.method = getIdRef(obj.method);
        result.expiredAt = obj.expiredAt;
      } else {
        result[key] = obj[key];
      }
    }

    return result;
  }

  const output: ICreateOrdersGroupDto = {
    info: transformObject(input),
  };

  console.log({ output });
  return output.info;
}

function transformOrderSlotsForReq(slots: IOrderTempSlot[]): ICreateOrdersGroupDto['slots'] {
  const output = slots.map(slot => {
    const sl = _.omit(slot, ['tempId']);

    const objectsArr = Object.keys(sl).map(key => {
      const value = sl[key as keyof typeof sl];
      if (value && typeof value === 'object' && value.hasOwnProperty('_id') && '_id' in value) {
        return { [key]: getIdRef(value) };
      }
      return { [key]: value };
    });
    console.log({ objectsArr });
    Object.assign(sl, ...objectsArr);

    return sl;
  });
  console.debug(transformOrderSlotsForReq.name);
  console.log(output);
  return output;
}
// if (input?.manager) {
//   output.manager = getIdRef(input?.manager);
// }
// if (input?.customer) {
//   output.customer = getIdRef(input?.customer);
// }
// if (input?.receiver) {
//   output.receiver = getIdRef(input?.receiver);
// }
// if (input?.communication) {
//   output.communication = input?.communication;
// }
