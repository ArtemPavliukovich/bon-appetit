import firebase from 'firebase/app';
import 'firebase/auth';

export default class Firebase {
  static config = {
    apiKey: 'AIzaSyDMqja5swln1Yo4E2EAICwq3ZVCREQI6aU',
    authDomain: 'bon-appetit-69114.firebaseapp.com',
    projectId: 'bon-appetit-69114',
    storageBucket: 'bon-appetit-69114.appspot.com',
    messagingSenderId: '69428444391',
    appId: '1:69428444391:web:29506c3d6977766697b642'
  }

  static error (err) {
    switch (err) {
      case 'auth/email-already-in-use':
        return 'This email address is already in use';
      case 'auth/invalid-email':
        return 'Enter the correct email address';
      case 'auth/operation-not-allowed':
        return 'The operation is not available, please contact support';
      case 'auth/weak-password':
        return 'Come up with a more complex password';
      case 'auth/invalid-email':
        return 'The entered email address does not exist';
      case 'auth/user-disabled':
        return 'You were disconnected from the system, log in again';
      case 'auth/user-not-found':
        return 'Incorrect email address entered';
      case 'auth/wrong-password':
        return 'Wrong password entered';
      default:
        return 'Error, repeat the request';
    }
  }

  static init () {
    firebase.initializeApp(this.config);
  }

  static autorization ({ email, password, type }) {
    const funcAutorization = type === 'sign-in' 
      ? firebase.auth().signInWithEmailAndPassword
      : firebase.auth().createUserWithEmailAndPassword;

    return new Promise((resolve, reject) => {
      funcAutorization(email, password)
        .then(userCredential => resolve(userCredential.user))
        .catch(err => reject(this.error(err.code)));
    });
  }

  static isAutorization () {
    return new Promise(resolve => {
      firebase.auth().onAuthStateChanged(user => {
        return user ? resolve(true) : resolve(false);
      });
    });
  }

  static getUser () {
    return firebase.auth().currentUser;
  }

  static exit () {
    return firebase.auth().signOut();
  }
}