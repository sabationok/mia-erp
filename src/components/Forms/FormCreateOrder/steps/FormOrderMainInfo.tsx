import FlexBox from '../../../atoms/FlexBox';
import { useDirectoriesSelector } from '../../../../redux/selectors.store';
import { ApiDirType } from '../../../../redux/APP_CONFIGS';
import { useCounterpartyDirectorySelectorByType } from '../../../../hooks/selectorHooks.hooks';
import { ContractorsTypesEnum } from '../../../../redux/directories/contractors.types';
import { useModalFormCreateCounterparty } from '../../../../hooks/modalHooks';
import { useState } from 'react';
import CustomSelect from '../../../atoms/Inputs/CustomSelect/CustomSelect';
import FormAccordeonItem from '../../components/FormAccordeonItem';
import ButtonIcon from '../../../atoms/ButtonIcon/ButtonIcon';
import InputLabel from '../../../atoms/Inputs/InputLabel';
import TextareaPrimary from '../../../atoms/Inputs/TextareaPrimary';
import styled from 'styled-components';
import Changer from '../../../atoms/Changer';
import usePermissionsAsDirItemOptions from '../../../../hooks/usePermisionsAsWorkersOptions';
import { UseAppFormReturn } from '../../../../hooks/useAppForm.hook';
import { ICreateOrderFormState } from '../../../../redux/orders/orders.types';
import { useAppForm } from '../../../../hooks';
import { FilterOption } from '../../../ModalForm/ModalFilter';
import CheckBox from '../../../TableList/TebleCells/CellComponents/CheckBox';
import { Text } from '../../../atoms/Text';
import { t } from '../../../../lang';

