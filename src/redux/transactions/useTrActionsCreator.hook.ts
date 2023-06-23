import { useModalProvider } from '../../components/ModalProvider/ModalProvider';
import { TransactionsService } from './useTransactionsService.hook';
import { useCallback } from 'react';

import { filterOptions } from '../../data/transactions.data';
import { TableActionCreator } from '../../components/TableList/tableTypes.types';
import { ITransaction } from './transactions.types';
import TransactionForm from '../../components/Forms/TransactionFormNew';
import { useTransactionsSelector } from '../selectors.store';
import { createApiCall, TransactionsApi } from '../../api';

export type TrActionsCreator = TableActionCreator<ITransaction>;
const useTrActionsCreator = (service: TransactionsService): TrActionsCreator => {
  const state = useTransactionsSelector();
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
              onSubmit: data => {
                service.editById({
                  data: { data, _id: ctx.selectedRow?._id as string },
                  onSuccess(d) {},
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
        disabled: !!ctx.selectedRow?._id,
        onClick: async () => {
          // const res = service.getById({ data: ctx.selectedRow?._id || '6s1df5b1s6d5f1b6sd5g1b6sd51f6' });
          const apiRes = createApiCall(
            {
              data: 'f1vs6df16sdf1b',
              logError: true,
            },
            TransactionsApi.getById,
            TransactionsApi
          );

          const modal = modals.handleOpenModal({
            ModalChildren: TransactionForm,
            modalChildrenProps: {
              title: 'Копіювання транзакції',
              filterOptions,
              defaultState: state.transactions.find(el => el._id === ctx.selectedRow?._id),
              onSubmit: () => {
                service.create({
                  onSuccess(d) {},
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
            data: ctx.selectedRow?._id,
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
                service.create({
                  data: { data },
                  onSuccess(d) {},
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
              onSubmit: data => {
                service.create({
                  data: { data },
                  onSuccess(d) {},
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
              onSubmit: data => {
                service.create({
                  data: { data },
                  onSuccess(d) {},
                });
              },
              fillHeight: true,
            },
          });
        },
      },
    ],

    [modals, service, state.transactions]
  );
};

export { useTrActionsCreator };
