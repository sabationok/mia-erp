import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import useAppSettings from 'hooks/useAppSettings.hook';
import { useAppSettingsSelector } from '../../../redux/selectors.store';

const ToggleThemeMode = () => {
  const { toggleAppMode } = useAppSettings();
  const { isDarkMode } = useAppSettingsSelector();

  return (
    <ButtonIcon
      variant="defNoEffects"
      iconSize="20px"
      size="100%"
      icon={isDarkMode ? 'darkMode' : 'lightMode'}
      onClick={toggleAppMode}
    />
  );
};

export default ToggleThemeMode;
