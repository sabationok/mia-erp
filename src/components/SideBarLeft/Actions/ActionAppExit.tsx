import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import useAppSettings from 'hooks/useAppSettings.hook';

const ActionAppExit: React.FC = () => {
  const appSettings = useAppSettings();

  function handleExitApp() {
    const result = window.confirm('Бажаєте вийти?');

    if (result) {
      appSettings.resetApp();
    }
  }

  return (
    <ButtonIcon
      variant="def"
      icon={'logOut'}
      iconSize="20px"
      style={{ width: '100%', height: '32px' }}
      onClick={handleExitApp}
    />
  );
};
export default ActionAppExit;
