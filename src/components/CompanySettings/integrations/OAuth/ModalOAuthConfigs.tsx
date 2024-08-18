import ModalBase from '../../../atoms/Modal';
import { Integration } from '../../../../types/integrations.types';
import { useModalService } from '../../../../Providers/ModalProvider/ModalProvider';
import FlexBox from '../../../atoms/FlexBox';
import { Text } from '../../../atoms/Text';
import { t } from '../../../../lang';
import { ApiKeyItem } from '../components/ApiKeyItem';
import ButtonIcon from '../../../atoms/ButtonIcon';
import { ModalOAuthConfigsForm } from './ModalOAuthConfigsForm';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../../redux/store.store';
import { getAllOAuthConfigsThunk } from '../../../../redux/auth/o-auth.thunks';
import { useLoaders } from '../../../../Providers/Loaders/useLoaders.hook';
import { useTheme } from 'styled-components';

export const ModalOAuthConfigs = ({ conn }: { conn: Integration.Output.Entity }) => {
  return (
    <ModalBase title={conn.label} fillHeight>
      <OutputConnOAuth conn={conn} />
    </ModalBase>
  );
};

export const OutputConnOAuth = ({ conn }: { conn: Integration.Output.Entity }) => {
  const modalS = useModalService();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const loaders = useLoaders<'list'>();

  useEffect(() => {
    dispatch(
      getAllOAuthConfigsThunk({
        params: { connectionId: conn._id },
        onLoading: loaders.onLoading('list'),
      })
    );

    // eslint-disable-next-line
  }, [conn._id, dispatch]);
  return (
    <FlexBox flex={1} gap={8} padding={'8px'} overflow={'hidden'}>
      <FlexBox flex={1} gap={8} padding={'8px'} overflow={'auto'}>
        {conn.oAuth?.map(config => {
          return (
            <FlexBox
              key={config._id}
              borderRadius={'4px'}
              border={`1px solid ${theme.modalBorderColor}`}
              gap={8}
              padding={'8px'}
            >
              <Text $size={13}>{t('Label')}</Text>
              <Text $weight={600}>{config.label}</Text>
              <Text $size={13}>{t('Domain')}</Text>
              <Text $weight={600}>{config.domain}</Text>
              <Text $size={13}>{t('Permissions')}</Text>
              <Text $weight={600}>{config.scopes?.join(', ')}</Text>

              {/*<Text $size={13}>{t('Domain')}</Text>*/}
              {/*<Text $weight={600}>{config.domain}</Text>*/}

              <Text $size={13}>{t('Public key')}</Text>
              <ApiKeyItem apiKey={config.publicKey} />
              <Text $size={13}>{t('Private key')}</Text>
              <ApiKeyItem apiKey={config.privateKey} />
            </FlexBox>
          );
        })}
      </FlexBox>

      <FlexBox padding={'8px'} borderTop={`1px solid ${theme.modalBorderColor}`}>
        <ButtonIcon
          variant={'filled'}
          sizeType={'middle'}
          isLoading={loaders.isLoading.list}
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
