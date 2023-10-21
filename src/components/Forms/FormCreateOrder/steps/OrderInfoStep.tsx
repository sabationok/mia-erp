import FlexBox from 'components/atoms/FlexBox';
import styled, { useTheme } from 'styled-components';
import { useMemo, useState } from 'react';
import { ICustomer } from 'redux/customers/customers.types';
import { t } from 'lang';
import { Text } from 'components/atoms/Text';
import FormAccordionItem from '../../components/FormAccordionItem';
import InputLabel from 'components/atoms/Inputs/InputLabel';
import TextareaPrimary from 'components/atoms/Inputs/TextareaPrimary';
import { ICreateOrderBaseFormState } from 'redux/orders/orders.types';
import { useModalService } from '../../../ModalProvider/ModalProvider';
import { useDirectoriesSelector } from 'redux/selectors.store';
import { ApiDirType } from 'redux/APP_CONFIGS';
import Changer from 'components/atoms/Changer';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import SelectCustomerModal from '../components/SelectCustomerModal';
import TagButtonsFilter from 'components/atoms/TagButtonsFilter';
import SelectManagerModal from '../components/SelectManagerModal';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { FormOrderStepBaseProps } from '../FormOrder.types';
import { orderStatuses } from 'data/orders.data';
import CheckboxesListSelector from 'components/atoms/CheckboxesListSelector';
import useTranslatedPaymentMethods from 'hooks/useTranslatedPaymentMethods.hook';
import FormCreateCustomer from '../../FormCreateCustomer';
import { ServiceName, useAppServiceProvider } from 'hooks/useAppServices.hook';
import useTranslatedShipmentMethods from 'hooks/useTranslatedShipmentMethods.hook';
import { createDataForReq } from '../../../../utils/dataTransform';
import ButtonSwitch from '../../../atoms/ButtonSwitch';

export interface OrderInfoStepProps extends FormOrderStepBaseProps {
  form: UseFormReturn<ICreateOrderBaseFormState>;
  isGroup?: boolean;
}

type ConfirmsStateKay = 'hasShipmentPayment' | 'holdShipmentPayment' | 'holdOrderPayment' | 'hasReceiverInfo';

