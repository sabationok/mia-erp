import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import { iconId } from 'data';
import { useTable } from './TableList';
import { Modals } from '../ModalProvider/Modals';

const TableFilter = ({ btnSize = 26 }: { btnSize?: number }) => {
  const modal = useModalProvider();
  const { filterSelectors, onFilterSubmit, filterDefaultValues, filterTitle = 'Фільтрація даних таблиці' } = useTable();

  return (
    <ButtonIcon
      iconId={iconId.filterOff}
      size={btnSize ? `${btnSize}px` : '26px'}
      iconSize="80%"
      variant="onlyIcon"
      onClick={() => {
        modal.handleOpenModal({
          Modal: Modals.AppFilter,
          props: {
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
