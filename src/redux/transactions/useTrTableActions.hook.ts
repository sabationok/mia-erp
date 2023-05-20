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
                title: 'Дохід',
                filterOptions,
                defaultState: { type: 'INCOME' },
                onSubmit: create,
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
                title: 'Переказ між рахунками',
                filterOptions,
                defaultState: { type: 'TRANSFER' },
                onSubmit: create,
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
                title: 'Витрата',
                filterOptions,
                defaultState: { type: 'EXPENSE' },
                onSubmit: create,
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