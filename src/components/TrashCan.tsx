import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

let ComponentsTree = ["Container", "Columns", "Header", "Text", "Logo", "Image", "Form", "SearchBar", "SocialProfiles"]
export default function TrashCan ({deleteModule}) {
    return (
        <FontAwesomeIcon 
            className="delete-dnd"
            onDragOver={(e)=>{e.preventDefault()}}
            onDrop={(e)=>{
                document.body.setAttribute("dragging", "undefined"); 
                let module = e.dataTransfer.getData("Text") 
                if(ComponentsTree.includes(module)) return
                deleteModule(module)
            }}
            icon={faTrash} 
            style={{fontSize: "2rem"}}
        />
    )
}