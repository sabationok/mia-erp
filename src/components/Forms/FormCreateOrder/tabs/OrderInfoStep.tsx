import FlexBox from '../../../atoms/FlexBox';
import styled, { useTheme } from 'styled-components';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import { ICustomer } from '../../../../redux/customers/customers.types';
import { checks } from '../../../../utils';
import { t } from '../../../../lang';
import { Text } from '../../../atoms/Text';
import CheckBox from '../../../TableList/TebleCells/CellComponents/CheckBox';
import { FilterOption } from '../../../ModalForm/ModalFilter';
import FormAccordeonItem from '../../components/FormAccordeonItem';
import InputLabel from '../../../atoms/Inputs/InputLabel';
import TextareaPrimary from '../../../atoms/Inputs/TextareaPrimary';
import { ICreateOrderBaseFormState } from '../../../../redux/orders/orders.types';
import { useModalService } from '../../../ModalProvider/ModalProvider';
import { useDirectoriesSelector } from '../../../../redux/selectors.store';
import { ApiDirType } from '../../../../redux/APP_CONFIGS';
import Changer from '../../../atoms/Changer';
import ButtonIcon from '../../../atoms/ButtonIcon/ButtonIcon';
import SelectCustomerModal from '../components/SelectCustomerModal';
import ButtonGroup from '../../../atoms/ButtonGroup';
import { enumToFilterOptions } from '../../../../utils/fabrics';
import TagButtonsFilter from '../../../atoms/TagButtonsFilter';
import SelectManagerModal from '../components/SelectManagerModal';

export interface OrderInfoStepProps {
  onFinish?: () => void;
}
const buttonGroupOptions = enumToFilterOptions({ 'The same': 'The same', Another: 'Another' });

