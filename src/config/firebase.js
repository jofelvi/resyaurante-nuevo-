import * as firebase from "firebase";
// import "firebase/firestore";
// import "firebase/auth";

import { FirebaseConfig } from "./keys";

firebase.initializeApp(FirebaseConfig);
const databaseRef = firebase.database().ref();
export const authRef = firebase.auth();

export const FIREBASE_AUTH_PERSIST = firebase.auth.Auth.Persistence.LOCAL;
export const productsRef = databaseRef.child("products/");
export const productsEditRef = (id) => databaseRef.child("products/" + id);

export const categoriesRef = databaseRef.child("categories/");
export const categoriesEditRef = (id) => databaseRef.child("categories/" + id);
