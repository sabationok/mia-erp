import styled from 'styled-components';
import { useAppServiceProvider } from '../../hooks/useAppServices.hook';
import { AppModuleName } from '../../redux/reduxTypes.types';
import FlexBox from '../atoms/FlexBox';
import TagButtonsFilter from '../atoms/TagButtonsFilter';
import { AccentColorEnum, getAccentColor } from '../../theme/accentColors';
import { enumToFilterOptions, enumToTabs } from '../../utils/fabrics';
import { Text } from '../atoms/Text';
import { t } from '../../lang';
import { useMemo, useState } from 'react';
import TabSelector from '../atoms/TabSelector';

export interface AppSettingsProps {
  onClose?: () => void;
}

enum Tabs {
  Color = 'Color',
  Other = 'Other',
}
const tabOptions = enumToTabs(Tabs);
const accentColorsList = enumToFilterOptions(AccentColorEnum);
const AppSettings: React.FC<AppSettingsProps> = () => {
  const service = useAppServiceProvider()[AppModuleName.appSettings];
  const [currentTab, setCurrentTab] = useState(Tabs.Color);
  const colorsList = useMemo(() => {
    const data = accentColorsList.map(el => ({ ...el, color: getAccentColor(el.value).base }));

    return data;
  }, []);

  const renderTab = useMemo(() => {
    const _tabs = {
      [Tabs.Color]: () => {
        return (
          <FlexBox fillWidth gap={8} padding={'0 8px'}>
            <Text $padding={'4px 6px'} $size={12} $weight={600}>
              {t('Select color')}
            </Text>

            <TagButtonsFilter
              options={colorsList}
              numColumns={1}
              getButtonProps={button => {
                return {
                  colorSchema: getAccentColor(button.value),
                };
              }}
              onSelect={ev => {
                service.selectAccentColor(ev.value);
              }}
            />
          </FlexBox>
        );
      },
      [Tabs.Other]: () => null,
    };
    const render = _tabs[currentTab];
    return render ? render() : null;
  }, [colorsList, currentTab, service]);

  return (
    <Container>
      <TabSelector
        options={tabOptions}
        defaultFilterValue={currentTab}
        onSelect={opt => {
          opt.value && setCurrentTab(opt.value);
        }}
      />
      {renderTab}
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
