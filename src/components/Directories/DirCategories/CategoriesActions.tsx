import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import { iconId } from 'data';
import React from 'react';
import FormCreateCount, { FormCreateCategoryProps } from './FormCreateCategory';

export interface CategoriesActionsProps extends FormCreateCategoryProps {
  // type: 'ACTIVE' | 'PASIIVE';
  // owner?: string;
  // _id?: string;
  iconId?: keyof typeof iconId;
  filled?: boolean;
}

const CategoriesActions: React.FC<CategoriesActionsProps> = ({ iconId = 'plus', filled, ...props }) => {
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

export default CategoriesActions;
