let instance;
let state = {
  isNotifying: false,
  queue: [],
  setNotifierVisibility: undefined,  // expected
  setNotifierMessage: undefined, // expected
};

class NotifierController {
  constructor() {
    if (instance) {
      throw new Error("New instance cannot be created!!");
    }
    instance = this;
  }

  setControllerState(name, value) {
    state[name] = value;
  }

  #delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async goNotification(msmComponent) {
    if (state.isNotifying) {
      state.queue.push(msmComponent);
    } else {
      state.isNotifying = true;
      await this.#notify(msmComponent);

      while (state.queue.length > 0) {
        await this.#delay(500);
        await this.#notify(state.queue.shift());
      }
      state.isNotifying = false;
    }
  }

  async #notify(msmComponent) {
    state.setNotifierMessage(msmComponent);
    state.setNotifierVisibility(true);
    await this.#delay(2500);
    state.setNotifierVisibility(false);
  }
}

const singleton = Object.freeze(new NotifierController());

export default singleton;
