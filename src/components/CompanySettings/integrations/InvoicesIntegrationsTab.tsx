import FlexBox from '../../atoms/FlexBox';
import { IntegrationTabProps } from '../CompanyIntegrationsModal';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import { useEffect, useMemo, useState } from 'react';
import { Text } from '../../atoms/Text';
import { t } from '../../../lang';
import ModalFilter from '../../ModalForm/ModalFilter';

export interface InvoicesIntegrationsTabProps extends IntegrationTabProps {}

const InvoicesIntegrationsTab: React.FC<InvoicesIntegrationsTabProps> = ({ providers, onClose, compId, ...props }) => {
  const [provider, setProvider] = useState<string>();

  const currentProviderData = useMemo(() => {
    return providers?.find(pr => pr.value === provider);
  }, [provider, providers]);

  const paymentCheckoutTypes = useMemo(
    () =>
      currentProviderData?.services?.checkout?.map(chType => {
        return (
          <FlexBox key={chType} border={'1px solid lightgrey'} padding={'4px 6px'} borderRadius={'4px'}>
            <Text $size={10}>{t(chType)}</Text>
          </FlexBox>
        );
      }),
    [currentProviderData?.services?.checkout]
  );

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
          </FlexBox>
        )}

        <ButtonIcon variant={'filledSmall'} onClick={onClose}>
          {t('Add new')}
        </ButtonIcon>
      </FlexBox>
    </FlexBox>
  );
};

export default InvoicesIntegrationsTab;
