import { FieldValues } from 'react-hook-form/dist/types';
import { Path } from 'react-hook-form';

export const createGridAreaFromKeyArrays = <T extends FieldValues = any>(
  areasArrays: (Path<T> | string)[][] = [[]]
): string => {
  const getIsEqual = () => areasArrays?.map(rowArr => rowArr.length).every((el, _i, arr) => el === arr[0]);
  const isEqual = getIsEqual();

  if (areasArrays[0].length === 0) {
    const gridAreaTest = createGridAreaFromKeyArrays<{
      field_1: any;
      field_2: any;
      field_3: { field_3_1: any; field_3_2: any };
    }>([
      ['field_3.field_3_1', 'field_2', 'field_3.field_3_1', 'sdvsfv'],
      ['field_3.field_3_1', 'sdvsfv'],
      ['field_3.field_3_1', 'sdvsfv', 'field_3.field_3_1'],
    ]);
    console.log(gridAreaTest);
  }

  if (isEqual) {
    const rows = areasArrays.map(row => row.join(' '));
    const gridAreasString = rows.join("' '");

    console.log(rows);
    console.log({ gridAreasString });

    return gridAreasString;
  }

  return '';
};
