import firebase from 'firebase/app';
import 'firebase/auth';
import type { DataAutorization } from '../types';

enum FirebaseMethodsCheckAuth {
  signIn = 'signInWithEmailAndPassword',
  createUser = 'createUserWithEmailAndPassword'
};

interface Config {
  apiKey: string; 
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

interface ErrorFirebase {
  text: string;
  type: string;
};

type UserFirebase = any;

type Autorization = ErrorFirebase | UserFirebase; 

export default class Firebase {
  public static config: Config = {
    apiKey: 'AIzaSyDMqja5swln1Yo4E2EAICwq3ZVCREQI6aU',
    authDomain: 'bon-appetit-69114.firebaseapp.com',
    projectId: 'bon-appetit-69114',
    storageBucket: 'bon-appetit-69114.appspot.com',
    messagingSenderId: '69428444391',
    appId: '1:69428444391:web:29506c3d6977766697b642'
  }

  private static error (err: string): ErrorFirebase {
    switch (err) {
      case 'auth/email-already-in-use':
        return {
          text: 'This email address is already in use',
          type: 'email'
        };
      case 'auth/invalid-email':
        return {
          text: 'Enter the correct email address',
          type: 'email'
        };
      case 'auth/operation-not-allowed':
        return {
          text: 'The operation is not available, please contact support',
          type: 'email'
        };
      case 'auth/weak-password':
        return {
          text: 'Come up with a more complex password',
          type: 'password'
        };
      case 'auth/user-disabled':
        return {
          text: 'You were disconnected from the system, log in again',
          type: 'email'
        };
      case 'auth/user-not-found':
        return {
          text: 'Incorrect email address entered',
          type: 'email'
        };
      case 'auth/wrong-password':
        return {
          text: 'Wrong password entered',
          type: 'password'
        };
      default:
        return {
          text: 'Error, repeat the request',
          type: 'email'
        };
    }
  }

  public static init (): void {
    firebase.initializeApp(this.config);
  }

  public static autorization ({ email, password, type }: DataAutorization): Promise<Autorization> {
    const nameFuncAuth = type === 'login' 
      ? FirebaseMethodsCheckAuth.signIn
      : FirebaseMethodsCheckAuth.createUser;
    
    return new Promise((resolve, reject) => {
      firebase.auth()[nameFuncAuth](email, password)
        .then(userCredential => resolve(userCredential.user))
        .catch(err => reject(this.error(err.code)));
    });
  }

  public static isAutorization (): Promise<boolean> {
    return new Promise(resolve => {
      firebase.auth().onAuthStateChanged(user => {
        user ? resolve(true) : resolve(false);
      });
    });
  }
  
  public static getUser (): UserFirebase {
    return firebase.auth().currentUser;
  }

  public static exit (): void {
    firebase.auth().signOut();
  }
}