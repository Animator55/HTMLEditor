import React from "react";
import checkMoveToChild from "../../logic/checkMoveToChild";
import { htmlComponent } from "../../vite-env";
import RenderLevel from "../../logic/jsonTreeGenerator";

type Props = {
    JSONTree: { content: Array<htmlComponent | "placeholder"> }
    selectItem: Function
}

export default function JSONTreeComponent({ JSONTree, selectItem }: Props) {
    const [refresh, activateRefresh] = React.useState(false)

    const setDragging = (val: string) => {
        document.body.setAttribute("dragging", val);
    }

    const addDragEnterStyle = (array: any[], id: string) => {
        if (array === undefined || array[0] === undefined || array[0]?.classList === undefined) return
        if (!array[0].classList.contains("d-none")) return
        if (!checkMoveToChild(id, array[0].firstChild.id)) return
        for (let i = 0; i < array.length; i++) {
            array[i].classList.remove("d-none")
            i++
        }
    }

    const DragEnter = (e) => {
        if (e.target.id === undefined
            || e.target.id === ""
            || document.body.getAttribute("dragging") === undefined
            || e.target.attributes.fixed?.value === "true")
            return
        let id = document.body.getAttribute("dragging")
        let level = e.target.id.split("-")
        let isLevel0 = level[0] === "0"
        let array = isLevel0 ? e.target.childNodes : e.target.childNodes[1]?.childNodes
        addDragEnterStyle(array, id);
    }

    return (
        <div
            id="0"
            onDragStart={(e) => { setDragging(e.target.id) }}
            onDragEnter={DragEnter}
            onDragEnd={(e) => { setDragging("undefined"); activateRefresh(!refresh) }}
            onDrop={(e) => { setDragging("undefined"); activateRefresh(!refresh) }}
            onDragOver={(e) => { e.preventDefault() }}
        >
            <RenderLevel
                props={{
                    array:JSONTree.content,
                    selectItem:selectItem,
                }}
            />
        </div>)
}