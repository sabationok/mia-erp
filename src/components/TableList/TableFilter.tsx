import ButtonIcon from 'components/atoms/ButtonIcon';
import { useModalProvider } from 'Providers/ModalProvider/ModalProvider';
import { useTable } from './TableList';
import AppFilter from '../Filter/AppFilter';

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
        modal.create(AppFilter, {
          title: filterTitle,
          filterSelectors,
          onFilterSubmit,
          filterDefaultValues,
        });
      }}
    />
  );
};

export default TableFilter;
