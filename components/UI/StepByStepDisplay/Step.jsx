import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai"
const STEP_STYLE = {
    paddingLeft: "10px",
    backgroundColor: "#e7e7e7", 
    color: "rgb(27, 63, 105)", 
    border: "none",
    padding: "8px 32px",
    textAlign: "left",
    fontSize: "16px",
    borderBottom: "1px rgb(27, 63, 105) solid"
}

const ICON_STYLE = {
    float: "right"
}

const STEP_DETAILS_STYLE = {
    fontSize:"10px",
    overflowWrap: "break-word"
}

const OpennedStep = ({info}) => {

    const printVisited = () => { 
        return <p>
            Visited: {info.visited.map((node) => node + ", ")} 
        </p>
    }

    const printToVisit = () => {
        return <p>
            To visit: {info.toVisit.map((node) => node + ", ")}
        </p>
    }

    const printPrevious = () => {
        return <p>
            Next node: {info.prev}
        </p>
    }
    
    const printWeight = () => { 
        return <p>
            Current Weight: {info.weight}
        </p>
    }

    const printScore = () => { 
        return <p>
            Hscore: {info.hScore}, Gscore: {info.gScore}, FScore: {info.hScore + info.gScore}
        </p>
    }

    return <div style={STEP_DETAILS_STYLE}>
        <hr />
        <p>
            Current node: {true && info.id}
        </p>
        {info.weight != null && printWeight()}
        {info.hScore != null && printScore()}
        {info.visited && printVisited()}
        {info.toVisit && printToVisit()}
        {info.prev && printPrevious()}
    </div>
}
export default function Step({ info, open, click, index }) {
    
    return <div onClick={() => click(open ? -1 : index)} style={STEP_STYLE}>
        {index + 1}. Step {info.action} { open ?  <AiOutlineMinusCircle style= {ICON_STYLE} /> : <AiOutlinePlusCircle style={ICON_STYLE}/> }
        {open && <OpennedStep info={info}/>}
    </div>
}