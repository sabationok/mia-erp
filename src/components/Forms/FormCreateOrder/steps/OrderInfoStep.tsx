import FlexBox from 'components/atoms/FlexBox';
import styled from 'styled-components';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { t } from 'lang';
import { Text } from 'components/atoms/Text';
import FormAccordionItem from '../../components/FormAccordionItem';
import InputLabel from 'components/atoms/Inputs/InputLabel';
import { ICreateOrderInfoFormState } from 'types/orders/orders.types';
import { useModalService } from '../../../../Providers/ModalProvider/ModalProvider';
import ButtonIcon from 'components/atoms/ButtonIcon';
import SelectCustomerModal from '../components/SelectCustomerModal';
import TagButtonsFilter from 'components/atoms/TagButtonsFilter';
import SelectManagerModal from '../components/SelectManagerModal';
import { FormOrderStepBaseProps } from '../formOrder.types';
import CheckboxesListSelector from 'components/atoms/CheckboxesListSelector';
import { useTranslatedMethodsList } from 'hooks/useTranslatedMethodsList.hook';
import ButtonSwitch from '../../../atoms/ButtonSwitch';
import InputText from '../../../atoms/Inputs/InputText';
import { useFormContext, UseFormSetValue } from 'react-hook-form';
import CreateCustomerButtonIcon from '../components/CreateCustomerButtonIcon';
import CustomerInfoComponent from '../components/CustomerInfoComponent';
import { destinationAddressInputsProps } from '../components/DestinationInputs';
import { throttleCallback } from '../../../../utils/lodash.utils';
import {
  useCommunicationSelector,
  useDeliveriesSelector,
  useInvoicesSelector,
} from '../../../../redux/selectors.store';
import * as fns from 'date-fns';
import { toInputValueDate } from '../../../../utils';
import { PaymentInternalTypeEnum } from '../../../../types/integrations.types';

export interface OrderInfoStepProps extends FormOrderStepBaseProps {
  isGroup?: boolean;
}

const useOrderInfoForm = () => useFormContext<ICreateOrderInfoFormState>();

type ConfirmsStateKay =
  | 'hasDelivery'
  | 'hasDeliveryInvoice'
  | 'hasReceiverInfo'
  | 'hasExecuteDate'
  | 'holdDeliveryPayment'
  | 'holdOrderPayment'
  | 'hasImposedPayment';

// type FormFieldPaths = Path<ICreateOrderInfoFormState>;

