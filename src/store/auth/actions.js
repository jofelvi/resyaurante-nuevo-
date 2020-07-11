import {
  authRef,
  FIREBASE_AUTH_PERSIST,
  userRef,
  userEditRef,
} from "../../config/firebase";
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
  USER_FETCH_SUCCESS,
} from "./Constants";

export const fecthUsers = () => (dispatch) => {
  dispatch({
    type: START_LOADING,
  });
  userRef.on("value", (snapshot) => {
    if (snapshot.val()) {
      const data = snapshot.val();

      const arr = Object.keys(data).map((i) => {
        data[i].id = i;
        return data[i];
      });
      dispatch({
        type: USER_FETCH_SUCCESS,
        payload: {
          users: arr,
        },
      });
    } else {
      console.log("=======================================================");
      console.log(
        "Ha ocurrido un error al obtener el registro de los usuarios"
      );
      console.log("=======================================================");
    }
  });

  dispatch({
    type: END_LOADING,
    payload: null,
  });
};

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
            rol: user.user.rol,
            verify: user.user.verify,
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

export const editUsers = (client) => async (dispatch) => {
  dispatch({
    type: START_LOADING,
  });

  userEditRef(client.id).set(client);

  dispatch({
    type: END_LOADING,
  });
};

export const verifyUserSignIn = (info, verify) => async (dispatch) => {
  dispatch({
    type: START_LOADING,
  });

  if (verify === true) {
    dispatch({
      type: USER_FETCH_SUCCESS,
      payload: {
        info,
      },
    });
  } else {
    dispatch({
      type: USER_FETCH_SUCCESS,
      payload: {
        info: null,
        error: {
          flag: true,
          msg: info,
        },
      },
    });
  }

  dispatch({
    type: END_LOADING,
  });
};

export const signUp = (regData) => (dispatch) => {
  dispatch({
    type: START_LOADING,
    payload: null,
  });
  const registro = {
    firstName: regData.firstName,
    lastName: regData.lastName,
    email: regData.email,
    rol: "SIN_ROL",
    verify: "Inactivo",
  };

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
              .set(registro)
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
