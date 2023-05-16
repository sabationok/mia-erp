import * as _ from 'lodash';

interface IBase<T = any> {
  _id?: string;
  label?: string;
  name?: string;
  amount?: number;
  owner?: IBase<T> | null;
  percentage?: number;
  childrenCount?: number;
  childrenList?: (T & IBase<T>)[] | null;
}

async function findChildrenById<T = any>(id?: string, data?: (T & IBase<T>)[]): Promise<(T & IBase<T>)[] | null> {
  const hasChildren = data?.some(item => item.owner?._id === id);

  if (hasChildren) {
    const children = data?.filter(ch => ch.owner?._id === id);
    await Promise.all(children?.map(async ch => {
      ch.childrenList = await findChildrenById(ch._id, data);
      if (ch.childrenList) ch.childrenCount = ch.childrenList.length;
      return ch;
    }) || []);
    return children !== undefined ? children : null;
  }

  return null;
}

export default async function createTreeData<T = any>(data: (T & IBase<T>)[]): Promise<(T & IBase<T>)[]> {
  const clonedData = _.cloneDeep(data);
  const root = clonedData.filter(item => !item.owner);

  await Promise.all(root.map(async item => {
    item.childrenList = await findChildrenById(item._id, data);
    if (item.childrenList) item.childrenCount = item.childrenList.length;
    return item;
  }));

  return root;
}
