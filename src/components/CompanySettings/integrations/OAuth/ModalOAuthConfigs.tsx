import ModalBase from '../../../atoms/Modal';
import { Integration } from '../../../../types/integrations.types';
import { useModalService } from '../../../../Providers/ModalProvider/ModalProvider';
import FlexBox from '../../../atoms/FlexBox';
import { Text } from '../../../atoms/Text';
import { t } from '../../../../lang';
import { ApiKeyItem } from '../components/ApiKeyItem';
import ButtonIcon from '../../../atoms/ButtonIcon';
import { ModalOAuthConfigsForm } from './ModalOAuthConfigsForm';

export const ModalOAuthConfigs = ({ conn }: { conn: Integration.Output.Entity }) => {
  return (
    <ModalBase title={conn.label} fillHeight>
      <OutputConnOAuth conn={conn} />
    </ModalBase>
  );
};

export const OutputConnOAuth = ({ conn }: { conn: Integration.Output.Entity }) => {
  const modalS = useModalService();

  return (
    <FlexBox flex={1}>
      <FlexBox flex={1}>
        {conn.oAuth?.map(config => {
          return (
            <FlexBox key={config._id}>
              <Text>{t('Public key')}</Text>
              <ApiKeyItem apiKey={config.publicKey} />
              <Text>{t('Private key')}</Text>
              <ApiKeyItem apiKey={config.publicKey} />
            </FlexBox>
          );
        })}
      </FlexBox>

      <FlexBox padding={'8px 16px'}>
        <ButtonIcon
          variant={'filled'}
          sizeType={'middle'}
          onClick={() => {
            modalS.create(ModalOAuthConfigsForm, {
              conn,
            });
          }}
        >
          {'Create'}
        </ButtonIcon>
      </FlexBox>
    </FlexBox>
  );
};
