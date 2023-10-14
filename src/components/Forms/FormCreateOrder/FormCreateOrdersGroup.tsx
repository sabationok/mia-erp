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
import OrderGroupsStuffingStep from './tabs/OrderGroupsStuffingStep';
import OrderInfoStep from './tabs/OrderInfoStep';

export interface FormCreateOrdersGroupProps extends Omit<ModalFormProps, 'onSubmit' | 'onSelect'> {
  onSubmit?: AppSubmitHandler<FormCreateOrdersGroupFormData>;
}
export interface FormCreateOrdersGroupFormData {}
export enum FormCreateOrdersGroupStepsEnum {
  Stuffing = 'Stuffing',
  Info = 'Info',
  // Shipments = 'Shipments',
  Summary = 'Summary',
  Invoices = 'Invoices',
}

const steps = enumToFilterOptions(FormCreateOrdersGroupStepsEnum);
const stepsState: Record<FormCreateOrdersGroupStepsEnum | string, boolean> = {
  [FormCreateOrdersGroupStepsEnum.Stuffing]: true,
  [FormCreateOrdersGroupStepsEnum.Info]: false,
  [FormCreateOrdersGroupStepsEnum.Summary]: false,
  [FormCreateOrdersGroupStepsEnum.Invoices]: false,
};
const FormCreateOrdersGroup: React.FC<FormCreateOrdersGroupProps> = ({ onSubmit, onClose, ...p }) => {
  const { stepsMap, stepIdx, setStepIdx, stepsCount, getCurrentStep } = useStepsHandler(steps);
  const [isStepFinished, setIsStepFinished] =
    useState<Record<FormCreateOrdersGroupStepsEnum | string, boolean>>(stepsState);

  const setStepFinished = (name: FormCreateOrdersGroupStepsEnum) => () => {
    setIsStepFinished(p => ({ ...p, [name]: true }));
  };

  const renderStep = useMemo(() => {
    if (stepsMap[FormCreateOrdersGroupStepsEnum.Stuffing]) {
      return <OrderGroupsStuffingStep onFinish={setStepFinished(FormCreateOrdersGroupStepsEnum.Stuffing)} />;
    }
    if (stepsMap[FormCreateOrdersGroupStepsEnum.Info]) {
      return <OrderInfoStep onFinish={setStepFinished(FormCreateOrdersGroupStepsEnum.Info)} />;
    }
    if (stepsMap[FormCreateOrdersGroupStepsEnum.Summary]) {
      return <></>;
    }
    if (stepsMap[FormCreateOrdersGroupStepsEnum.Invoices]) {
      return <></>;
    }
  }, [stepsMap]);

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
      <ModalHeader title={t('Select product')} onBackPress={onClose} />

      <Content fillWidth flex={1} overflow={'hidden'}>
        <ModalFilter filterOptions={steps} asStepper currentIndex={stepIdx} optionProps={{ fitContentH: true }} />

        {renderStep}
      </Content>

      <Footer padding={'8px'}>
        <StepsController
          steps={steps}
          onNextPress={(_o, _v, index, _n) => {
            setStepIdx(index);
          }}
          onPrevPress={(_o, _v, index, _n) => {
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
