import React from 'react';
import { GlobalFunctions } from '../App';

type Props = {
    props: any
}
const Placeholder = ({ props }: Props) => {
    const globals = React.useContext(GlobalFunctions)

    return <div className={props.dNone ? "d-none drop-place" : "drop-place"}>
        <div
            accessKey={props.moduleKey}
            onDragOver={(e) => { e.preventDefault() }}
            onDrop={(e) => {
                globals.moveComponent(e)
            }}
            className="placeInvisible"
            onDragEnter={(e) => { e.target.className = "place" }}
            onDragLeave={(e) => { e.target.className = "placeInvisible" }}
        >
        </div>
    </div>
}

export default function ComponentsRender({ props }: Props) {
    if (!props || !props.components || props.components.length === 0) return
    let firstLevelAccKey = 0
    let innerAccKey = 0
    let JSX = props.components.map((module: any) => {
        if (module === "placeholder") return
        let completeAccessKey
        firstLevelAccKey++
        completeAccessKey = firstLevelAccKey.toString()
        if (props.parentIndex !== undefined) {
            completeAccessKey = props.parentIndex + "-" + innerAccKey
            innerAccKey++
        }
        return <React.Fragment key={Math.random()}>
            <Placeholder props={{
                moduleKey: completeAccessKey + ".",
                dNone: false
            }} />
            <div
                key={Math.random()}
                accessKey={completeAccessKey}
                className={module.classes}
                style={module.style}
                draggable={"true"}
                onDragStart={(e) => { e.dataTransfer.setData("Text", e.target.accessKey); e.target.classList.add("dragging") }}
                onDragEnd={(e) => { e.target.className = module.classes }}
                onClick={(e) => {
                    let target = e.target as HTMLElement
                    // if (target) setSelected(target.accessKey)
                }}
            >
                {module.textContent}
                <ComponentsRender props={{ ...module, parentIndex: completeAccessKey }} />
            </div>
        </React.Fragment>
    })

    let lastAccessKey = props.components.length + 1
    if (props.parentIndex !== undefined) lastAccessKey = props.parentIndex + "-" + props.components.length
    return <>
        {JSX}
        <Placeholder props={{
            moduleKey: lastAccessKey + ".",
            dNone: false
        }} />
    </>
}