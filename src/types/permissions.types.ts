import { ICustomRole } from '../redux/customRoles/customRoles.types';
import { ApiResponse, IBase, OnlyUUID } from '../redux/app-redux.types';
import { CompanyEntity } from './companies.types';
import { IUserBase } from './auth.types';
import { StateErrorType } from '../redux/reduxTypes.types';
import { Integration } from './integrations.types';
import { AppDate } from './utils.types';
import { CustomerEntity } from './customers.types';

export namespace Permission {
  export enum Status {
    PENDING = 'PENDING',
    REJECTED = 'REJECTED',
    ACCEPTED = 'ACCEPTED',
    BANED = 'BANED',
  }
  export enum HolderType {
    user = 'user',
    integration = 'integration',
    customer = 'customer',
    company = 'company',
  }
  export interface Holders {
    user?: IUserBase;

    company?: CompanyEntity;
    customer?: Omit<CustomerEntity, 'permission'>;
    integration?: Omit<Integration.Output.Entity, 'permission'>;
  }
  export type HolderByHype<Type extends HolderType> = Holders[Type];

  interface BaseEntity {
    status?: Status;
    expireAt?: AppDate;
    permission_token?: string;
    access_token?: string;
    refresh_token?: string;
  }

  export interface Entity extends IBase, BaseEntity, Holders {
    role?: ICustomRole;
  }
}
export enum PermissionStatus {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
  BANED = 'BANED',
}
export enum PermissionRecipientEnum {
  user = 'user',
  integration = 'integration',
}
export interface PermissionEntity extends IBase {
  owner?: IUserBase;
  user?: IUserBase;
  company?: CompanyEntity;
  integration?: Omit<Integration.Output.Entity, 'permission'>;
  // customer?: CustomerEntity;

  role?: ICustomRole;
  status?: PermissionStatus;

  expireAt?: AppDate;
  permission_token?: string;
  access_token?: string;
  refresh_token?: string;
}

export interface IPermissionForReq {
  role?: OnlyUUID;
  expireAt?: string | number | Date;
  actions?: any[];
}

export interface IPermissionsResData extends ApiResponse<PermissionEntity[]> {}

export interface IPermissionReqData<D = IPermissionForReq | Partial<IPermissionForReq>> {
  id: string;
  _id?: string;
  data: D;
}

export interface IPermissionsState {
  permission: Partial<PermissionEntity>;
  permissions: PermissionEntity[];
  users: PermissionEntity[];
  permission_token?: string;
  isLoading: boolean;
  error: StateErrorType;
}
