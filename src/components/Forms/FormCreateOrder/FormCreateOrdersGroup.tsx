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
import { IOrderSlot } from '../../../redux/orders/orders.types';
import OrderGroupsStuffingStep from './tabs/OrderGroupsStuffingStep';

export interface FormCreateOrdersGroupProps extends Omit<ModalFormProps, 'onSubmit' | 'onSelect'> {
  onSubmit?: AppSubmitHandler<FormCreateOrdersGroupFormData>;
}
export interface FormCreateOrdersGroupFormData {}
export enum FormCreateOrdersGroupStepsEnum {
  Stuffing = 'Stuffing',
  Orders = 'Orders',
  Info = 'Info',
  Shipments = 'Shipments',
  Summary = 'Summary',
  Invoices = 'Invoices',
}

const steps = enumToFilterOptions(FormCreateOrdersGroupStepsEnum);

const FormCreateOrdersGroup: React.FC<FormCreateOrdersGroupProps> = ({ onSubmit, onClose, ...p }) => {
  const { stepsMap, stepIdx, setStepIdx, stepsCount } = useStepsHandler(steps);

  const [groupData, setGroupData] = useState<Record<string, IOrderSlot>>({});

  const renderStep = useMemo(() => {
    if (stepsMap[FormCreateOrdersGroupStepsEnum.Stuffing]) {
      return <OrderGroupsStuffingStep />;
    }
    if (stepsMap[FormCreateOrdersGroupStepsEnum.Orders]) {
      return <></>;
    }
    if (stepsMap[FormCreateOrdersGroupStepsEnum.Info]) {
      return <></>;
    }
    if (stepsMap[FormCreateOrdersGroupStepsEnum.Summary]) {
      return <></>;
    }
    if (stepsMap[FormCreateOrdersGroupStepsEnum.Shipments]) {
      return <></>;
    }
    if (stepsMap[FormCreateOrdersGroupStepsEnum.Invoices]) {
      return <></>;
    }
  }, [stepsMap]);
  return (
    <Form>
      <ModalHeader title={t('Select product')} onBackPress={onClose} />

      <Content fillWidth flex={1} overflow={'hidden'}>
        <ModalFilter filterOptions={steps} asStepper currentIndex={stepIdx} />

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
          canGoNext={!!'canGoNext'}
          canAccept={!!'canAccept'}
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
