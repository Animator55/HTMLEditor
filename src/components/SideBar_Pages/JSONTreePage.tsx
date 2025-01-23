import React from "react";
import checkMoveToChild from "../../logic/checkMoveToChild";
import RenderLevel from "../../logic/jsonTreeGenerator";
import { moduleType } from "../../vite-env";

export default function JSONTreeComponent ({JSONTree, selected, generatePlaces}:{JSONTree: {content: moduleType[]}, selected:string, generatePlaces: boolean}) {
    const [refresh, activateRefresh] = React.useState(false)
    
    const setDragging = (val: string) =>{
        document.body.setAttribute("dragging", val);
    }

    const addDragEnterStyle = (array: HTMLCollection, id: string) => {
        if(array === undefined || array[0] === undefined || array[0]?.classList === undefined || !array[0].firstChild) return
        if(!array[0].classList.contains("d-none")) return
        let child = array[0].firstChild as HTMLDivElement
        if(!checkMoveToChild(id, child.id)) return
        for(let i = 0; i < array.length; i++){
            array[i].classList.remove("d-none")
            i++
        }
    }

    let notAllowedMoves: {[key:string]: any} = {}

    const DragEnter = (e: React.DragEvent)=>{
        let target = e.target as HTMLDivElement
        if(!target || target.id === undefined 
            || target.id === "" 
            || document.body.getAttribute("dragging")! === undefined ) 
            return
        let [dragging, id] = document.body.getAttribute("dragging")!.split(".")
        let level = target.id.split("-")
        let isLevel0 = level[0] === "0"
        let key = isLevel0 ? "0" : level.length
        if(!notAllowedMoves[key]?.includes(dragging)) addDragEnterStyle(target.children, id)
    }

    return (
    <div
        id="0"
        onDragStart={(e)=>{
            let target = e.target as HTMLDivElement
            if(target)setDragging(target.dataset.type + "." + target.id) }}
        onDragEnter={DragEnter}
        onDragEnd={()=>{setDragging("undefined");activateRefresh(!refresh)}}
        onDrop={()=>{setDragging("undefined"); activateRefresh(!refresh)}}
        onDragOver={(e)=>{e.preventDefault()}}
    >
        <RenderLevel
            array={JSONTree.content}
            refresh={()=>{activateRefresh(!refresh)}}
            selected={selected} 
            generatePlaces={generatePlaces}
        />
    </div>)
}