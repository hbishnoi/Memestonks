import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
// import { AuthContext } from "../firebase/Auth";

var firestore = firebase.firestore();
var storage = firebase.storage();
// const docRef = firestore.doc("users/"+)

async function doCreateUserWithEmailAndPassword(email, password, displayName) {
  await firebase.auth().createUserWithEmailAndPassword(email, password);
  await firebase.auth().currentUser.updateProfile({ displayName: displayName });
}

async function doChangePassword(email, oldPassword, newPassword) {
  let credential = firebase.auth.EmailAuthProvider.credential(
    email,
    oldPassword
  );
  await firebase.auth().currentUser.reauthenticateWithCredential(credential);
  await firebase.auth().currentUser.updatePassword(newPassword);
  await doSignOut();
}

async function doUpdateProfile(
  uid,
  username,
  address,
  city,
  state,
  zip,
  image,
  oldImage
) {
  const docRef = firestore.doc("users/" + uid);
  await docRef.set({
    userDisplayName: username,
    userAddress: address,
    userCity: city,
    userState: state,
    userZip: zip,
  });

  await firebase.auth().currentUser.updateProfile({ displayName: username });
  if (image != "") {
    await storage.ref(`images/${uid}/profileImage`).put(image);
  }
}

async function doSignInWithEmailAndPassword(email, password) {
  await firebase.auth().signInWithEmailAndPassword(email, password);
}

async function doSocialSignIn(provider) {
  let socialProvider = null;
  if (provider === "google") {
    socialProvider = new firebase.auth.GoogleAuthProvider();
  } else if (provider === "facebook") {
    socialProvider = new firebase.auth.FacebookAuthProvider();
  }
  await firebase.auth().signInWithPopup(socialProvider);
}

async function doPasswordReset(email) {
  await firebase.auth().sendPasswordResetEmail(email);
}

async function doPasswordUpdate(password) {
  await firebase.auth().updatePassword(password);
}

async function doSignOut() {
  await firebase.auth().signOut();
  alert("Signed out");
}

export {
  doCreateUserWithEmailAndPassword,
  doSocialSignIn,
  doSignInWithEmailAndPassword,
  doUpdateProfile,
  doPasswordReset,
  doPasswordUpdate,
  doSignOut,
  doChangePassword,
};
