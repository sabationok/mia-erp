import FlexBox from '../../atoms/FlexBox';
import { IntegrationTabProps } from '../CompanyIntegrationsModal';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import { useEffect, useMemo, useState } from 'react';
import { Text } from '../../atoms/Text';
import { t } from '../../../lang';
import ModalFilter from '../../ModalForm/ModalFilter';
import { useModalService } from '../../ModalProvider/ModalProvider';
import FormCreateIntegration from '../../Forms/FormCreateIntegration';
import { ExtIntegrationBase } from '../../../redux/integrations/integrations.types';
import { useTranslatedInvoicingMethods, useTranslatedPaymentMethods } from '../../../hooks/useTranslatedMethods.hook';
import { createApiCall } from '../../../api';
import ExtServicesApi from '../../../api/extServices.api';
import { getIdRef, transformQueriesForReq } from '../../../utils/dataTransform';
import styled from 'styled-components';
import ExtraFooterWithButtonButton from '../../Forms/components/ExtraFooterWithButtonButton';
import IntegrationOverview from '../components/IntegrationOverview';

export interface InvoicingIntegrationsTabProps extends IntegrationTabProps {}

const InvoicingIntegrationsTab: React.FC<InvoicingIntegrationsTabProps> = ({
  providers,
  onClose,
  compId,
  ...props
}) => {
  const [provider, setProvider] = useState<string>();
  const [integrationsList, setIntegrationsList] = useState<ExtIntegrationBase[]>([]);
  const modalS = useModalService();
  const [isListVisible, setIsListVisible] = useState(false);
  const handleToggleListVisibility = () => setIsListVisible(p => !p);
  const paymentMethods = useTranslatedPaymentMethods();
  const invoicingMethods = useTranslatedInvoicingMethods();

  const currentServiceData = useMemo(() => {
    return providers?.find(pr => pr.value === provider);
  }, [provider, providers]);

  const onOpenModalPress = () => {
    currentServiceData &&
      modalS.open({
        ModalChildren: FormCreateIntegration,
        modalChildrenProps: {
          onSuccess: d => setIntegrationsList(p => [...p, d?.data]),
          service: currentServiceData,
        },
        settings: { closeByBackdropPress: false, closeByEscapePress: false },
      });
  };

  useEffect(() => {
    currentServiceData &&
      createApiCall(
        {
          data: { type: 'input', ...transformQueriesForReq({ service: getIdRef(currentServiceData) }) },
          onSuccess: data => {
            setIntegrationsList(data);
          },
        },
        ExtServicesApi.getAllByQueries,
        ExtServicesApi
      );
  }, [currentServiceData]);

  const renderInvoicingMethods = useMemo(() => {
    const methods = invoicingMethods.filter(m => {
      return m.service?._id === currentServiceData?._id;
    });

    return methods.map(m => {
      return (
        <FlexBox key={m._id} border={'1px solid lightgrey'} padding={'4px 6px'} borderRadius={'4px'}>
          <Text $size={10}>{m.label}</Text>
        </FlexBox>
      );
    });
  }, [currentServiceData?._id, invoicingMethods]);

  const renderPaymentMethods = useMemo(() => {
    const methods = paymentMethods.filter(m => {
      return m.service?._id === currentServiceData?._id;
    });

    return methods.map(m => {
      return (
        <FlexBox key={m._id} border={'1px solid lightgrey'} padding={'4px 6px'} borderRadius={'4px'}>
          <Text $size={10}>{m.label}</Text>
        </FlexBox>
      );
    });
  }, [currentServiceData?._id, paymentMethods]);

  const renderIntegrations = useMemo(() => {
    return integrationsList.map(int => {
      return (
        <IntegrationOverview
          key={int?._id}
          info={int}
          isDefault={currentServiceData?.defIntegration?._id === int._id}
        />
      );
    });
  }, [currentServiceData?.defIntegration?._id, integrationsList]);

  useEffect(() => {
    if (!provider && providers) {
      providers[0] && setProvider(providers[0]?.value);
    }
  }, [provider, providers]);

  return (
    <FlexBox fillWidth flex={1} overflow={'hidden'}>
      <ModalFilter filterOptions={providers} onFilterValueSelect={info => setProvider(info.value)} />

      <FlexBox fillWidth flex={1} padding={'8px 4px 0'} overflow={'hidden'}>
        <List overflow={'auto'} isVisible={isListVisible} fillWidth>
          <Text $size={11} $weight={600} $margin={'4px 8px'}>
            {t('Invoicing methods')}
          </Text>

          <FlexBox fxDirection={'row'} padding={'4px 2px'} flexWrap={'wrap'} gap={4} fillWidth>
            {renderInvoicingMethods}
          </FlexBox>

          <Text $size={11} $weight={600} $margin={'4px 8px'}>
            {t('Payment checkout services')}
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
        </List>

        <ButtonIcon
          variant={'textExtraSmall'}
          icon={isListVisible ? 'SmallArrowUp' : 'SmallArrowDown'}
          onClick={handleToggleListVisibility}
        >
          {t(isListVisible ? 'Hide' : 'More')}
        </ButtonIcon>

        <FlexBox fillWidth gap={8} flex={1} padding={'8px 2px'} overflow={'auto'}>
          {renderIntegrations}
        </FlexBox>

        <ExtraFooterWithButtonButton onClick={onOpenModalPress} buttonText={t('Add new')} />
      </FlexBox>
    </FlexBox>
  );
};

const List = styled(FlexBox)<{ isVisible?: boolean }>`
  max-height: ${p => (p.isVisible ? '100%' : 0)};

  transition: all ${p => p.theme.globals.timingFnLong};
`;

export default InvoicingIntegrationsTab;