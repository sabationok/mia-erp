import { ApiDirType } from '../redux/APP_CONFIGS';
import { ContractorsTypesEnum } from '../redux/directories/contractors.types';
import { BusinessSubjectTypeEnum, OwnershipTypeEnum } from '../redux/companies/companies.types';
import { WarehouseDocumentType } from '../redux/warehouses/warehouses.types';
import { MeasurementUnit } from '../redux/products/products.types';

export const langUa = {
  // DIRECTORIES

  [ApiDirType.CATEGORIES_TR]: 'Статті доходів/витрат',
  [ApiDirType.CATEGORIES_PROD]: 'Категорії товарів/послуг',
  [ApiDirType.BRANDS]: 'Бренди',
  [ApiDirType.TAGS]: 'Теги',
  [ApiDirType.WAREHOUSES]: 'Склади',
  [ApiDirType.VARIATIONS]: 'Варіації',
  [ApiDirType.BANK_ACCOUNTS]: 'Банківські рахунки',
  [ApiDirType.PROPERTIES_PRODUCTS]: 'Характеристики товарів/послуг',
  variationsTemplate: 'Шаблон для варіацій',
  variationsTemplates: 'Шаблони для варіацій',

  'The same': 'Той самий',
  Another: 'Інший',

  Change: 'Змінити',
  Review: 'Перегляд',
  warehouse: 'Склад',
  propertiesList: 'Список характеристик',
  staticProperties: 'Статичні характеристики',
  availableProperties: 'Доступні характеристики',

  counter: 'Бухгалтер',
  auditor: 'Аудитор',
  [ContractorsTypesEnum.SUPPLIER]: 'Постачальник',
  [ContractorsTypesEnum.CUSTOMER]: 'Клієнт',
  [ContractorsTypesEnum.CONTRACTOR]: 'Підрядник',
  [ContractorsTypesEnum.SUB_CONTRACTOR]: 'Суб-підрядник',
  // [ContractorsTypesEnum.BRAND_MANAGER]: 'Бренд менеджер',
  // [ContractorsTypesEnum.SUPPLY_MANAGER]: 'Менеджер з постачання',
  // [ContractorsTypesEnum.SALES_MANAGER]: 'Менеджер з продажу',
  [ContractorsTypesEnum.WORKER]: 'Робітник',
  [ContractorsTypesEnum.COMMISSION_AGENT]: 'Комісіонер',
  [ContractorsTypesEnum.CONSIGNOR]: 'Комітент',
  [ContractorsTypesEnum.TRANSPORTER]: 'Перевізник',

  [BusinessSubjectTypeEnum.company]: 'Юридична особа',
  [BusinessSubjectTypeEnum.entrepreneur]: 'ФОП',
  [BusinessSubjectTypeEnum.person]: 'Фізична особа',

  [OwnershipTypeEnum.UA_TOV]: 'Товариство з обмеженою відповідальністю (ТОВ)',
  [OwnershipTypeEnum.UA_CLOSED_JOINT_STOCK_COMPANY]: 'Закрите акціонерне товариство (ЗАТ)',
  [OwnershipTypeEnum.UA_PUBLIC_JOINT_STOCK_COMPANY]: 'Відкрите акціонерне товариство (ВАТ)',
  [OwnershipTypeEnum.UA_COOPERATIVE]: 'Кооператив',
  [OwnershipTypeEnum.UA_SOLE_PROPRIETORSHIP]: 'Індивідуальне підприємство',
  [OwnershipTypeEnum.UA_STATE_COMPANY]: 'Державна компанія',
  [OwnershipTypeEnum.UA_JOINT_VENTURE]: 'Спільне підприємство',
  [OwnershipTypeEnum.UA_BRANCH]: 'Філія',
  [OwnershipTypeEnum.UA_FRANCHISING_COMPANY]: 'Франчайзингова компанія',
  [OwnershipTypeEnum.UA_COLLECTIVE_ENTERPRISE]: 'Колективне підприємство',

  priceLists: 'Прайс листи',
  documentsFlow: 'Документи',
  companies: 'Компанії',
  dashboard: 'Дашборд',
  transactions: 'Рух коштів',
  orders: 'Замовлення',
  refunds: 'Повернення',
  supplement: 'Постачання',
  storage: 'Склад',
  products: 'Продукти',
  manager: 'Менеджер',

  [MeasurementUnit.Pc]: 'шт.', // Штука (Piece)
  [MeasurementUnit.G]: 'г.', // Грам (Gram)
  [MeasurementUnit.Kg]: 'кг.', // Кілограм (Kilogram)
  [MeasurementUnit.Ml]: 'мл.', // Мілілітр (Milliliter)
  [MeasurementUnit.L]: 'л.', // Літр (Liter)
  [MeasurementUnit.M]: 'м.', // Метр (Meter)
  [MeasurementUnit.Sm]: 'см.', // Метр (Meter)
  [MeasurementUnit.SqM]: 'кв.м.', // Квадратний метр (SquareMeter)
  [MeasurementUnit.CuM]: 'куб.м.', // Кубічний метр (CubicMeter)
  [MeasurementUnit.Other]: 'інше', // Інше (Other)

  quantity: 'Кількість',
  batch: 'Партія',

  selectVariationsTemplate: 'Оберіть список доступних характеристик',
  brand: 'Бренд',
  selectBrand: 'Оберіть бренд',
  createTag: 'Створити тег',
  Price: 'Ціна',
  Cost: 'Собівартість',
  Discount: 'Знижка',
  Bonus: 'Бонус',
  Cashback: 'Кеш-бек',
  Commission: 'Комісія',
  Markup: 'Націнка',

  product: 'Продукт',
  counts: 'Облікові рахунки',
  count: 'Обліковий рахунок',
  categories: 'Категорії',
  category: 'Категорія',
  trCategories: 'Категорії для транзакцій',
  trCategory: 'Категорія для транзакцій',
  productCategories: 'Категорії для товарів/послуг',
  productSubCategories: 'Під-категорії для товарів',
  subCategory: 'Під-категорія',
  parentCategory: 'Батьківська категорія',
  subCategories: 'Під-категорії',
  contractor: 'Підрядник',
  contractors: 'Підрядники',
  counterparty: 'Контрагент',
  counterparties: 'Контрагенти',
  mark: 'Мітка',
  marks: 'Мітки',
  activityType: 'Вид діяльності',
  activityTypes: 'Види діяльності',
  user: 'Користувач',
  users: 'Користувачі',
  project: 'Проєкт',
  projects: 'Проєкти',
  createdAt: 'Створено',
  updateAt: 'Оновлено',
  document: 'Документ',
  documents: 'Документи',
  status: 'Статус',

  code: 'Код',
  barCode: 'Штрих-код',
  qrCode: 'QR-Code',
  innerCode: 'Внутрішній код',
  insertCode: 'Впишіть код',
  variation: 'Варіація',
  supplier: 'Постачальник',
  longitude: 'Довгота',
  latitude: 'Широта',

  closeAfterSave: 'Закрити після збереження',
  clearAfterSave: 'Очистити після збереження',

  afterSave: 'Після збереження',
  clear: 'Очистити',
  close: 'Закрити',
  // Transaction form
  countIn: 'Рахунок IN',
  subCountIn: 'Суб-рахунок IN',
  countOut: 'Рахунок OUT',
  subCountOut: 'Суб-рахунок OUT',
  ownership: 'Форма власності',
  businessSubjectType: "Тип суб'єкта господарювання",
  name: "Ім'я",
  insertName: "Введіть ім'я",
  type: 'Тип',
  group: 'Група',
  property: 'Характеристика',
  label: 'Назва',
  variationLabel: 'Назва варіації',
  productLabel: 'Назва продукту',
  insertLabel: 'Введіть назву',
  secondName: 'Прізвище',
  insertSecondName: 'Введіть прізвище',
  comment: 'Коментар',
  description: 'Опис',
  insertComment: 'Введіть коментар',
  amount: 'Сума',
  price: 'Ціна',
  sale: 'Знижка',
  date: 'Дата',
  time: 'Час',
  timeFrom: 'Дійсний з:',
  timeTo: 'Дійсний до:',
  dateAndTime: 'Дата і час',
  parentItem: 'Батьківський елемент',
  expireAt: 'Дійсне до',

  Invoices: 'Інвойси',
  Invoice: 'Інвойс',

  Payments: 'Оплати',
  Payment: 'Оплата',

  Shipments: 'Відвантаження',
  Shipment: 'Відвантаження',

  Deliveries: 'Доставки',
  Delivery: 'Доставка',

  Realizations: 'Реалізації',
  Realization: 'Реалізація',

  Refunds: 'Повернення',
  Refund: 'Повернення',

  Orders: 'Замовлення',
  Order: 'Замовлення',

  Stuffing: 'Комлектування',
  Completing: 'Комлектування',

  Summary: 'Підсумок',
  Info: 'Інфо',

  Priority: 'Пріорітетність',
  'Total amount': 'Сумарно',
  'Total q-ty': 'Сумарна к-ть',
  Number: 'Номер',
  Group: 'Група',

  manufacturer: 'Виробник',
  unit: 'Одиниця',
  min: 'MIN',
  max: 'MAX',
  step: 'Крок',
  units: 'Од. виміру',
  discount: 'Знижка',
  balance: 'Баланс',
  startBalance: 'Початковий баланс',
  insertStartBalance: 'Введіть початковий баланс',
  currency: 'Валюта',
  phone: 'Телефон',
  insertPhone: 'Телефон',
  email: 'Емейл',
  insertEmail: 'Емейл',
  selectCurrency: 'Оберіть валюту',
  selectTags: 'Оберть теги',
  Author: 'Автор',

  Height: 'Висота',
  Width: 'Ширина',
  Length: 'Довжина',
  Weight: 'Вага',

  createDirParentItem: 'Створити батьківський елемент',
  createDirChildItem: 'Створити дочірній елемент',
  createParentCount: 'Створити рахунок',
  createChildCount: 'Створити суб-рахунок',
  createParentCategory: 'Створити категорію',
  createChildCategory: 'Створити під-категорію',
  createPropertiesGroup: 'Створити групу хараткеристик',
  createProperty: 'Створити характеритику',
  createPropertyValue: 'Створити значення характеристики',

  editParentCount: 'Редагувати рахунок',
  editChildCount: 'Редагувати суб-рахунок',
  editParentCategory: 'Редагувати категорію',
  editChildCategory: 'Редагувати під-категорію',
  deleteParentCount: 'Видалити рахунок',
  deleteChildCount: 'Видалити суб-рахунок',
  deleteParentCategory: 'Видалити категорію',
  deleteChildCategory: 'Видалити під-категорію',

  createContractor: 'Створити',
  copyContractor: 'Копіювати',
  deleteContractor: 'Видалити',
  editContractor: 'Редагувати',
  archive: 'Архівувати',
  unArchive: 'Відновити',

  taxCode: 'ЄДРПОУ',
  personalTaxCode: 'ІПН',

  INCOME: 'Дохід',
  INCOMES: 'Доходи',
  EXPENSE: 'Витрата',
  EXPENSES: 'Витрати',
  TRANSFER: 'Переказ',
  TRANSFERS: 'Перекази',
  ACTIVE: 'Актив',
  ACTIVES: 'Активи',
  PASSIVE: 'Пасив',
  PASSIVES: 'Пасиви',

  DEFAULT: 'DEFAULT',
  CUSTOM: 'CUSTOM',

  BASE: 'BASE',
  ADDITIONAL: 'ADDITIONAL',

  success: 'Успіх',
  successfully: 'Успішно',
  error: 'Помилка',
  pending: 'У процесі',
  rejected: 'Відхилено',
  approved: 'Прийнято',
  warning: 'Увага',

  logOutUser: 'Вийти з профілю',
  logOutPermission: 'Вийти з компанії',

  select: 'Обрати',
  selected: 'Обрано',

  create: 'Створити',
  creating: 'Створення',
  created: 'Створено',
  update: 'Оновити дані',
  updating: 'Оновлення даних',
  updated: 'Оновлено',
  delete: 'Видалити',
  deleted: 'Видалено',
  deleting: 'Видалення',
  load: 'Завантажити',
  loaded: 'Завантажено',
  loading: 'Завантаження',
  cost: 'Собівартість',
  sku: 'SKU',
  sizesTable: 'Розмірна сітка',
  visibility: 'Видимість',

  Close: 'Закрити',
  Open: 'Вікдрити',
  More: 'Більше',
  Hide: 'Приховати',
  Back: 'Назад',

  Customer: 'Клієнт',
  Receiver: 'Отримувач',

  [WarehouseDocumentType.addToStock]: 'Прихід на склад',
  [WarehouseDocumentType.removeFromStock]: 'Списання зі складу',
  [WarehouseDocumentType.reserveFromStock]: 'Резервування',
  [WarehouseDocumentType.returnFromReserve]: 'Повернення з резерву',
  [WarehouseDocumentType.removeFromReserve]: 'Списання з резерву',

  Description: 'Description',
  SKU: 'SKU',
  Images: 'Зображення',
  Brand: 'Бренд',
  Categories: 'Категорії',
  Properties: 'Характеристики',
  Measurement: 'Вимірювання',

  'Variations template': 'Шаблон варіацій',
  'Product label': 'Назва продукту',
  'Variation label': 'Назва варіації',
  'Default params': 'Параметри за замовчуванням',
  'Default values': 'Значення за замовчуванням',
  'Default warehouse': 'Склад за замовчуванням',
  'Default supplier': 'Постачальник за замовчуванням',
  'Default variation': 'Варіація за замовчуванням',
  'Default price': 'Ціна за замовчуванням',
  'Created by / Date / Time': 'Створено / Дата / Час',
  'Updated by / Date / Time': 'Оновлено / Дата / Час',

  Comment: 'Коментар',
  'Enter comment for customer': 'Введіть коментар для клієнта',
  'Service comment': 'Службовий коментар',
  'Enter service comment': 'Введіть службовий коментар',

  'Select warehouse': 'Оберіть склад',
  'Select variation': 'Оберіть варіацію',
  'Select price': 'Оберіть ціну',
  'Select product': 'Оберіть продукт',
  'Create tag': 'Створити тег',
  'Create warehouse document': 'Створити складський документ',
  'Select list of properties': 'Оберіть список доступних характеристик',

  'Add position to group': 'Дадати позицію до групи',
  'Add position to order': 'Додати позицію до замовлення',

  'Select manager': 'Обрати менеджера',
  'Select receiver': 'Обрати отримувача',
  'Change receiver': 'Змінити отримувача',
  'Select customer': 'Обрати замовника',
  'Change customer': 'Змінити замовника',
  'Preferred communication methods': 'Бажані способи комунікацій',
  'Not needed': 'Не потрібно',
  'Permission check, please wait': 'Перевірка дозволу, будь ласка зачекайте',
  'Please wait while minions do their work...': 'Будь ласка зачекайте поки міньйони роблять свою роботу...',
  'Loading content...': 'Завантаження вмісту...',

  'Price OUT': 'Вихідна ціна',
  'Price IN': 'Вхідна ціна',
  'Commission, amount': 'Комісія, сума',
  'Commission, %': 'Комісія, %',
  'Markup, amount': 'Націнка, сума',
  'Markup, %': 'Націнка, %',
  'Discount, amount': 'Знижка, сума',
  'Discount, %': 'Знижка, %',
  'Bonus, amount': 'Бонус, сума',
  'Bonus, %': 'Бонус, %',
  'Cashback, amount': 'Кешбек, сума',
  'Cashback, %': 'Кешбек, %',
};
