import { UUID } from '../../../types/utils.types';
import { usePriceManagementSelector } from '../../../redux/selectors.store';
import { OnRowClickHandler } from '../../TableList/tableTypes.types';
import FlexBox from '../../atoms/FlexBox';
import TableList from '../../TableList/TableList';
import { priceListColumns } from '../../../data/priceManagement.data';
import { AccordionForm } from '../../atoms/FormArea/AccordionForm';

export const PriceListSelectFormArea = ({ onSelect }: { onSelect?: (info: UUID) => void; error?: string }) => {
  const { lists } = usePriceManagementSelector();

  const handleSelectPriceList: OnRowClickHandler = data => {
    data?.rowId && onSelect && onSelect(data?.rowId);
  };

  return (
    <AccordionForm expandable>
      <FlexBox fillWidth style={{ height: 250 }} padding={'8px 4px'} overflow={'hidden'}>
        <TableList
          tableTitles={priceListColumns}
          tableData={lists}
          hasSearch={false}
          onRowClick={handleSelectPriceList}
        />
      </FlexBox>
    </AccordionForm>
  );
};
