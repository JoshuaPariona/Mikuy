import AsyncStorage from "@react-native-async-storage/async-storage";

let instance;
let state = {};

class LocalStorageServices {
  constructor() {
    if (instance) {
      throw new Error(
        "New LocalStorageController instance cannot be created!!"
      );
    }
    instance = this;
  }

  setControllerState(name, value) {
    state[name] = value;
  }

  getControllerState(name) {
    return state[name];
  }

  getItem({
    key,
    isObject = false,
    onSuccess,
    onNotFound,
    onError,
    onFinally,
  }) {
    AsyncStorage.getItem(String(key))
      .then((item) => {
        if (item) {
          if (isObject) onSuccess?.(JSON.parse(item));
          else onSuccess?.(item);
        } else onNotFound?.();
      })
      .catch((error) => onError?.(error))
      .finally(() => onFinally?.());
  }

  setItem({ key, value, isObject = false, onSuccess, onError, onFinally }) {
    if (isObject) value = JSON.stringify(value);
    else value = String(value);
    AsyncStorage.setItem(String(key), value)
      .then(() => onSuccess?.())
      .catch((error) => onError?.(error))
      .finally(() => onFinally?.());
  }

  updateObjectItem({ key, value, onSuccess, onError, onFinally }) {
    AsyncStorage.mergeItem(String(key), JSON.stringify(value))
      .then(() => onSuccess?.())
      .catch((error) => onError?.(error))
      .finally(() => onFinally?.());
  }

  removeItem({ key, onSuccess, onError, onFinally }) {
    AsyncStorage.removeItem(String(key))
      .then(() => onSuccess?.())
      .catch((error) => onError?.(error))
      .finally(() => onFinally?.());
  }
}

const singleton = Object.freeze(new LocalStorageServices());

export default singleton;
