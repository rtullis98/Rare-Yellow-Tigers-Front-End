import firebase from 'firebase/app';
import 'firebase/auth';
// import { clientCredentials } from './client';

const dbUrl = 'https://localhost:7129';

const checkUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/checkuser/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => {
      if (resp.status === 204) {
        resolve({});
      } else {
        resolve(resp.json());
      }
    })
    .catch(reject);
});

// const checkUser = (uid) => new Promise((resolve, reject) => {
//   fetch(`${clientCredentials.databaseURL}/checkuser`, {
//     method: 'POST',
//     body: JSON.stringify({
//       uid,
//     }),
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//     },
//   })
//     .then((resp) => resolve(resp.json()))
//     .catch(reject);
// });

// const registerUser = (userInfo) => new Promise((resolve, reject) => {
//   fetch(`${clientCredentials.databaseURL}/register`, {
//     method: 'POST',
//     body: JSON.stringify(userInfo),
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//     },
//   })
//     .then((resp) => resolve(resp.json()))
//     .catch(reject);
// });

const registerUser = (userInfo) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/user`, {
    method: 'POST',
    body: JSON.stringify(userInfo),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const signOut = () => {
  firebase.auth().signOut();
};

export {
  signIn,
  signOut,
  checkUser,
  registerUser,
};
