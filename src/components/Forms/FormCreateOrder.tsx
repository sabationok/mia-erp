import ModalForm, { ModalFormProps } from '../ModalForm';
import FlexBox from '../atoms/FlexBox';
import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import { IOrder } from '../../redux/orders/orders.types';
import { useAppForm } from '../../hooks';
import InputLabel from '../atoms/Inputs/InputLabel';
import TextareaPrimary from '../atoms/Inputs/TextareaPrimary';
import CustomSelect from '../atoms/Inputs/CustomSelect';
import { useDirectoriesSelector } from '../../redux/selectors.store';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import FormAccordeonItem from './components/FormAccordeonItem';
import styled from 'styled-components';
import usePermissionsAsDirItemOptions from '../../hooks/usePermisionsAsWorkersOptions';
import CheckBox from '../TableList/TebleCells/CellComponents/CheckBox';
import { useState } from 'react';

export interface FormCreateOrderProps extends Omit<ModalFormProps, 'onSubmit' | 'onSelect'> {
  onSubmit?: AppSubmitHandler<IOrder>;
}

export interface FormCreateOrderState extends Omit<IOrder, '_id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}

const FormCreateOrder: React.FC<FormCreateOrderProps> = ({ onSubmit, ...props }) => {
  const { directory: paymentsMethods } = useDirectoriesSelector(ApiDirType.METHODS_PAYMENT);
  const { directory: shipmentMethods } = useDirectoriesSelector(ApiDirType.METHODS_SHIPMENT);
  const { directory: communicationMethods } = useDirectoriesSelector(ApiDirType.METHODS_COMMUNICATION);
  const managers = usePermissionsAsDirItemOptions();
  const [isCustomerAsReceiver, setIsCustomerAsReceiver] = useState(true);

  const toggleCustomerAsReceiver = () => {
    setIsCustomerAsReceiver(prev => !prev);
  };
  const {
    formState: { isValid },
    register,
    registerSelect,
    handleSubmit,
  } = useAppForm<FormCreateOrderState>();

  const onValid = (data?: FormCreateOrderState) => {
    console.log('FormCreateOrder');
    console.log(data);
  };

  return (
    <ModalForm fillHeight {...props} isValid={isValid} onSubmit={handleSubmit(onValid)}>
      <Container flex={1} padding={'8px 0'}>
        <FlexBox padding={'0 16px 8px'}>
          <CustomSelect
            {...registerSelect('manager', {
              options: managers,
              label: 'Менеджер',
              placeholder: 'Оберіть відповідального менеджера',
              required: true,
            })}
          />
        </FlexBox>

        <FlexBox>
          <FormAccordeonItem open renderHeader={'Замовник'}>
            <FlexBox padding={'6px 16px'}>
              <InputLabel label={'Замовник'}>
                <TextareaPrimary
                  maxLength={250}
                  required
                  placeholder={'Введіть інформацію про замовника'}
                  {...register('customer')}
                />
              </InputLabel>

              <CustomSelect
                {...registerSelect('customerCommunicationMethod', {
                  options: communicationMethods,
                  label: 'Спосіб звязку',
                  placeholder: "Оберіть спосіб зв'язку",
                  required: true,
                })}
              />

              <FlexBox gap={8} fxDirection={'row'} padding={'6px 0'} alignItems={'center'}>
                <CheckBox
                  checked={isCustomerAsReceiver}
                  onChange={e => {
                    const { checked } = e;
                    setIsCustomerAsReceiver(checked);
                  }}
                />
                {'Це отримувач'}
              </FlexBox>
            </FlexBox>
          </FormAccordeonItem>

          <FormAccordeonItem renderHeader={'Отримувач'} disabled={isCustomerAsReceiver}>
            <FlexBox padding={'6px 16px'}>
              <InputLabel label={'Отримувач'}>
                <TextareaPrimary
                  maxLength={250}
                  required
                  placeholder={'Введіть інформацію про отримувача'}
                  {...register('receiver')}
                />
              </InputLabel>

              <CustomSelect
                {...registerSelect('receiverCommunicationMethod', {
                  options: communicationMethods,
                  label: 'Спосіб звязку',
                  placeholder: "Оберіть спосіб зв'язку",
                  required: true,
                })}
              />
            </FlexBox>
          </FormAccordeonItem>

          <FormAccordeonItem open renderHeader={'Інформація про відвантаження'}>
            <FlexBox padding={'6px 16px'}>
              <CustomSelect
                {...registerSelect('shipmentMethod', {
                  options: shipmentMethods,
                  label: 'Спосіб відвантаження',
                  placeholder: 'Оберіть спосіб відвантаження',
                  required: true,
                })}
              />

              <InputLabel label={'Місце призначення'}>
                <TextareaPrimary
                  maxLength={250}
                  required
                  placeholder={'Введіть інформацію про призначення'}
                  {...register('destination')}
                />
              </InputLabel>
            </FlexBox>
          </FormAccordeonItem>

          <FormAccordeonItem open renderHeader={'Інформація про оплату'}>
            <FlexBox padding={'6px 16px'}>
              <CustomSelect
                {...registerSelect('paymentMethod', {
                  options: paymentsMethods,
                  label: 'Тип оплати',
                  placeholder: 'Оберіть тип оплати',
                  required: true,
                })}
              />
            </FlexBox>
          </FormAccordeonItem>

          <FormAccordeonItem open renderHeader={'Додаткова інформація'}>
            <FlexBox padding={'6px 16px'}>
              <InputLabel label={'Коментар'}>
                <TextareaPrimary
                  maxLength={250}
                  placeholder={'Введіть коментар до замовлення'}
                  {...register('comment')}
                />
              </InputLabel>

              <InputLabel label={'Службовий коментар'}>
                <TextareaPrimary
                  maxLength={250}
                  placeholder={'Цей коментар будть бачити лише працівники компанії'}
                  {...register('innerComment')}
                />
              </InputLabel>
            </FlexBox>
          </FormAccordeonItem>
        </FlexBox>
      </Container>
    </ModalForm>
  );
};

const Container = styled(FlexBox)`
  position: relative;
  overflow: auto;
`;
const GridBox = styled(FlexBox)`
  position: relative;

  min-height: max-content;
`;

export default FormCreateOrder;
