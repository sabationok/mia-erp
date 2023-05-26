import { useModalProvider } from '../../components/ModalProvider/ModalProvider';
import { TransactionsService } from './useTransactionsService.hook';
import { useMemo } from 'react';
import { iconId } from '../../img/sprite';
import TransactionForm from '../../components/Forms/TransactionForm';
import { filterOptions } from '../../data/transactions.data';

export const useTrActions = (transactionService: TransactionsService) => {
  const modal = useModalProvider();
  const { editById, create, deleteById } = transactionService;

  return useMemo(
    () => ({
      top: [
        {
          name: 'editTr',
          title: 'Редагування транзакції',
          iconId: iconId.edit,
          onClick: () => {
            modal.handleOpenModal({
              ModalChildren: TransactionForm,
              modalChildrenProps: {
                title: 'Редагування транзакції',
                filterOptions,
                onSubmitEdit: editById,
                fillHeight: true,
              },
            });
          },

          disableCheck: () => false,
        },
        {
          name: 'copyTr',
          title: 'Копіювання транзакції',
          iconId: iconId.copy,
          onClick: () => {
            modal.handleOpenModal({
              ModalChildren: TransactionForm,
              modalChildrenProps: {
                title: 'Копіювання транзакції',
                filterOptions,
                onSubmit: create,
                fillHeight: true,
              },
            });
          },
          disableCheck: () => false,
        },
        {
          name: 'deleteTr',
          title: 'Видалення транзакції',
          iconId: iconId.delete,
          iconSize: '90%',
          onClick: (id: string) => {
            deleteById(id);
          },
          disableCheck: () => true,
        },
      ],
      bottom: [
        {
          name: 'createIncomeTr',
          title: 'Дохід',
          iconId: iconId.INCOME,
          iconSize: '90%',
          onClick: () => {
            modal.handleOpenModal({
              ModalChildren: TransactionForm,
              modalChildrenProps: {
                title: 'Створити нову',
                filterOptions,
                defaultOption: 0,
                defaultState: { type: 'INCOME' },
                onSubmit: create,
                fillHeight: true,
              },
            });
          },
          disableCheck: () => false,
        },
        {
          name: 'createTransferTr',
          title: 'Переказ між рахунками',
          iconId: iconId.TRANSFER,
          iconSize: '90%',
          onClick: () => {
            modal.handleOpenModal({
              ModalChildren: TransactionForm,
              modalChildrenProps: {
                title: 'Створити нову',
                filterOptions,
                defaultOption: 1,
                defaultState: { type: 'TRANSFER' },
                onSubmit: create,
                fillHeight: true,
              },
            });
          },
          disableCheck: () => false,
        },
        {
          name: 'createExpenseTr',
          title: 'Витрата',
          iconId: iconId.EXPENSE,
          iconSize: '90%',
          onClick: () => {
            modal.handleOpenModal({
              ModalChildren: TransactionForm,
              modalChildrenProps: {
                title: 'Створити нову',
                filterOptions,
                defaultOption: 2,
                defaultState: { type: 'EXPENSE' },
                onSubmit: create,
                fillHeight: true,
              },
            });
          },
          disableCheck: () => false,
        },
      ],
    }),
    [create, deleteById, editById, modal]
  );
};
