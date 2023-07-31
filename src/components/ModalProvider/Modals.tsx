import ModalForm, { ModalFormProps } from '../ModalForm';
import FormCreateDirTreeComp, { FormCreateDirTreeCompProps } from '../Forms/FormCreateDirTreeComp';
import FormCreateActivity, { FormCreateCompanyActivityProps } from '../Forms/FormCreateActivity';
import FormCreateContractor, { FormCreateContractorProps } from '../Forms/FormCreateContractor';
import FormCreateTransaction, { FormCreateTransactionProps } from '../Forms/FormCreateTransaction';
import FormCreateCategory, { FormCreateCategoryProps } from '../Forms/FormCreateCategory';
import FormCreatePriceList, { FormCreatePriceListProps } from '../Forms/FormCreatePriceList';
import FormCreatePrice, { FormCreatePriceProps } from '../Forms/FormCreatePrice';
import FormCreateCustomRole, { FormCreateCustomRoleProps } from '../Forms/FormCreateCustomRole';
import FormCreateCount, { FormCreateCountProps } from '../Forms/FormCreateCount';
import PriceListOverview, { PriceListOverviewProps } from '../Modals/PriceListOverview';
import ProductOverview, { ProductOverviewProps } from '../Modals/ProductOverview';
import FormCreateCompany, { FormCreateCompanyProps } from '../Forms/FormCreateCompany';
import FormCreateOrder, { FormCreateOrderProps } from '../Forms/FormCreateOrder';

export enum Modals {
  FormCreateTag = 'FormCreateTag',
  FormCreateActivity = 'FormCreateActivity',
  FormCreateDirTreeComponent = 'FormCreateDirTreeComponent',
  FormCreateContractor = 'FormCreateContractor',
  FormCreateTransaction = 'FormCreateTransaction',
  FormCreatePrice = 'FormCreatePrice',
  FormCreateOrder = 'FormCreateOrder',
  FormCreatePriceList = 'FormCreatePriceList',
  FormCreateCustomRole = 'FormCreateCustomRole',
  FormCreateCount = 'FormCreateCount',
  FormCreateCategory = 'FormCreateCategory',
  FormCreateCompany = 'FormCreateCompany',

  PriceListOverview = 'PriceListOverview',
  ProductOverview = 'ProductOverview',
  ModalForm = 'ModalForm',
}

export const ModalChildrenMap: Record<Modals, React.FC<any>> = {
  // [Modals.FormCreateTag]: FormCreateTag,
  [Modals.ModalForm]: ModalForm, //
  [Modals.FormCreateDirTreeComponent]: FormCreateDirTreeComp, //
  [Modals.FormCreateActivity]: FormCreateActivity, //
  [Modals.FormCreateContractor]: FormCreateContractor, //
  [Modals.FormCreateTransaction]: FormCreateTransaction, //
  [Modals.FormCreateCategory]: FormCreateCategory, //
  [Modals.FormCreatePriceList]: FormCreatePriceList, //
  [Modals.FormCreatePrice]: FormCreatePrice, //
  [Modals.FormCreateCustomRole]: FormCreateCustomRole, //
  [Modals.FormCreateCount]: FormCreateCount, //
  [Modals.FormCreateCompany]: FormCreateCompany, //
  [Modals.FormCreateOrder]: FormCreateOrder, //
  [Modals.FormCreateTag]: ModalForm, //

  [Modals.PriceListOverview]: PriceListOverview,
  [Modals.ProductOverview]: ProductOverview,
};

export interface ModalChildrenProps {
  [Modals.ModalForm]: ModalFormProps;
  [Modals.FormCreateDirTreeComponent]: FormCreateDirTreeCompProps;
  [Modals.FormCreateActivity]: FormCreateCompanyActivityProps;
  [Modals.FormCreateContractor]: FormCreateContractorProps;
  [Modals.FormCreateTransaction]: FormCreateTransactionProps;
  [Modals.FormCreateCategory]: FormCreateCategoryProps;
  [Modals.FormCreatePriceList]: FormCreatePriceListProps;
  [Modals.FormCreatePrice]: FormCreatePriceProps;
  [Modals.FormCreateCategory]: FormCreateCategoryProps;
  [Modals.FormCreateCount]: FormCreateCountProps;
  [Modals.FormCreateCompany]: FormCreateCompanyProps;
  [Modals.FormCreateOrder]: FormCreateOrderProps;
  [Modals.FormCreateCustomRole]: FormCreateCustomRoleProps;
  [Modals.FormCreateTag]: ModalFormProps;

  [Modals.PriceListOverview]: PriceListOverviewProps;
  [Modals.ProductOverview]: ProductOverviewProps;
}
