import { getNeigbours, buildResult } from "../HelperFunctions";
import Instances from "../../Instances/Instances";

export default class DepthFirstSearch {
  execute() {
  const toVisit = [];
  const visited = [];
  const alreadyVisited = new Set();
  const prev = new Array(Instances.getGrid().size());

  const start = Instances.getStart().getIndex();
  const finish = Instances.getFinish().getIndex();

  let found = false;

  let node = start;
  
  toVisit.push(node);
  visited.push(node);

  do {
      if (node === finish) {
        found = true;
        break;
      }

      let allNodesVisited = true;

      let neighbours = getNeigbours(node);
      for (let i = 0; i < neighbours.length; i++) {
        if (!alreadyVisited.has(neighbours[i])) {
          alreadyVisited.add(neighbours[i]);
          prev[neighbours[i]] = node;
          toVisit.push(node);
          allNodesVisited = false;
          node = neighbours[i];
          break;
        }
      }

      if (allNodesVisited) {
        node = toVisit.pop();
      }

    } while (!found && toVisit.length != 0);

    return buildResult(Array.from(alreadyVisited), prev, start, finish);
  }
}
