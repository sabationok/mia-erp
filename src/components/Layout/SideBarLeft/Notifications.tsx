import ButtonIcon from 'components/ButtonIcon/ButtonIcon';
import { iconId } from 'data';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
// import ModalDefault from 'components/ModalDefault/ModalDefault';

const OpenNotifications: React.FC = () => {
  const modal = useModalProvider();
  return (
    <ButtonIcon
      iconSize="20px"
      style={{ width: '100%', height: '32px' }}
      iconId={iconId.notifications}
      variant="pointerLeft"
      onClick={() => {
        modal.handleOpenModal({
          ModalChildren: () => null,
          modalChildrenProps: { title: 'Сповіщення' },
        });
      }}
    />
  );
};

export default OpenNotifications;
