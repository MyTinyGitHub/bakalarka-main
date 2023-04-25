import { nodes, number_of_cols, number_of_rows } from "../Grid/grid";

import ControlState from "../Controller/ControlState";
import Instances from "../Instances/Instances";
import BreadthFirstSearch from "../Algorithms/PathFinding/BreadthFirstSearch";
import ModalDialog from "../Instances/ModalDialog";
import MouseMode from "../Controller/MouseMode";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default class DisplayHandler {
  constructor() {}

  static displayAlgorithm() {
    if (Instances.getAlgorithm().isEmpty()) return;

    DisplayHandler.clearAlgorithm();
   
    if( Instances.getAlgorithm().getAlgorithm() === null) return;

    const result = Instances.getAlgorithm().getAlgorithm().execute();
    const array = result["visited"];
    const path = result["prev"];

    ControlState.getInstance().setOperational(true);

    let i = 0;
    const tick = 50;

    array.forEach((node) => {
      setTimeout(() => {
        document.getElementById(node).classList.add("node-algo");
      }, tick * ++i);
    });

    path.forEach((node) => {
      setTimeout(() => {
        document.getElementById(node).classList.add("node-result");
      }, tick * ++i);
    });

    sleep(array.length * tick + path.length * tick).then(() => {
      ControlState.getInstance().setOperational(false);
    });

    if(!path == null || path.length === 0) {
      ModalDialog.getInstance().get().display("There is no possible path from start to finish.")
    }
  }

  static addToAlgorithm(array, path, position) {
    if (position < array.length) {
      document.getElementById(array[position]).classList.add("node-algo");
      return position + 1;
    }

    if (position >= array.length && position < path.length + array.length) {
      let temp_position = position - array.length;
      document.getElementById(path[temp_position]).classList.add("node-result");
      return position + 1;
    }
    return position;
  }

  static displayAlgorithmStepByStep(direction, position, number_of_steps) {
    if (Instances.getAlgorithm().isEmpty()) return;

    const algorithm = Instances.getAlgorithm().getAlgorithm();

    const result = algorithm.execute();
    const array = result["visited"];
    const path = result["prev"];

    switch (direction) {
      case "back":
        if (position - number_of_steps < 0) {
          number_of_steps = position;
        }

        for (let i = 0; i < number_of_steps; i++) {
          position = DisplayHandler.removeFromAlgorithm(array, path, position);
        }
        break;
      case "next":
        if (position + number_of_steps > array.length + path.length) {
          number_of_steps = array.length + path.length - position;
        }

        for (let i = 0; i < number_of_steps; i++) {
          console.log("positiona: " + position)
          console.log(array)
          position = DisplayHandler.addToAlgorithm(array, path, position);
        }
        break;
      default:
        return position;
    }
    return position;
  }

  static removeFromAlgorithm(array, path, position) {
    if (position > 0) {
      position--;
    }

    if (position < array.length) {
      DisplayHandler.clearOneSquare(array[position]);
      return position;
    }
    if (position >= array.length && position < path.length + array.length) {
      const temp_position = position - array.length;
      DisplayHandler.clearOneSquarePath(path[temp_position]);
      return position;
    }
  }

  static reset() {
    if (Instances.getGrid().isEmpty()) return;

    for (let index_x = 0; index_x < number_of_rows; index_x++) {
      for (let index_y = 0; index_y < number_of_cols; index_y++) {
        const result_index = index_x * number_of_cols + index_y;

        if (
          document.getElementById(result_index).classList[1] === "node-wall"
        ) {
          nodes[result_index].clearWall();
        }
      }
    }
  }

  static clearOneSquare(node_index) {
    let val = document.getElementById(node_index).className;
    val = val.replace("node-result", "");
    val = val.replace("node-algo", "");
    document.getElementById(node_index).className = val;
  }

  static clearOneSquarePath(node_index) {
    let val = document.getElementById(node_index).className;
    val = val.replace("node-result", "")
    document.getElementById(node_index).className = val;
  }

  static clearAlgorithm() {
    for (let index_x = 0; index_x < number_of_rows; index_x++) {
      for (let index_y = 0; index_y < number_of_cols; index_y++) {
        let result_index = index_x * number_of_cols + index_y;
        DisplayHandler.clearOneSquare(result_index);
      }
    }
  }

  static instant() {
    if (Instances.getAlgorithm().isEmpty()) return;

    const algorithm = Instances.getAlgorithm().getAlgorithm();
    DisplayHandler.clearAlgorithm();

    const result = algorithm.execute();
    const array = result["visited"];
    const path = result["prev"];

    let finish = Instances.getFinish().getIndex();


    if(( !path || path.length === 0)) {
      if(MouseMode.getInstance().isEqual(""))
        ModalDialog.getInstance().get().display("There is no possible path from start to finish.")
    } else {
      path.push(finish);  
    }

    array.forEach((node) => {
      if (document.getElementById(node) != null)
        document.getElementById(node).classList.add("node-algo");
    });

    path.forEach((node) => {
      if (document.getElementById(node) != null)
        document.getElementById(node).classList.add("node-result");
    });

    
  }

  static create_maze() {
    if (Instances.getMaze().isEmpty()) return;
    if (Instances.getGrid().isEmpty()) return;

    DisplayHandler.reset();
    DisplayHandler.clearAlgorithm();

    let maze_grid = Instances.getMaze().getAlgorithm().execute();

    let start = Instances.getStart().getIndex();
    let finish = Instances.getFinish().getIndex();

    maze_grid.map((row, row_idx) => {
      row.map((col, col_idx) => {
        let index = row_idx * number_of_cols + col_idx;
        if (col === 0) {
          nodes[index].clearWall();
        }

        if (col === 1 && index !== start && index !== finish) {
          nodes[index].setWall();
        }
      });
    });
  }
}
