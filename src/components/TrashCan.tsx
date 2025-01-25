import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

let ComponentsTree = ["Container", "Columns", "Header", "Text", "Logo", "Image", "Form", "SearchBar", "SocialProfiles"]
export default function TrashCan ({deleteModule}:{deleteModule: Function}) {
    return (
        <FontAwesomeIcon 
            className="delete-dnd"
            onDragOver={(e: React.DragEvent)=>{e.preventDefault()}}
            onDrop={(e: React.DragEvent)=>{
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