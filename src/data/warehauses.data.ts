import { CellTittleProps } from '../components/TableList/TebleCells/CellTitle';
import { IProductInventory, IWarehouse } from '../redux/warehouses/warehouses.types';
import t from '../lang';

export const warehousesTableColumns: CellTittleProps<IWarehouse>[] = [
  {
    top: { name: 'Склад', getData: rd => rd.label },
    bottom: { name: 'Номер', getData: rd => rd.code },
    width: '220px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Тип' },
    bottom: { name: 'Статус' },
    width: '180px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Емейл' },
    bottom: { name: 'Телефон' },
    width: '180px',
    action: 'contacts',
  },
  {
    top: { name: 'Локація' },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Створено', align: 'center', path: 'createdAt' },
    bottom: { name: 'Оновлено', align: 'center', path: 'updatedAt' },
    width: '150px',
    action: 'dateSimple',
  },
];
export const warehouseOverviewTableColumns: CellTittleProps<IProductInventory>[] = [
  {
    top: { name: t('variationLabel'), getData: rd => rd.variation?.label },
    getImgPreview: d => (d.product?.images ? d.product?.images[0]?.img_preview : ''),
    width: '220px',
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
