import { ICustomRole } from '../redux/customRoles/customRoles.types';
import { AppResponse, IBase, OnlyUUID } from '../redux/global.types';
import { CompanyEntity } from './companies.types';
import { IUserBase } from './auth.types';
import { StateErrorType } from '../redux/reduxTypes.types';
import { OutputIntegrationBase } from './integrations.types';
import { AppDate } from './utils.types';

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
  company?: CompanyEntity;
  user?: IUserBase;
  integration?: OutputIntegrationBase;
  owner?: IUserBase;
  role?: ICustomRole;
  email?: string;
  status?: PermissionStatus;
  code?: string | number;
  expireAt?: AppDate;

  permission_token?: string;
  access_token?: string;
  refresh_token?: string;
}

export interface IPermissionForReq {
  role?: OnlyUUID;
  email?: string;
  expireAt?: string | number | Date;
  actions?: any[];
}

export interface IPermissionResData extends AppResponse<PermissionEntity> {}

export interface IPermissionsResData extends AppResponse<PermissionEntity[]> {}

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
