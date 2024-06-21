import { createAppAsyncThunk } from '../../createAppAsynkThunk';
import { TrackingApi } from '../../../api/tracking.api';

export enum LinksThunkTypeEnum {
  getAll = 'tracking/links/getAllThunk',
  getOne = 'tracking/links/getOneThunk',
}

export const getAllLinksThunk = createAppAsyncThunk(LinksThunkTypeEnum.getAll, TrackingApi.links.getAll);
