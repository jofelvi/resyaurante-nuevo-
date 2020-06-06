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

export const categoriesMenuRef = databaseRef.child("categoriesmenu/");
export const categoriesMenuEditRef = (id) =>
  databaseRef.child("categoriesmenu/" + id);

export const addMenuRef = databaseRef.child("addmenu/");
export const addMenuEditRef = (id) => databaseRef.child("addmenu/" + id);

export const addListaPedidosRef = databaseRef.child("listpedidos/");
export const addListaPedidosEditRef = (id) =>
  databaseRef.child("listpedidos/" + id);
