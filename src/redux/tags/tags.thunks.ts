import { createAppAsyncThunk } from '../createAppAsynkThunk';
import { TagsApi } from '../../api/Tags.api';

export enum TagThunkTypeEnum {
  create = 'create',
  update = 'update',
  getAll = 'getAll',
  getOne = 'getOne',
  softDelete = 'softDelete',
  delete = 'delete',
}

export const createTagThunk = createAppAsyncThunk(TagThunkTypeEnum.create, TagsApi.create);
export const updateTagThunk = createAppAsyncThunk(TagThunkTypeEnum.update, TagsApi.update);
export const getOneTagThunk = createAppAsyncThunk(TagThunkTypeEnum.getOne, TagsApi.update);
export const getAllTagsThunk = createAppAsyncThunk(TagThunkTypeEnum.getAll, TagsApi.getAll);