export interface FormCreateOrderMainInfoProps {
  form: UseAppFormReturn<ICreateOrderFormState>;
}
const FormOrderMainInfo: React.FC<FormCreateOrderMainInfoProps> = () => {
  const { register, registerSelect } = useAppForm();

  const { directory: paymentsMethods } = useDirectoriesSelector(ApiDirType.METHODS_PAYMENT);
  const { directory: shipmentMethods } = useDirectoriesSelector(ApiDirType.METHODS_SHIPMENT);
  const { directory: communicationMethods } = useDirectoriesSelector(ApiDirType.METHODS_COMMUNICATION);
  const customers = useCounterpartyDirectorySelectorByType(ContractorsTypesEnum.CUSTOMER);
  const managers = usePermissionsAsDirItemOptions();
  const onCreateCounterparty = useModalFormCreateCounterparty();
  const [isReceiverInfo, setIsReceiverInfo] = useState(false);

  return (
    <Container flex={1} padding={'8px 0'}>
      <FlexBox padding={'0 16px 8px'}>
        <CustomSelect
          dropDownIsAbsolute={false}
          {...registerSelect('manager', {
            options: managers,
            label: 'Менеджер',
            placeholder: 'Оберіть відповідального менеджера',
            required: true,
          })}
        />

        <InputLabel label={'Статус'}>
          <Changer
            options={[
              { _id: '1', value: '1', label: 'Нове', color: 'lightGreen' },
              { _id: '2', value: '2', label: 'Взято у роботу', color: 'lightGreen' },
              // { _id: '4', value: '4', label: 'Пакування', color: 'lightGrey' },
              // { _id: '5', value: '5', label: 'Відвантажено', color: 'lightBlue' },
              { _id: '6', value: '6', label: 'Скасовано замовником', color: 'lightBlue' },
              { _id: '7', value: '7', label: 'Скасовано менеджером', color: 'lightBlue' },
              { _id: '9', value: '9', label: 'Активне', color: 'orange' },
              { _id: '8', value: '8', label: 'Завершено успішно', color: 'lightGreen' },
              { _id: '10', value: '10', label: 'Архів', color: 'lightGrey' },
            ]}
          />
        </InputLabel>
      </FlexBox>

      <FlexBox>
        <FlexBox style={{ position: 'relative' }}>
          <FormAccordeonItem contentContainerStyle={{ padding: '0 8px 8px' }} open renderHeader={'Замовник'}>
            <CustomSelect
              dropDownIsAbsolute={false}
              {...registerSelect('customer', {
                options: customers,
                label: 'Замовник',
                placeholder: 'Оберіть замовника',
                required: true,
                getLabel: o => `${o?.name || ''} ${o?.secondName} ${o?.label || ''}`,
                onCreatePress: () =>
                  onCreateCounterparty({
                    defaultState: { type: ContractorsTypesEnum.CUSTOMER },
                    isFilterByTypeOn: false,
                  }),
              })}
            />

            <CustomSelect
              {...registerSelect('customerCommunicationMethod', {
                options: communicationMethods,
                label: 'Спосіб звязку',
                placeholder: "Оберіть спосіб зв'язку",
                required: true,
              })}
            />

            {!isReceiverInfo && (
              <ButtonIcon
                variant={'outlinedSmall'}
                style={{ marginTop: 8 }}
                onClick={() => {
                  setIsReceiverInfo(true);
                }}
              >
                {'Встановити отримувача'}
              </ButtonIcon>
            )}
          </FormAccordeonItem>

          {isReceiverInfo && (
            <FormAccordeonItem
              contentContainerStyle={{ padding: '0 8px 8px' }}
              renderHeader={'Отримувач'}
              open={isReceiverInfo}
            >
              <CustomSelect
                {...registerSelect('receiver', {
                  options: customers,
                  label: 'Отримувач',
                  placeholder: 'Оберіть отримувача',
                  required: true,
                  getLabel: o => `${o?.name} ${o?.secondName} ${o?.label || ''}`,
                  onCreatePress: () =>
                    onCreateCounterparty({
                      defaultState: { type: ContractorsTypesEnum.CUSTOMER },
                      isFilterByTypeOn: false,
                    }),
                })}
              />

              <CustomSelect
                {...registerSelect('receiverCommunicationMethod', {
                  options: communicationMethods,
                  label: 'Спосіб звязку',
                  placeholder: "Оберіть спосіб зв'язку",
                  required: true,
                })}
              />

              <ButtonIcon
                variant={'outlinedSmall'}
                style={{ marginTop: 8 }}
                onClick={() => {
                  setIsReceiverInfo(false);
                }}
              >
                {'Видалити отримувача'}
              </ButtonIcon>
            </FormAccordeonItem>
          )}

          <FormAccordeonItem contentContainerStyle={{ padding: '0 8px 8px' }} open renderHeader={'Відвантаження'}>
            {/*<CustomSelect*/}
            {/*  {...registerSelect('shipmentMethod', {*/}
            {/*    options: shipmentMethods,*/}
            {/*    label: 'Спосіб відвантаження',*/}
            {/*    placeholder: 'Оберіть спосіб відвантаження',*/}
            {/*    required: true,*/}
            {/*  })}*/}
            {/*/>*/}
            <InputLabel label={t('Shipment method')} required>
              <CheckboxesListSelector options={shipmentMethods.map(el => ({ ...el, value: el._id }))} />
            </InputLabel>

            <InputLabel label={'Місце призначення'} required>
              <TextareaPrimary
                maxLength={250}
                required
                placeholder={'Введіть інформацію про призначення'}
                {...register('destination', { required: true })}
              />
            </InputLabel>
          </FormAccordeonItem>

          <FormAccordeonItem contentContainerStyle={{ padding: '0 8px 8px' }} open renderHeader={'Оплата'}>
            {/*<CustomSelect*/}
            {/*  {...registerSelect('paymentMethod', {*/}
            {/*    options: paymentsMethods,*/}
            {/*    label: 'Спосіб оплати',*/}
            {/*    placeholder: 'Оберіть спосіб оплати',*/}
            {/*    required: true,*/}
            {/*  })}*/}
            {/*/>*/}
            <InputLabel label={t('Payment method')}>
              <CheckboxesListSelector options={paymentsMethods.map(el => ({ ...el, value: el._id }))} />
            </InputLabel>
          </FormAccordeonItem>

          <FormAccordeonItem
            contentContainerStyle={{ padding: '0 8px 8px' }}
            open
            renderHeader={'Додаткова інформація'}
          >
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
          </FormAccordeonItem>
        </FlexBox>
      </FlexBox>
    </Container>
  );
};
const Container = styled(FlexBox)`
  position: relative;
  overflow: auto;
`;

const CheckboxesListSelector = ({
  options,
  onSelect,
}: {
  onSelect?: (index: number) => void;
  options?: Partial<FilterOption>[];
}) => {
  const [current, setCurrent] = useState(0);

  const handleSetCurrent = (idx: number) => {
    setCurrent(idx);
    onSelect && onSelect(idx);
  };
  return (
    <FlexBox fillWidth>
      {options?.map((o, idx) => {
        return (
          <FlexBox
            key={`m-opt_${o.value}`}
            fxDirection={'row'}
            gap={8}
            alignItems={'center'}
            onClick={() => {
              handleSetCurrent(idx);
            }}
          >
            <CheckBox checked={idx === current} />

            <Text>{o?.label}</Text>
          </FlexBox>
        );
      })}
    </FlexBox>
  );
};
export default FormOrderMainInfo;
