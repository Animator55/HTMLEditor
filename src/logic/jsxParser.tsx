import React from 'react';
// import JsxParser from "react-jsx-parser";
import { ToastContext } from "../App";
import { GlobalFunctions } from '../screens/AdminEditor';
type PropsPlace = {
    props: any
}
type Props = {
    props: any
    setSelected: Function,
}
export const Placeholder = ({ props }: PropsPlace) => {
    const globals = React.useContext(GlobalFunctions)

    return <div className={props.dNone ? "d-none drop-place" : "drop-place"}>
        <div
            id={props.moduleKey}
            onDragOver={(e) => { e.preventDefault() }}
            onDrop={(e) => {
                globals.moveComponent(e)
            }}
            className="placeInvisible"
            onDragEnter={(e) => {
                let target = e.target as HTMLDivElement
                if (target) target.className = "place"
            }}
            onDragLeave={(e) => {
                let target = e.target as HTMLDivElement
                if (target) target.className = "placeInvisible"
            }}
        >
        </div>
    </div>
}
export default function ComponentsRender({ props, setSelected }: Props) {
    const activateToast = React.useContext(ToastContext)
    function Toast(id) {
        activateToast([true, { title: "Fixed!", text: `The component (${id}) is immutable. It cannot be selected.`, result: "info" }])
    }
    if (props.components === undefined || props.components.length === 0) return
    let firstLevelAccKey = 0
    let innerAccKey = 0
    let JSX = props.components.map(module => {
        if (module === "placeholder") return
        let component = module.type
        let completeid

        firstLevelAccKey++
        completeid = firstLevelAccKey.toString()
        if (props.parentIndex !== undefined) {
            completeid = props.parentIndex + "-" + innerAccKey
            innerAccKey++
        }
        return (<React.Fragment key={Math.random()}>
            <Placeholder props={{
                moduleKey: completeid + ".",
                dNone: false
            }} />
            <div
                type={component}
                key={Math.random()}
                id={completeid}
                data-select={`${props.selected === completeid}`}
                className={module.data.className}
                style={module.data.style}
                draggable={"true"}
                onDragStart={(e) => {
                    let target = e.target as HTMLDivElement
                    if (!target) return
                    e.dataTransfer.setData("Text", target.id)
                    target.classList.add("dragging")
                }}
                onDragEnd={(e) => {
                    let target = e.target as HTMLDivElement
                    if (target) target.className = module.classes
                }}
                onClick={(e) => {
                    let target = e.target as HTMLElement
                    if (target) setSelected(target.id, false)
                }}
            >
                {module.data.text}
                <ComponentsRender props={{ ...module, parentIndex: completeid, selected: props.selected }} setSelected={setSelected} />
            </div>
        </React.Fragment>)
    })

    let lastid = props.components.length + 1
    if (props.parentIndex !== undefined) lastid = props.parentIndex + "-" + props.components.length
    return <>
        {JSX}
        {props.generatePlaces ? <Placeholder
            props={{ dNone: false, moduleKey: lastid + "." }}
            key={Math.random()} /> : null}
    </>
}