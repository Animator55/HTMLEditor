import React from "react";

import "../assets/css/popUp.css";

export default function PopUp ({ visibility, setPopUp, confirm}) {
    return (
        <>
            {visibility ? <div 
                className="form-background" 
                onClick={(e)=>{if(e.target.className === "form-background") {
                    setPopUp(false);
                }}
            }>
                <div className="pop-up">
                    <h2>¿Estás seguro?</h2>
                    <div className="d-flex">
                        <button className="btn-active pop-up-btns" onClick={()=>{setPopUp(false); confirm()}}>
                            <h3 className="margin-0">Si</h3>
                        </button>
                        <button className="pop-up-btns" onClick={()=>{setPopUp(false)}}>
                            <h3 className="margin-0">No</h3>
                        </button>
                    </div>
                </div>
            </div> : null} 
        </>
    )
}