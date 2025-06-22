export const useHook = <H extends () => any>(hook: H, canApply: () => boolean): ReturnType<H> | undefined => {
  if (!canApply()) return undefined;
  return hook();
};
