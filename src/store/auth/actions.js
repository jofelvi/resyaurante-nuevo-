import { authRef, FIREBASE_AUTH_PERSIST } from "../../config/firebase";
import * as firebase from "firebase";
import {
  USER_SIGN_IN,
  USER_SIGN_IN_FAILED,
  USER_SIGN_OUT,
  CLEAR_LOGIN_ERROR,
  START_LOADING,
  END_LOADING,
  USER_SIGN_UP_SUCCESS,
  USER_SIGN_IN_SUCCESS,
} from "./Constants";

export const fetchuserlogin = (usuariologueado) => async (dispatch) => {
  await dispatch({
    type: USER_SIGN_IN_SUCCESS,
    payload: usuariologueado,
  });
};

export const signIn = (username, password) => (dispatch) => {
  dispatch({
    type: USER_SIGN_IN,
    payload: null,
  });

  authRef
    .setPersistence(FIREBASE_AUTH_PERSIST)
    .then(function () {
      authRef
        .signInWithEmailAndPassword(username, password)
        // .signInWithEmailAndPassword("kelon@gmail.com", "123456")
        .then((user) => {
          const usuariologueado = {
            email: user.user.email,
            userName: user.user.displayName,
          };

          localStorage.setItem("user", JSON.stringify(usuariologueado));
          dispatch({
            type: USER_SIGN_IN_SUCCESS,
            payload: usuariologueado,
          });

          dispatch({
            type: END_LOADING,
            payload: null,
          });
        })
        .catch((error) => {
          dispatch({
            type: USER_SIGN_IN_FAILED,
            payload: error,
          });
        });
    })
    .catch(function (error) {
      dispatch({
        type: USER_SIGN_IN_FAILED,
        payload: "Firebase Auth Error",
      });
    });
};

export const signUp = (regData) => (dispatch) => {
  dispatch({
    type: START_LOADING,
    payload: null,
  });

  authRef
    .createUserWithEmailAndPassword(regData.email, regData.password)
    .then((newUser) => {
      if (newUser) {
        authRef.currentUser
          .updateProfile({
            displayName: regData.firstName + " " + regData.lastName,
          })
          .then(() => {
            firebase
              .database()
              .ref("users/")
              .child(authRef.currentUser.uid)
              .set(regData)
              .then(() => {
                dispatch({
                  type: USER_SIGN_UP_SUCCESS,
                });
              });
          });
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: USER_SIGN_IN_FAILED,
        payload: error,
      });
    });
};

export const signOut = () => (dispatch) => {
  authRef
    .signOut()
    .then(() => {
      dispatch({
        type: USER_SIGN_OUT,
        payload: null,
      });
    })
    .catch((error) => {
      //console.log(error);
    });
};

export const clearLoginError = () => (dispatch) => {
  dispatch({
    type: CLEAR_LOGIN_ERROR,
    payload: null,
  });
};
