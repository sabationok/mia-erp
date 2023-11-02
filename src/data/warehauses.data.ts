import { CellTittleProps } from '../components/TableList/TebleCells/CellTitle';
import { IProductInventory, IWarehouse } from '../redux/warehouses/warehouses.types';
import { t } from '../lang';
import numberWithSpaces from '../utils/numbers';

export const warehousesTableColumns: CellTittleProps<IWarehouse>[] = [
  {
    top: { name: t('label'), getData: rd => rd.label },
    bottom: { name: t('code'), getData: rd => rd.code },
    width: '220px',
    action: 'valueByPath',
  },
  {
    top: { name: t('type'), getData: rd => rd?.type },
    // bottom: { name: 'Статус' },
    width: '125px',
    action: 'valueByPath',
  },
  {
    top: { name: t('email') },
    bottom: { name: t('phone') },
    width: '180px',
    action: 'contacts',
  },
  {
    top: { name: t('Address'), getData: rd => rd.address || 'не визначено' },
    bottom: {
      name: `${t('longitude')}/${t('latitude')}`,
      getData: rd => `${(rd.location?.longitude || '---') + ', ' + (rd.location?.latitude || '---')}`,
    },
    width: '175px',
    action: 'valueByPath',
  },
  {
    top: { name: t('manager'), getData: rd => `${rd.manager?.user?.name || '---'}` },
    bottom: { name: t('email'), getData: rd => `${rd.manager?.user?.email || '---'}` },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: t('updated'), align: 'center', path: 'updatedAt' },
    bottom: { name: t('created'), align: 'center', path: 'createdAt' },
    width: '150px',
    action: 'dateSimple',
  },
];
export const warehouseOverviewTableColumns: CellTittleProps<IProductInventory>[] = [
  {
    top: { name: t('variationLabel'), getData: rd => rd.variation?.label },
    getImgPreview: d => (d.product?.images ? d.product?.images[0]?.img_preview : ''),
    width: '270px',
    action: 'doubleDataWithAvatar',
  },
  {
    top: { name: t('sku'), getData: rd => rd.variation?.sku },
    bottom: { name: t('barCode'), getData: rd => rd.variation?.barCode },
    width: '200px',
    action: 'valueByPath',
  },
  {
    top: { name: t('type'), path: 'type' },
    bottom: { name: t('status'), path: 'status' },
    width: '120px',
    action: 'status',
  },
  {
    top: { name: 'Наявність', align: 'end', getData: rd => rd.stock || 0 },
    bottom: { name: 'Резерв', align: 'end', getData: rd => rd.reserved || 0 },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Очікується', align: 'end', getData: rd => rd?.awaiting || 0 },
    bottom: { name: 'Втрачено', align: 'end', getData: rd => rd?.lost || 0 },
    width: '150px',
    action: 'valueByPath',
  },
  // {
  //   top: { name: 'Бренд' },
  //   bottom: { name: 'Виробник' },
  //   width: '150px',
  //   action: 'valueByPath',
  // },
  {
    top: { name: t('warehouse'), getData: rd => rd.warehouse?.label },
    bottom: { name: t('code'), getData: rd => rd.warehouse?.code },
    width: '170px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Опис', path: 'description' },
    width: '190px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Автор', path: 'author.name' },
    bottom: { name: 'Емейл', path: 'author.email' },
    width: '190px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Створено', align: 'center', path: 'createdAt' },
    bottom: { name: 'Оновлено', align: 'center', path: 'updatedAt' },
    width: '150px',
    action: 'dateSimple',
  },
];
export const warehousesTableColumnsForOrderCreateOrderSlotForm: CellTittleProps[] = [
  {
    top: { name: 'Склад' },
    bottom: { name: 'Номер' },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Залишок' },
    bottom: { name: 'Резерв' },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Локація' },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Інфо' },
    width: '150px',
    action: 'valueByPath',
  },
];

