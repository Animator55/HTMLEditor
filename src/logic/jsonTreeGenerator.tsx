import { faPlay, faSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import ContinueLoop from "./jsonTreeGeneratorLoop"
import { Placeholder } from "./jsxParser"
import { htmlComponent } from "../vite-env"


type PropsPlace = {
    props: {
        array: Array<htmlComponent | "placeholder">
        selectItem: Function
        parentIndex?: string
    }
}

export default function RenderLevel({ props }: PropsPlace) {
    let idLocal = 0
    props.array.map((el, i) => { if (el === "placeholder") props.array.splice(i, 1) })

    let JSX = props.array.map((component: htmlComponent | "placeholder") => {
        if (component === "placeholder") return
        idLocal++
        let completeid = props.parentIndex !== undefined ? props.parentIndex + "-" + (idLocal - 1) : `${idLocal}`
        return <React.Fragment key={Math.random()}>
            <Placeholder props={{ dNone: true, moduleKey: completeid + "." }} />
            <div id={completeid} className="close-span">
                <div className="align-center d-flex-row">
                    <FontAwesomeIcon
                        icon={component.components.length !== 0 ? faPlay : faSquare}
                        onClick={(e: React.MouseEvent) => {
                            let target = e.target as HTMLDivElement
                            if (!target || target.childElementCount !== 0 || component.components.length === 0) return
                            target.parentElement!.parentElement!.parentElement!.classList.toggle(
                                "open-span",
                                !target.parentElement!.parentElement!.parentElement!.classList.contains("open-span")
                            )
                        }}
                    />
                    <button
                        id={`${completeid}`}
                        onClick={(e) => { props.selectItem(e, component) }}
                        draggable
                        onDragStart={(e: React.DragEvent) => {
                            let target = e.target as HTMLDivElement
                            if (!target) return
                            e.dataTransfer.setData("Text", target.id);
                            target.classList.add("dragging")
                        }}
                        onDragEnd={(e) => {
                            let target = e.target as HTMLDivElement
                            if (target) target.classList.remove("dragging")
                        }}
                    >
                        <div id={`${completeid}`}>{"div" + ` (${completeid})`}</div>
                    </button>
                </div>
                <div className="comp-list">
                    <ContinueLoop props={{
                        ...props,
                        parentIndex: completeid,
                        array: component.components,
                    }} />
                </div>
            </div>
        </React.Fragment>
    })
    let lastid = props.parentIndex !== undefined ? props.parentIndex + "-" + idLocal : `${idLocal + 1}`
    return <>{JSX}<Placeholder props={{ dNone: true, moduleKey: lastid + "." }} /></>
}

