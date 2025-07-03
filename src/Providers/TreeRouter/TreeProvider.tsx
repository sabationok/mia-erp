import { TreeEntityType } from '../../types';
import { createContext, useContext, useMemo, useState } from 'react';

type TreeRouterContextType<Node = TreeEntityType> = {
  currentId?: string;
  currentNode?: Node;
  breadcrumbs: Node[];
  navTo: (id: string) => void;
  goBack: () => void;
  goUp: () => void;
  currentNodeChildren?: TreeEntityType[];
  treeMap: Map<string, TreeEntityType>;
};

export type TreeRouterProps = {
  treeMap: Map<string, TreeEntityType>;
  children: React.ReactNode;
  rootId: string;
};

const TreeRouterContext = createContext<TreeRouterContextType | undefined>(undefined);

export const TreeRouterProvider: React.FC<TreeRouterProps> = ({ treeMap, rootId, children }) => {
  const [history, setHistory] = useState<string[]>([rootId]);

  const currentId = history[history.length - 1];
  const currentNode = treeMap.get(currentId);
  const currentNodeChildren = useMemo(() => {
    return (currentNode?.children ?? currentNode?.childrenList)
      ?.map(item => {
        return treeMap.get(item._id);
      }, [])
      .filter(Boolean) as TreeEntityType[];
  }, [currentNode?.children, currentNode?.childrenList, treeMap]);

  const navTo = (id: string) => {
    if (!treeMap.has(id)) return;
    setHistory(prev => [...prev, id]);
  };

  const goBack = () => {
    if (history.length > 1) setHistory(prev => prev.slice(0, -1));
  };

  const goUp = () => {
    const parentId = currentNode?.parent?._id;
    if (parentId && treeMap.has(parentId)) {
      setHistory(prev => [...prev, parentId]);
    }
  };

  const breadcrumbs = useMemo(() => {
    return history.map(id => treeMap.get(id)).filter(Boolean) as TreeEntityType[];
  }, [history, treeMap]);

  return (
    <TreeRouterContext.Provider
      value={{
        currentId,
        currentNode,
        breadcrumbs,
        navTo,
        goBack,
        goUp,
        currentNodeChildren,
        treeMap,
      }}
    >
      {children}
    </TreeRouterContext.Provider>
  );
};

export function useTreeRouter<Node = TreeEntityType>(): TreeRouterContextType<Node> {
  const ctx = useContext<TreeRouterContextType<Node>>(TreeRouterContext as never);
  if (!ctx) throw new Error('useTreeRouter must be used inside <TreeRouterProvider>');
  return ctx;
}
