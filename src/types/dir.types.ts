import { ModalFormProps } from '../components/ModalForm';
import { FinCategoryEntity, FinCategoryFormData, FinTransactionTypeEnum, TagTypeEnum } from './directories.types';
import { FinAccountsTypeEnum } from './finances/fin-accounts.types';
import { TabOption } from '../components/atoms/TabSelector';
import {
  HasDescription,
  HasEmail,
  HasIconUrl,
  HasLabel,
  HasPhone,
  HasType,
  IBase,
  IBaseKeys,
  MaybeNull,
  OnlyUUID,
} from './utils.types';
import { CompanyEntity } from './companies/companies.types';
import { ApiDirType } from '../redux/APP_CONFIGS';
import { IModalProviderContext, ModalService } from '../Providers/ModalProvider/ModalProvider';
import { DirectoriesService } from '../hooks/useDirService.hook';
import { AppSubmitHandler, UseAppFormSubmitOptions } from '../hooks/useAppForm.hook';
import { ContractorsTypesEnum } from '../redux/directories/contractors.types';
import { OfferTypeEnum } from './offers/offers.types';
import { CounterpartyTypesEnum } from '../redux/directories/counterparties.types';
import { UUID } from '../redux/app-redux.types';
import { OfferCategoryFormData } from '../components/Forms/Directories/FormCreateOfferCategory';

export interface DirItemTypeByDirType extends Record<ApiDirType, any> {
  [ApiDirType.COUNTS]: FinAccountsTypeEnum;
  [ApiDirType.CATEGORIES_TR]: FinTransactionTypeEnum;
  [ApiDirType.CATEGORIES_PROD]: OfferTypeEnum;
  [ApiDirType.PROPERTIES_PRODUCTS]: OfferTypeEnum;
  [ApiDirType.CONTRACTORS]: ContractorsTypesEnum | CounterpartyTypesEnum;
  [ApiDirType.COUNTERPARTIES]: ContractorsTypesEnum | CounterpartyTypesEnum;
  [ApiDirType.TAGS]: TagTypeEnum;
}

export interface IBaseDirItem<Type = any, DirType extends ApiDirType = any>
  extends IBase,
    HasLabel,
    HasDescription,
    HasEmail,
    HasPhone {
  dirType?: DirType;
  owner?: Pick<CompanyEntity, '_id' | 'name' | 'email'>;

  parent?: IBaseDirItem<Type, DirType>;
  childrenList?: IBaseDirItem<Type, DirType>[];

  type?: DirItemTypeByDirType[DirType] extends any ? DirItemTypeByDirType[DirType] : Type;

  secondName?: MaybeNull<string>;
  name?: MaybeNull<string>;

  taxCode?: string | number;
  personalTaxCode?: string | number;

  manufacturer?: string;
  code?: string;
}

export interface IDirItemBase<DirType extends ApiDirType = any, Type = any> extends IBaseDirItem<Type, DirType> {}

export type DirItemFormData<Type> = Omit<Type, IBaseKeys | 'childrenList' | 'parent'> &
  Partial<OnlyUUID> & {
    parent?: MaybeNull<Partial<OnlyUUID> & HasLabel>;
    parentId?: UUID;
  };
export interface IDirTreeParentItem<DirType extends ApiDirType = any> extends IDirItemBase<DirType> {
  childrenList: IDirTreeParentItem<DirType>[];
}
export interface IDirTreeChildItem<DirType extends ApiDirType = any> extends IDirTreeParentItem<DirType> {
  parent: IDirTreeParentItem<DirType>;
}

export interface DirBaseProps extends ModalFormProps {
  title: string;
}

export interface DirectoriesFormProps<DirType extends ApiDirType = any, ItemDataType = any, FormData = any>
  extends Omit<ModalFormProps<any, any, FormData>, 'onSubmit'> {
  _id?: string;
  dirType?: DirType;
  type?: DirItemTypeByDirType[DirType];
  data?: ItemDataType;
  parent?: Partial<ItemDataType>;
  create?: boolean;
  edit?: boolean;
  onSubmit?: AppSubmitHandler<FormData, { logAfterSubmit?: boolean }>;
}
export interface GetDirInTreeActionsCreatorOptions {
  createParentTitle?: string;
  createChildTitle?: string;
  updateItemTitle?: string;
}

export interface IDirInTreeProps<
  DirType extends ApiDirType = any,
  CreateDTO = any,
  UpdateDTO = any,
  ItemDataType extends IDirItemBase = any,
  Service = any,
  SubmitOptions = any,
