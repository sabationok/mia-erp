import FlexBox from '../../../atoms/FlexBox';
import { IntegrationTabProps } from '../InputIntegrationsTab';
import ButtonIcon from '../../../atoms/ButtonIcon/ButtonIcon';
import { useEffect, useMemo, useState } from 'react';
import { Text } from '../../../atoms/Text';
import { t } from '../../../../lang';
import { useModalService } from '../../../ModalProvider/ModalProvider';
import FormCreateInputIntegration from '../../../Forms/integrations/FormCreateInputIntegration';
import { InputIntegrationBase } from '../../../../redux/integrations/integrations.types';
import { useTranslatedMethodsList } from '../../../../hooks/useTranslatedMethodsList.hook';
import { getIdRef, transformQueriesForReq } from '../../../../utils/dataTransform';
import styled from 'styled-components';
import ExtraFooterWithButton from '../../../atoms/ExtraFooterWithButton';
import { useCheckoutPaymentsSelector, useInvoicesSelector } from '../../../../redux/selectors.store';
import { useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import { AppModuleName } from '../../../../redux/reduxTypes.types';
import InputIntegrationsList from '../../components/InputIntegrationsList';

export interface InvoicingIntegrationsTabProps extends IntegrationTabProps {}

const InvoicingIntegrationsTab: React.FC<InvoicingIntegrationsTabProps> = ({
  providers,
  onClose,
  compId,
  infoVisible,
  currentService: currentServiceData,
  ...props
}) => {
  const service = useAppServiceProvider()[AppModuleName.integrations];
  const [integrationsList, setIntegrationsList] = useState<InputIntegrationBase[]>([]);
  const modalS = useModalService();
  const [isListVisible, setIsListVisible] = useState(infoVisible ?? false);
  const checkoutMethods = useTranslatedMethodsList(useCheckoutPaymentsSelector().methods);
  const invoicingMethods = useTranslatedMethodsList(useInvoicesSelector().methods);
  const handleToggleListVisibility = () => setIsListVisible(p => !p);

  const onOpenModalPress = () => {
    currentServiceData &&
      modalS.open({
        ModalChildren: FormCreateInputIntegration,
        modalChildrenProps: {
          onSuccess: d => setIntegrationsList(p => [...p, d?.data]),
          service: currentServiceData,
        },
        settings: { closeByBackdropPress: false, closeByEscapePress: false },
      });
  };

  useEffect(() => {
    currentServiceData &&
      service.getAll({
        data: { type: 'input', ...transformQueriesForReq({ service: getIdRef(currentServiceData) }) },
        onSuccess: data => {
          setIntegrationsList(data);
        },
      });
  }, [currentServiceData, service]);

  const renderInvoicingMethods = useMemo(() => {
    const methods = invoicingMethods.filter(m => {
      return m.service?._id === currentServiceData?._id;
    });

    return methods.length === 0
      ? null
      : methods.map(m => {
          return (
            <FlexBox key={m._id} border={'1px solid lightgrey'} padding={'4px 6px'} borderRadius={'4px'}>
              <Text $size={10}>{m.label}</Text>
            </FlexBox>
          );
        });
  }, [currentServiceData?._id, invoicingMethods]);

  const renderCheckoutMethods = useMemo(() => {
    const methods = checkoutMethods.filter(m => {
      return m.service?._id === currentServiceData?._id;
    });

    return methods.map(m => {
      return (
        <FlexBox key={m._id} border={'1px solid lightgrey'} padding={'4px 6px'} borderRadius={'4px'}>
          <Text $size={10}>{m.label}</Text>
        </FlexBox>
      );
    });
  }, [currentServiceData?._id, checkoutMethods]);

  // useEffect(() => {
  //   if (!provider && providers) {
  //     providers[0] && setProvider(providers[0]?.value);
  //   }
  // }, [provider, providers]);

  return (
    <FlexBox fillWidth flex={1} overflow={'hidden'}>
      <List overflow={'hidden'} isVisible={isListVisible} fillWidth>
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
          {renderCheckoutMethods}
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

      <FlexBox fillWidth gap={8} flex={1} padding={'8px 2px'} overflow={'hidden'}>
        {/*{renderIntegrations}*/}

        <InputIntegrationsList
          list={integrationsList}
          onEdit={() => {}}
          onSetAsDefault={() => {}}
          onDelete={() => {}}
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

export default InvoicingIntegrationsTab;
