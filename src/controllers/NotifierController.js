let instance;
let state = {
  isNotifying: false,
  queue: [],
};

class NotifierController {
  constructor() {
    if (instance) {
      throw new Error("New NotifierController instance cannot be created!!");
    }
    instance = this;
  }

  setControllerState(name, value) {
    state[name] = value;
  }

  #delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async goNotification(
    msmComponent,
    setNotifierVisibility,
    setNotifierMessage
  ) {
    if (state.isNotifying) {
      // Si esta notificando se encola el mensaje
      state.queue.push(msmComponent);
    } else {
      state.isNotifying = true; // Si no se cambia el estado
      setNotifierVisibility(true); // y se abre el componente notifier
      setNotifierMessage(msmComponent);
      await this.#delay(2500);
      while (state.queue.length > 0) {
        // mientras esta abierto se verifica
        await this.#delay(500); // si hay mas mensajes y se settean
        setNotifierMessage(state.queue.shift()); // y se desencola
        await this.#delay(2500);
      }
      setNotifierVisibility(false); // si no hay notficaciones se cierra
      state.isNotifying = false; // y se termina el estado
    }
  }
}

// controlador statico solo una instancia
const singleton = Object.freeze(new NotifierController());

export default singleton;
