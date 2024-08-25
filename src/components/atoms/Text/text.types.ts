import { Property } from 'csstype';

export type FontWeight = 300 | 400 | 500 | 600 | 700 | 800 | 900 | Property.FontWeight;

enum FontFamilyNames {
  Comfortaa = 'Comfortaa',
  ComfortaaMedium = 'ComfortaaMedium',
  ComfortaaBold = 'ComfortaaBold',
  Montserrat = 'Montserrat',
  MontserratMedium = 'MontserratMedium',
  MontserratSemiBold = 'MontserratSemiBold',
  MontserratBold = 'MontserratBold',
  MontserratBlack = 'MontserratBlack',
  RalewayBold = 'RalewayBold',
  RalewayExtraBold = 'RalewayExtraBold',
  RalewayBlack = 'RalewayBlack',
  Roboto = 'Roboto',
  RobotoMedium = 'RobotoMedium',
  RobotoBold = 'RobotoBold',
  RobotoBlack = ' RobotoBlack',
}
type FontType = keyof typeof FontFamilyNames | FontFamilyNames;
export default FontType;

// }
