import firebase from 'firebase/app';
import { getDatabase } from 'firebase/database';
import ConfigService from './ConfigService';
import 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import initializeApp = firebase.initializeApp;

const firebaseConfig = {
  apiKey: 'AIzaSyDOZ5snVP2OhAwS2mBaCnxjjK42MTOQrzI',
  authDomain: 'counter-app-ts.firebaseapp.com',
  projectId: 'counter-app-ts',
  storageBucket: 'counter-app-ts.appspot.com',
  messagingSenderId: '810610328602',
  appId: '1:810610328602:web:4dd5a53caf6748d174bda3',
  measurementId: 'G-JQ36T9M4YJ',
};
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);
export const firestoreDB = getFirestore(firebaseApp);
export class FireBaseService {
  public static app = firebase.initializeApp(ConfigService.getFireBaseConfig());

  public static db = getDatabase(this.app);

  public static storage = storage;

  public static uploadImage() {}
}
// rules_version = '2';
//
// service cloud.firestore {
//   match /databases/{database}/documents {
//   match /{document=**} {
//     allow read, write: if
//       request.time < timestamp.date(2023, 10, 18);
//   }
// }
// }

// rules_version = '2';
//
// service cloud.firestore {
//   match /databases/{database}/documents {
//   match /{document=**} {
//     allow read, write: if false;
//   }
// }
// }
