import { createAppAsyncThunk } from '../createAppAsynkThunk';
import { TagsApi } from '../../api/Tags.api';
import { TagTypeEnum } from '../../types/directories.types';

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

type DeleteTagArgs = Parameters<typeof TagsApi.delete>;
type DeleteData = DeleteTagArgs[0];
type DeleteParams = DeleteTagArgs[1];
type DeleteReturn = Awaited<ReturnType<typeof TagsApi.delete>>['data']['data'];

export const deleteTagThunk = createAppAsyncThunk<
  DeleteData | undefined,
  DeleteParams | undefined,
  DeleteReturn,
  { type: TagTypeEnum }
>(TagThunkTypeEnum.update, TagsApi.delete);
export const getOneTagThunk = createAppAsyncThunk(TagThunkTypeEnum.getOne, TagsApi.getOne);
export const getAllTagsThunk = createAppAsyncThunk(TagThunkTypeEnum.getAll, TagsApi.getAll);
