let instance = null;

export default class StepPosition {
  constructor() {
    this.position = 0;
  }

  get() {
    return this.position;
  }

  set(pos) {
    this.position = pos;
  }

  clear() {
    this.position = 0;
  }

  static getInstance() {
    if (!instance) {
      instance = new StepPosition();
    }

    return instance;
  }
}