> extends DirBaseProps {
  dirType: DirType;
  type?: DirItemTypeByDirType[DirType];
  createParentTitle?: string;
  options?: TabOption<DirItemTypeByDirType[DirType]>[];
  filterSearchPath?: keyof IDirItemBase<DirType>;
  filterDefaultValue?: DirItemTypeByDirType[DirType];
  availableLevels?: number;

  editing?: boolean;
  creatingParent?: boolean;
  creatingChild?: boolean;
  disabling?: boolean;
  archiving?: boolean;
  changeDisableStatus?: boolean;
  changeArchiveStatus?: boolean;

  actionsCreator: DirInTreeActionsCreatorType<DirType, ItemDataType, Service, CreateDTO | UpdateDTO, SubmitOptions>;
}

export type ActionsCreatorOptions<
  DirType extends ApiDirType = any,
  CreateDTO = any,
  UpdateDTO = any,
  ItemDataType = any,
> = {
  modalService: IModalProviderContext;
  service: DirectoriesService<DirType, CreateDTO, UpdateDTO, ItemDataType>;
  dirType: DirType;
  type?: DirItemTypeByDirType[DirType];
  findById?: (id: string) => ItemDataType | undefined;
};
export type DirInTreeActionsCreatorOptions<DirType extends ApiDirType = any, ItemDataType = any, Service = any> = {
  modalService: ModalService;
  dirType: DirType;
  service: Service;
  type?: DirItemTypeByDirType[DirType];
  findById?: (id: string) => ItemDataType | undefined;
};
export type DirInTreeActionsCreatorType<
  DirType extends ApiDirType = any,
  ItemDataType extends IDirItemBase = any,
  Service = any,
  ItemDto = any,
  SubmitOptions = any,
> = (options: DirInTreeActionsCreatorOptions<DirType, ItemDataType, Service>) => {
  onCreateParent?: (options?: UseAppFormSubmitOptions & SubmitOptions) => void;
  onCreateChild?: (
    parentId: string,
    parent: MaybeNull<IBaseDirItem>,
    options?: UseAppFormSubmitOptions & SubmitOptions
  ) => void;
  onCreateValue?: (
    parentId: string,
    parent: MaybeNull<IBaseDirItem>,
    options?: UseAppFormSubmitOptions & SubmitOptions
  ) => void;

  onUpdate?: (id: string, data: ItemDataType, options?: UseAppFormSubmitOptions & SubmitOptions) => void;
  onDelete?: (id: string, options?: UseAppFormSubmitOptions & SubmitOptions) => void;
  getDto?: () => ItemDto;
  onChangeArchiveStatus?: (id: string, status: boolean, options?: UseAppFormSubmitOptions & SubmitOptions) => void;
  onChangeDisableStatus?: (id: string, status: boolean, options?: UseAppFormSubmitOptions & SubmitOptions) => void;
};

export interface DirFinCategoriesProps
  extends IDirInTreeProps<ApiDirType.CATEGORIES_TR, FinCategoryFormData, FinCategoryFormData, FinCategoryEntity> {}

export interface DirOfferCategoriesProps
  extends IDirInTreeProps<
    ApiDirType.CATEGORIES_PROD,
    OfferCategoryFormData,
    OfferCategoryFormData,
    OfferCategoryEntity
  > {}

export interface IActivity extends IDirItemBase<ApiDirType.ACTIVITIES> {}
export interface IActivityFormData extends Omit<IActivity, '_id' | 'createdAt' | 'updatedAt'> {}
export interface DirActivitiesProps
  extends IDirInTreeProps<ApiDirType.ACTIVITIES, IActivityFormData, IActivityFormData, IActivity> {}

// ? ================ OFFER CATEGORIES
export interface OfferCategoryEntity
  extends IBase,
    Pick<IDirItemBase<ApiDirType.CATEGORIES_PROD>, 'label' | 'dirType' | 'description' | 'parent' | 'childrenList'>,
    HasType<OfferTypeEnum>,
    HasIconUrl {}

// ? ================ BRANDS
export interface IBrand extends IDirItemBase {}
export interface IBrandFormData extends Omit<IBrand, '_id' | 'createdAt' | 'updatedAt'> {}
export interface DirBrandsProps extends IDirInTreeProps<ApiDirType.BRANDS, IBrandFormData, IBrandFormData, IBrand> {}

// ? PRODUCTS PROPERTIES

export interface DirMarksProps extends IDirInTreeProps<ApiDirType.MARKS> {}

export interface ITagDirItem extends IDirItemBase<ApiDirType.TAGS> {}
export interface DirTagsProps extends IDirInTreeProps<ApiDirType.TAGS> {}

export interface SupplierDirEntity extends IDirItemBase<ApiDirType.CONTRACTORS> {}

// ? ======== METHODS
export interface IShipmentDirItem extends IDirItemBase<ApiDirType.METHODS_SHIPMENT> {}
export interface IPaymentDirItem extends IDirItemBase<ApiDirType.METHODS_PAYMENT> {}

export type MethodDirType = ApiDirType.METHODS_SHIPMENT | ApiDirType.METHODS_COMMUNICATION | ApiDirType.METHODS_PAYMENT;

export type IMethodDirItem = IShipmentDirItem | IPaymentDirItem;
