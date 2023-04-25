let instance = null;
export default class ModalDialog {
  constructor() {
    this.view = null;
  }

  set(view) {
    this.view = view;
  }

  get() {
    return this.view;
  }

  static getInstance() {
    if (!instance) {
      instance = new ModalDialog();
    }
    return instance;
  }
}
