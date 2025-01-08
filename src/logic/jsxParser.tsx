import React from 'react';

type Props = {
    props: any
}
export default function ComponentsRender({props}: Props) {
    if (props.components.length ===  0) return
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
            {props.generatePlaces && <p accessKey={completeAccessKey + "."} />}
            <div
                key={Math.random()}
                accessKey={completeAccessKey}
                className={module.classes}
                style={module.style}
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
        {props.generatePlaces && <p accessKey={lastAccessKey + "."} />}
    </>
}