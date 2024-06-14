import { createAppAsyncThunk } from '../createAppAsynkThunk';
import { TagsApi } from '../../api/Tags.api';
import { TagTypeEnum } from '../../types/directories.types';

export enum TagThunkTypeEnum {
  create = 'tags/create/Thunk',
  update = 'tags/update/Thunk',
  getAll = 'tags/getAll/Thunk',
  getOne = 'tags/getOne/Thunk',
  softDelete = 'tags/softDelete/Thunk',
  delete = 'tags/delete/Thunk',
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