const OrderInfoStep: React.FC<OrderInfoStepProps> = ({ isGroup, form, onFinish }) => {
  const { register, setValue, watch, unregister } = form;
  const modalS = useModalService();
  const [confirms, setConfirms] = useState<Record<ConfirmsStateKay | string, boolean>>({});

  const registerConfirmSelectHandler = (name: ConfirmsStateKay) => {
    return (res: boolean) => {
      setConfirms(p => ({ ...p, [name]: res }));
    };
  };

  // TODO refactoring
  const { directory: communicationMethods } = useDirectoriesSelector(ApiDirType.METHODS_COMMUNICATION);

  const paymentsMethods = useTranslatedPaymentMethods();
  const shipmentMethods = useTranslatedShipmentMethods();

  const formValues = watch();

  return (
    <Inputs flex={1} overflow={'auto'}>
      <FlexBox fillWidth gap={8} padding={'8px 2px'} style={{ maxWidth: 480, width: '100%', margin: '0 auto' }}>
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
          {/* TODO need refactoring and FIXES*/}
          <Changer
            options={orderStatuses}
            currentOption={{ value: formValues?.status }}
            onChange={({ value }) => {
              setValue('status', value);
            }}
          />
        </InputLabel>
      </FlexBox>

      <FlexBox padding={'0 2px'}>
        <StAccordionItem
          contentContainerStyle={{ padding: '8px 0', gap: 8 }}
          open
          renderHeader={
            <Text $ellipsisMode={true} $size={16} $weight={500}>{`${t('Customer')} | ${t('Receiver')}`}</Text>
          }
        >
          {formValues?.customer && (
            <>
              <InputLabel label={t('Customer information')}>
                <CustomerInfoComponent info={formValues.customer} />
              </InputLabel>

              <BorderedBox fillWidth padding={'0 0 8px'} overflow={'hidden'}>
                <InputLabel label={t('Communication methods')}>
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
                </InputLabel>
              </BorderedBox>
            </>
          )}

          <FlexBox fxDirection={'row'} gap={8} fillWidth alignItems={'center'}>
            <CreateCustomerIconButton
              onSuccess={d => {
                setValue('customer', d);
              }}
            />

            <ButtonIcon
              variant={'outlinedSmall'}
              flex={1}
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
          </FlexBox>

          <BorderedBox fillWidth padding={'8px'} gap={4}>
            <Text $size={12} $weight={500}>
              {'Хто отримувач?'}
            </Text>

            <ButtonSwitch
              onChange={registerConfirmSelectHandler('hasReceiverInfo')}
              value={confirms?.hasReceiverInfo}
              rejectLabel={'The same'}
              acceptLabel={'Another'}
            />
          </BorderedBox>

          {confirms?.hasReceiverInfo && formValues?.receiver && (
            <>
              <InputLabel label={t('Receiver information')}>
                <CustomerInfoComponent info={formValues.receiver} />{' '}
              </InputLabel>

              <BorderedBox fillWidth padding={'0 0 8px'}>
                <InputLabel label={t('Communication methods')}>
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
                </InputLabel>
              </BorderedBox>
            </>
          )}

          {confirms?.hasReceiverInfo && (
            <FlexBox fxDirection={'row'} gap={8} fillWidth alignItems={'center'}>
              <CreateCustomerIconButton
                isReceiver
                onSuccess={d => {
                  setValue('receiver', d);
                }}
              />

              <ButtonIcon
                variant={'outlinedSmall'}
                flex={1}
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
            </FlexBox>
          )}
        </StAccordionItem>

        <StAccordionItem
          contentContainerStyle={{ padding: '8px 2px' }}
          open
          renderHeader={
            <Text $ellipsisMode={true} $size={16} $weight={500}>
              {t('Order invoices')}
            </Text>
          }
        >
          <InputLabel label={t('Payment method')} required>
            <CheckboxesListSelector
              options={paymentsMethods}
              currentOption={formValues?.invoice?.method}
              onChangeIndex={i => {
                setValue('invoice.method', paymentsMethods[i]);
              }}
            />
          </InputLabel>
        </StAccordionItem>

        <StAccordionItem
          contentContainerStyle={{ padding: '0 2px' }}
          open
          renderHeader={
            <Text $ellipsisMode={true} $size={16} $weight={500}>
              {`${t('Shipment')} | ${t('Delivery')}`}
            </Text>
          }
        >
          <BorderedBox fillWidth gap={8} padding={'0 0 8px'}>
            <InputLabel label={t('Shipment method')} required>
              <CheckboxesListSelector
                options={shipmentMethods}
                currentOption={formValues?.shipment?.method}
                onChangeIndex={i => {
                  setValue('shipment.method', shipmentMethods[i]);
                }}
              />
            </InputLabel>
          </BorderedBox>

          <BorderedBox fillWidth gap={8} padding={'0 0 8px'}>
            <InputLabel label={t('Destination')} required>
              <TextareaPrimary
                maxLength={250}
                required
                placeholder={t('Enter destination address')}
                {...register('destination', { required: true })}
              />
            </InputLabel>
          </BorderedBox>

          <BorderedBox fillWidth gap={8} padding={'0 0 8px'}>
            <InputLabel label={t('Has payment')} required>
              <ButtonSwitch
                onChange={registerConfirmSelectHandler('hasShipmentPayment')}
                value={confirms?.hasShipmentPayment}
              />
            </InputLabel>

            {confirms?.hasShipmentPayment && (
              <InputLabel label={t('Payment method')} required>
                <CheckboxesListSelector
                  options={paymentsMethods}
                  currentOption={formValues?.shipment?.paymentMethod}
                  onChangeIndex={i => {
                    setValue('shipment.paymentMethod', paymentsMethods[i]);
                  }}
                />
              </InputLabel>
            )}
          </BorderedBox>
        </StAccordionItem>

        {/*{!isGroup && (*/}
        {/*  <StAccordionItem*/}
        {/*    contentContainerStyle={{ padding: '8px 2px' }}*/}
        {/*    open*/}
        {/*    renderHeader={*/}
        {/*      <Text $ellipsisMode={true} $size={16} $weight={500}>*/}
        {/*        {t('Additionally')}*/}
        {/*      </Text>*/}
        {/*    }*/}
        {/*  >*/}
        {/*    <InputLabel label={t('Comment')}>*/}
        {/*      <TextareaPrimary maxLength={250} placeholder={t('Enter comment for customer')} {...register('comment')} />*/}
        {/*    </InputLabel>*/}

        {/*    <InputLabel label={t('Service comment')}>*/}
        {/*      <TextareaPrimary maxLength={250} placeholder={t('Enter service comment')} {...register('innerComment')} />*/}
        {/*    </InputLabel>*/}
        {/*  </StAccordionItem>*/}
        {/*)}*/}
      </FlexBox>
    </Inputs>
  );
};
const Inputs = styled(FlexBox)``;

const BorderedBox = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.modalBorderColor};
  border-bottom: 1px solid ${p => p.theme.modalBorderColor};
`;
const StAccordionItem = styled(FormAccordionItem)`
  & .content {
    max-width: 480px;
    width: 100%;
    margin: auto;
  }
`;
export default OrderInfoStep;

function getCustomerInfoComponentCells({ isManager }: { info?: ICustomer; isReceiver?: boolean; isManager?: boolean }) {
  return [
    { label: t('label'), getValue: (info?: ICustomer) => info?.label || '---', visible: !isManager },
    { label: t('name'), getValue: (info?: ICustomer) => info?.name || '---', visible: true },
    { label: t('secondName'), getValue: (info?: ICustomer) => info?.secondName || '---', visible: true },
    { label: t('email'), getValue: (info?: ICustomer) => info?.email || '---', visible: true },
    { label: t('taxCode'), getValue: (info?: ICustomer) => info?.taxCode || '---', visible: !isManager },
    {
      label: t('personalTaxCode'),
      getValue: (info?: ICustomer) => info?.personalTaxCode || '---',
      visible: !isManager,
    },
    { label: t('tags'), getValue: (info?: ICustomer) => info?.tags?.join(', ') || '---', visible: !isManager },
  ];
}

const CreateCustomerIconButton = ({
  onSuccess,
  isReceiver,
}: {
  onSuccess?: (customer: ICustomer) => void;
  isReceiver?: boolean;
}) => {
  const customerS = useAppServiceProvider()[ServiceName.customers];
  const modalS = useModalService();

  return (
    <ButtonIcon
      variant={'onlyIcon'}
      icon={'plus'}
      iconSize={'100%'}
      size={'30px'}
      onClick={() => {
        modalS.open({
          ModalChildren: FormCreateCustomer,
          modalChildrenProps: {
            title: isReceiver ? t('Create receiver') : undefined,
            onSubmit: d => {
              customerS.create({
                data: createDataForReq(d),
                onSuccess: onSuccess,
              });
            },
          },
        });
      }}
    ></ButtonIcon>
  );
};

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
