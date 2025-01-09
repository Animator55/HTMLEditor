import { faImage, faLock, faObjectGroup, faPager, faPhotoFilm, faPlay, faScroll, faSearch, faShapes, faSquarePollHorizontal, faSquareShareNodes, faVectorSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
// import { Place } from "../RenderComponents/Modules"
import ContinueLoop from "./jsonTreeGeneratorLoop"
import { ToastContext } from "../App";
import { GlobalFunctions } from "../screens/AdminEditor"

let moduleTypes = {
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

const setType = (type) => {
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

export default function RenderLevel(props) {
    const activateToast = React.useContext(ToastContext)
    const GlobalFunc = React.useContext(GlobalFunctions)

    const selectIcon = (type) => {
        let icon = moduleTypes[type]
        if (icon === undefined) return faVectorSquare

        return icon
    }

    let idLocal = 0
    if (!props.array) return
    props.array.map((el, i) => { if (el === "placeholder") props.array.splice(i, 1) })

    let JSX = props.array.map((component) => {
        if (component === "placeholder") return
        idLocal++
        let completeid = props.preRenderIndex !== undefined ? props.preRenderIndex : props.parentIndex !== undefined ? props.parentIndex + "-" + (idLocal - 1) : `${idLocal}`
        return (<React.Fragment key={Math.random()}>
            {/* {props.generatePlaces ? <Place dNone moduleKey={completeid + "."} /> : null} */}
            <li
                fixed={`${props.fixedComponents.includes(component?.type)}`}
                className="close-span"
                onDrop={(e) => {
                    if (document.body.attributes?.dragging?.value === undefined) return
                    let id = document.body.attributes?.dragging?.value?.split(".")[1]
                    let renderedModule = document.querySelectorAll(`.dragging[id="${id}"][draggable="true"]`)[1]
                    if (renderedModule !== null && renderedModule !== undefined) renderedModule.classList.remove("dragging")
                }}
            >
                <div className="comp-wraper">
                    <button
                        className="comp-selector"
                        id={`${completeid}`}
                        select={`${props.selected === `${completeid}`}`}
                        onClick={() => { GlobalFunc.selectComponent(completeid) }}
                        draggable
                        type={setType(component.type)}
                        onDragStart={(e) => {
                            e.dataTransfer.setData("Text", e.target.id);
                            e.target.classList.add("dragging")
                            let renderedModule = document.querySelector(`*[id="${e.target.id}"][draggable="true"]:not(.dragging)`)
                            if (renderedModule !== null && renderedModule !== undefined) renderedModule.classList.add("dragging")
                        }}
                        onDragEnd={(e) => {
                            e.target.classList.remove("dragging")
                            let renderedModule = document.querySelector(`.dragging[id="${e.target.id}"][draggable="true"]`)
                            if (renderedModule !== null && renderedModule !== undefined) renderedModule.classList.remove("dragging")
                        }}
                    >
                        <FontAwesomeIcon icon={selectIcon(component.type)} />
                        <p>{component.type + ` (${completeid})`}</p>
                    </button>

                    {component.components !== undefined ? <button
                        className={props.fixedComponents.includes(component.type) ? "comp-opener disabled" : "comp-opener"}
                        onClick={(e) => {
                            if (props.fixedComponents.includes(component.type)) activateToast([true, { title: "Fixed!", text: `This component is immutable. Its children cannot be edited.`, result: "info" }])
                            e.target.parentElement.parentElement.classList.toggle("open-span")
                        }}
                        onDragEnter={(e) => {
                            if (props.fixedComponents.includes(component.type)) return
                            e.target.parentElement.parentElement.classList.toggle("open-span")
                        }}
                    >
                        <FontAwesomeIcon icon={props.fixedComponents.includes(component.type) ? faLock : faPlay} />
                    </button> : null}

                </div>

                <ul className="comp-list" id={completeid}>
                    <ContinueLoop
                        props={{
                            ...props,
                            parentIndex: completeid,
                            array: component.components,
                            generatePlaces:true
                        }}
                    />
                </ul>
            </li>
        </React.Fragment>)
    })
    let lastid = props.parentIndex !== undefined ? props.parentIndex + "-" + idLocal : `${idLocal + 1}`
    return (<>{JSX}
    {/* {props.generatePlaces ?<Place key={Math.random()} dNone moduleKey={lastid + "."} /> : null} */}
    </>)
}

