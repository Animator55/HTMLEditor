import React from "react";
import checkMoveToChild from "../../logic/checkMoveToChild";
import RenderLevel from "../../logic/jsonTreeGenerator";

export default function JSONTreeComponent ({JSONTree, fixedComponents, selected, generatePlaces}) {
    const [refresh, activateRefresh] = React.useState(false)
    
    const setDragging = (val) =>{
        document.body.setAttribute("dragging", val);
    }

    const addDragEnterStyle = (array, id) => {
        if(array === undefined || array[0] === undefined || array[0]?.classList === undefined) return
        if(!array[0].classList.contains("d-none")) return
        if(!checkMoveToChild(id, array[0].firstChild.id)) return
        for(let i = 0; i < array.length; i++){
            array[i].classList.remove("d-none")
            i++
        }
    }

    let notAllowedMoves = {}

    const DragEnter = (e)=>{
        if(e.target.id === undefined 
            || e.target.id === "" 
            || document.body.getAttribute("dragging")! === undefined 
            || e.target.attributes.fixed?.value === "true") 
            return
        let [dragging, id] = document.body.getAttribute("dragging")!.split(".")
        let level = e.target.id.split("-")
        let isLevel0 = level[0] === "0"
        let key = isLevel0 ? "0" : level.length
        if(!notAllowedMoves[key]?.includes(dragging)) addDragEnterStyle(e.target.childNodes, id)
    }

    return (
    <div
        id="0"
        onDragStart={(e)=>{setDragging(e.target.attributes.type.value+"."+e.target.id)}}
        onDragEnter={DragEnter}
        onDragEnd={(e)=>{setDragging("undefined");activateRefresh(!refresh)}}
        onDrop={(e)=>{setDragging("undefined"); activateRefresh(!refresh)}}
        onDragOver={(e)=>{e.preventDefault()}}
    >
        <RenderLevel
            array={JSONTree.content}
            refresh={()=>{activateRefresh(!refresh)}}
            fixedComponents={fixedComponents}
            selected={selected} 
            generatePlaces={generatePlaces}
        />
    </div>)
}