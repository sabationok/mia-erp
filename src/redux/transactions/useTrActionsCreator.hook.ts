import { useModalProvider } from '../../components/ModalProvider/ModalProvider';
import { TransactionsService } from './useTransactionsService.hook';
import { useCallback } from 'react';

import { filterOptions } from '../../data/transactions.data';
import { TableActionCreator } from '../../components/TableList/tableTypes.types';
import { ITransaction } from './transactions.types';
import TransactionForm from '../../components/Forms/TransactionForm';

export type TrActionsCreator = TableActionCreator<ITransaction>;
const useTrActionsCreator = (service: TransactionsService): TrActionsCreator => {
  const modals = useModalProvider();

  return useCallback(
    ctx => [
      {
        name: 'editTr',
        title: 'Редагування транзакції',
        icon: 'edit',
        disabled: !ctx.selectedRow?._id,
        type: 'onlyIcon',
        onClick: () => {
          const modal = modals.handleOpenModal({
            ModalChildren: TransactionForm,
            modalChildrenProps: {
              title: 'Редагування транзакції',
              filterOptions,
              onSubmitEdit: () => {
                modal?.onClose();
                service.editById({
                  onSuccess(d) {
                    modal?.onClose();
                  },
                });
              },
              fillHeight: true,
            },
          });
        },
      },
      {
        name: 'copyTr',
        title: 'Копіювання транзакції',
        icon: 'copy',
        type: 'onlyIcon',
        disabled: !ctx.selectedRow?._id,
        onClick: () => {
          const modal = modals.handleOpenModal({
            ModalChildren: TransactionForm,
            modalChildrenProps: {
              title: 'Копіювання транзакції',
              filterOptions,
              onSubmit: () => {
                modal?.onClose();
                service.create({
                  onSuccess(d) {
                    modal?.onClose();
                  },
                });
              },
              fillHeight: true,
            },
          });
        },
      },
      {
        name: 'deleteTr',
        title: 'Видалення транзакції',
        icon: 'delete',
        iconSize: '90%',
        type: 'onlyIcon',
        disabled: !ctx.selectedRow?._id,
        onClick: () => {
          service.deleteById({
            data: 'id',
            onSuccess: d => {
              console.log(d);
            },
          });
        },
      },
      { separator: true },
      {
        name: 'createIncomeTr',
        title: 'Дохід',
        icon: 'INCOME',
        iconSize: '90%',
        type: 'onlyIconFilled',
        disabled: false,
        onClick: () => {
          const modal = modals.handleOpenModal({
            ModalChildren: TransactionForm,
            modalChildrenProps: {
              title: 'Створити нову',
              filterOptions,
              defaultOption: 0,
              defaultState: { type: 'INCOME' },
              onSubmit: data => {
                modal?.onClose();
                service.create({
                  onSuccess(d) {
                    modal?.onClose();
                  },
                });
              },
              fillHeight: true,
            },
          });
        },
      },
      {
        name: 'createTransferTr',
        title: 'Переказ між рахунками',
        icon: 'TRANSFER',
        iconSize: '90%',
        type: 'onlyIconFilled',
        disabled: false,
        onClick: () => {
          const modal = modals.handleOpenModal({
            ModalChildren: TransactionForm,
            modalChildrenProps: {
              title: 'Створити нову',
              filterOptions,
              defaultOption: 1,
              defaultState: { type: 'TRANSFER' },
              onSubmit: d => {
                modal?.onClose();

                service.create({
                  data: { data: d },
                  onSuccess(d) {
                    modal?.onClose();
                  },
                });
              },
              fillHeight: true,
            },
          });
        },
      },
      {
        name: 'createExpenseTr',
        title: 'Витрата',
        icon: 'EXPENSE',
        iconSize: '90%',
        type: 'onlyIconFilled',
        disabled: false,
        onClick: () => {
          const modal = modals.handleOpenModal({
            ModalChildren: TransactionForm,
            modalChildrenProps: {
              title: 'Створити',
              filterOptions,
              defaultOption: 2,
              defaultState: { type: 'EXPENSE' },
              onSubmit: d => {
                modal?.onClose();
                service.create({
                  onSuccess(d) {
                    modal?.onClose();
                  },
                });
              },
              fillHeight: true,
            },
          });
        },
      },
    ],

    [modals, service]
  );
};

export type useTrActionsCreatorHookType = typeof useTrActionsCreator;

export { useTrActionsCreator };
