import { IModalProviderContext, useModalProvider } from '../components/ModalProvider/ModalProvider';
import { UseFinancesService } from './useTransactionsService.hook';

import { filterOptions } from '../data/transactions.data';
import { ITableAction, ITableListContext, TableActionCreator } from '../components/TableList/tableTypes.types';
import { ITransaction } from '../types/finances/transactions.types';

import { useTransactionsSelector } from '../redux/selectors.store';
import { toast } from 'react-toastify';
import { Modals } from '../components/Modals/Modals';
import { IFinTransactionsState } from '../redux/finances/finances.slice';

export interface TransactionsTablesActionProps {
  ctx: ITableListContext<ITransaction>;
  service: UseFinancesService;
  state: IFinTransactionsState;
  modalService: IModalProviderContext;
}
export type ITransactionsTableAction = ITableAction<string>;
export type TransactionsActionCreator = (options: TransactionsTablesActionProps) => ITransactionsTableAction;
export type TrActionsCreator = TableActionCreator<ITransaction>;

const createEditTransactionAction = ({
  ctx,
  service,
  modalService,
  state,
}: TransactionsTablesActionProps): ITransactionsTableAction => ({
  name: 'editTr',
  title: 'Редагування транзакції',
  icon: 'edit',
  disabled: !ctx.selectedRow?._id,
  type: 'onlyIcon',
  onClick: async () => {
    const tr = state.transactions.find(el => el._id === ctx.selectedRow?._id);

    const modal = modalService.openModal({
      Modal: Modals.FormCreateTransaction,
      props: {
        title: 'Редагування транзакції',
        filterOptions,
        defaultOption: filterOptions.findIndex(el => el.value === tr?.type),
        defaultState: tr,
        fillHeight: true,
        onSubmit: (data, o) => {
          service.updateById({
            data,
            onSuccess(d) {
              o?.close && modal?.onClose();
            },
          });
        },
      },
    });
  },
});
const createCopyTransactionAction = ({
  ctx,
  service,
  modalService,
  state,
}: TransactionsTablesActionProps): ITransactionsTableAction => ({
  name: 'copyTr',
  title: 'Копіювання транзакції',
  icon: 'copy',
  type: 'onlyIcon',
  disabled: !ctx.selectedRow?._id,
  onClick: async () => {
    const tr = state.transactions.find(el => el._id === ctx.selectedRow?._id);

    const modal = modalService.openModal({
      Modal: Modals.FormCreateTransaction,
      props: {
        title: 'Копіювання транзакції',
        filterOptions,
        defaultOption: filterOptions.findIndex(el => el.value === tr?.type),
        defaultState: tr,
        fillHeight: true,
        onSubmit: (data, o) => {
          service.create({
            data,
            onSuccess(d) {
              toast.success(`Транзакцію створено`);
              o?.close && modal?.onClose();
            },
          });
        },
      },
    });
  },
});
const createDeleteTransactionAction = ({
  ctx,
  service,
  modalService,
  state,
}: TransactionsTablesActionProps): ITransactionsTableAction => ({
  name: 'deleteTr',
  title: 'Видалення транзакції',
  icon: 'delete',
  iconSize: '90%',
  type: 'onlyIcon',
  disabled: !ctx.selectedRow?._id,
  onClick: () => {
    service.deleteById({
      data: ctx.selectedRow?._id,
    });
  },
});
const createAddIncomeTransactionAction = ({
  ctx,
  service,
  modalService,
  state,
}: TransactionsTablesActionProps): ITransactionsTableAction => ({
  name: 'createIncomeTr',
  title: 'Дохід',
  icon: 'INCOME',
  iconSize: '90%',
  type: 'onlyIconFilled',
  disabled: false,
  onClick: () => {
    const modal = modalService.openModal({
      Modal: Modals.FormCreateTransaction,
      props: {
        title: 'Створити',
        filterOptions,
        defaultOption: 0,
        fillHeight: true,
        defaultState: { type: 'INCOME' },
        onSubmit: (data, o) => {
          service.create({
            data,
            onSuccess(d) {
              o?.close && modal?.onClose();
            },
          });
        },
      },
    });
  },
});
const createAddTransferTransactionAction = ({
  ctx,
  service,
  modalService,
  state,
}: TransactionsTablesActionProps): ITransactionsTableAction => ({
  name: 'createTransferTr',
  title: 'Переказ між рахунками',
  icon: 'TRANSFER',
  iconSize: '90%',
  type: 'onlyIconFilled',
  disabled: false,
  onClick: () => {
    const modal = modalService.openModal({
      Modal: Modals.FormCreateTransaction,
      props: {
        title: 'Створити нову',
        filterOptions,
        defaultOption: 1,
        fillHeight: true,
        defaultState: { type: 'TRANSFER' },
        onSubmit: (data, o) => {
          service.create({
            data,
            onSuccess(d) {
              o?.close && modal?.onClose();
            },
          });
        },
      },
    });
  },
});
const createAddExpenseTransactionAction = ({
  ctx,
  service,
  modalService,
  state,
}: TransactionsTablesActionProps): ITransactionsTableAction => ({
  name: 'createExpenseTr',
  title: 'Витрата',
  icon: 'EXPENSE',
  iconSize: '90%',
  type: 'onlyIconFilled',
  disabled: false,
  onClick: () => {
    const modal = modalService.openModal({
      Modal: Modals.FormCreateTransaction,
      props: {
        title: 'Створити',
        filterOptions,
        defaultOption: 2,
        defaultState: { type: 'EXPENSE' },
        onSubmit: (data, o) => {
          service.create({
            data,
            onSuccess(d) {
              o?.close && modal?.onClose();
            },
          });
        },
        fillHeight: true,
      },
    });
  },
});
const useTrActionsCreator = (service: UseFinancesService): TrActionsCreator => {
  const state = useTransactionsSelector();
  const modalService = useModalProvider();

  return ctx => {
    const actionParams: TransactionsTablesActionProps = {
      state,
      service,
      modalService,
      ctx,
    };
    return [
      createEditTransactionAction(actionParams),
      createCopyTransactionAction(actionParams),
      createDeleteTransactionAction(actionParams),
      { separator: true },
      createAddIncomeTransactionAction(actionParams),
      createAddTransferTransactionAction(actionParams),
      createAddExpenseTransactionAction(actionParams),
    ];
  };
};

export { useTrActionsCreator };
