import * as _ from 'lodash';
import { ICompany } from '../redux/companies/companies.types';

export interface IBaseFields<T = any> {
  _id?: string;
  label?: string;
  name?: string;
  amount?: number;
  owner?: Pick<ICompany, '_id' | 'name' | 'email'>;
  parent?: IBaseFields<T> | null;
  percentage?: number;
  childrenCount?: number;
  childrenList?: TreeOption<T>[] | null;
}

export type TreeOption<T = any> = T & IBaseFields<T>;
export type TreeOptions<T = any> = Record<string, TreeOption<T>[] | undefined>;

export interface StateControl<D = any> {
  onSuccess?: (data: D) => void;
  onError?: (error: string) => void;
  onLoading?: (loading: boolean) => void;
}

async function findChildrenById<T = any>(id?: string, data?: TreeOption<T>[]): Promise<TreeOption<T>[] | []> {
  const hasChildren = data?.some(item => item.parent?._id === id);

  if (hasChildren) {
    const children = data?.filter(ch => ch.parent?._id === id);
    await Promise.all(
      children?.map(async ch => {
        ch.childrenList = await findChildrenById(ch._id, data);
        if (ch.childrenList) ch.childrenCount = ch.childrenList.length;
        return ch;
      }) || []
    );
    return children !== undefined ? children : [];
  }

  return [];
}

export default async function createTreeData<T = any>(
  data: TreeOption<T>[],
  { onSuccess, onError, onLoading }: StateControl<TreeOption<T>[]>
): Promise<TreeOption<T>[] | []> {
  onLoading && onLoading(true);
  try {
    const root = data.filter(item => !item.parent);

    await Promise.all(
      root.map(async item => {
        item.childrenList = await findChildrenById<T>(item._id, data);

        if (item.childrenList) item.childrenCount = item.childrenList.length;
        return item;
      })
    );
    onSuccess && onSuccess(root);
    return root;
  } catch (e) {
    console.error(e);
    onError && onError('Unknown error occurred');
    return [];
  } finally {
    onLoading && onLoading(false);
  }
}

export async function createTreeDataMapById<T = any>(
  data: TreeOption<T>[],
  { onSuccess, onError, onLoading }: StateControl<TreeOptions<T>>
): Promise<TreeOptions<T>> {
  onLoading && onLoading(true);
  try {
    const root = _.cloneDeep(data).filter(item => !item.parent);
    let rootMap: TreeOptions<T> = {};

    if (root.length > 0) {
      await Promise.all(
        root.map(async item => {
          const childrenList = data.filter(ch => item._id === ch.parent?._id);

          if ('_id' in item && item._id && childrenList) rootMap[item._id] = childrenList;
          return '';
        })
      );
    }

    onSuccess && onSuccess(rootMap);
    return rootMap;
  } catch (e) {
    console.error(e);
    onError && onError('Unknown error occurred');
    return {};
  } finally {
    onLoading && onLoading(false);
  }
}

export async function createTreeDataMapByIdForRoot<T = any>(
  data: TreeOption<T>[],
  { onSuccess, onError, onLoading }: StateControl<Record<string, TreeOption<T>[]>>
): Promise<Record<string, TreeOption<T>[]>> {
  onLoading && onLoading(true);
  try {
    const root = _.cloneDeep(data);
    let rootMap: Record<string, TreeOption<T>[]> = {};

    if (root.length > 0) {
      await Promise.all(
        root.map(async item => {
          const childrenList = data.filter(ch => item._id === ch.parent?._id);

          if ('_id' in item && item._id && childrenList) rootMap[item._id] = childrenList;
          return '';
        })
      );
    }
    console.log('createTreeDataMapById root', root);

    console.log('createTreeDataMapById rootMap', rootMap);
    onSuccess && onSuccess(rootMap);
    return rootMap;
  } catch (e) {
    console.error(e);
    onError && onError('Unknown error occurred');
    return {};
  } finally {
    onLoading && onLoading(false);
  }
}
