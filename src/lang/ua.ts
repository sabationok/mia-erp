import { ApiDirType } from '../redux/APP_CONFIGS';
import { ContractorsTypesEnum } from '../redux/directories/contractors.types';
import { BusinessSubjectTypeEnum, OwnershipTypeEnum } from '../types/companies.types';
import { WarehouseDocumentType } from '../types/warehousing/warehouses.types';
import { OrderStatusEnum } from '../types/orders/orders.types';
import { PaymentInternalTypeEnum } from '../types/integrations.types';
import { OfferPriceTypeEnum } from '../types/price-management/price-management.types';
import { MeasurementUnit } from '../types/enums.types';

export enum LangTextPrefix {
  bank_account = 'bank_account',
}
export const langUa = {
  // DIRECTORIES

  externalService: 'Зовнішній сервіс',
  'External service': 'Зовнішній сервіс',

  variationsTemplate: 'Шаблон для варіацій',
  variationsTemplates: 'Шаблони для варіацій',

  'Variations template': 'Шаблон для варіацій',
  'Variations templates': 'Шаблони для варіацій',

  'The same': 'Той самий',
  Another: 'Інший',

  Change: 'Змінити',
  Cancel: 'Скасувати',
  Warehouse: 'Склад',

  'Payment checkout services': 'Сервіси оплати',
  'Delivery types': 'Методи доставки',
  'Payment hold': 'Холд платежу',

  Review: 'Перегляд',
  warehouse: 'Склад',
  propertiesList: 'Список характеристик',
  staticProperties: 'Статичні характеристики',
  availableProperties: 'Доступні характеристики',

  From: 'З',
  To: 'До',

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

  [`${LangTextPrefix.bank_account}_personal`]: 'особистий',
  [`${LangTextPrefix.bank_account}_business`]: 'бізнес',
  [`${LangTextPrefix.bank_account}_salary`]: 'зарплата',
  [`${LangTextPrefix.bank_account}_deposit`]: 'депозит',
  [`${LangTextPrefix.bank_account}_investment`]: 'інвестиція',
  [`${LangTextPrefix.bank_account}_currency`]: 'валюта',
  [`${LangTextPrefix.bank_account}_travel`]: 'подорож',
  [`${LangTextPrefix.bank_account}_ira`]: 'ІРА (індивідуальний пенсійний рахунок)',
  [`${LangTextPrefix.bank_account}_payroll`]: 'платіжна відомість',
  [`${LangTextPrefix.bank_account}_escrow`]: 'ескроу',

  GOODS: 'Товари',
  SERVICE: 'Послуги',
  SERVICES: 'Послуги',

  offer_GOOD: 'Товар',
  offer_GOODS: 'Товари',
  offer_SERVICE: 'Послуга',
  offer_SERVICES: 'Послуги',

  'Delivery method': 'Спосіб доставки',
  'Delivery methods': 'Способи доставки',
  'Add delivery method': 'Додати спосіб доставки',
  'Update delivery method': 'Оновити спосіб доставки',

  'Invoicing method': 'Тип інвойсу',
  'Invoicing methods': 'Типи інвойсів',
  'Add invoicing method': 'Додати тип інвойсу',
  'Update invoicing method': 'Оновити тип інвойсу',

  'Payment method': 'Спосіб оплати',
  'Payment methods': 'Способи оплати',
  'Add payment method': 'Додати тип оплати',
  'Update payment method': 'Оновити тип оплати',

  'Checkout method': 'Спосіб оплати',
  'Checkout methods': 'Способи оплати',
  'Add checkout method': 'Додати тип оплати',
  'Update checkout method': 'Оновити тип оплати',

  'Communication method': "Спосіб звя'зку",
  'Communication methods': "Способи звя'зку",
  'Add communication method': "Додати спосіб звя'зку",
  'Update communication method': "Оновити спосіб звя'зку",

  'Shipment method': 'Спосіб відвантаження',
  'Shipment methods': 'Способи відвантаження',
  'Add shipment method': 'Додати спосіб відвантаження',
  'Update shipment method': 'Оновити спосіб відвантаження',

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
  Manager: 'Менеджер',

  page_priceLists: 'Прайс листи',
  page_priceManagement: 'Управління цінами',
  page_prices: 'Ціни',
  page_documentsFlow: 'Документи',
  page_companies: 'Компанії',
  page_warehouses: 'Склади',
  page_warehouses_docs: 'Складські документи',
  page_dashboard: 'Дашборд',
  page_transactions: 'Рух коштів',
  page_orders: 'Замовлення',
  page_refunds: 'Повернення',
  page_supplement: 'Постачання',
  page_storage: 'Склад',
  page_offers: 'Номенклатура',
  page_manager: 'Менеджер',
  page_admin: 'Адмін',
  page_customers: 'Клієнти',
  page_cart: 'Корзина',

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
  'Activity type': 'Вид діяльності',
  activityTypes: 'Види діяльності',
  'Activity types': 'Види діяльності',
  user: 'Користувач',
  users: 'Користувачі',
  project: 'Проєкт',
  projects: 'Проєкти',

  createdAt: 'Створено',
  updatedAt: 'Оновлено',
  deletedAt: 'Видалено',

  'Created at': 'Створено',
  'Updated at': 'Оновлено',
  'Deleted at': 'Видалено',

  document: 'Документ',
  documents: 'Документи',
  status: 'Статус',
  undefined: 'Не визначено',

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

  Label: 'Назва',
  'Bar-code': 'Штрих-код',

  'Warehouse code': 'Код складу',
  'Warehouse label': 'Назва складу',
  'Brand label': 'Назва бренду',

  Invoices: 'Інвойси',
  Invoice: 'Інвойс',

  Payments: 'Оплати',
  Payment: 'Оплата',

  Shipments: 'Відвантаження',
  Shipment: 'Відвантаження',

  Destination: 'Місце призначенн',
  'Enter destination address': 'Введіть адресу призначення',
  'Has payment': 'Підлягає оплаті',

  Deliveries: 'Доставки',
  Delivery: 'Доставка',

  Confirmation: 'Підтвердження',

  Realizations: 'Реалізації',
  Realization: 'Реалізація',

  Refunds: 'Повернення',
  Refund: 'Повернення',

  Orders: 'Замовлення',
  Order: 'Замовлення',

  Stuffing: 'Комлектування',
  Completing: 'Комлектування',

  Summary: 'Підсумок',
  Info: 'Інформація',
  Description: 'Опис',

  Priority: 'Пріорітетність',
  'Total amount': 'Сумарно',
  'Total q-ty': 'Сумарна к-ть',
  Number: 'Номер',
  Group: 'Група',

  'Reference / Internal': 'Номер / Внутрішній',
  'Reference / External': 'Номер / Зовнішній',
  'Slots count': 'Кількість позицій',
  Status: 'Статус',

  Accept: 'Прийняти',
  Invoicing: 'Інвойсинг',

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

  'Remove all': 'Видалити все',
  Delete: 'Видалити',
  Remove: 'Видалити',
  Edit: 'Редагувати',
  Select: 'Обрати',

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

  type_transactions_INCOME: 'Дохід',
  type_transactions_INCOMES: 'Доходи',
  type_transactions_EXPENSE: 'Витрата',
  type_transactions_EXPENSES: 'Витрати',
  type_transactions_TRANSFER: 'Переказ',
  type_transactions_TRANSFERS: 'Перекази',

  ACTIVE: 'Актив',
  ACTIVES: 'Активи',
  PASSIVE: 'Пасив',
  PASSIVES: 'Пасиви',

  type_fin_account_ACTIVE: 'Актив',
  type_fin_account_ACTIVES: 'Активи',
  type_fin_account_PASSIVE: 'Пасив',
  type_fin_account_PASSIVES: 'Пасиви',

  DEFAULT: 'DEFAULT',
  CUSTOM: 'CUSTOM',
  BASE: 'BASE',
  ADDITIONAL: 'ADDITIONAL',

  Additional: 'Додатково',

  success: 'Успіх',
  successfully: 'Успішно',
  error: 'Помилка',
  pending: 'У процесі',
  rejected: 'Відхилено',
  approved: 'Прийнято',
  warning: 'Увага',
  logOutUser: 'Вийти з профілю',
  logOutPermission: 'Вийти з компанії',

  Hidden: 'Прихований',
  Visible: 'Видимий',

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
  Add: 'Додати',

  Customer: 'Клієнт',
  Receiver: 'Отримувач',

  SKU: 'SKU',
  Images: 'Зображення',
  Brand: 'Бренд',
  Categories: 'Категорії',
  Properties: 'Характеристики',
  Measurement: 'Вимірювання',

  'Step is not finished': 'Крок не завершено',

  'Offer label': 'Назва продукту',
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

  'Select customer': 'Обрати замовника',
  'Change customer': 'Змінити замовника',
  'Customer information': 'Інформація про замовника',

  'Select receiver': 'Обрати отримувача',
  'Change receiver': 'Змінити отримувача',
  'Receiver information': 'Інформація про отримувача',

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

  Type: 'Тип',
  Key: 'Ключ',
  'Custom type': 'Кастомний тип',
  'Custom key': 'Кастомний ключ',
  'Bonus balance': 'Бонусний баланс',
  'Value type': 'Тип значення',
  'Discount source volume': "Прив'язка до",
  'Discount target volume': 'Вираховується з',
  'Discount threshold': 'Поріг нарахування',
  'Discount threshold type': 'Тип порогу нарахування',
  'Discount limit': 'Ліміт нарахування',
  'Discount limit type': 'Тип ліміту нарахування',

  [`Price_${OfferPriceTypeEnum.fixed}`]: 'Фіксована',
  [`Price_${OfferPriceTypeEnum.recommend}`]: 'Рекомендована',
  [`Price_${OfferPriceTypeEnum.onContract}`]: 'Договірна',

  [`type_price_${OfferPriceTypeEnum.fixed}`]: 'Фіксована',
  [`type_price_${OfferPriceTypeEnum.recommend}`]: 'Рекомендована',
  [`type_price_${OfferPriceTypeEnum.onContract}`]: 'Договірна',

  [`Discount_discount`]: 'Знижка',
  [`Discount_threshold_type_quantity`]: 'Кількість',
  [`Discount_threshold_type_amount`]: 'Сума',
  [`Discount_cashback`]: 'Кешбек',
  [`Discount_limit_type_quantity`]: 'Кількість',
  [`Discount_limit_type_amount`]: 'Сума',
  [`Discount_bonus`]: 'Бонус',
  [`Discount_default`]: 'Системний',
  [`Discount_refme`]: 'RefmeApp',
  [`Discount_amount`]: 'Ставка',
  [`Discount_percentage`]: 'Відсоток',
  [`Discount_cart`]: 'Корзина',
  [`Discount_slot`]: 'Позиція',
  [`Discount_order`]: 'Замовлення',

  type_discount_discount: 'Знижка',
  type_discount_threshold_type_quantity: 'Кількість',
  type_discount_threshold_type_amount: 'Сума',
  type_discount_cashback: 'Кешбек',
  type_discount_limit_type_quantity: 'Кількість',
  type_discount_limit_type_amount: 'Сума',
  type_discount_bonus: 'Бонус',
  type_discount_default: 'Системний',
  type_discount_refme: 'RefmeApp',
  type_discount_amount: 'Ставка',
  type_discount_percentage: 'Відсоток',
  type_discount_cart: 'Корзина',
  type_discount_slot: 'Позиція',
  type_discount_order: 'Замовлення',

  [ApiDirType.CATEGORIES_TR]: 'Статті доходів/витрат',
  [ApiDirType.CATEGORIES_PROD]: 'Категорії товарів/послуг',
  [ApiDirType.BRANDS]: 'Бренди',
  [ApiDirType.TAGS]: 'Теги',
  [ApiDirType.WAREHOUSES]: 'Склади',
  [ApiDirType.VARIATIONS]: 'Варіації',
  [ApiDirType.BANK_ACCOUNTS]: 'Банківські рахунки',
  [ApiDirType.PROPERTIES_PRODUCTS]: 'Характеристики товарів/послуг',

  [OrderStatusEnum.new]: 'Нове',
  [OrderStatusEnum.inWork]: 'Взято у роботу',
  [OrderStatusEnum.rejectedByCustomer]: 'Скасовано замовником',
  [OrderStatusEnum.rejectedByManager]: 'Скасовано менеджером',
  [OrderStatusEnum.active]: 'Активне',
  [OrderStatusEnum.fulfilled]: 'Завершено успішно',
  [OrderStatusEnum.fulfilledWithRefund]: 'Завершено з поверненням',
  [OrderStatusEnum.archived]: 'Архів',
  [OrderStatusEnum.expired]: 'Протерміновано',

  [`status_order_${OrderStatusEnum.new}`]: 'Нове',
  [`status_order_${OrderStatusEnum.inWork}`]: 'Взято у роботу',
  [`status_order_${OrderStatusEnum.rejectedByCustomer}`]: 'Скасовано замовником',
  [`status_order_${OrderStatusEnum.rejectedByManager}`]: 'Скасовано менеджером',
  [`status_order_${OrderStatusEnum.active}`]: 'Активне',
  [`status_order_${OrderStatusEnum.fulfilled}`]: 'Завершено успішно',
  [`status_order_${OrderStatusEnum.fulfilledWithRefund}`]: 'Завершено з поверненням',
  [`status_order_${OrderStatusEnum.archived}`]: 'Архів',
  [`status_order_${OrderStatusEnum.expired}`]: 'Протерміновано',

  [PaymentInternalTypeEnum.postTransfer]: 'Поштовий переказ',
  [PaymentInternalTypeEnum.bankTransfer]: 'Банківський переказ',
  [PaymentInternalTypeEnum.imposedPayment]: 'Наладений платіж',

  [`method_payment_${PaymentInternalTypeEnum.postTransfer}`]: 'Поштовий переказ',
  [`method_payment_${PaymentInternalTypeEnum.bankTransfer}`]: 'Банківський переказ',
  [`method_payment_${PaymentInternalTypeEnum.imposedPayment}`]: 'Наладений платіж',

  [WarehouseDocumentType.addToStock]: 'Прихід на склад',
  [WarehouseDocumentType.removeFromStock]: 'Списання зі складу',
  [WarehouseDocumentType.reserveFromStock]: 'Резервування',
  [WarehouseDocumentType.returnFromReserve]: 'Повернення з резерву',
  [WarehouseDocumentType.removeFromReserve]: 'Списання з резерву',

  [`type_warehouse_document_${WarehouseDocumentType.addToStock}`]: 'Прихід на склад',
  [`type_warehouse_document_${WarehouseDocumentType.removeFromStock}`]: 'Списання зі складу',
  [`type_warehouse_document_${WarehouseDocumentType.reserveFromStock}`]: 'Резервування',
  [`type_warehouse_document_${WarehouseDocumentType.returnFromReserve}`]: 'Повернення з резерву',
  [`type_warehouse_document_${WarehouseDocumentType.removeFromReserve}`]: 'Списання з резерву',

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

  [`type_measurement_${MeasurementUnit.Pc}`]: 'шт.', // Штука (Piece)
  [`type_measurement_${MeasurementUnit.G}`]: 'г.', // Грам (Gram)
  [`type_measurement_${MeasurementUnit.Kg}`]: 'кг.', // Кілограм (Kilogram)
  [`type_measurement_${MeasurementUnit.Ml}`]: 'мл.', // Мілілітр (Milliliter)
  [`type_measurement_${MeasurementUnit.L}`]: 'л.', // Літр (Liter)
  [`type_measurement_${MeasurementUnit.M}`]: 'м.', // Метр (Meter)
  [`type_measurement_${MeasurementUnit.Sm}`]: 'см.', // Метр (Meter)
  [`type_measurement_${MeasurementUnit.SqM}`]: 'кв.м.', // Квадратний метр (SquareMeter)
  [`type_measurement_${MeasurementUnit.CuM}`]: 'куб.м.', // Кубічний метр (CubicMeter)
  [`type_measurement_${MeasurementUnit.Other}`]: 'інше', // Інше (Other)
};
