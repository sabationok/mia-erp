import FlexBox from '../../../atoms/FlexBox';
import ModalFilter from '../../../ModalForm/ModalFilter';
import { productsFilterOptions } from 'data/directories.data';
import TableList from '../../../TableList/TableList';
import { useOrdersSelector } from '../../../../redux/selectors.store';
import { useMemo, useState } from 'react';
import { orderSlotTableColumns } from 'data';

export interface OrderContentTabProps {}

const OrderContentTab: React.FC<OrderContentTabProps> = p => {
  const [currentTab, setCurrentTab] = useState<number>(0);

  const { currentOrder } = useOrdersSelector();

  const tableData = useMemo(() => {
    return currentOrder?.slots?.filter(el => el.product?.type === productsFilterOptions[currentTab]?.value);
  }, [currentOrder?.slots, currentTab]);

  return (
    <FlexBox fillWidth overflow={'hidden'} flex={1}>
      <ModalFilter
        filterOptions={productsFilterOptions}
        currentIndex={currentTab}
        onOptSelect={(_o, _v, i) => {
          setCurrentTab(i);
        }}
      />

      <TableList isSearch={false} isFilter={false} tableData={tableData} tableTitles={orderSlotTableColumns} />
    </FlexBox>
  );
};

export default OrderContentTab;
