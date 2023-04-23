import React, { useState, useMemo, useContext } from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import classes from "./drop-down-menu.module.css";
import "@progress/kendo-theme-default/dist/all.css";
import { DisplayHandler } from "../../Helpers/display-handler";
import { AlgorithmHandler } from "../../Helpers/algorithm-handler";
import ControlState from "../../Controller/ControlState";
import Instances from "../../Instances/Instances";
import WeightController from "../../Controller/WeightController";
import { DebugContext } from "../StepByStepDisplay/StepByStepContext";
import DebuggerInformation from "../../Instances/DebuggerInformation";
import StepPosition from "../../Instances/StepPosition";


const algorithms_display_names = [
  Instances.getLanguageText().getText("dijkstra"),
  Instances.getLanguageText().getText("astar"),
  Instances.getLanguageText().getText("bfs"),
  Instances.getLanguageText().getText("dfs"),
];

const maze_builds = [
  Instances.getLanguageText().getText("tree-maze"),
  Instances.getLanguageText().getText("side-winder-maze"),
];

const weights = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const UINavbar = (props) => {
  const [category, setCategory] = useState("");
  const [mazeBuild, setMazeBuild] = useState("");
  const { setSteps } = useContext(DebugContext);

  const [weight, setWeight] = useState(
    Instances.getLanguageText().getText("select-weight")
  );
  
  const changeCategory = useMemo(() => {
    if (category === Instances.getLanguageText().getText("select-algo")) {
      DisplayHandler.clearAlgorithm();
      DebuggerInformation.getInstance().clear();
      Instances.getAlgorithm().setAlgorithm(null);
      setSteps([]);
    }

    if(Instances.getCurrentOperationText() != null) {
      Instances.getCurrentOperationText().setTextFromLocale(category);
    }

    console.log(category)
  }, [category]);

  const changeMazeBuild = useMemo(() => {
    if (mazeBuild === Instances.getLanguageText().getText("select-maze"))
      DisplayHandler.reset();
  }, [mazeBuild]);

  const changeWeight = useMemo(() => {
    WeightController.getInstance().setWeight(weight);
  }, [weight]);

  const runAlgorithm = () => {
    if (ControlState.getInstance().isOperational()) return;

    AlgorithmHandler.calculateAlgorithm(category);
    DisplayHandler.displayAlgorithm();

    setSteps(DebuggerInformation.getInstance().get());

    StepPosition.getInstance().clear();
  };

  const createMaze = () => {
    if (ControlState.getInstance().isOperational()) return;

    AlgorithmHandler.determine_maze(mazeBuild);
    DisplayHandler.create_maze();
  };

  const clearMaze = () => {
    DisplayHandler.reset();
  }

  const clearAlgorithm = () => {
    DisplayHandler.clearAlgorithm();
    DebuggerInformation.getInstance().clear();
    // Instances.getAlgorithm().setAlgorithm(null)
    StepPosition.getInstance().clear();
    setSteps([]);
    // setCategory(Instances.getLanguageText().getText("select-algo"))
  }

  return (
    <section className={classes.navbar}>
      <ul className={classes.navList}>
        <div className={classes.block}>
          <li className={classes.listItem}>
            <DropDownList
              style={{
                width: "200px",
              }}
              className={classes.dropDown}
              size={"medium"}
              fillMode={"solid"}
              data={algorithms_display_names}
              onChange={(e) => setCategory(e.value)}
              defaultItem={Instances.getLanguageText().getText("select-algo")}
            />
          </li>
          <button onClick={runAlgorithm} className={classes.navButton}>
            Run Algorithm
          </button>
          <button onClick={clearAlgorithm} className={classes.navButton}>
            Clear Algorithm
          </button>
        </div>

        <div className={classes.block}>
          <li className={classes.listItem}>
            <DropDownList
              style={{
                width: "150px",
              }}
              data={maze_builds}
              onChange={(e) => setMazeBuild(e.value)}
              defaultItem={Instances.getLanguageText().getText("select-maze")}
            />
          </li>
          <button onClick={createMaze} className={classes.navButton}>
            Create Maze
          </button>
          <button onClick={clearMaze} className={classes.navButton}>
            Clear Maze
          </button>
        </div>

        <li>
          <DropDownList
            style={{
              width: "150px",
            }}
            data={weights}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            defaultItem={Instances.getLanguageText().getText("select-weight")}
          />
        </li>
      </ul>
    </section>
  );
};
