import { useNavigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { OnlyUUID } from '../../types/utils.types';
import { useAppQuery, useAppRouter } from '../../hooks';

type TreeEntity = OnlyUUID & {
  parent?: TreeEntity;
  children: TreeEntity[];
  childrenList: TreeEntity[];
  path?: string;
  label?: string;
};

type Params = {
  rootId?: string;
  id?: string;
  mpath?: string;
};

export const CharacteristicRouterInner: React.FC<{
  treeEntitiesMap: Map<string, TreeEntity>;
  children: React.ReactNode;
  baseName: string;
}> = ({ treeEntitiesMap, children, baseName }) => {
  const navigate = useNavigate();
  const riuter = useAppRouter();
  const { set } = useAppQuery<Params>();

  const { id: currentId, mpath } = useParams<Params>();

  const currentNode = currentId ? treeEntitiesMap.get(currentId) || null : null;
  const navigateTo = (params: Params) => navigate(`/${baseName}?${new URLSearchParams(params)}`);
  const back = () => navigate(-1);

  const breadcrumbs = useMemo(() => {
    const parts = mpath?.split('.').filter(Boolean).slice(1); // remove 'characteristics'
    return parts?.map(pid => treeEntitiesMap.get(pid)).filter(Boolean) as TreeEntity[];
  }, [mpath, treeEntitiesMap]);

  const value: CharacteristicRouterContextType = {
    currentNode,
    navigateTo,
    back,
    breadcrumbs,
    currentId,
  };

  return <CharacteristicRouterContext.Provider value={value}>{children}</CharacteristicRouterContext.Provider>;
};
