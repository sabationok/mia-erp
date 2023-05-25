import { IAccordeonOptionProps } from 'components/SideBarContent/AccordeonList';
import OptionsList from 'components/SideBarContent/OptionsList';
import { iconId } from 'img/sprite/iconId.data';
import ModalForm from 'components/ModalForm';
import { CellTittleProps } from 'components/TableList/TebleCells/CellTitle';
import { IReportConfigs } from 'redux/reports/reports.types';
import ReportCategories, { IReportCategoriesProps } from 'components/Raports/ReportCategories';
import ReportCounts, { IReportCountsProps } from 'components/Raports/ReportCounts';
import ReportContractors, { IReportContractorsProps } from 'components/Raports/ReportContractors';
import ReportProjects, { IReportProjectsProps } from '../components/Raports/ReportProjects';

const categoriesReport: IReportConfigs<IReportCategoriesProps> = {
  title: 'Категорії',
  iconId: iconId.info,
  ModalChildren: ReportCategories,
  modalChildrenProps: { title: 'Звіт по категоріях' },
  disabled: false,
};
const countsReport: IReportConfigs<IReportCountsProps> = {
  title: 'Рахунки',
  iconId: iconId.info,
  ModalChildren: ReportCounts,
  modalChildrenProps: { title: 'Звіт по рахунках' },
  disabled: false,
};
export const reportByContractorsColumns: CellTittleProps[] = [
  {
    top: { name: 'Назва', align: 'start', path: 'name' },
    bottom: { name: 'Тип', align: 'start', path: 'type' },
    width: '100px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Дохід', align: 'end', path: 'income' },
    bottom: { name: 'Валюта', align: 'end', path: 'currency' },
    width: '120px',
    action: 'numberWithSpaces',
  },
  {
    top: { name: 'Витрати', align: 'end', path: 'expense' },
    bottom: { name: 'Валюта', align: 'end', path: 'currency' },
    width: '120px',
    action: 'numberWithSpaces',
  },
  {
    top: { name: 'Різниця', align: 'end', path: 'difference' },
    bottom: { name: 'Валюта', align: 'end', path: 'currency' },
    width: '120px',
    action: 'numberWithSpaces',
  },
  {
    top: { name: 'Оплати', align: 'end', path: 'payments' },
    bottom: { name: 'Валюта', align: 'end', path: 'currency' },
    width: '120px',
    action: 'numberWithSpaces',
  },
  {
    top: { name: 'Дебіторка', align: 'end', path: 'credits', description: 'Дебіторська заборгованість' },
    bottom: { name: 'Валюта', align: 'end', path: 'currency' },
    width: '120px',
    action: 'numberWithSpaces',
  },
  {
    top: { name: 'Кредиторка', align: 'end', path: 'debts', description: 'Кредиторська заборгованість' },
    bottom: { name: 'Валюта', align: 'end', path: 'currency' },
    width: '120px',
    action: 'numberWithSpaces',
  },
];
const contractorsReport: IReportConfigs<IReportContractorsProps> = {
  title: 'Контрагенти',
  iconId: iconId.info,
  ModalChildren: ReportContractors,
  modalChildrenProps: {
    title: 'Звіт по контрагентах',
    tableConfigs: {
      tableData: [],
      tableTitles: reportByContractorsColumns,
    },
  },
  disabled: false,
};
const projectsReport: IReportConfigs<IReportProjectsProps> = {
  title: 'Проекти',
  iconId: iconId.info,
  ModalChildren: ReportProjects,
  modalChildrenProps: {
    title: 'Звіт по проектах',
    tableConfigs: {
      tableTitles: reportByContractorsColumns,
      checkBoxes: false,
    },
    fitContentH: true,
    fitContentV: true,
  },
  disabled: false,
};
const activitiesReport: IReportConfigs = {
  title: 'Види діяльності',
  iconId: iconId.info,
  ModalChildren: ModalForm,
  modalChildrenProps: {
    title: 'Звіт по видах діяльності',
  },
  disabled: true,
};

const contractsReport: IReportConfigs = {
  title: 'Контракти',
  iconId: iconId.info,
  ModalChildren: ModalForm,
  modalChildrenProps: { title: 'Звіт по контрактах' },
  disabled: true,
};
const marksReport: IReportConfigs = {
  title: 'Мітки',
  iconId: iconId.info,
  ModalChildren: ModalForm,
  modalChildrenProps: { title: 'Звіт по мітках' },
  disabled: true,
};
const tagsReport: IReportConfigs = {
  title: 'Теги',
  iconId: iconId.info,
  ModalChildren: ModalForm,
  modalChildrenProps: { title: 'Звіт по тегах' },
  disabled: true,
};

const financeReports: IReportConfigs[] = [
  categoriesReport,
  countsReport,
  contractorsReport,
  projectsReport,
  contractsReport,
  activitiesReport,
  marksReport,
  tagsReport,
];

export const reports: IAccordeonOptionProps<any, IReportConfigs[]>[] = [
  {
    title: 'Фінанси',
    ChildrenComponent: OptionsList,
    options: financeReports,
  },
  {
    title: 'Продажі',
    ChildrenComponent: OptionsList,
    options: financeReports,
  },
  {
    title: 'Склад ',
    ChildrenComponent: OptionsList,
    options: financeReports,
  },
  {
    title: 'Інші',
    ChildrenComponent: OptionsList,
    options: financeReports,
  },
];
