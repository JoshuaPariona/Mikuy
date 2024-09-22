import { STORAGE } from "../../FirebaseApp";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

let instance;
let state = {
  errorMessages: {
    default:
      "Ocurrió un error inesperado. Revisa tu conexión o intenta de nuevo más tarde.",
  },
};

class StorageServices {
  constructor() {
    if (instance) {
      throw new Error("New StorageServices instance cannot be created!!");
    }
    instance = this;
  }

  setControllerState(name, value) {
    state[name] = value;
  }

  getControllerState(name) {
    return state[name];
  }

  async putRecipeImages({
    recipeId,
    thumbnail, // Blob de la imagen de miniatura
    images, // Array de Blobs de imágenes adicionales
    onSuccess,
    onError,
    onFinally,
  }) {
    try {
      images = images.filter(item => item !== undefined);
      // Función para subir un blob y obtener el download URL
      const uploadImage = async (blob, name) => {
        if (!blob) return undefined;
        const storageRef = ref(STORAGE, `recipes/${recipeId}/${name}`);
        const snapshot = await uploadBytes(storageRef, blob);
        return getDownloadURL(snapshot.ref);
      };
      // Subir el thumbnail si existe
      const thumbnailUpload = uploadImage(thumbnail, "thumbnail");

      // Subir las imágenes en paralelo si existen
      const imageUploads = images.map((image, index) =>
        uploadImage(image, String(index))
      );

      // Esperar a que todas las subidas se completen
      const results = await Promise.all([thumbnailUpload, ...imageUploads]);

      // Llamar a onSuccess con los URLs de las imágenes
      onSuccess?.({
        thumbnail: results[0],
        images: results.slice(1), // El primer resultado es el thumbnail, el resto son las imágenes
      });
    } catch (error) {
      console.log("uploading image: ", error);
      onError?.(error);
    } finally {
      onFinally?.();
    }
  }

  // La id es uuid generada antes de la carga no persistente en la app
  // TODO: si ocurre un error en la subida de la receta y ya se subieron
  // las imagenes, entonces eliminarlas con el mismo id en el instante
  // TODO: fuera de alcance: si se detiene la app, la id de la receta no sera
  // alcanzable nunca mas y generaria fotos huerfanas

  putUserImage({ userId, image, onSuccess, onError, onFinally }) {
    const storageRef = ref(STORAGE, `users/${userId}/image`);
    uploadBytes(storageRef, image)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((downloadURL) => onSuccess?.(downloadURL))
          .catch((error) => onError?.(error));
      })
      .catch((error) => onError?.(error))
      .finally(() => onFinally?.());
  }

  putUserBanner({ userId, image, onSuccess, onError, onFinally }) {
    const storageRef = ref(STORAGE, `users/${userId}/banner`);
    uploadBytes(storageRef, image)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((downloadURL) => {
            onSuccess?.(downloadURL);
          })
          .catch((error) => {
            onError?.(error);
          });
      })
      .catch((error) => onError?.(error))
      .finally(() => onFinally?.());
  }
}

const singleton = Object.freeze(new StorageServices());

export default singleton;
