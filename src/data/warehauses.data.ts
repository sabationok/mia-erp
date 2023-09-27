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
    top: { name: t('label'), align: 'start', getData: rd => rd.product?.label },
    getImgPreview: d => (d.product?.images ? d.product?.images[0]?.img_preview : ''),
    width: '220px',
    action: 'doubleDataWithAvatar',
  },
  {
    top: { name: t('sku'), align: 'start', getData: rd => rd.product?.sku },
    bottom: { name: t('barCode'), align: 'start', getData: rd => rd.product?.barCode },
    width: '200px',
    action: 'valueByPath',
  },
  {
    top: {
      name: t('category'),
      align: 'start',
      getData: rd => rd.product?.category?.label,
    },
    bottom: {
      name: t('parentCategory'),
      align: 'start',
      getData: rd => rd.product?.category?.parent?.label,
    },
    width: '180px',
    action: 'valueByPath',
  },
  {
    top: { name: t('type'), align: 'start', path: 'type' },
    bottom: { name: t('status'), align: 'start', path: 'status' },
    width: '120px',
    action: 'status',
  },
  // {
  //   top: {
  //     name: 'Таблиця варіацій (назва)',
  //     align: 'start',
  //     getData: rd => (rd?.hasVariations ? rd?.template?.label : 'Без варіацій'),
  //   },
  //   bottom: { name: 'Резервування', align: 'start', getData: rd => (rd?.reservation ? 'ТАК' : 'НІ') },
  //   width: '190px',
  //   action: 'valueByPath',
  // },
  {
    top: { name: 'Наявність (заг)', align: 'start', getData: rd => rd.stock },
    bottom: { name: 'Резерв (заг)', align: 'start', getData: rd => rd.reserved },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Бренд', align: 'start', path: 'brand.label' },
    bottom: { name: 'Виробник', align: 'start', path: 'manufacturer.name' },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Автор', align: 'start', path: 'author.name' },
    bottom: { name: 'Емейл', align: 'start', path: 'author.email' },
    width: '190px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Опис', align: 'start', path: 'description' },
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
