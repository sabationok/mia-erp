import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import ConfigService from './ConfigService';

export default class FireBaseService {
  public static app = initializeApp(ConfigService.getFireBaseConfig());

  public static db = getDatabase(this.app);
}
