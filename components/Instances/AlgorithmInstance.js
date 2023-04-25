import AlgorithmHandler from "../Helpers/algorithm-handler";

let instance = null;

export default class AlgorithmInstance {
  constructor() {
    this.algorithm = null;
  }

  setAlgorithm(algorithm) {
    this.algorithm = algorithm;
  }

  getAlgorithm() {
    return this.algorithm;
  }

  execute() { 
    return AlgorithmHandler.calculateAlgorithm("bfs");
  }

  isEmpty() {
    return this.algorithm === null;
  }

  static getInstance() {
    if (!instance) {
      instance = new AlgorithmInstance();
    }

    return instance;
  }
}
