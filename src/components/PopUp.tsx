import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark} from '@fortawesome/free-solid-svg-icons'

import "../assets/css/popUp.css";

export default function PopUp ({ visibility, setPopUp, confirm}) {
    return (
        <>
            {visibility ? <div 
                className="form-background" 
                onClick={(e)=>{if(e.target.className === "form-background") {
                    setPopUp(false); confirm()
                }}
            }>
                <div className="pop-up">
                    <h2>¿Estás seguro?</h2>
                    <div className="d-flex">
                        <button className="btn-active pop-up-btns" onClick={()=>{setPopUp(false); confirm()}}>
                            <FontAwesomeIcon icon={faCheck} size="xl" className="margin-right-5px"/>
                            <h3 className="margin-0">Si</h3>
                        </button>
                        <button className="pop-up-btns" onClick={()=>{setPopUp(false)}}>
                            <FontAwesomeIcon icon={faXmark} size="xl" className="margin-right-5px"/>
                            <h3 className="margin-0">No</h3>
                        </button>
                    </div>
                </div>
            </div> : null} 
        </>
    )
}