const OrderInfoStep: React.FC<OrderInfoStepProps> = ({ onChangeValidStatus }) => {
  const modalS = useModalService();
  const {
    formState: { isValid, errors },
    register,
    setValue,
    unregister,
    watch,
    trigger,
  } = useOrderInfoForm();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [intMethodType, _setIntMethodType] = useState<PaymentInternalTypeEnum>(PaymentInternalTypeEnum.externalService);

  const formValues = watch();

  const deliveryMethodsList = useTranslatedMethodsList(useDeliveriesSelector().methods, { withFullLabel: true });
  const communicationMethodsList = useTranslatedMethodsList(useCommunicationSelector().methods, {
    withFullLabel: true,
  });
  const invoicingMethods = useTranslatedMethodsList(useInvoicesSelector().methods, { withFullLabel: true });

  // const filteredInvMethods = useMemo(() => {
  //   return invoicingMethods.filter(m => m.type?.internal === intMethodType);
  // }, [intMethodType, invoicingMethods]);

  const [confirms, setConfirms] = useState<Record<ConfirmsStateKay | string, boolean>>({
    hasDelivery: !!formValues.deliveryInfo,
    hasDeliveryInvoice: !!formValues.deliveryInfo?.invoiceInfo,
    hasReceiverInfo: !!formValues.receiver,
    hasExecuteDate: !!formValues.shipmentInfo?.executeAt,
  });

  // const hasImposedPayment = useMemo(() => {
  //   return (
  //     formValues.invoiceInfo?.method?.type?.internal &&
  //     [PaymentInternalTypeEnum.imposedPayment, PaymentInternalTypeEnum.bonuses_imposedPayment].includes(
  //       formValues.invoiceInfo?.method?.type?.internal
  //     )
  //   );
  // }, [formValues.invoiceInfo?.method?.type?.internal]);

  const handleOnChangeValue: UseFormSetValue<ICreateOrderInfoFormState> = (path, value) => {
    try {
      setValue(path, value as never, { shouldTouch: true });
      throttleCallback(() =>
        trigger()
          .then(isValid => {
            isValid && onChangeValidStatus && onChangeValidStatus(isValid);
          })
          .catch(e => {
            console.error('handleOnChangeValue trigger error', e);
          })
      );
    } catch (e) {
      console.error('handleOnChangeValue: ', e);
    }
  };
  const registerConfirmSelectHandler = (name: ConfirmsStateKay) => {
    return (value: boolean) => {
      setConfirms(p => ({ ...p, [name]: value }));

      if (value) {
        if (name === 'hasExecuteDate') {
          return setValue('shipmentInfo.executeAt', fns.format(fns.addDays(new Date(), 1), 'yyyy-MM-dd'));
        }
        if (name === 'hasDeliveryInvoice') {
          return setValue('deliveryInfo.invoiceInfo.expireAt', toInputValueDate(fns.addDays(new Date(), 1)));
        }
      } else if (!value) {
        if (name === 'hasReceiverInfo') {
          return unregister('receiver');
        }
        if (name === 'hasDeliveryInvoice') {
          return unregister('deliveryInfo.invoiceInfo');
        }
        if (name === 'hasDelivery') {
          return unregister('deliveryInfo');
        }
      }
    };
  };
  const registerSwitch = (name: ConfirmsStateKay) => {
    return { name, onChange: registerConfirmSelectHandler(name), value: confirms[name] };
  };

  useEffect(() => {
    if (onChangeValidStatus) onChangeValidStatus(isValid);
  }, [isValid, onChangeValidStatus]);

  return (
    <Inputs flex={1} overflow={'auto'}>
      <FlexBox fillWidth gap={8} padding={'8px 2px'} style={{ maxWidth: 480, width: '100%', margin: '0 auto' }}>
        {formValues?.manager && (
          <InputLabel label={t('Manager')}>
            <CustomerInfoComponent info={formValues?.manager?.user as never} isManager />
          </InputLabel>
        )}

        <ButtonIcon
          variant={'outlinedSmall'}
          onClick={() => {
            const m = modalS.open({
              ModalChildren: SelectManagerModal,
              modalChildrenProps: {
                onSelect: pr => {
                  handleOnChangeValue('manager', pr);
                  m?.onClose && m?.onClose();
                },
              },
            });
          }}
        >
          {t(!formValues?.manager ? 'Select manager' : 'Change manager')}
        </ButtonIcon>
      </FlexBox>

      <FlexBox padding={'0 2px'}>
        <StAccordionItem
          contentContainerStyle={{ padding: '8px 0', gap: 8 }}
          open
          renderHeader={<AccordionItemTitle title={t('Customer')} />}
        >
          {formValues?.customer && (
            <>
              <InputLabel label={t('Customer information')}>
                <CustomerInfoComponent info={formValues?.customer} />
              </InputLabel>

              <BorderedBox fillWidth overflow={'hidden'}>
                <InputLabel label={t('Communication methods')}>
                  <TagButtonsFilter
                    numColumns={2}
                    values={[formValues?.communication?.customer?._id ?? '']}
                    resetButtonLabel={t('Not needed')}
                    options={communicationMethodsList}
                    resetButtonPosition={'start'}
                    onSelectValue={({ value }) => {
                      handleOnChangeValue('communication.customer', { _id: value });
                    }}
                  />
                </InputLabel>
              </BorderedBox>
            </>
          )}

          <FlexBox fxDirection={'row'} gap={8} fillWidth alignItems={'center'}>
            <CreateCustomerButtonIcon
              onSuccess={d => {
                handleOnChangeValue('customer', d);
              }}
            />

            <ButtonIcon
              variant={'outlinedSmall'}
              flex={1}
              onClick={() => {
                const m = modalS.open({
                  ModalChildren: SelectCustomerModal,
                  modalChildrenProps: {
                    onSelect: data => {
                      handleOnChangeValue('customer', data);
                      m?.onClose && m?.onClose();
                    },
                  },
                });
              }}
            >
              {t(!formValues?.customer ? 'Select customer' : 'Change customer')}
            </ButtonIcon>
          </FlexBox>

          <BorderedBox fillWidth gap={4}>
            <InputLabel label={t('Receiver')}>
              <ButtonSwitch
                {...registerSwitch('hasReceiverInfo')}
                rejectLabel={t('The same')}
                acceptLabel={t('Another')}
              />
            </InputLabel>
          </BorderedBox>
        </StAccordionItem>

        {confirms?.hasReceiverInfo && (
          <StAccordionItem
            contentContainerStyle={{ padding: '8px 0', gap: 8 }}
            open
            renderHeader={<AccordionItemTitle title={t('Receiver')} />}
          >
            {formValues?.receiver && (
              <>
                <InputLabel label={t('Receiver information')}>
                  <CustomerInfoComponent info={formValues?.receiver} />{' '}
                </InputLabel>

                <BorderedBox fillWidth>
                  <InputLabel label={t('Communication methods')}>
                    <TagButtonsFilter
                      numColumns={2}
                      values={[formValues?.communication?.receiver?._id ?? '']}
                      resetButtonLabel={t('Without')}
                      options={communicationMethodsList.map(mtd => ({ ...mtd, value: mtd._id }))}
                      resetButtonPosition={'start'}
                      onSelectValue={({ value }) => {
                        handleOnChangeValue('communication.receiver', { _id: value });
                      }}
                    />
                  </InputLabel>
                </BorderedBox>
              </>
            )}

            <FlexBox fxDirection={'row'} gap={8} fillWidth alignItems={'center'}>
              <CreateCustomerButtonIcon
                isReceiver
                onSuccess={d => {
                  handleOnChangeValue('receiver', d);
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
                        handleOnChangeValue('receiver', i);
                        m?.onClose && m?.onClose();
                      },
                    },
                  });
                }}
              >
                {t(!formValues?.receiver ? 'Select receiver' : 'Change receiver')}
              </ButtonIcon>
            </FlexBox>
          </StAccordionItem>
        )}

        <StAccordionItem
          contentContainerStyle={{ padding: '0 2px' }}
          open
          renderHeader={<AccordionItemTitle title={t('Shipment')} />}
        >
          <BorderedBox fillWidth gap={4}>
            <InputLabel label={t('Another execute date')}>
              <ButtonSwitch {...registerSwitch('hasExecuteDate')} />
            </InputLabel>

            {confirms?.hasExecuteDate && (
              <InputLabel label={t('Execute at')} required={confirms?.hasExecuteDate}>
                <InputText
                  placeholder={t('Execute at')}
                  type={'date'}
                  required={confirms?.hasExecuteDate}
                  {...register('shipmentInfo.executeAt', { required: confirms?.hasExecuteDate })}
                />
              </InputLabel>
            )}
          </BorderedBox>

          <BorderedBox fillWidth gap={4}>
            <InputLabel label={t('Delivery')}>
              <ButtonSwitch {...registerSwitch('hasDelivery')} />
            </InputLabel>
          </BorderedBox>
        </StAccordionItem>

        {confirms?.hasDelivery && (
          <StAccordionItem
            contentContainerStyle={{ padding: '0 2px' }}
            open
            renderHeader={<AccordionItemTitle title={t('Delivery')} />}
          >
            <BorderedBox fillWidth gap={8}>
              <InputLabel label={t('Delivery method')} required>
                <CheckboxesListSelector
                  options={deliveryMethodsList}
                  currentOption={formValues?.deliveryInfo?.method}
                  onChangeIndex={i => {
                    handleOnChangeValue('deliveryInfo.method', deliveryMethodsList[i]);
                  }}
                />
              </InputLabel>
            </BorderedBox>

            <BorderedBox fillWidth style={{ columnGap: 8, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              {destinationAddressInputsProps.map(({ name, label, required }) => {
                return (
                  <InputLabel
                    key={`dest-addr-${label}`}
                    label={label}
                    error={errors?.deliveryInfo?.destination ? errors?.deliveryInfo?.destination[name] : undefined}
                    required={required}
                  >
                    <InputText
                      required={required}
                      placeholder={label}
                      {...register(`deliveryInfo.destination.${name}`, { required })}
                    />
                  </InputLabel>
                );
              })}
            </BorderedBox>

            <BorderedBox fillWidth gap={8}>
              <InputLabel label={t('Has payment')} required>
                <ButtonSwitch {...registerSwitch('hasDeliveryInvoice')} />
              </InputLabel>
            </BorderedBox>

            <BorderedBox fillWidth gap={8}>
              {confirms?.hasDeliveryInvoice && (
                <>
                  <InputLabel label={t('Payment method')} required>
                    <CheckboxesListSelector
                      options={invoicingMethods}
                      currentOption={formValues?.deliveryInfo?.invoiceInfo?.method}
                      onChangeIndex={i => {
                        handleOnChangeValue('deliveryInfo.invoiceInfo.method', invoicingMethods[i]);
                      }}
                    />
                  </InputLabel>

                  <InputLabel label={t('Expired at')} required>
                    <InputText
                      placeholder={t('Expired at')}
                      type={'datetime-local'}
                      required
                      {...register('deliveryInfo.invoiceInfo.expireAt', { required: true })}
                    />
                  </InputLabel>
                </>
              )}
            </BorderedBox>
          </StAccordionItem>
        )}

        <StAccordionItem
          contentContainerStyle={{ padding: '8px 2px' }}
          open
          renderHeader={<AccordionItemTitle title={t('Invoicing')} />}
        >
          {/*<ButtonsGroup*/}
          {/*  options={invMethodCategoryFilterOptions}*/}
          {/*  currentOption={{ value: intMethodType }}*/}
          {/*  onChangeIndex={i => setIntMethodType(invMethodCategoryFilterOptions[i].value)}*/}
          {/*/>*/}

          {/*<InputLabel label={t('Method')} required>*/}
          {/*  <CheckboxesListSelector*/}
          {/*    options={filteredInvMethods}*/}
          {/*    currentOption={formValues?.invoiceInfo?.method}*/}
          {/*    onChangeIndex={i => {*/}
          {/*      handleOnChangeValue('invoiceInfo.method', invoicingMethods[i]);*/}
          {/*    }}*/}
          {/*    renderLabel={*/}
          {/*      intMethodType === PaymentInternalTypeEnum.bankTransfer*/}
          {/*        ? info => {*/}
          {/*            return (*/}
          {/*              <FlexBox gap={4}>*/}
          {/*                <Text $size={11} $weight={600}>*/}
          {/*                  {t('IBAN')}*/}
          {/*                </Text>*/}
          {/*                <Text $size={13}>{info.option?.bankAccount?.iban}</Text>*/}

          {/*                <Text $size={11} $weight={600}>*/}
          {/*                  {t('Tax code')}*/}
          {/*                </Text>*/}
          {/*                <Text $size={13}>{info.option?.bankAccount?.taxId ?? '---'}</Text>*/}

          {/*                <Text $size={11} $weight={600}>*/}
          {/*                  {t('Bank')}*/}
          {/*                </Text>*/}
          {/*                <Text $size={13}>{info.option?.bankAccount?.bank?.label ?? '---'}</Text>*/}
          {/*              </FlexBox>*/}
          {/*            );*/}
          {/*          }*/}
          {/*        : null*/}
          {/*    }*/}
          {/*  />*/}
          {/*</InputLabel>*/}

          <InputLabel label={t('Expired at')} required>
            <InputText
              placeholder={t('Expired at')}
              type={'datetime-local'}
              required
              {...register('invoiceInfo.expireAt', { required: true })}
            />
          </InputLabel>
        </StAccordionItem>
      </FlexBox>
    </Inputs>
  );
};
const AccordionItemTitle = ({ title }: { title: string }) => {
  return (
    <Text $padding={'0 6px'} $ellipsisMode={true} $size={16} $weight={500}>
      {title}
    </Text>
  );
};
const Inputs = styled(FlexBox)``;

const BorderedBox = styled(FlexBox)`
  padding-bottom: 8px;

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
