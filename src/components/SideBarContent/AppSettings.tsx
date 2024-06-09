import styled from 'styled-components';
import { useAppServiceProvider } from '../../hooks/useAppServices.hook';
import { AppModuleName } from '../../redux/reduxTypes.types';
import FlexBox from '../atoms/FlexBox';
import TagButtonsFilter from '../atoms/TagButtonsFilter';
import { AccentColorEnum, getAccentColor } from '../../theme/accentColors';
import { enumToFilterOptions } from '../../utils/fabrics';
import { Text } from '../atoms/Text';
import { t } from '../../lang';
import { useMemo } from 'react';

export interface AppSettingsProps {
  onClose?: () => void;
}

const accentColorsList = enumToFilterOptions(AccentColorEnum);
const AppSettings: React.FC<AppSettingsProps> = () => {
  const service = useAppServiceProvider()[AppModuleName.appSettings];
  const colorsList = useMemo(() => {
    const data = accentColorsList.map(el => ({ ...el, color: getAccentColor(el.value).base }));

    return data;
  }, []);

  return (
    <Container>
      <li>
        <FlexBox fillWidth gap={8} padding={'0 8px'}>
          <Text $padding={'4px 6px'} $size={12} $weight={600}>
            {t('Select color')}
          </Text>

          <TagButtonsFilter
            options={colorsList}
            numColumns={2}
            onSelect={ev => {
              service.selectAccentColor(ev.value);
            }}
          />
        </FlexBox>
      </li>
    </Container>
  );
};

const Container = styled.ul`
  display: grid;
  grid-template-columns: 1fr;

  width: 100%;
  max-width: 100%;

  /* background-color: ${({ theme }) => theme.backgroundColorSecondary}; */
`;
export default AppSettings;
