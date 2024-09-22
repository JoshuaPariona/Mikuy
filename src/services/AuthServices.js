import { AUTH } from "../../FirebaseApp";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

let instance;
let state = {
  errorMessages: {
    //CreateUser
    "auth/email-already-in-use":
      "El correo electrónico ya está en uso. Por favor, prueba con otro.",
    "auth/invalid-email":
      "El correo electrónico ingresado no es válido. Revisa el formato y vuelve a intentarlo.",
    "auth/operation-not-allowed":
      "El registro de usuarios con correo electrónico y contraseña no está habilitado.",
    "auth/weak-password":
      "La contraseña es demasiado débil. Debe tener al menos 8 caracteres.",

    //SignIn
    "auth/wrong-password": "Correo o contraseña incorrectos.",
    "auth/user-disabled": "Usuario deshabilitado. Intenta de nuevo más tarde.",
    "auth/user-not-found":
      "Usuario no encontrado. Por favor, regístrate primero.",
    "auth/invalid-credential": "Correo o contraseña incorrectos.",

    //

    default:
      "Ocurrió un error inesperado. Revisa tu conexión o intenta de nuevo más tarde.",
  },
  onAuthStateChangedSubscription: null,
};

const serializedAuthUser = (authUser) => {
  if (!authUser) return null;
  return {
    uid: authUser.uid,
    displayName: authUser.displayName,
    email: authUser.email,
    photoUrl: authUser.photoUrl,
    phoneNumber: authUser.phoneNumber,
  };
};

class AuthServices {
  constructor() {
    if (instance) {
      throw new Error("New AuthServices instance cannot be created!!");
    }
    instance = this;
  }

  setControllerState(name, value) {
    state[name] = value;
  }

  getControllerState(name) {
    return state[name];
  }

  getCurrentAuthUser() {
    return AUTH.currentUser;
  }

  onAuthStateReady(callback) {
    AUTH.authStateReady().then(() =>
      callback(serializedAuthUser(AUTH.currentUser))
    );
  }

  getSerializedCurrentUser() {
    return serializedAuthUser(AUTH.currentUser);
  }

  signOut({ onSuccess, onError, onFinally }) {
    AUTH.signOut()
      .then(() => onSuccess?.())
      .catch((error) =>
        onError?.(
          state.errorMessages[error.code] || state.errorMessages.default
        )
      )
      .finally(() => onFinally?.());
  }

  signUpUserWithEmailAndPassword({
    email,
    password,
    onSignUp,
    onError,
    onFinally,
  }) {
    createUserWithEmailAndPassword(AUTH, email, password)
      .then((userCredential) => {
        onSignUp?.(userCredential.user);
      })
      .catch((error) => {
        onError?.(
          state.errorMessages[error.code] || state.errorMessages.default
        );
      })
      .finally(() => onFinally?.());
  }

  signInWithEmailAndPassword({
    email,
    password,
    onSignIn,
    onError,
    onFinally,
  }) {
    signInWithEmailAndPassword(AUTH, email, password)
      .then((userCredential) => {
        onSignIn?.(userCredential.user);
      })
      .catch((error) => {
        onError?.(
          state.errorMessages[error.code] || state.errorMessages.default
        );
      })
      .finally(() => onFinally?.());
  }

  signInWithGoogle({ onSignIn, onError }) {
  }

  signInWithFacebook({ onSignIn, onError }) {
  }
}

const singleton = Object.freeze(new AuthServices());

export default singleton;