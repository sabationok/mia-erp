import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import { useTable } from './TableList';
import { Modals } from '../Modals/Modals';

const TableFilter = ({ btnSize = 26 }: { btnSize?: number }) => {
  const modal = useModalProvider();
  const { filterSelectors, onFilterSubmit, filterDefaultValues, filterTitle = 'Фільтрація даних таблиці' } = useTable();

  return (
    <ButtonIcon
      icon={'filterOff'}
      size={btnSize ? `${btnSize}px` : '26px'}
      iconSize="80%"
      variant="onlyIcon"
      onClick={() => {
        modal.openModal({
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
