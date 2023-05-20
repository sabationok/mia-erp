import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import { iconId } from 'data';

import AppFilter, { FilterProps } from 'components/Filter/AppFilter';
import { useTable } from '../TableList';

const TableFilter = () => {
  const modal = useModalProvider();
  const {
    filterSelectors,
    onFilterSubmit,
    filterDefaultValues,
    filterTitle = 'Фільтрація даних таблиці',
  } = useTable();

  return (
    <ButtonIcon
      iconId={iconId.filterOff}
      size="28px"
      iconSize="26px"
      variant="onlyIcon"
      onClick={() => {
        modal.handleOpenModal<FilterProps>({
          ModalChildren: AppFilter,
          modalChildrenProps: {
            title: filterTitle,
            filterSelectors,
            onFilterSubmit,
            filterDefaultValues,
          },
        });
      }}
    />
  );
};

export default TableFilter;
