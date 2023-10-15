import { ICustomer } from '../../../../redux/customers/customers.types';
import ModalForm, { ModalFormProps } from '../../../ModalForm';
import { AppSubmitHandler } from '../../../../hooks/useAppForm.hook';
import { useEffect, useMemo } from 'react';
import { ITableListProps } from '../../../TableList/tableTypes.types';
import { customersColumns } from '../../../../data/customers.data';
import { t } from '../../../../lang';
import TableList from '../../../TableList/TableList';
import { useCustomersSelector } from '../../../../redux/selectors.store';
import { useModalService } from '../../../ModalProvider/ModalProvider';
import { ServiceName, useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import FormCreateCustomer from '../../FormCreateCustomer';

export interface SelectCustomerModalProps extends Omit<ModalFormProps, 'onSelect' | 'onSubmit'> {
  onSelect?: (customer: ICustomer) => void;
  onSubmit?: AppSubmitHandler<ICustomer>;
  asReceiver?: boolean;
}
const SelectCustomerModal: React.FC<SelectCustomerModalProps> = ({ onSelect, onSubmit, onClose, asReceiver, ...p }) => {
  const customers = useCustomersSelector().customers;
  const modalS = useModalService();
  const service = useAppServiceProvider()[ServiceName.customers];

  const tableConfigs = useMemo((): ITableListProps<ICustomer> => {
    return {
      tableData: customers,
      tableTitles: customersColumns,
      actionsCreator: ctx => {
        return [
          {
            icon: 'refresh',
            onClick: () => {
              service.getAll();
            },
          },
          {
            icon: 'plus',
            onClick: () => {
              modalS.open({
                ModalChildren: FormCreateCustomer,
                modalChildrenProps: {
                  onSubmit: d => {
                    service.create({ data: d });
                  },
                },
              });
            },
          },
        ];
      },
      onRowClick: data => {
        const fRes = customers.find(c => c._id === data?._id);

        fRes && onSelect && onSelect(fRes);

        onClose && onClose();
      },
    };
  }, [service, customers, onClose, modalS, onSelect]);

  useEffect(() => {
    service.getAll({
      data: { refresh: true, params: {} },
    });
    // eslint-disable-next-line
  }, []);

  return (
    <ModalForm
      fillWidth
      fillHeight
      title={t(asReceiver ? 'Select receiver' : 'Select customer')}
      onClose={onClose}
      {...p}
    >
      <TableList {...tableConfigs} />
    </ModalForm>
  );
};

export default SelectCustomerModal;