const batchPricesColumns: CellTittleProps<IProductInventory>[] = [
  {
    top: { name: t('Price OUT'), align: 'end', getData: d => numberWithSpaces(Number(d?.price?.in || 0)) },
    bottom: { name: t('Price IN'), align: 'end', getData: d => numberWithSpaces(Number(d?.price?.out || 0)) },
    width: '170px',
    action: 'valueByPath',
  },
  // {
  //   top: {
  //     name: t('Commission, amount'),
  //     align: 'end',
  //     getData: d => numberWithSpaces(Number(d?.price?.commissionAmount || 0)),
  //   },
  //   bottom: {
  //     name: t('Commission, %'),
  //     align: 'end',
  //     getData: d => numberWithSpaces(Number(d?.price?.commissionPercentage || 0)),
  //   },
  //   width: '170px',
  //   action: 'valueByPath',
  // },
  // {
  //   top: {
  //     name: t('Markup, amount'),
  //     align: 'end',
  //     getData: d => numberWithSpaces(Number(d?.price?.markupAmount || 0)),
  //   },
  //   bottom: {
  //     name: t('Markup, %'),
  //     align: 'end',
  //     getData: d => numberWithSpaces(Number(d?.price?.markupPercentage || 0)),
  //   },
  //   width: '170px',
  //   action: 'valueByPath',
  // },
  // {
  //   top: {
  //     name: t('Discount, amount'),
  //     align: 'end',
  //     getData: d => numberWithSpaces(Number(d?.price?.discountAmount || 0)),
  //   },
  //   bottom: {
  //     name: t('Discount, %'),
  //     align: 'end',
  //     getData: d => numberWithSpaces(Number(d?.price?.discountPercentage || 0)),
  //   },
  //   width: '170px',
  //   action: 'valueByPath',
  // },
  // {
  //   top: {
  //     name: t('Bonus, amount'),
  //     align: 'end',
  //     getData: d => numberWithSpaces(Number(d?.price?.cashbackAmount || 0)),
  //   },
  //   bottom: {
  //     name: t('Bonus, %'),
  //     align: 'end',
  //     getData: d => numberWithSpaces(Number(d?.price?.cashbackPercentage || 0)),
  //   },
  //   width: '170px',
  //   action: 'valueByPath',
  // },
  // {
  //   top: {
  //     name: t('Cashback, amount'),
  //     align: 'end',
  //     getData: d => numberWithSpaces(Number(d?.price?.cashbackAmount || 0)),
  //   },
  //   bottom: {
  //     name: t('Cashback, %'),
  //     align: 'end',
  //     getData: d => numberWithSpaces(Number(d?.price?.cashbackPercentage || 0)),
  //   },
  //   width: '170px',
  //   action: 'valueByPath',
  // },
  {
    top: { name: t('comment'), align: 'start', path: 'description' },
    width: '150px',
    action: 'valueByPath',
  },
];

export const warehouseBatchColumns: CellTittleProps<IProductInventory>[] = [
  {
    top: { name: t('batch') },
    // bottom: { name: t('code') },
    width: '150px',
    action: 'valueByPath',
  },
  // {
  //   top: { name: t('Variation label') },
  //   bottom: { name: t('Product label') },
  //   getImgPreview: d =>
  //     d.product?.images
  //       ? d.product?.images[0]?.img_preview
  //       : d.variation?.product?.images
  //       ? d.variation?.product?.images[0]?.img_preview
  //       : '',
  //   width: '270px',
  //   action: 'doubleDataWithAvatar',
  // },
  // {
  //   top: { name: `${t('SKU')}/${t('barCode')}`, getData: () => '---/---' },
  //   bottom: { name: `${t('SKU')}/${t('barCode')}`, getData: () => '---/---' },
  //   width: '220px',
  //   action: 'valueByPath',
  // },
  {
    top: { name: t('warehouse'), getData: rd => rd.warehouse?.label },
    bottom: { name: t('code'), getData: rd => rd.warehouse?.code },
    width: '170px',
    action: 'valueByPath',
  },

  {
    top: { name: t('Stock'), align: 'end', getData: rd => rd.stock || 0 },
    bottom: { name: t('Reserved'), align: 'end', getData: rd => rd.reserved || 0 },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: t('Awaiting'), align: 'end', getData: rd => rd?.awaiting || 0 },
    bottom: { name: t('Lost'), align: 'end', getData: rd => rd?.lost || 0 },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: t('updated'), align: 'center', path: 'updatedAt' },
    bottom: { name: t('created'), align: 'center', path: 'createdAt' },
    width: '150px',
    action: 'dateSimple',
  },
  ...batchPricesColumns,
];
