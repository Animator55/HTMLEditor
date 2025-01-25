import React from 'react';
import { moduleType } from '../vite-env';
import { Container, Image, Place, Text } from '../RenderComponents/Modules';

const componentSelector: { [key: string]: any } = {
    "Image": (props: moduleType) => { return <Image {...props} /> },
    "Container": (props: moduleType) => { return <Container {...props} /> },
    "Text": (props: moduleType) => { return <Text {...props} /> },
}

export default function ComponentsRender(props: moduleType) {
    if (props.components === undefined) return
    let firstLevelAccKey = 0
    let innerAccKey = 0
    let JSX = props.components.map((module: moduleType) => {
        if (module.type === "placeholder") return
        let component = module.type
        let completeid

        if (!component) return
        firstLevelAccKey++
        completeid = firstLevelAccKey.toString()
        if (props.parentIndex !== undefined) {
            completeid = props.parentIndex + "-" + innerAccKey
            innerAccKey++
        }
        return (<React.Fragment key={Math.random()}>
            {props.generatePlaces ? <Place
                dNone={false}
                moduleKey={completeid + "."}
            /> : null}
            {componentSelector[component]({
                data: module.data,
                components: module.components,
                moduleKey: completeid,
            })}
        </React.Fragment>)
    })

    let lastid = `${props.components.length + 1}`
    if (props.parentIndex !== undefined) lastid = props.parentIndex + "-" + props.components.length
    return <>
        {JSX}
        {props.generatePlaces ? <Place dNone={false} key={Math.random()} moduleKey={lastid + "."} /> : null}
    </>
}