const orderStatuses: FilterOption[] = [
  { _id: '1', value: '1', label: 'Нове', color: 'lightGreen' },
  { _id: '2', value: '2', label: 'Взято у роботу', color: 'lightGreen' },
  // { _id: '4', value: '4', label: 'Пакування', color: 'lightGrey' },
  // { _id: '5', value: '5', label: 'Відвантажено', color: 'lightBlue' },
  { _id: '6', value: '6', label: 'Скасовано замовником', color: 'lightBlue' },
  { _id: '7', value: '7', label: 'Скасовано менеджером', color: 'lightBlue' },
  { _id: '9', value: '9', label: 'Активне', color: 'orange' },
  { _id: '8', value: '8', label: 'Завершено успішно', color: 'lightGreen' },
  { _id: '10', value: '10', label: 'Архів', color: 'lightGrey' },
];
const OrderInfoStep: React.FC<OrderInfoStepProps> = ({ onFinish }) => {
  const { register, setValue, watch } = useForm<ICreateOrderBaseFormState>();
  const modalS = useModalService();
  const [hasReceiverInfo, setHasReceiverInfo] = useState(0);

  const formValues = watch();

  const { directory: paymentsMethods } = useDirectoriesSelector(ApiDirType.METHODS_PAYMENT);
  const { directory: shipmentMethods } = useDirectoriesSelector(ApiDirType.METHODS_SHIPMENT);
  const { directory: communicationMethods } = useDirectoriesSelector(ApiDirType.METHODS_COMMUNICATION);

  useEffect(() => {
    return () => {
      //* set formvalues to orders state
      console.log('OrderMainInfoStep before unload | formValues', formValues);
    };
  }, [formValues]);

  return (
    <Inputs flex={1} overflow={'auto'}>
      <FlexBox fillWidth gap={8} padding={'8px'}>
        <InputLabel label={t('manager')}>
          <CustomerInfoComponent info={formValues.manager?.user as never} isManager />
        </InputLabel>

        <ButtonIcon
          variant={'outlinedSmall'}
          onClick={() => {
            const m = modalS.open({
              ModalChildren: SelectManagerModal,
              modalChildrenProps: {
                onSelect: i => {
                  setValue('manager', i);
                  m?.onClose && m?.onClose();
                },
              },
            });
          }}
        >
          {t(!formValues?.manager ? 'Select manager' : 'Change manager')}
        </ButtonIcon>

        <InputLabel label={t('Status')}>
          <Changer options={orderStatuses} />
        </InputLabel>
      </FlexBox>

      <FlexBox padding={'0 2px'}>
        <FormAccordeonItem
          contentContainerStyle={{ padding: '8px', gap: 8 }}
          open
          renderHeader={`${t('Customer')} | ${t('Receiver')}`}
        >
          {formValues?.customer && <CustomerInfoComponent info={formValues.customer} />}

          <ButtonIcon
            variant={'outlinedSmall'}
            onClick={() => {
              const m = modalS.open({
                ModalChildren: SelectCustomerModal,
                modalChildrenProps: {
                  onSelect: i => {
                    setValue('customer', i);
                    m?.onClose && m?.onClose();
                  },
                },
              });
            }}
          >
            {t(!formValues?.customer ? 'Select customer' : 'Change customer')}
          </ButtonIcon>

          <InputLabel label={t('Preferred communication methods')}>
            <BorderedBox fillWidth padding={'8px'}>
              <TagButtonsFilter
                multiple
                numColumns={3}
                values={formValues.customerCommunicationMethods}
                resetButtonLabel={t('Not needed')}
                options={communicationMethods.map(mtd => ({ ...mtd, value: mtd._id }))}
                resetButtonPosition={'start'}
                onChange={value => {
                  setValue('customerCommunicationMethods', value);
                }}
              />
            </BorderedBox>
          </InputLabel>

          <ButtonGroup options={buttonGroupOptions} onChangeIndex={setHasReceiverInfo} />

          {hasReceiverInfo > 0 && formValues?.receiver && <CustomerInfoComponent info={formValues.receiver} />}

          {hasReceiverInfo > 0 && (
            <ButtonIcon
              variant={'outlinedSmall'}
              onClick={() => {
                const m = modalS.open({
                  ModalChildren: SelectCustomerModal,
                  modalChildrenProps: {
                    onSelect: i => {
                      setValue('receiver', i);
                      m?.onClose && m?.onClose();
                    },
                  },
                });
              }}
            >
              {t(!formValues?.receiver ? 'Select receiver' : 'Change receiver')}
            </ButtonIcon>
          )}
          {hasReceiverInfo > 0 && formValues?.receiver && (
            <InputLabel label={t('Preferred communication methods')}>
              <BorderedBox fillWidth padding={'8px'}>
                <TagButtonsFilter
                  multiple
                  numColumns={3}
                  onChange={value => {
                    setValue('receiverCommunicationMethods', value);
                  }}
                  values={formValues.receiverCommunicationMethods}
                  resetButtonLabel={t('Not needed')}
                  options={communicationMethods.map(mtd => ({ ...mtd, value: mtd._id }))}
                  resetButtonPosition={'start'}
                />
              </BorderedBox>
            </InputLabel>
          )}
        </FormAccordeonItem>

        <FormAccordeonItem
          contentContainerStyle={{ padding: '0 8px 8px' }}
          open
          renderHeader={`${t('Shipment')} | ${t('Delivery')}`}
        >
          <InputLabel label={t('Shipment method')} required>
            <CheckboxesListSelector
              options={shipmentMethods.map(el => ({ ...el, value: el._id }))}
              onChangeIndex={i => {
                setValue('shipmentMethod', shipmentMethods[i]);
              }}
            />
          </InputLabel>

          <InputLabel label={t('Destination')} required>
            <TextareaPrimary
              maxLength={250}
              required
              placeholder={t('Enter destination address')}
              {...register('destination', { required: true })}
            />
          </InputLabel>
        </FormAccordeonItem>

        <FormAccordeonItem contentContainerStyle={{ padding: '0 8px 8px' }} open renderHeader={'Оплата'}>
          <InputLabel label={t('Payment method')}>
            <CheckboxesListSelector
              options={paymentsMethods.map(el => ({ ...el, value: el._id }))}
              onChangeIndex={i => {
                setValue('paymentMethod', paymentsMethods[i]);
              }}
            />
          </InputLabel>
        </FormAccordeonItem>

        <FormAccordeonItem contentContainerStyle={{ padding: '0 8px 8px' }} open renderHeader={'Додаткова інформація'}>
          <InputLabel label={'Коментар'}>
            <TextareaPrimary maxLength={250} placeholder={'Введіть коментар до замовлення'} {...register('comment')} />
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
    </Inputs>
  );
};
const Inputs = styled(FlexBox)``;

