import ModalForm, { ModalFormProps } from '../../ModalForm';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { IProduct } from '../../../redux/products/products.types';
import { OnlyUUID } from '../../../redux/global.types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ITableListProps } from '../../TableList/tableTypes.types';
import TableList from '../../TableList/TableList';
import { productsColumns } from '../../../data';
import { createApiCall, ProductsApi } from '../../../api';
import { useForm } from 'react-hook-form';
import { t } from '../../../lang';

export interface SelectProductModalProps extends Omit<ModalFormProps, 'onSubmit' | 'onSelect'> {
  onSubmit?: AppSubmitHandler<IProduct>;
  selected?: OnlyUUID;
}

interface SelectProductModalFormData {
  search?: string;
  searchBy?: string;
}
const SelectProductModal: React.FC<SelectProductModalProps> = ({ selected, onSubmit, ...props }) => {
  const [tableData, setTableData] = useState<IProduct[]>([]);
  const { watch, setValue } = useForm<SelectProductModalFormData>();
  const { search, searchBy } = watch();

  const loadData = useCallback(() => {
    createApiCall(
      {
        data: { search, searchBy },
        onSuccess: setTableData,
      },
      ProductsApi.getAll,
      ProductsApi
    );
  }, [search, searchBy]);

  const tableConfig = useMemo(
    (): ITableListProps<IProduct> => ({
      tableTitles: productsColumns,
      tableSearchParams: [
        { dataPath: 'label', label: t('label') },
        { dataPath: 'sku', label: t('sku') },
      ],
      onSubmitSearch: data => {
        setValue('search', data.search);
        setValue('searchBy', data.searchParam?.dataPath);
      },
    }),
    [setValue]
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <ModalForm fillWidth fillHeight {...props}>
      <TableList {...tableConfig} tableData={tableData} />
    </ModalForm>
  );
};
export default SelectProductModal;
