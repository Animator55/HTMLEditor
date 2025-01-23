import { faCircleXmark, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Classe } from "../RenderComponents/Editors";
import { GlobalFunctions } from "../screens/AdminEditor";

export default function ClassEditor({classe, setSelected}: {classe: any, setSelected:Function}) {
    const GlobalFunc = React.useContext(GlobalFunctions)
    const seeElementsSelect = (bool:boolean)=>{
        let elements = document.querySelectorAll(`[class~="${GlobalFunc ? GlobalFunc.selectedClass.name: ""}"]`)
        if(elements.length === 0) return
        if(bool) 
            for(let i=0; i < elements.length; i++) {elements[i].classList.add("selectedClass")}
        else 
            for(let i=0; i < elements.length; i++) {elements[i].classList.remove("selectedClass")}
    }

    function EditorTopBar () {
        return <div className="d-flex margin-5px" id="dnd">
            <h4 className="margin-0 margin-right-auto text-elipsis" id="dnd"></h4>
            {GlobalFunc !== null ? <button onMouseEnter={()=>{seeElementsSelect(true)}} onMouseLeave={()=>{seeElementsSelect(false)}}>
                <FontAwesomeIcon icon={faEye} size="xl"/>
            </button> : null}
            <button
                onClick={()=>{
                    if(GlobalFunc !== null) GlobalFunc.changeCss.delete(classe?.index)
                    else classe.changeCss.delete(classe.selectedClass.index)
                }}
            ><FontAwesomeIcon icon={faTrash} size="xl"/></button>
            <button onClick={()=>{setSelected(undefined)}}><FontAwesomeIcon icon={faCircleXmark} size="xl"/></button>
        </div>
    }

    return classe !== undefined ? <div className="component-editor">
            <EditorTopBar/>
            <Classe classe={classe}/>
        </div>  
    :null
}