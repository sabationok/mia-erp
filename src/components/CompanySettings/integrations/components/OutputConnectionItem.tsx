import { Integration, OutputIntegrationEntity } from '../../../../types/integrations.types';
import { useAppDispatch } from '../../../../redux/store.store';
import { getOutputIntegrationByIdThunk } from '../../../../redux/integrations/integrations.thunk';
import FlexBox, { FlexLi, FlexUl } from '../../../atoms/FlexBox';
import { Text } from '../../../atoms/Text';
import { t } from '../../../../lang';
import { toAppDateFormat } from '../../../../utils';
import { isNumber } from 'lodash';
import { Tag } from 'antd';
import ButtonIcon from '../../../atoms/ButtonIcon';
import { useModalService } from '../../../../Providers/ModalProvider/ModalProvider';
import { OutputConnOverview } from './OutputConnOverview';
import styled, { useTheme } from 'styled-components';
import FormCreateOutputIntegration from '../../../Forms/integrations/FormCreateOutputIntegration';
import { ApiKeyItem } from './ApiKeyItem';
import { ModalOAuthConfigs } from '../OAuth/ModalOAuthConfigs';

export const OutputConnectionItem = ({ conn }: { conn: Integration.Output.Entity }) => {
  const dispatch = useAppDispatch();

  const onLoadHandler = async () => {
    dispatch(getOutputIntegrationByIdThunk({ params: { _id: conn._id } }));
  };
  return (
    <FlexBox fillWidth padding={'8px 2px'} gap={12}>
      <Text $size={12} $weight={600}>
        {t('Public key')}
      </Text>
      <ApiKeyItem apiKey={conn.publicKey} keyMask={conn.publicKeyMask} onLoadApiKey={onLoadHandler} />

      <Text $size={12} $weight={600}>
        {t('Private key')}
      </Text>
      <ApiKeyItem apiKey={conn.privateKey} keyMask={conn.privateKeyMask} onLoadApiKey={onLoadHandler} />

      <Text $size={12} $weight={600}>
        {t('Redirect base url')}
      </Text>
      <Text>{conn?.redirectBaseUrl}</Text>

      {conn.expireAt && (
        <>
          <Text $size={12} $weight={600}>
            {t('Expire at ')}
          </Text>
          <Text>{toAppDateFormat(isNumber(conn.expireAt) ? conn.expireAt : new Date(conn.expireAt))}</Text>
        </>
      )}
      {conn.description && (
        <>
          <Text $size={12} $weight={600}>
            {t('Description')}
          </Text>

          <Text>{conn.description}</Text>
        </>
      )}

      {!!conn.corsPolicy?.origins?.length && (
        <>
          <Text $size={12} $weight={600}>
            {t('Description')}
          </Text>

          {conn.corsPolicy?.origins?.map(item => {
            return <Tag key={item}>{item}</Tag>;
          })}
        </>
      )}

      <ActionsList conn={conn} />
    </FlexBox>
  );
};

const ActionsList = ({ conn }: { conn: OutputIntegrationEntity }) => {
  const modalS = useModalService();
  const theme = useTheme();
  return (
    <FlexUl>
      <ListItem>
        <StButton
          onClick={() => modalS.create(ModalOAuthConfigs, { conn })}
          endIcon={'arrowRight'}
          endIconSize={'16px'}
        >
          {'OAuth'}
        </StButton>
      </ListItem>

      <ListItem>
        <StButton
          onClick={() => modalS.create(FormCreateOutputIntegration, { conn })}
          endIcon={'arrowRight'}
          endIconSize={'16px'}
        >
          {t('Edit')}
        </StButton>
      </ListItem>

      <ListItem>
        <StButton
          onClick={() => modalS.create(OutputConnOverview, { conn })}
          endIcon={'arrowRight'}
          endIconSize={'16px'}
        >
          <Text color={theme.globals.colors.error}>{t('Delete')}</Text>
        </StButton>
      </ListItem>
    </FlexUl>
  );
};
const ListItem = styled(FlexLi)`
  &:not(:last-child) {
    border-bottom: 1px solid ${p => p.theme.modalBorderColor};
  }
`;
const StButton = styled(ButtonIcon)`
  justify-content: space-between;
  padding: 8px;
`;
