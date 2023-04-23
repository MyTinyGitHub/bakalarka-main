import Step from "../UI/StepByStepDisplay/Step";
import { useUpdateDebugger } from "../UI/StepByStepDisplay/StepByStepContext";
import Instances from "./Instances";
import { Component } from "react";
let instance = null;

export default class DebuggerInformation {
  constructor() {
    this.steps = [];

    if(!instance) {
      instance = this;
    }
  }

  add = (view) => {
    this.steps.push(view);
  }

  clear = () => { 
    this.steps = [];
  }

  get = () => {
    return this.steps;
  }
  
  static getInstance() {
    if (!instance) {
      instance = new DebuggerInformation();
    }

    return instance;
  }
}
