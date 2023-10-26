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
import { useTranslatedPaymentMethods } from '../../../hooks/useTranslatedMethods.hook';

export interface InvoicesIntegrationsTabProps extends IntegrationTabProps {}

const InvoicesIntegrationsTab: React.FC<InvoicesIntegrationsTabProps> = ({ providers, onClose, compId, ...props }) => {
  const [provider, setProvider] = useState<string>();
  const [integrationsList, setIntegrationsList] = useState<ExtIntegrationBase[]>([]);
  const modalS = useModalService();

  const paymentMethods = useTranslatedPaymentMethods();

  const currentProviderData = useMemo(() => {
    return providers?.find(pr => pr.value === provider);
  }, [provider, providers]);

  const onOpenModalPress = () => {
    currentProviderData &&
      modalS.open({
        ModalChildren: FormCreateIntegration,
        modalChildrenProps: {
          onSuccess: d => setIntegrationsList(p => [...p, d?.data]),
          service: currentProviderData,
        },
        settings: { closeByBackdropPress: false, closeByEscapePress: false },
      });
  };

  const paymentCheckoutTypes = useMemo(() => {
    // currentProviderData?.originServices?.checkout?.map(chType => {
    //   return (
    //     <FlexBox key={chType} border={'1px solid lightgrey'} padding={'4px 6px'} borderRadius={'4px'}>
    //       <Text $size={10}>{t(chType)}</Text>
    //     </FlexBox>
    //   );
    // }),
    const methods = paymentMethods.filter(m => {
      return m.service?._id === currentProviderData?._id;
    });

    return methods.map(m => {
      return (
        <FlexBox key={m._id} border={'1px solid lightgrey'} padding={'4px 6px'} borderRadius={'4px'}>
          <Text $size={10}>{m.label}</Text>
        </FlexBox>
      );
    });
  }, [currentProviderData?._id, paymentMethods]);

  const renderIntegrations = useMemo(() => {
    return integrationsList.map(int => {
      return (
        <FlexBox fillWidth border={'1px solid lightgrey'} padding={'4px'} gap={8}>
          <FlexBox>
            <Text $size={12} $weight={600}>
              {t('Login')}
            </Text>

            <Text>{int.login}</Text>
          </FlexBox>

          <FlexBox>
            <Text $size={12} $weight={600}>
              {t('Api-key')}
            </Text>

            <Text>{int.apiKey}</Text>
          </FlexBox>

          <FlexBox>
            <Text $size={12} $weight={600}>
              {t('Secret key')}
            </Text>

            <Text>{int.apiKey}</Text>
          </FlexBox>
        </FlexBox>
      );
    });
  }, [integrationsList]);

  useEffect(() => {
    if (!provider && providers) {
      providers[0] && setProvider(providers[0]?.value);
    }
  }, [provider, providers]);

  return (
    <FlexBox fillWidth flex={1}>
      <ModalFilter filterOptions={providers} onFilterValueSelect={info => setProvider(info.value)} />

      <FlexBox fillWidth flex={1} padding={'8px 0'}>
        <Text $size={16} $weight={600}>
          {currentProviderData?.label}
        </Text>

        {paymentCheckoutTypes && (
          <FlexBox gap={6} padding={'8px 2px'} fillWidth>
            <Text $size={10} $weight={500}>
              {t('Payment checkout services')}
            </Text>

            <FlexBox fxDirection={'row'} flexWrap={'wrap'} gap={4} fillWidth>
              {paymentCheckoutTypes}
            </FlexBox>

            <FlexBox fillWidth gap={8}>
              {renderIntegrations}
            </FlexBox>
          </FlexBox>
        )}

        <ButtonIcon variant={'filledSmall'} onClick={onOpenModalPress}>
          {t('Add new')}
        </ButtonIcon>
      </FlexBox>
    </FlexBox>
  );
};

export default InvoicesIntegrationsTab;
