import { useState } from "react";
import ModalControls from "./ModalControls";
import ModalElement from "./ModalElement";
import tutorial from "../../../lib/tutorial.json"

const MODAL_STYLES = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#FFF',
        padding: '50px',
        zIndex: 1000
    }
  
const OVERLAY_STYLES = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, .7)',
        zIndex: 1000
    }

export default function ModalContainer({ closeModal }) {
    const [index, setIndex] = useState(0);
    const [display, setDisplay] = useState(true);

    if (!display) {
        return null
    }

    return <div className="modal-background" style = {OVERLAY_STYLES} onClick={ () => setDisplay(false) }>
        <div className="modal-container" style = {MODAL_STYLES} onClick={ (e) => e.stopPropagation() }>
            <ModalControls size={tutorial.tutorial.length} index={index} setIndex={(e) => setIndex(e)}>
                <ModalElement {...tutorial.tutorial[index]}/>
            </ModalControls>
            <button onClick={() => setDisplay(false) }> Close Modal </button>
        </div>
    </div>
}