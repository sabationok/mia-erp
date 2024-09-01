import { InputIntegrationEntity } from '../../../types/integrations.types';
import { t } from '../../../i18e';
import { toAppDateFormat } from '../../../utils/date-time';
import FlexBox from '../../atoms/FlexBox';
import { Text } from '../../atoms/Text';
import ButtonIcon from '../../atoms/ButtonIcon';
import styled from 'styled-components';
import { isString } from 'lodash';

export interface IntegrationOverviewProps {
  info: InputIntegrationEntity;
  onSetAsDefaultPress?: () => void;
  onDeletePress?: () => void;
  onEditPress?: () => void;
  isDefault?: boolean;
}
const IntegrationOverview = ({
  info,
  isDefault,
  onSetAsDefaultPress,
  onEditPress,
  onDeletePress,
}: IntegrationOverviewProps) => {
  const rows: { title: string; value?: React.ReactNode }[] = [
    { title: t('Label'), value: info?.label },
    { title: t('Login'), value: info?.login },
    { title: t('Api-key'), value: info?.privateKeyMask || info?.apiKey },
    { title: t('Private key mask'), value: info?.privateKeyMask || info?.apiKey },
    // { title: t('Login'), value: '' },
    { title: t('Description'), value: info?.description },
    {
      title: t('Expired at'),
      value: isString(info?.expireAt) ? toAppDateFormat(new Date(info?.expireAt).valueOf()) : null,
    },
  ];

  return (
    <Card fillWidth gap={12}>
      <FlexBox flex={1} padding={'4px 0'} gap={8}>
        {rows.map(
          info =>
            info?.value && (
              <FlexBox key={info.title} padding={'4px 6px'}>
                <Text $size={12}>{info.title}</Text>

                <Text $align={'end'} $size={13} $weight={500}>
                  {info?.value}
                </Text>
              </FlexBox>
            )
        )}
      </FlexBox>

      <FlexBox
        gap={8}
        fillWidth
        alignItems={'center'}
        fxDirection={'row'}
        padding={'8px 0'}
        justifyContent={'space-between'}
      >
        <ButtonIcon variant={'filled'} sizeType={'extraSmall'} onClick={onDeletePress} disabled={!onDeletePress} danger>
          {t('Delete')}
        </ButtonIcon>

        <ButtonIcon
          variant={'outlined'}
          sizeType={'extraSmall'}
          onClick={onSetAsDefaultPress}
          disabled={isDefault || !onSetAsDefaultPress}
        >
          {t('Activate')}
        </ButtonIcon>

        <ButtonIcon variant={'text'} sizeType={'extraSmall'} onClick={onEditPress} disabled={!onEditPress}>
          {t('Edit')}
        </ButtonIcon>
      </FlexBox>
    </Card>
  );
};

const Card = styled(FlexBox)`
  // border: 1px solid ${p => (p.isActive ? p.theme.accentColor.base : p.theme.modalBorderColor)};
  // border-left-width: 3px;
`;

export default IntegrationOverview;
