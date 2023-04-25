import { useContext, useState } from "react";
import DisplayHandler from "../../Helpers/display-handler";
import ControlState from "../../Controller/ControlState";
import StepPosition from "../../Instances/StepPosition";
import { DebugContext } from "./StepByStepContext";
import DebuggerInformation from "../../Instances/DebuggerInformation";

const NAV_ELEMENT = {
    display: "inline-block",
    alignItems: "flex-start",
    font: "400 11px system-ui",
    padding: "6px 8px 7px",
    marginLeft: "3px",
    borderWidth: "1px",
    borderRadius: "7%",
    textAlign: "center",
}

const CONTROLLER_STYLE = {
    paddingBottom: "10px",
    backgroundColor: "rgb(27, 63, 105)",
}

const H2_STYLE = {
    marginTop: "0px",
    color: "white"  
}

export default function StepByStepController() {
    const [values, setValues] = useState(1);
    const { steps, setSteps } = useContext(DebugContext);

    const step = (stepType) => {
        if (ControlState.getInstance().isOperational()) return;

        if (ControlState.getInstance().isPositionChanged()) {
            ControlState.getInstance().resetPositionTracking();
            StepPosition.getInstance().clear();
        }

        if (StepPosition.getInstance().get() == 0) {
            DisplayHandler.clearAlgorithm();
            setSteps([]);
        }

        const val = parseInt(values);
        
        if(DebuggerInformation.getInstance().get() == null ) return
        
        if (parseInt(values) % 1 === 0) {           
            StepPosition.getInstance().set(
                DisplayHandler.displayAlgorithmStepByStep(stepType, StepPosition.getInstance().get(),val)
                );

            setSteps(DebuggerInformation.getInstance().get().slice(0, StepPosition.getInstance().get()));
        }
    };

    const updateInputValue = (evt) => {
        setValues(evt.target.value);
    };
    
    return <div style={CONTROLLER_STYLE}>
        <div>
            <h2 style={H2_STYLE}>
                Step-By-Step Display
            </h2>
        </div>
        <div>
          <button onClick={() => step("back")} style={NAV_ELEMENT}>
            Prev-Step
          </button>
          <input
            value={values}
            onChange={(evt) => updateInputValue(evt)}
            style={NAV_ELEMENT}
            />
          <button onClick={() => step("next")} style={NAV_ELEMENT}>
            Next-Step
          </button>
        </div>
    </div>
}