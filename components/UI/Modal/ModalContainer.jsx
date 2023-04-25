import { Component, useState } from "react";
import ModalControls from "./ModalControls";
import ModalElement from "./ModalElement";
import tutorial from "../../../lib/tutorial.json"
import ModalDialog from "../../Instances/ModalDialog";

const MODAL_STYLES = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#FFF',
        padding: '50px',
        zIndex: 1000,
        textAlign: "center"
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

const NAV_ELEMENT = {
        display: "inline-block",
        alignItems: "flex-start",
        font: "400 11px system-ui",
        padding: "6px 8px 7px",
        marginLeft: "3px",
        borderWidth: "1px",
        borderRadius: "7%",
        textAlign: "center",
        width:"30%"
    }

export default class ModalContainer extends Component {
    constructor() {
        super()

        this.state = {
            display : false,
            text: ""
        }

        ModalDialog.getInstance().set(this);
    }

    display(text) { 
        this.setState(() => ({
            text: text,
            display: true,
        })); 
    }

    close() { 
        this.setState(() => ({
            text: "",
            display: false,
          }));
    }

    render() { 
        if (!this.state.display) {
            return null
        }

        return <div className="modal-background" style = {OVERLAY_STYLES} onClick={ () => this.close() }>
            <div className="modal-container" style = {MODAL_STYLES} onClick={ (e) => e.stopPropagation() }>
                {this.state.text}
                <p></p>
                <button onClick={() => this.close()} style={NAV_ELEMENT} > Close </button>
            </div>
        </div>
    }
}