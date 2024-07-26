import FlexBox from '../../../atoms/FlexBox';
import { IntegrationTabProps } from '../InputIntegrationsTab';
import ButtonIcon from '../../../atoms/ButtonIcon';
import { useEffect, useMemo, useState } from 'react';
import { Text } from '../../../atoms/Text';
import { t } from 'lang';
import { useModalService } from '../../../../Providers/ModalProvider/ModalProvider';
import FormCreateInputIntegration from '../../../Forms/integrations/FormCreateInputIntegration';
import { InputIntegrationEntity } from 'types/integrations.types';
import { useTranslatedMethodsList } from 'hooks/useTranslatedMethodsList.hook';
import { getIdRef, toQueriesForReq } from 'utils';
import styled from 'styled-components';
import ExtraFooterWithButton from '../../../atoms/ExtraFooterWithButton';
import { usePaymentsSelector } from 'redux/selectors.store';
import { useAppServiceProvider } from 'hooks/useAppServices.hook';
import { AppModuleName } from 'redux/reduxTypes.types';
import InputIntegrationsList from '../../components/InputIntegrationsList';
import { apiCall, ExtServicesApi, IntegrationsApi } from '../../../../api';
import { useLoaders } from '../../../../Providers/Loaders/useLoaders.hook';

export interface PaymentIntegrationsTabProps extends IntegrationTabProps {}

const PaymentIntegrationsTab: React.FC<PaymentIntegrationsTabProps> = ({
  providers,
  onClose,
  compId,
  infoVisible,
  currentService: currentServiceData,
  ...props
}) => {
  const service = useAppServiceProvider()[AppModuleName.integrations];
  const loaders = useLoaders<'activate' | 'getAll' | 'delete'>({
    activate: { content: t('Activating') + '...' },
    getAll: { content: t('Refreshing') + '...' },
    delete: { content: t('Deleting') + '...' },
  });
  const [integrationsList, setIntegrationsList] = useState<InputIntegrationEntity[]>([]);
  const modalS = useModalService();
  const [isListVisible, setIsListVisible] = useState(infoVisible ?? false);
  const methodsList = useTranslatedMethodsList(usePaymentsSelector().methods);
  const [activeId, setActiveId] = useState<string | undefined>(currentServiceData?.defIntegration?._id);
  const handleToggleListVisibility = () => setIsListVisible(p => !p);

  const onOpenModalPress = () => {
    currentServiceData &&
      modalS.open({
        ModalChildren: FormCreateInputIntegration,
        modalChildrenProps: {
          onSuccess: d => setIntegrationsList(p => [...p, d?.data]),
          service: currentServiceData,
        },
        $settings: { closeByBackdropPress: false, closeByEscapePress: false },
      });
  };

  const renderPaymentMethods = useMemo(() => {
    const methods = methodsList.filter(m => {
      return m.service?._id === currentServiceData?._id;
    });

    return methods.map(m => {
      return (
        <FlexBox key={m._id} border={'1px solid lightgrey'} padding={'4px 6px'} borderRadius={'4px'}>
          <Text $size={13}>{m.label}</Text>
        </FlexBox>
      );
    });
  }, [currentServiceData?._id, methodsList]);

  useEffect(() => {
    currentServiceData &&
      service.getAll({
        onLoading: loaders.onLoading('getAll'),
        data: {
          type: 'input',
          serviceId: currentServiceData._id,
          ...toQueriesForReq({ service: getIdRef(currentServiceData) }),
        },
        onSuccess: data => {
          setIntegrationsList(data);
        },
      });
    // eslint-disable-next-line
  }, [currentServiceData, service]);

  return (
    <FlexBox fillWidth flex={1} overflow={'hidden'}>
      <List overflow={'hidden'} isVisible={isListVisible} fillWidth>
        <FlexBox padding={'8px 0'}>
          <Text $size={13} $weight={500} $margin={'4px 8px'}>
            {t('Payment methods')}
          </Text>

          <FlexBox fxDirection={'row'} padding={'4px 2px'} flexWrap={'wrap'} gap={4} fillWidth>
            {renderPaymentMethods}
          </FlexBox>

          {/*<Text $size={11} $weight={600} $margin={'4px 8px'}>*/}
          {/*  {t('Support')}*/}
          {/*</Text>*/}

          {/*<Text $size={16}>{t('+380 5632 55623')}</Text>*/}

          {/*<Text $size={11} $weight={600} $margin={'4px 8px'}>*/}
          {/*  {t('Url')}*/}
          {/*</Text>*/}

          {/*<Text $size={16}>{t('www.monobank.ua/contacts')}</Text>*/}
        </FlexBox>
      </List>

      <ButtonIcon
        variant={'textSmall'}
        icon={isListVisible ? 'SmallArrowUp' : 'SmallArrowDown'}
        onClick={handleToggleListVisibility}
      >
        {t(isListVisible ? 'Hide' : 'More')}
      </ButtonIcon>

      <FlexBox fillWidth gap={8} flex={1} padding={'8px 2px'} overflow={'hidden'}>
        {/*{renderIntegrations}*/}

        <InputIntegrationsList
          list={integrationsList}
          checkIsActive={data => {
            return data._id === activeId;
          }}
          onSetAsDefault={data => {
            if (!currentServiceData?._id) return;

            apiCall(ExtServicesApi.setDefaultInput, {
              onLoading: loaders.onLoading('activate'),
              onSuccess: () => setActiveId(data._id),
              data: {
                serviceId: currentServiceData?._id,
                inputId: data._id,
              },
            });
          }}
          onDelete={data => {
            if (!window.confirm(`Delete integration: "${data.label}" ?`)) return;

            apiCall(IntegrationsApi.remove, {
              onLoading: loaders.onLoading('delete'),
              data: { _id: data._id, type: 'input' },
              onSuccess: res => {
                setIntegrationsList(prev => {
                  return prev.filter(pr => pr._id !== data._id);
                });
              },
            });
          }}
          active={currentServiceData?.defIntegration}
        />
      </FlexBox>

      <ExtraFooterWithButton onClick={onOpenModalPress} buttonText={t('Add new')} />
    </FlexBox>
  );
};

const List = styled(FlexBox)<{ isVisible?: boolean }>`
  max-height: ${p => (p.isVisible ? '100%' : 0)};

  transition: all ${p => p.theme.globals.timingFnLong};
`;

export default PaymentIntegrationsTab;
