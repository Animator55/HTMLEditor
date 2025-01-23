import { faImage, faObjectGroup, faPager, faPhotoFilm, faPlay, faScroll, faSearch, faShapes, faSquarePollHorizontal, faSquareShareNodes, faVectorSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Place } from "../RenderComponents/Modules"
import ContinueLoop from "./jsonTreeGeneratorLoop"
// import { ToastContext } from "../App";
import { GlobalFunctions } from "../screens/AdminEditor"
import { moduleType } from "../vite-env"

let moduleTypes: { [key: string]: any } = {
    "Container": faObjectGroup,
    "Columns": faSquarePollHorizontal,
    "Header": faPager,
    "Text": faScroll,
    "Logo": faShapes,
    "SearchBar": faSearch,
    "SocialProfiles": faSquareShareNodes,
    "Image": faImage,
    "ProductsGrid": faPhotoFilm
}

const setType = (type: string) => {
    switch (type) {
        case "Navigation":
        case "Container":
        case "Footer":
        case "Header":
        case "ProductsGrid":
            return "container"
        case "Columns":
            return "columns"
        default:
            return "module"
    }
}

// const checkOpen = (id, selected)=>{
//     if(id === undefined || selected === undefined) return "close-span"
//     let Access = id.split("-")
//     let Selected = selected.split("-")
//     if(Access.length < Selected.length){
//         let result = Access.every((num, index)=>{
//             return num === Selected[index]
//         })
//         return result ? "close-span open-span" : "close-span"
//     }
//     return "close-span"
// }

export default function RenderLevel(props: { refresh: Function, array: moduleType[]| undefined, selected?: string, generatePlaces: boolean, preRenderIndex?: string, parentIndex?: string }) {
    // const activateToast = React.useContext(ToastContext)
    const GlobalFunc = React.useContext(GlobalFunctions)

    const selectIcon = (type: string) => {
        let icon = moduleTypes[type]
        if (icon === undefined) return faVectorSquare

        return icon
    }

    let idLocal = 0
    if(props.array
    && props.array.length !== 0) props.array.map((el: moduleType | "placeholder", i: number) => { if (el === "placeholder") props.array!.splice(i, 1) })

    let JSX = (props.array
    && props.array.length !== 0) && props.array.map((component: moduleType | "placeholder") => {
        if (component === "placeholder") return
        idLocal++
        let completeid = props.preRenderIndex !== undefined ? props.preRenderIndex : props.parentIndex !== undefined ? props.parentIndex + "-" + (idLocal - 1) : `${idLocal}`
        return (<React.Fragment key={Math.random()}>
            {props.generatePlaces ? <Place dNone moduleKey={completeid + "."} /> : null}
            <li
                className="close-span"
                onDrop={() => {
                    if (document.body.getAttribute("dragging") === undefined) return
                    let id = document.body.getAttribute("dragging")?.split(".")[1]
                    let renderedModule = document.querySelectorAll(`.dragging[id="${id}"][draggable="true"]`)[1]
                    if (renderedModule !== null && renderedModule !== undefined) renderedModule.classList.remove("dragging")
                }}
            >
                <div className="comp-wraper">
                    <button
                        className="comp-selector"
                        id={`${completeid}`}
                        data-select={`${props.selected === `${completeid}`}`}
                        onClick={() => { if (GlobalFunc) GlobalFunc.selectComponent(completeid) }}
                        draggable
                        data-type={setType(component.type!)}
                        onDragStart={(e) => {
                            let target = e.target as HTMLDivElement
                            if (!target) return
                            e.dataTransfer.setData("Text", target.id);
                            target.classList.add("dragging")
                            let renderedModule = document.querySelector(`*[id="${target.id}"][draggable="true"]:not(.dragging)`)
                            if (renderedModule !== null && renderedModule !== undefined) renderedModule.classList.add("dragging")
                        }}
                        onDragEnd={(e) => {
                            let target = e.target as HTMLDivElement
                            if (!target) return
                            target.classList.remove("dragging")
                            let renderedModule = document.querySelector(`.dragging[id="${target.id}"][draggable="true"]`)
                            if (renderedModule !== null && renderedModule !== undefined) renderedModule.classList.remove("dragging")
                        }}
                    >
                        <FontAwesomeIcon icon={selectIcon(component.type!)} />
                        <p>{component.type + ` (${completeid})`}</p>
                    </button>

                    {component.components !== undefined ? <button
                        className={"comp-opener"}
                        onClick={(e) => {
                            let target = e.target as HTMLDivElement
                            if (!target) return
                            target.parentElement!.parentElement!.classList.toggle("open-span")
                        }}
                        onDragEnter={(e) => {
                            let target = e.target as HTMLDivElement
                            if (!target) return
                            target.parentElement!.parentElement!.classList.toggle("open-span")
                        }}
                    >
                        <FontAwesomeIcon icon={faPlay} />
                    </button> : null}

                </div>

                <ul className="comp-list" id={completeid}>
                    <ContinueLoop
                        {...props}
                        parentIndex={completeid}
                        array={component.components !== undefined
                            && component.components.length !== 0 ?
                            component.components : []}
                        generatePlaces={true}
                    />
                </ul>
            </li>
        </React.Fragment>)
    })
    let lastid = props.parentIndex !== undefined ? props.parentIndex + "-" + idLocal : `${idLocal + 1}`
    return (<>{JSX}
        {props.generatePlaces ? <Place key={Math.random()} dNone moduleKey={lastid + "."} /> : null}
    </>)
}

