import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import useAppSettings from 'redux/appSettings/useAppSettings.hook';
import { iconId } from 'data';

const ToggleThemeMode = () => {
  const { isDarkMode, toggleAppMode } = useAppSettings();

  return (
    <ButtonIcon

      variant='defNoEffects'
      iconSize='20px'
      size='100%'
      iconId={isDarkMode ? iconId.darkMode : iconId.lightMode}
      onClick={toggleAppMode}
    />
  );
};


export default ToggleThemeMode;
