import { StepByStepController } from "./StepByStepController";
import { useContext, useState } from "react";
import { DebugContext } from "./StepByStepContext";
import Step from "./Step";

const STEP_CONTAINER_STYLE = {
    width : "25%",
    borderStyle : "solid",
    borderColor : "rgb(27, 63, 105)",
    float: "left",
    overflow: "scroll",
    scrollbarWidth: "none",
    alignItems:"center",
    textAlign: "center",
    marginLeft:"0.25%"
}

export default function StepByStepDisplayer() { 
    const [ opened, setOpened ] = useState(-1)
    const { steps } = useContext(DebugContext)

    return <div className="step-container" id="steps" style={STEP_CONTAINER_STYLE}>
        <StepByStepController />
        { steps.length === 0 && opened != -1 && setOpened(-1)}
        {
            steps.map((info, index) => {
                return <Step key={index} info={info} open={index === opened} click={(e) => setOpened(e)} index={index}/>
            })
        }
        {}
    </div>
}