const BorderedBox = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.modalBorderColor};
  border-bottom: 1px solid ${p => p.theme.modalBorderColor};
`;
export default OrderInfoStep;

const CheckboxesListSelector = ({
  options,
  onChangeIndex,
  currentIndex,
}: {
  onChangeIndex?: (index: number) => void;
  options?: Partial<FilterOption>[];
  currentIndex?: number;
}) => {
  const [current, setCurrent] = useState(0);

  const handleSetCurrent = (idx: number) => {
    setCurrent(idx);
    onChangeIndex && onChangeIndex(idx);
  };

  useEffect(() => {
    if (!checks.isUnd(currentIndex)) {
      setCurrent(currentIndex);
    }
  }, [currentIndex]);
  return (
    <FlexBox fillWidth>
      {options?.map((o, idx) => {
        return (
          <FlexBox
            key={`m-opt_${o.value}`}
            fxDirection={'row'}
            gap={8}
            padding={'2px 4px'}
            alignItems={'center'}
            onClick={() => {
              handleSetCurrent(idx);
            }}
          >
            <CheckBox checked={idx === current} size={'22px'} />

            <Text>{o?.label}</Text>
          </FlexBox>
        );
      })}
    </FlexBox>
  );
};
const getCustomerInfoComponentCells = ({
  info,
  isReceiver,
  isManager,
}: {
  info?: ICustomer;
  isReceiver?: boolean;
  isManager?: boolean;
}) => [
  { label: t('label'), getValue: (info?: ICustomer) => info?.label || '---', visible: !isManager },
  { label: t('name'), getValue: (info?: ICustomer) => info?.name || '---', visible: true },
  { label: t('secondName'), getValue: (info?: ICustomer) => info?.secondName || '---', visible: true },
  { label: t('email'), getValue: (info?: ICustomer) => info?.email || '---', visible: true },
  { label: t('taxCode'), getValue: (info?: ICustomer) => info?.taxCode || '---', visible: !isManager },
  { label: t('personalTaxCode'), getValue: (info?: ICustomer) => info?.personalTaxCode || '---', visible: !isManager },
  { label: t('tags'), getValue: (info?: ICustomer) => info?.tags?.join(', ') || '---', visible: !isManager },
];
const CustomerInfoComponent = ({
  info,
  isReceiver,
  isManager,
}: {
  info?: ICustomer;
  isReceiver?: boolean;
  isManager?: boolean;
}) => {
  const theme = useTheme();
  const renderCells = useMemo(() => {
    if (!info) return undefined;

    return getCustomerInfoComponentCells({ info, isReceiver, isManager }).map(({ label, getValue, visible }) => {
      return (
        visible && (
          <FlexBox
            key={label}
            gap={4}
            padding={'4px'}
            flex={'1 1 50%'}
            maxWidth={'50%'}
            border={`1px solid ${theme.modalBorderColor}`}
          >
            <Text $size={12}>{label}</Text>
            <Text $align={'right'}>{getValue(info)}</Text>
          </FlexBox>
        )
      );
    });
  }, [info, isManager, isReceiver, theme.modalBorderColor]);

  return (
    <FlexBox fillWidth flexWrap={'wrap'} fxDirection={'row'} border={`1px solid ${theme.modalBorderColor}`}>
      {renderCells}
    </FlexBox>
  );
};
