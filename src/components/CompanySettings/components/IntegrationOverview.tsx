import { ExtIntegrationBase } from '../../../redux/integrations/integrations.types';
import { t } from '../../../lang';
import { checks } from '../../../utils';
import { formatDate } from '../../../utils/dateTime.utils';
import FlexBox from '../../atoms/FlexBox';
import { Text } from '../../atoms/Text';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import styled from 'styled-components';

export interface IntegrationOverviewProps {
  info: ExtIntegrationBase;
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
    { title: t('Api-key'), value: info?.apiKey },
    { title: t('Has secret key'), value: t(info?.hasSecret ? 'Yes' : 'No') },
    // { title: t('Login'), value: '' },
    { title: t('Description'), value: info?.description },
    {
      title: t('Expired at'),
      value: checks.isStr(info?.expiredAt) ? formatDate(new Date(info?.expiredAt).valueOf()) : null,
    },
  ];

  return (
    <Card fxDirection={'row'} padding={'4px'} borderRadius={'4px'} fillWidth>
      <FlexBox flex={1} padding={'4px'} gap={8}>
        {rows.map(
          info =>
            info?.value && (
              <FlexBox key={info.title}>
                <Text $size={12} $weight={600}>
                  {info.title}
                </Text>

                <Text>{info?.value}</Text>
              </FlexBox>
            )
        )}
      </FlexBox>

      <FlexBox gap={6}>
        <ButtonIcon
          variant={'textExtraSmall'}
          onClick={onSetAsDefaultPress}
          disabled={isDefault || !onSetAsDefaultPress}
        >
          {t('Activate')}
        </ButtonIcon>
        <ButtonIcon variant={'textExtraSmall'} onClick={onDeletePress} disabled={!onDeletePress}>
          {t('Delete')}
        </ButtonIcon>
        <ButtonIcon variant={'textExtraSmall'} onClick={onEditPress} disabled={!onEditPress}>
          {t('Edit')}
        </ButtonIcon>
      </FlexBox>
    </Card>
  );
};

const Card = styled(FlexBox)`
  border: 1px solid ${p => (p.isActive ? p.theme.accentColor.base : p.theme.modalBorderColor)};
  border-left-width: 3px;
`;

export default IntegrationOverview;
