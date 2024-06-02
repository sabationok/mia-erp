import { IAccordionOptionProps } from 'components/SideBarContent/AccordionList';
import { iconId } from 'img/sprite/iconId.data';
import ModalForm from 'components/ModalForm';
import { CellTittleProps } from 'components/TableList/TebleCells/CellTitle';
import { IReportConfigs } from 'redux/reports/reports.types';
import ReportCategories, { IReportCategoriesProps } from 'components/Raports/ReportCategories';
import ReportCounts, { IReportCountsProps } from 'components/Raports/ReportCounts';
import ReportContractors, { IReportContractorsProps } from 'components/Raports/ReportContractors';
import ReportProjects, { IReportProjectsProps } from '../components/Raports/ReportProjects';
import { categoriesFilterOptions, countsFilterOptions } from './modalFilterOptions.data';

const categoriesReport: IReportConfigs<IReportCategoriesProps> = {
  title: 'Доходи/Витрати',
  iconId: iconId.info,
  ModalChildren: ReportCategories,
  modalChildrenProps: { title: 'Звіт по категоріях', fillHeight: true, options: categoriesFilterOptions },
  disabled: false,
};
const countsReport: IReportConfigs<IReportCountsProps> = {
  title: 'Рахунки',
  iconId: iconId.info,
  ModalChildren: ReportCounts,
  modalChildrenProps: { title: 'Звіт по рахунках', fillHeight: true, options: countsFilterOptions },
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

    fitContentH: true,
    fillHeight: true,
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
      tableData: [],
      checkBoxes: false,
    },
    fitContentH: true,
    fillHeight: true,
  },
  disabled: false,
};
const activitiesReport: IReportConfigs = {
  title: 'Види діяльності',
  iconId: iconId.info,
  ModalChildren: ModalForm,
  modalChildrenProps: {
    title: 'Звіт по видах діяльності',
    fitContentH: true,
    fillHeight: true,
  },
  disabled: true,
};

const contractsReport: IReportConfigs = {
  title: 'Контракти',
  iconId: iconId.info,
  ModalChildren: ModalForm,
  modalChildrenProps: {
    title: 'Звіт по контрактах',
    fitContentH: true,
    fillHeight: true,
  },
  disabled: true,
};
const marksReport: IReportConfigs = {
  title: 'Мітки',
  iconId: iconId.info,
  ModalChildren: ModalForm,
  modalChildrenProps: {
    title: 'Звіт по мітках',
    fitContentH: true,
    fillHeight: true,
  },
  disabled: true,
};
const tagsReport: IReportConfigs = {
  title: 'Теги',
  iconId: iconId.info,
  ModalChildren: ModalForm,
  modalChildrenProps: {
    title: 'Звіт по тегах',
    fitContentH: true,
    fillHeight: true,
  },
  disabled: true,
};

export const financeReports: Partial<IReportConfigs>[] = [
  categoriesReport,
  countsReport,
  activitiesReport,
  contractorsReport,
  projectsReport,
  contractsReport,
  marksReport,
  tagsReport,
  // { title: '', disabled: true },
  // { title: '', disabled: true },
  // { title: '', disabled: true },
];

export const reports: IAccordionOptionProps<any, Partial<IReportConfigs>[]>[] = [
  // {
  //   title: 'Фінанси',
  //   ChildrenComponent: OptionsList,
  //   options: financeReports,
  // },
  // {
  //   title: 'Продажі',
  //   ChildrenComponent: OptionsList,
  //   options: financeReports,
  // },
  // {
  //   title: 'Склад ',
  //   ChildrenComponent: OptionsList,
  //   options: financeReports,
  // },
  // {
  //   title: 'Інші',
  //   ChildrenComponent: OptionsList,
  //   options: financeReports,
  // },
];
