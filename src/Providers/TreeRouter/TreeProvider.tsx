import { MemoryRouter, Route, Routes } from 'react-router-dom';

export const CharacteristicRouterProvider: React.FC<{
  characteristics: Map<string, Characteristic>;
  rootId: string;
  children: React.ReactNode;
}> = ({ characteristics, rootId, children }) => {
  return (
    <MemoryRouter initialEntries={[`/characteristics/${rootId}`]}>
      <Routes>
        <Route
          path="/characteristics/:id"
          element={<CharacteristicRouterInner characteristics={characteristics}>{children}</CharacteristicRouterInner>}
        />
      </Routes>
    </MemoryRouter>
  );
};
