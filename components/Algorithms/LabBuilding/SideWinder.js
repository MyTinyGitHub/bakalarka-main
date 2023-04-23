import { number_of_rows, number_of_cols } from "../../Grid/grid";

export default class SideWinder {
  constructor() { 

  }
  execute() {
    const grid = [];
    for (let row = 0; row < number_of_rows; row++) {
      const currentRow = [];
      for (let col = 0; col < number_of_cols; col++) {
        currentRow.push(1);
      }
      grid.push(currentRow);
    }

    for (let col = 1; col < number_of_cols - 1; col++) {
      grid[1][col] = 0;
    }

    for (let row = 1; row < number_of_rows - 1; row++) {
      grid[row][number_of_cols - 2] = 0;
    }

    for (let row = 2; row < number_of_rows; row += 2) {
      let rowStack = [];
      for (let col = 1; col < number_of_cols - 2; col += 2) {
        grid[row][col] = 0;
        rowStack.push(col);

        if (Math.random() >= 0.75) {
          const i = Math.floor(Math.random() * rowStack.length);
          grid[row - 1][rowStack[i]] = 0;
          rowStack = [];
        } else {
          grid[row][col + 1] = 0;
        }
      }
    }

    return grid;
  }
}
