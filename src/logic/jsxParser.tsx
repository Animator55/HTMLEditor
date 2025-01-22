import React from 'react';
import JsxParser from "react-jsx-parser";
import * as OctagonalModules from "../RenderComponents/Modules";
import { ToastContext } from "../App";

export default function ComponentsRender(props) {
    const activateToast = React.useContext(ToastContext)
    function Toast(id){
        activateToast([true, {title: "Fixed!", text: `The component (${id}) is immutable. It cannot be selected.`, result: "info"}])
    }
    if (props.components === undefined) return 
    let firstLevelAccKey = 0
    let innerAccKey = 0
    let JSX = props.components.map(module => {
        if(module === "placeholder") return
        let component = module.type
        let completeid

        firstLevelAccKey++
        completeid = firstLevelAccKey.toString()
        if(props.parentIndex !== undefined){
            completeid = props.parentIndex + "-" + innerAccKey
            innerAccKey++
        } 
        return (<React.Fragment key={Math.random()}>
            {props.generatePlaces? <OctagonalModules.Place 
                moduleKey={completeid+"."}
            />:null}
            <JsxParser
                bindings={{
                    moduleData: module.data,
                    moduleChildComponents: module.components,
                    moduleKey: completeid,
                    fixedProp: props.fixed,
                }}
                renderInWrapper={false}
                key={completeid}
                components={{ OctagonalModules }}
                jsx={`
                    <OctagonalModules.${component} 
                        ${(module.components !== undefined) ? 'components={moduleChildComponents}' : ""} 
                        moduleKey={moduleKey} 
                        fixed={fixedProp} 
                        data={moduleData}
                    />`}
            />
        </React.Fragment>)
    })

    let lastid = props.components.length + 1
    if(props.parentIndex !== undefined) lastid = props.parentIndex + "-" + props.components.length
    return <>
        {JSX}
        {props.generatePlaces? <OctagonalModules.Place key={Math.random()} moduleKey={lastid+"."}/>:null}
    </>
}