export const selects = {
  trType: {
    name: 'type',
    label: 'Тип транзакції',
    options: [
      { label: 'Дохід', value: 'INCOME', name: 'type', dataKey: 'type' },
      { label: 'Витрата', value: 'EXPENSE', name: 'type', dataKey: 'type' },
      { label: 'Переказ', value: 'TRANSFER', name: 'type', dataKey: 'type' },
    ],
    required: true,
  },
  categoryType: {
    name: 'type',
    label: 'Тип категорії',
    options: [
      { label: 'Дохід', value: 'INCOME', name: 'type', dataKey: 'type' },
      { label: 'Списання', value: 'EXPENSE', name: 'type', dataKey: 'type' },
      { label: 'Переказ', value: 'TRANSFER', name: 'type', dataKey: 'type' },
    ],
    required: true,
  },
  countIn: { name: 'countIdIn', label: 'Рахунок IN' },
  subCountIn: { name: 'subCountIdIn', label: 'Суб-рахунок IN' },
  countOut: { name: 'countIdOut', label: 'Рахунок OUT' },
  subCountOut: { name: 'subCountIdOut', label: 'Суб-рахунок OUT' },
  category: { name: 'categoryId', label: 'Категорія' },
  subCategory: { name: 'subCategoryId', label: 'Під-категорія' },
  contractor: { name: 'contractor', label: 'Контрагент' },
  project: { name: 'project', label: 'Проект' },
  document: { name: 'document', label: 'Документ' },
  mark: { name: 'mark', label: 'Мітка' },
  trStatus: {
    name: 'status',
    label: 'Статус',
    options: [
      { label: 'Перевірено', value: 'checked', name: 'status', dataKey: 'status' },
      { label: 'Узгоджено', value: 'approved', name: 'status', dataKey: 'status' },
      { label: 'Проблема', value: 'problem', name: 'status', dataKey: 'status' },
    ],
  },
  countType: {
    label: 'Тип рахунку',
    name: 'type',
    options: [
      { label: 'ПАСИВНИЙ', value: 'PASSIVE', name: 'type', dataKey: 'type' },
      { label: 'АКТИВНИЙ', value: 'ACTIVE', name: 'type', dataKey: 'type' },
    ],
  },
  parentCount: { label: 'Батьківський рахунок', name: 'owner' },
  parentCategory: { label: 'Батьківська категорія', name: 'owner' },
};

export function getParentOptions(parentName: any, options: any) {
  if (!options) return [];
  const filteredOptions = options.filter((option: any) => !option?.owner);

  const parentOptions = filteredOptions.map((option: any) => {
    return { ...option, label: option?.name, value: option?._id, dataKey: parentName };
  });
  return parentOptions || [];
}

export function getChildOptions({ childName, parentId, options }: { childName: any, parentId: any, options: any }) {
  if (!childName || !parentId || !options) return [];
  // console.log('getChildOptions', { childName, parentId, options });
  const filteredOptions = options.filter((option: any) => option?.owner === parentId || option?.owner?._id === parentId);

  const childOptions = filteredOptions.map((option: any) => {
    return { ...option, label: option?.name, value: option?._id, dataKey: childName };
  });

  return childOptions || [];
}

export function getOwnerOptions(options: any) {
  let ownerOptions = options.filter((opt: any) => !opt?.owner);
  // console.log({ ownerOptions });
  let prepearedOptions = ownerOptions.map((opt: any) => {
    const { type, _id, code, descr, name } = opt;

    const label = `${name ? name : ''} ${code ? `(${code})` : ''} ${type ? `(${type})` : ''}`
      .replaceAll('  ', ' ')
      .trim();

    return {
      label: label,
      value: _id,
      name: 'owner',
      type,
      code,
      descr,
    };
  });

  return prepearedOptions || [];
}
