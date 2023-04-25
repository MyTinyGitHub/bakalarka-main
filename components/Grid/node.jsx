import React, { Component, useContext, useState } from "react";
import ControlState from "../Controller/ControlState";
import MouseMode from "../Controller/MouseMode";
import WeightController from "../Controller/WeightController";
import DisplayHandler from "../Helpers/display-handler";
import Instances from "../Instances/Instances";
import { nodes, walls } from "./grid";
import { DebugContext } from "../UI/StepByStepDisplay/StepByStepContext";
import DebuggerInformation from "../Instances/DebuggerInformation";
import StepPosition from "../Instances/StepPosition";

const TEXT_STYLE = {
  color: "grey",
  fontSize: "8px",
  textAlign: "center"
}

export default class Node extends Component {
  static contextType = DebugContext;

  constructor(props) {
    super(props)

    this.state = {
      weight: 1, 
      finish: props.isFinish,
      start: props.isStart,
      wall: false
    }
    
    this.row = props.row;
    this.column = props.column;
    this.id = props.id;

    nodes[this.id] = this;
  }

  getClassName() {
    return this.state.finish
      ? "node node-finish"
      : this.state.start
      ? "node node-start"
      : this.state.wall
      ? "node node-wall"
      : "node";
  }
  
  setWall() {
      walls.add(this.id);
      this.setState((state) => ({
        ...state,
        wall: true,
        weight: 1,
      }));
  }
  
  clearWall() {
    walls.delete(this.id);
    this.setState((state) => ({
      ...state,
      wall: false,
      weight: 1,
    }));
  }

  setWeight() {
    WeightController.getInstance().setWeightOnIndex(this.id);
    this.setState((state) => ({
      ...state,
      wall: false,
      weight: WeightController.getInstance().getWeight(),
    }));
  }

  setWallOrWeight() {
    switch (WeightController.getInstance().getWeight()) {
      case Instances.getLanguageText().getText("select-weight"):
        this.setWall();
        break;
      default:
        this.setWeight();
    }
  }

  getWeight() {
    return " weight" + this.state.weight;
  }

  changeStartAndFinishPosition(type, row, col) {
    switch (type) {
      case "start":
        Instances.getStart().setPositions(row, col);
        break;
      case "finish":
        Instances.getFinish().setPositions(row, col);
        break;
    }
  }

  mouseLeave(){
    switch (MouseMode.getInstance().getMode()) {
      case "finish":
        this.setState((state) => ({
          ...state,
          finish: false,
        }));
        break;

      case "start":
        this.setState((state) => ({
          ...state,
          start: false,
        }));
        break;

      case "clear":
        this.clearWall();
        break;
      case "clear-weight":
        WeightController.getInstance().setConcreteWeightOnIndex(this.id, 1);
        this.setState((state) => ({
          ...state,
          weight: 1,
        }));
      case "wall":
        this.setWallOrWeight();
    }
  }

  mouseUp() {
    let value = this.context;

    if (!ControlState.getInstance().isOperational()) {
      if (!this.state.finish && !this.state.start) {
        if (MouseMode.getInstance().isEqual("clear")) {
          this.clearWall();
        } else if (MouseMode.getInstance().isEqual("clear-weight")) {
          WeightController.getInstance().setConcreteWeightOnIndex(this.id, 1);
          this.setState((state) => ({
            ...state,
            weight: 1,
          }));
        } else {
          this.setWallOrWeight();
        }
      } else {
        MouseMode.getInstance().setMode("")
        value.setSteps(DebuggerInformation.getInstance().get());
        DisplayHandler.instant();
        StepPosition.getInstance().clear();
      }
    }
  }

  mouseDown = (e) => {
    e.preventDefault();
    if (ControlState.getInstance().isOperational()) return;

    if (this.state.finish) {
      MouseMode.getInstance().setMode("finish");
    } else if (this.state.start) {
      MouseMode.getInstance().setMode("start");
    } else if (this.state.wall) {
      MouseMode.getInstance().setMode("clear");
    } else if (this.state.weight > 1) {
      MouseMode.getInstance().setMode("clear-weight");
    } else {
      MouseMode.getInstance().setMode("wall");
    }
  }

  mouseEnter() {
    switch (MouseMode.getInstance().getMode()) {
      case "finish":
        this.changeStartAndFinishPosition("finish", this.row, this.column);
        this.setState((state) => ({
          ...state,
          finish: true,
        }));

        DisplayHandler.instant();
        break;
      case "start":
        this.changeStartAndFinishPosition("start", this.row, this.column);
        this.setState((state) => ({
          ...state,
          start: true,
        }));

        DisplayHandler.instant();
        break;
    }
  }

  render() { 
    return (
      <div
        id={this.id}
        className={this.getClassName() + this.getWeight()}
        onMouseDown={(e) => this.mouseDown(e)}
        onMouseEnter={() => this.mouseEnter()}
        onMouseLeave={() => this.mouseLeave()}
        onMouseUp={() => this.mouseUp()}
      >
        <p style={TEXT_STYLE}>{this.id}</p>
      </div>
    );
  }
}
