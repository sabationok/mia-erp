import FlexBox from '../../atoms/FlexBox';
import styled from 'styled-components';
import ExtraFooterWithButton from '../../atoms/ExtraFooterWithButton';
import { t } from '../../../lang';
import { useModalService } from '../../../Providers/ModalProvider/ModalProvider';
import FormCreateOutputIntegration from '../../Forms/integrations/FormCreateOutputIntegration';
import { useEffect, useMemo, useState } from 'react';
import { Integration, OutputIntegrationEntity } from '../../../types/integrations.types';
import AccordionList, { IAccordionOptionProps } from '../../SideBarContent/AccordionList';
import { Text } from '../../atoms/Text';
import { toAppDateFormat } from '../../../utils';
import { isNumber } from 'lodash';
import ButtonIcon from '../../atoms/ButtonIcon';
import { StorageService } from '../../../services';
import { useIntegrationsSelector } from '../../../redux/selectors.store';
import { useAppDispatch } from '../../../redux/store.store';
import { getAllIntegrationsByTypeThunk } from '../../../redux/integrations/integrations.thunk';

export interface OutputIntegrationsTabProps {}

const OutputIntegrationsTab: React.FC<OutputIntegrationsTabProps> = () => {
  const modalS = useModalService();
  // const service = useAppServiceProvider()[AppModuleName.integrations];

  const state = useIntegrationsSelector().output;
  const integrationsList = state.list;
  const dispatch = useAppDispatch();
  const handleCreateOne = () => {
    modalS.create(FormCreateOutputIntegration);
  };

  const preparedList = useMemo((): IAccordionOptionProps[] => {
    return integrationsList.map((opt: OutputIntegrationEntity): IAccordionOptionProps => {
      return {
        title: opt.label ?? '',
        ChildrenComponent: () => <ApiKeyItem opt={opt} />,
      };
    });
  }, [integrationsList]);

  useEffect(() => {
    dispatch(
      getAllIntegrationsByTypeThunk({
        params: { type: Integration.Type.output },
      })
    );

    // eslint-disable-next-line
  }, []);

  return (
    <Container flex={1} fillWidth>
      <FlexBox fillWidth flex={1} overflow={'hidden'} style={{ position: 'relative' }}>
        <AccordionList options={preparedList} />
      </FlexBox>

      <ExtraFooterWithButton buttonText={t('Add one')} onClick={handleCreateOne} />
    </Container>
  );
};
const Container = styled(FlexBox)`
  position: relative;

  max-width: 100%;
  width: 480px;

  height: 98vh;
  max-height: 100%;

  background-color: ${p => p.theme.modalBackgroundColor};
`;
export default OutputIntegrationsTab;

const ApiKeyItem = ({ opt }: { opt: Integration.Output.Entity }) => {
  return (
    <FlexBox fillWidth padding={'8px 2px'} gap={8}>
      <Text $size={12} $weight={600}>
        {t('Public key')}
      </Text>
      <ApiKeyBox apiKey={opt.publicKey} keyMask={opt.publicKeyMask} />

      <Text $size={12} $weight={600}>
        {t('Private key')}
      </Text>
      <ApiKeyBox apiKey={opt.privateKey} keyMask={opt.privateKeyMask} />

      <Text $size={12} $weight={600}>
        {t('Redirect base url')}
      </Text>
      <Text>{opt?.redirectBaseUrl}</Text>
      {opt.expireAt && (
        <>
          <Text $size={12} $weight={600}>
            {t('Expire at ')}
          </Text>
          <Text>{toAppDateFormat(isNumber(opt.expireAt) ? opt.expireAt : new Date(opt.expireAt))}</Text>
        </>
      )}
      {opt.description && (
        <>
          <Text $size={12} $weight={600}>
            {t('Description')}
          </Text>

          <Text>{opt.description}</Text>
        </>
      )}
    </FlexBox>
  );
};
const ApiKeyBox = ({ apiKey, keyMask }: { apiKey?: string; keyMask?: string }) => {
  const [isVis, setIsVis] = useState(false);

  return (
    <FlexBox fillWidth style={{ position: 'relative' }} fxDirection={'row'} gap={8}>
      {apiKey && (
        <ButtonIcon
          variant={'onlyIcon'}
          icon={isVis ? 'visibilityOn' : 'visibilityOff'}
          iconSize={'100%'}
          size={'18px'}
          onClick={() => {
            setIsVis(p => !p);
          }}
        ></ButtonIcon>
      )}

      <ButtonIcon
        variant={'onlyIcon'}
        icon={'copy'}
        iconSize={'100%'}
        size={'18px'}
        onClick={() => {
          apiKey && StorageService.copyText(apiKey);
        }}
      ></ButtonIcon>

      <ButtonIcon
        variant={'textExtraSmall'}
        style={{ padding: 0, height: 'fit-content' }}
        onClick={() => {
          apiKey && StorageService.copyText(apiKey);
        }}
      >
        <Text>{isVis ? apiKey : keyMask}</Text>
      </ButtonIcon>
    </FlexBox>
  );
};
