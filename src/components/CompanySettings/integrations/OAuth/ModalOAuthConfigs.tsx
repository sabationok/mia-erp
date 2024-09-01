import ModalBase from '../../../atoms/Modal';
import { Integration } from '../../../../types/integrations.types';
import { useModalService } from '../../../../Providers/ModalProvider/ModalProvider';
import FlexBox from '../../../atoms/FlexBox';
import { Text } from '../../../atoms/Text';
import { t } from '../../../../i18e';
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
      <OAuthConnection conn={conn} />
    </ModalBase>
  );
};

export const OAuthConnection = ({ conn }: { conn: Integration.Output.Entity }) => {
  const modalS = useModalService();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const loaders = useLoaders<'list'>();

  useEffect(() => {
    dispatch(
      getAllOAuthConfigsThunk({
        params: { consumerId: conn._id },
        onLoading: loaders.onLoading('list'),
      })
    );

    // eslint-disable-next-line
  }, [conn._id, dispatch]);
  return (
    <FlexBox flex={1} gap={8} padding={'8px'} overflow={'hidden'}>
      <FlexBox flex={1} gap={8} overflow={'auto'}>
        {conn.oAuth?.map(config => {
          console.log(config);
          return (
            <FlexBox
              key={config._id}
              borderRadius={'4px'}
              border={`1px solid ${theme.modalBorderColor}`}
              gap={8}
              padding={'8px'}
            >
              <FlexBox fxDirection={'row'} gap={12}>
                <FlexBox gap={8}>
                  {(
                    [
                      { label: t('Label'), value: config.label },
                      { label: t('Domain'), value: config.domain },
                      { label: t('Permissions'), value: config.scopes?.join(', ') },
                    ] as { label: string; value: string }[]
                  ).map(item => {
                    return (
                      <FlexBox key={item.label} gap={8}>
                        <Text $size={13}>{item.label}</Text>
                        <Text $weight={600}>{item.value ?? '---'}</Text>
                      </FlexBox>
                    );
                  })}
                </FlexBox>
                <FlexBox>
                  <FlexBox gap={8}>
                    <Text $size={13}>{t('Provider')}</Text>
                    <Text $weight={600}>{config.provider}</Text>
                  </FlexBox>
                </FlexBox>
              </FlexBox>

              <FlexBox
                padding={'8px 0'}
                gap={8}
                borderTop={`1px solid ${theme.modalBorderColor}`}
                borderBottom={`1px solid ${theme.modalBorderColor}`}
              >
                <FlexBox gap={8}>
                  <Text $size={13}>{t('Public key')}</Text>
                  <ApiKeyItem apiKey={config.publicKey} />
                </FlexBox>
                <FlexBox gap={8}>
                  <Text $size={13}>{t('Private key')}</Text>
                  <ApiKeyItem apiKey={config.privateKey} />
                </FlexBox>
              </FlexBox>

              <FlexBox gap={12}>
                {Object.entries(config.endpoints ?? {}).map(([key, value]) => {
                  return !value ? null : (
                    <FlexBox key={key} gap={6}>
                      <Text $size={11} $weight={300}>
                        {key}
                      </Text>
                      <Text $size={12} $weight={500}>
                        {value}
                      </Text>
                    </FlexBox>
                  );
                })}
              </FlexBox>
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
