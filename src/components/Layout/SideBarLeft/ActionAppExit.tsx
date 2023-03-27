import ButtonIcon from 'components/ButtonIcon/ButtonIcon';
import useAppSettings from 'redux/appSettings/useAppSettings.hook';

import { iconId } from 'data';

const ActionAppExit: React.FC = () => {
  const appSettings = useAppSettings();

  function handleExitApp() {
    const result = window.confirm('Бажаєте вийти?');

    if (result) {
      appSettings.reset();
    }
  }

  return (
    <ButtonIcon
      variant="def"
      iconId={iconId.logOut}
      iconSize="20px"
      style={{ width: '100%', height: '32px' }}
      onClick={handleExitApp}
    />
  );
};
export default ActionAppExit;
