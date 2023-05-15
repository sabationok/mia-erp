import { IAccordeonOptionProps } from 'components/SideBarContent/AccordeonList';
import OptionsList from 'components/SideBarContent/OptionsList';
import { iconId } from 'img/sprite/iconId.data';
import { IReportBaseProps } from '../components/Raports/report.types';
import ReportCategories, { IReportCategoriesProps } from '../components/Raports/ReportCategories';
import ReportCounts, { IReportCountsProps } from '../components/Raports/ReportCounts';
import ModalForm, { ModalFormProps } from '../components/ModalForm';

export interface IReport<P = IReportBaseProps> extends ModalFormProps {
  title: string;
  iconId: string;
  ModalChildren: React.FC<P> | React.ReactNode;
  modalChildrenProps: P;
  disabled: boolean;
}

const categoriesReport: IReport<IReportCategoriesProps> = {
  title: 'Категорії',
  iconId: iconId.info,
  ModalChildren: ReportCategories,
  modalChildrenProps: { title: 'Звіт по категоріях' },
  disabled: false,
};
const countsReport: IReport<IReportCountsProps> = {
  title: 'Кахунки',
  iconId: iconId.info,
  ModalChildren: ReportCounts,
  modalChildrenProps: { title: 'Звіт по рахунках' },
  disabled: false,
};
const activitiesReport: IReport = {
  title: 'Види діяльності',
  iconId: iconId.info,
  ModalChildren: ModalForm,
  modalChildrenProps: { title: 'Звіт по видах діяльності' },
  disabled: false,
};
const projectsReport: IReport = {
  title: 'Проекти',
  iconId: iconId.info,
  ModalChildren: ModalForm,
  modalChildrenProps: { title: 'Звіт по проектах' },
  disabled: false,
};
const contractorsReport: IReport = {
  title: 'Контрагенти',
  iconId: iconId.info,
  ModalChildren: ModalForm,
  modalChildrenProps: { title: 'Звіт по контрагентах' },
  disabled: false,
};
const contractsReport: IReport = {
  title: 'Контракти',
  iconId: iconId.info,
  ModalChildren: ModalForm,
  modalChildrenProps: { title: 'Звіт по контрактах' },
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
