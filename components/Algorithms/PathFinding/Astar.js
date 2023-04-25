import { getNeigbours, buildResult } from "../HelperFunctions";
import Instances from "../../Instances/Instances";
import WeightController from "../../Controller/WeightController";
import DebuggerInformation from "../../Instances/DebuggerInformation";

export default class Astar {
  constructor() {

    this.prev = [];
    this.visited = new Set();

    this.toVisit = [];

    this.gScore = [];
    this.hScore = [];

    this.start = -1;
    this.finish = -1;

    this.found = false;
  }

  initialize() {
    this.gScore = new Array(Instances.getGrid().size());
    this.hScore = new Array(Instances.getGrid().size());

    this.prev = new Array(Instances.getGrid().size());
    this.visited = new Set();

    this.toVisit = [];
    this.found = false;

    this.start = Instances.getStart().getIndex();
    this.finish = Instances.getFinish().getIndex();

    for (let i = 0; i < Instances.getGrid().size(); i++) {
      this.gScore[i] = Infinity;
      this.hScore[i] = Infinity;
    }

    this.gScore[this.start] = 0;
    this.hScore[this.start] = this.calculateHScore(this.start, this.finish);

  }
  
  execute() {
    this.initialize();
    let node = this.start;
    this.toVisit.push(this.start);
    
    DebuggerInformation.getInstance().clear();
    while (this.toVisit.length != 0 && !this.found) {
      const index_of_lowest_value = this.getIndexOfLowestFScore();
      node = this.toVisit.splice(index_of_lowest_value, 1)[0];

      DebuggerInformation.getInstance().add({ action: "Calculating",
                                              id: node,
                                              gScore: this.gScore[node],
                                              hScore: this.hScore[node],
                                              visited: [...this.visited],
                                              toVisit: [...this.toVisit]})

      if(node === this.finish) {
        break;
      }
      
      if (!this.visited.has(node)) {
        this.visited.add(node);
      }

      getNeigbours(node).map((neighbour) => {
        if (this.found || this.visited.has(neighbour)) {
          return;
        }

        this.hScore[neighbour] = this.calculateHScore(neighbour, this.finish);
        const weight_node =
          WeightController.getInstance().getWeightOnIndex(node);

        if (this.gScore[neighbour] > this.gScore[node] + weight_node) {
          this.toVisit.push(neighbour);

          this.gScore[neighbour] = this.gScore[node] + weight_node;
          this.prev[neighbour] = node;
        }
      });
    }

    return buildResult(
      Array.from(this.visited),
      this.prev,
      this.start,
      this.finish
    );
  }

  getIndexOfLowestFScore() {
    let index_of_lowest_value = 0;
    let lowest_value = Infinity;

    for (let index = 0; index < this.toVisit.length; index++) {
      let calc_fscore =
        this.gScore[this.toVisit[index]] + this.hScore[this.toVisit[index]];

      if (lowest_value > calc_fscore) {
        index_of_lowest_value = index;
        lowest_value = calc_fscore;
      } else if (lowest_value === calc_fscore) {
        if (
          this.gScore[index_of_lowest_value] > this.gScore[this.toVisit[index]]
        ) {
          index_of_lowest_value = index;
        }
      }
    }
    return index_of_lowest_value;
  }

  calculateHScore(node, finish) {
    const columns = Instances.getGrid().getColumns();

    let xValue = Math.abs((node % columns) - (finish % columns));
    let yValue = Math.abs(
      Math.floor(node / columns) - Math.floor(finish / columns)
    );

    return xValue + yValue;
  }
}
