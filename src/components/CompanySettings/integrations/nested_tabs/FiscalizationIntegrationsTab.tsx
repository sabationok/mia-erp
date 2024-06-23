import FlexBox from '../../../atoms/FlexBox';
import { IntegrationTabProps } from '../InputIntegrationsTab';
import { useEffect, useState } from 'react';
import { t } from 'lang';
import { useModalService } from '../../../../Providers/ModalProvider/ModalProvider';
import FormCreateInputIntegration from '../../../Forms/integrations/FormCreateInputIntegration';
import { InputIntegrationBase } from 'types/integrations.types';
import { getIdRef, toQueriesForReq } from 'utils';
import ExtraFooterWithButton from '../../../atoms/ExtraFooterWithButton';
import { useAppServiceProvider } from 'hooks/useAppServices.hook';
import { AppModuleName } from 'redux/reduxTypes.types';
import InputIntegrationsList from '../../components/InputIntegrationsList';

export interface FiscalizationIntegrationsTabProps extends IntegrationTabProps {}

const FiscalizationIntegrationsTab: React.FC<FiscalizationIntegrationsTabProps> = ({
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
  // const [isListVisible, setIsListVisible] = useState(infoVisible ?? false);

  // const handleToggleListVisibility = () => setIsListVisible(p => !p);

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

  useEffect(() => {
    currentServiceData &&
      service.getAll({
        data: { type: 'input', ...toQueriesForReq({ service: getIdRef(currentServiceData) }) },
        onSuccess: data => {
          setIntegrationsList(data);
        },
      });
  }, [currentServiceData, service]);

  return (
    <FlexBox fillWidth flex={1} overflow={'hidden'}>
      {/*<List overflow={'hidden'} isVisible={isListVisible} fillWidth>*/}
      {/*  <Text $size={11} $weight={600} $margin={'4px 8px'}>*/}
      {/*    {t('Invoicing methods')}*/}
      {/*  </Text>*/}

      {/*  <FlexBox fxDirection={'row'} padding={'4px 2px'} flexWrap={'wrap'} gap={4} fillWidth></FlexBox>*/}

      {/*  <Text $size={11} $weight={600} $margin={'4px 8px'}>*/}
      {/*    {t('Payment checkout services')}*/}
      {/*  </Text>*/}

      {/*  <FlexBox fxDirection={'row'} padding={'4px 2px'} flexWrap={'wrap'} gap={4} fillWidth></FlexBox>*/}
      {/*</List>*/}

      {/*<ButtonIcon*/}
      {/*  variant={'textExtraSmall'}*/}
      {/*  icon={isListVisible ? 'SmallArrowUp' : 'SmallArrowDown'}*/}
      {/*  onClick={handleToggleListVisibility}*/}
      {/*>*/}
      {/*  {t(isListVisible ? 'Hide' : 'More')}*/}
      {/*</ButtonIcon>*/}

      <FlexBox fillWidth gap={8} flex={1} padding={'8px 2px'} overflow={'hidden'}>
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

// const List = styled(FlexBox)<{ isVisible?: boolean }>`
//   max-height: ${p => (p.isVisible ? '100%' : 0)};
//
//   transition: all ${p => p.theme.globals.timingFnLong};
// `;

export default FiscalizationIntegrationsTab;
