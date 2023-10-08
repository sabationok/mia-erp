import { SelectItem } from 'components/TableList/TableList';
import { CellTittleProps } from 'components/TableList/TebleCells/CellTitle';
import t from '../lang';
import { IProduct } from '../redux/products/products.types';

export type DataPath =
  | 'category.label'
  | 'subCategory.label'
  | 'brand.name'
  | 'brand.label'
  | 'owner.name'
  | 'owner.email'
  | 'author.name'
  | 'author.email'
  | 'editor.name'
  | 'editor.email'
  | 'auditor.name'
  | 'auditor.email'
  | 'manufacturer.name'
  | 'manufacturer.email'
  | 'mark.label'
  | 'tags'
  | 'type'
  | 'status'
  | 'sale'
  | 'cashback.sale'
  | 'cashback.level'
  | 'cashback.bonuses'
  | 'currency'
  | 'description'
  | 'createdAt'
  | 'updatedAt'
  | 'label'
  | 'sku'
  | 'price'
  | 'visibility'
  | 'availabilityInfo.status'
  | 'availabilityInfo.primaryOrder'
  | 'availabilityInfo.primaryOrderTime'
  | 'availabilityInfo.customOrder'
  | 'availabilityInfo.customOrderTime';

export const productsColumns: CellTittleProps<IProduct, DataPath>[] = [
  {
    top: { name: t('label'), align: 'start', getData: rd => rd?.label },
    // bottom: { name: t('sku'), align: 'start', getData: rd => rd?.sku },
    getImgPreview: pr => (pr.images ? pr.images[0]?.img_preview : undefined),
    width: '200px',
    action: 'doubleDataWithAvatar',
  },
  {
    top: { name: t('sku'), align: 'start', getData: rd => rd?.sku },
    bottom: { name: t('barCode'), align: 'start', getData: rd => rd?.barCode },
    width: '200px',
    action: 'valueByPath',
  },

  {
    top: { name: t('type'), align: 'start', path: 'type' },
    bottom: { name: t('status'), align: 'start', getData: d => d.approved as never },
    width: '100px',
    action: 'status',
  },

  {
    top: {
      name: t('category'),
      align: 'start',
      getData: rd => rd.category?.label,
    },
    bottom: {
      name: t('parentCategory'),
      align: 'start',
      getData: rd => rd.category?.parent?.label,
    },
    width: '180px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Бренд', align: 'start', path: 'brand.label' },
    bottom: { name: 'Виробник', align: 'start', path: 'manufacturer.name' },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Опис', align: 'start', path: 'description' },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Оновив', align: 'start', getData: rd => rd?.editor?.email },
    bottom: { name: 'Автор', align: 'start', getData: rd => rd?.author?.email },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Оновлено', align: 'center', path: 'updatedAt' },
    bottom: { name: 'Створено', align: 'center', path: 'createdAt' },
    width: '150px',
    action: 'dateDbl',
  },
];

export const productsSearchParams: SelectItem[] = [
  // {
  //   label: t('type'),
  //   dataPath: 'type',
  //   filter: false,
  //   search: true,
  //   sort: true,
  // },
  // {
  //   label: t('price'),
  //   dataPath: 'price',
  //   filter: false,
  //   search: true,
  //   sort: true,
  // },
  // {
  //   label: 'Оновлено',
  //   dataPath: 'createdAt',
  //   filter: false,
  //   search: false,
  //   sort: true,
  // },
  // {
  //   label: 'Створено',
  //   dataPath: 'updatedAt',
  //   filter: false,
  //   search: false,
  //   sort: true,
  // },
  // {
  //   label: t('countIn'),
  //   dataPath: 'countIn.label',
  //   filter: false,
  //   search: true,
  //   sort: true,
  // },
  // {
  //   label: t('subCountIn'),
  //   dataPath: 'subCountIn.label',
  //   filter: false,
  //   search: true,
  //   sort: true,
  // },
  // {
  //   label: t('countOut'),
  //   dataPath: 'countOut.label',
  //   filter: false,
  //   search: true,
  //   sort: true,
  // },
  // {
  //   label: t('subCountOut'),
  //   dataPath: 'subCountOut.label',
  //   filter: false,
  //   search: true,
  //   sort: true,
  // },
  // {
  //   label: t('category'),
  //   dataPath: 'category.label',
  //   filter: false,
  //   search: true,
  //   sort: true,
  // },
  // {
  //   label: t('subCategory'),
  //   dataPath: 'subCategory.label',
  //   filter: false,
  //   search: true,
  //   sort: true,
  // },
  //
  // {
  //   label: 'Контрагент',
  //   dataPath: 'contractor.name',
  //   filter: false,
  //   search: true,
  //   sort: true,
  // },
  // {
  //   label: 'Документ',
  //   dataPath: 'document',
  //   filter: false,
  //   search: true,
  //   sort: true,
  // },
  // {
  //   label: t('project'),
  //   dataPath: 'project.label',
  //   filter: false,
  //   search: true,
  //   sort: true,
  // },
  // { label: 'Мітка', dataPath: 'mark.label', filter: false, search: true, sort: true },
  // {
  //   label: 'Статус',
  //   dataPath: 'status',
  //   filter: false,
  //   search: true,
  //   sort: true,
  // },
];
