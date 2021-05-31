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
        return 'Такой адрес электронной почты уже используется';
      case 'auth/invalid-email':
        return 'Введите правильный адрес почты';
      case 'auth/operation-not-allowed':
        return 'Операция не доступна, обратитесь в службу поддерки';
      case 'auth/weak-password':
        return 'Придумайте более сложный пароль';
      case 'auth/invalid-email':
        return 'Введенного адреса электронной почты не существует';
      case 'auth/user-disabled':
        return 'Вы были отключены от системы, авторизируйтесь заново';
      case 'auth/user-not-found':
        return 'Не правильно введен адрес электронной почты';
      case 'auth/wrong-password':
        return 'Не правильно введен пароль';
      default:
        return 'Ошибка, повторите запрос';
    }
  }

  static init () {
    firebase.initializeApp(this.config);
  }

  static register (user) {
    const { email, password, name } = user;
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          userCredential.user.updateProfile({displayName: name})
            .then(() => resolve(userCredential.user))
            .catch(() => reject('Произошла ошибка'));
        })
        .catch(err => reject(this.error(err.code)));
    });
  }

  static signIn (user) {
    const { email, password } = user;
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(userCredential => resolve(userCredential.user))
        .catch(err => reject(this.error(err.code)));
    });
  }

  static checkAutorization () {
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