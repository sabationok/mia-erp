import { FormCreatePriceProps } from '../../Forms/FormCreatePriceList';
import ModalForm, { ModalFormProps } from '../../ModalForm';
import TableList, { ITableListProps } from '../../TableList/TableList';
import { useMemo, useState } from 'react';
import { IPriceList, IPriceListItem } from '../../../redux/priceManagement/priceManagement.types';
import { UseAppFormAfterSubmitOptions } from '../../../hooks/useAppForm.hook';
import { useAppForm } from '../../../hooks';

export interface PriceListOverviewProps extends Omit<ModalFormProps, 'onSubmit' | 'afterSubmit'> {
  createFormProps?: FormCreatePriceProps;
  priceList?: IPriceList;
  getTableSetting: (priseList?: IPriceList) => ITableListProps<IPriceListItem>;
  onSubmit?: (
    data: IPriceListItem[],
    options: UseAppFormAfterSubmitOptions & {
      onSuccess: (newData: IPriceList) => void;
      onLoading: (l: boolean) => void;
    }
  ) => void;
}

const PriceListOverview: React.FC<PriceListOverviewProps> = ({
  getTableSetting,
  createFormProps,
  priceList,
  onSubmit,
  ...props
}) => {
  const [state, setState] = useState<IPriceList>();
  const { formValues, formState, clearAfterSave, closeAfterSave } = useAppForm({ defaultValues: state });
  const tableSettings = useMemo(
    (): ITableListProps<IPriceListItem> => ({ ...getTableSetting(formValues) }),
    [formValues, getTableSetting]
  );

  const onValidSubmit = (data: IPriceListItem[]) => {
    onSubmit &&
      onSubmit(data, {
        clearAfterSave,
        closeAfterSave,
        onLoading: l => {},
        onSuccess: d => {},
      });
  };

  return (
    <ModalForm {...props}>
      <TableList {...tableSettings} />
    </ModalForm>
  );
};
export default PriceListOverview;
