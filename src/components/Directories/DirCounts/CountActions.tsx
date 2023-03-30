import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import { iconId } from 'data';
import React from 'react';
import FormCreateCount, { FormCreateCountProps } from './FormCreateCount';

export interface CountActionsProps extends FormCreateCountProps {
  // type: 'ACTIVE' | 'PASIIVE';
  // owner?: string;
  // _id?: string;
  iconId?: keyof typeof iconId;
  filled?: boolean;
}

const CountActions: React.FC<CountActionsProps> = ({ iconId = 'plus', filled, ...props }) => {
  const modal = useModalProvider();

  return (
    <ButtonIcon
      variant={filled ? 'onlyIconFilled' : 'onlyIcon'}
      iconId={iconId}
      size="26px"
      onClick={() => modal.handleOpenModal({ ModalChildren: FormCreateCount, modalChildrenProps: { ...props } })}
    />
  );
};

export default CountActions;
