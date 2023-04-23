import DebuggerInformation from "../../Instances/DebuggerInformation";
import Instances from "../../Instances/Instances";
import { getNeigbours, buildResult } from "../HelperFunctions";

export class BreadthFirstSearch {
  execute() {
    const start = Instances.getStart().getIndex();
    const finish = Instances.getFinish().getIndex();

    let visited = new Set();
    let toVisit = [];
    let prev = new Array(Instances.getGrid().size());
    let found = false;
    let node = start;

    toVisit.push(node);
    DebuggerInformation.getInstance().clear();
    do {
      DebuggerInformation.getInstance().add({ action: "Calculating",
                                              id: node,
                                              visited: [...visited],
                                              toVisit: [...toVisit]})
      
      node = toVisit.shift();
      visited.add(node);

      if (node === finish) {
        found = true;
      }

      if (found) {
        break;
      }

      let neighbours = getNeigbours(node);

      neighbours.forEach((neighbor) => {
        if (!toVisit.includes(neighbor) && !visited.has(neighbor)) {
          prev[neighbor] = node;
          toVisit.push(neighbor);
        }
      });
    } while (toVisit.length != 0);

    return buildResult( Array.from(visited), prev, start, finish );
  }
}
