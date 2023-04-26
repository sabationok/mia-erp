import { IAccordeonOptionProps } from 'components/SideBarContent/AccordeonList';
import OptionsList from 'components/SideBarContent/OptionsList';
import { iconId } from 'img/sprite/iconId.data';
import { IReportBaseProps } from '../components/Raports/report.types';
import ReportCategories, { IReportCategoriesProps } from '../components/Raports/ReportCategories';
import ReportCounts, { IReportCountsProps } from '../components/Raports/ReportCounts';
import ModalForm from '../components/ModalForm/ModalForm';

export interface IReport<P = IReportBaseProps> {
  title: string;
  iconId: string;
  ModalChildren: React.FC<P> | React.ReactNode;
  modalChildrenProps: P;
  disabled: boolean;
}

const categoriesReport: IReport<IReportCategoriesProps> = {
  title: 'По категоріях',
  iconId: iconId.info,
  ModalChildren: ReportCategories,
  modalChildrenProps: { title: 'Звіт по категоріях' },
  disabled: false,
};
const countsReport: IReport<IReportCountsProps> = {
  title: 'По рахунках',
  iconId: iconId.info,
  ModalChildren: ReportCounts,
  modalChildrenProps: { title: 'Звіт по рахунках' },
  disabled: false,
};
const activitiesReport: IReport = {
  title: 'По видах діяльності',
  iconId: iconId.info,
  ModalChildren: ModalForm,
  modalChildrenProps: { title: 'Звіт по видах діяльності' },
  disabled: false,
};
const projectsReport: IReport = {
  title: 'По проектах',
  iconId: iconId.info,
  ModalChildren: ModalForm,
  modalChildrenProps: { title: 'Звіт по проектах' },
  disabled: false,
};
const contractorsReport: IReport = {
  title: 'По контрагентах',
  iconId: iconId.info,
  ModalChildren: ModalForm,
  modalChildrenProps: { title: 'Звіт по контрагентах' },
  disabled: false,
};
const contractsReport: IReport = {
  title: 'По договорах',
  iconId: iconId.info,
  ModalChildren: ModalForm,
  modalChildrenProps: { title: 'Звіт по договорах' },
  disabled: true,
};
const marksReport: IReport = {
  title: 'Мітки',
  iconId: iconId.info,
  ModalChildren: ModalForm,
  modalChildrenProps: { title: 'Звіт по мітках' },
  disabled: true,
};
const tagsReport: IReport = {
  title: 'Теги',
  iconId: iconId.info,
  ModalChildren: ModalForm,
  modalChildrenProps: { title: 'Звіт по тегах' },
  disabled: true,
};


const financeReports: IReport[] = [
  categoriesReport,
  countsReport,
  activitiesReport,
  projectsReport,
  contractorsReport,
  contractsReport,
  marksReport,
  tagsReport,
];

export const reports: IAccordeonOptionProps<any, IReport[]>[] = [
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
