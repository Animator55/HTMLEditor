import React from 'react';
import { GlobalFunctions } from '../App';

type Props = {
    props: any
    setSelected: Function,
}
type PropsPlace = {
    props: any
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
                if(target)target.className = "place"
            }}
            onDragLeave={(e) => { 
                let target = e.target as HTMLDivElement
                if(target)target.className = "placeInvisible"
            }}
        >
        </div>
    </div>
}

export default function ComponentsRender({ props, setSelected }: Props) {
    if (!props || !props.components || props.components.length === 0) return
    let firstLevelAccKey = 0
    let innerAccKey = 0
    let JSX = props.components.map((module: any) => {
        if (module === "placeholder") return
        let completeid
        firstLevelAccKey++
        completeid = firstLevelAccKey.toString()
        if (props.parentIndex !== undefined) {
            completeid = props.parentIndex + "-" + innerAccKey
            innerAccKey++
        }
        console.log(props.selected, completeid)
        return <React.Fragment key={Math.random()}>
            <Placeholder props={{
                moduleKey: completeid + ".",
                dNone: false
            }} />
            <div
                key={Math.random()}
                id={completeid}
                data-select={`${props.selected === completeid}`}
                className={module.classes}
                style={module.style}
                draggable={"true"}
                onDragStart={(e) => { 
                    let target = e.target as HTMLDivElement
                    if(!target) return
                    e.dataTransfer.setData("Text", target.id)
                    target.classList.add("dragging") 
                }}
                onDragEnd={(e) => { 
                    let target = e.target as HTMLDivElement
                    if(target) target.className = module.classes
                }}
                onClick={(e) => {
                    let target = e.target as HTMLElement
                    if (target) setSelected(target.id)
                }}
            >
                {module.textContent}
                <ComponentsRender props={{ ...module, parentIndex: completeid, selected: props.selected }} setSelected={setSelected} />
            </div>
        </React.Fragment>
    })

    let lastid = props.components.length + 1
    if (props.parentIndex !== undefined) lastid = props.parentIndex + "-" + props.components.length
    return <>
        {JSX}
        <Placeholder props={{
            moduleKey: lastid + ".",
            dNone: false
        }} />
    </>
}