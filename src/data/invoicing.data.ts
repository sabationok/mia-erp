import { CellTittleProps } from '../components/TableList/TebleCells/CellTitle';
import { IInvoice } from '../types/invoices.types';
import { t } from '../lang';
import { enumToFilterOptions, numberWithSpaces } from '../utils';
import { PaymentInternalTypeEnum } from '../types/integrations.types';
import { pick } from 'lodash';

export const invMethodCategoryFilterOptions = enumToFilterOptions(
  pick(PaymentInternalTypeEnum, ['externalService', 'bankTransfer', 'imposedPayment'])
);

const dateColumn: CellTittleProps = {
  top: { name: t('Updated'), align: 'center', getData: d => d?.createdAt },
  bottom: { name: t('Created'), align: 'center', getData: d => d?.updatedAt },
  width: '170px',
  action: 'dateDbl',
};
export const invoicesTableColumns: CellTittleProps<IInvoice>[] = [
  {
    top: { name: t('Status') + '/' + t('Internal'), getData: rd => rd.status?.internal },
    bottom: { name: t('Status') + '/' + t('External'), getData: rd => rd.status?.external },
    action: 'status',
    width: '150px',
  },
  {
    top: { name: t('Method'), getData: rd => rd?.method?.label },
    bottom: { name: t('Service'), getData: rd => rd?.method?.service?.label },
    action: 'valueByPath',
    width: '150px',
  },
  {
    top: {
      name: t('Amount end'),
      align: 'end',
      getData: rd => numberWithSpaces(Number(rd?.totals?.amountEnd ?? 0)) + ' ' + rd?.totals?.currency,
    },
    bottom: {
      name: t('Amount start'),
      align: 'end',
      getData: rd => numberWithSpaces(Number(rd?.totals?.amountStart ?? 0)) + ' ' + rd?.totals?.currency,
    },
    action: 'valueByPath',
    width: '150px',
  },
  {
    top: { name: t('Payed'), getData: () => `` },
    bottom: { name: t(''), getData: () => `` },
    action: 'valueByPath',
    width: '150px',
  },

  {
    top: {
      name: t('Bonus used'),
      align: 'end',
      getData: rd => numberWithSpaces(Number(rd?.totals?.bonusUsed ?? 0)) + ' ' + rd?.totals?.bonusUsed,
    },
    bottom: {
      name: t('Bonus accrued'),
      align: 'end',
      getData: rd => numberWithSpaces(Number(rd?.totals?.bonusAccrued ?? 0)) + ' ' + rd?.totals?.bonusAccrued,
    },
    action: 'valueByPath',
    width: '150px',
  },

  {
    top: { name: t('Reference') + '/' + t('Internal'), getData: rd => rd?.reference?.internal },
    bottom: { name: t('Reference') + '/' + t('External'), getData: rd => rd?.reference?.external },
    action: 'valueByPath',
    width: '210px',
  },
  {
    top: { name: t('Due date'), getData: d => d?.date?.due },
    bottom: { name: t('Expected date'), getData: d => d?.date?.expected },
    action: 'dateDbl',
    width: '170px',
  },
  dateColumn,
];
