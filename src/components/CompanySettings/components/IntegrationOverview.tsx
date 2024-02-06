import { InputIntegrationBase } from '../../../types/integrations.types';
import { t } from '../../../lang';
import { checks } from '../../../utils';
import { toAppDateFormat } from '../../../utils/date-time';
import FlexBox from '../../atoms/FlexBox';
import { Text } from '../../atoms/Text';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import styled from 'styled-components';

export interface IntegrationOverviewProps {
  info: InputIntegrationBase;
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
      value: checks.isStr(info?.expireAt) ? toAppDateFormat(new Date(info?.expireAt).valueOf()) : null,
    },
  ];

  return (
    <Card fillWidth>
      <FlexBox flex={1} padding={'4px 0'} gap={8}>
        {rows.map(
          info =>
            info?.value && (
              <FlexBox key={info.title}>
                <Text $size={10}>{info.title}</Text>

                <Text $size={12} $weight={500}>
                  {info?.value}
                </Text>
              </FlexBox>
            )
        )}
      </FlexBox>

      <FlexBox
        gap={6}
        fillWidth
        alignItems={'center'}
        fxDirection={'row'}
        padding={'8px 0'}
        justifyContent={'space-between'}
        xsStyles={{ fxDirection: 'column' }}
      >
        <ButtonIcon
          variant={'outlinedSmall'}
          onClick={onSetAsDefaultPress}
          disabled={isDefault || !onSetAsDefaultPress}
        >
          {t('Activate')}
        </ButtonIcon>

        <ButtonIcon variant={'textSmall'} onClick={onEditPress} disabled={!onEditPress}>
          {t('Edit')}
        </ButtonIcon>

        <ButtonIcon variant={'filledSmall'} onClick={onDeletePress} disabled={!onDeletePress}>
          {t('Delete')}
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
