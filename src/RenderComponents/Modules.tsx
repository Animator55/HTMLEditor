import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import ComponentsRender from '../logic/jsxParser'
import { GlobalFunctions } from "../screens/AdminEditor";
import checkMoveToChild from "../logic/checkMoveToChild";
import RenderLevel from "../logic/jsonTreeGenerator";
import { templates } from "./Templates";

library.add(fas)

function switchTags(str:string, bool:boolean) {
    let newStr = str !== undefined ? !bool ? str.replace(/\*(.*?)\*/g, "<b>$1</b>") : str.replace(/(<b>|<\/b>)/g, "*") : ""
    newStr = !bool ? newStr.replace(/(?<!\<)\/(.*?)(?<!\<)\//g, "<i>$1</i>") : newStr.replace(/(<i>|<\/i>)/g, "/")
    newStr = !bool ? newStr.replace(/\_(.*?)\_/g, "<ins>$1</ins>") : newStr.replace(/(<ins>|<\/ins>)/g, "_")
    newStr = !bool ? newStr.replace(/\[(.*?)\]\(url:(.*?)\)/g, `<a href="$2" target="_blank">$1</a>`) : newStr.replace(/(<a href="(.*?)">(.*?)<\/a>)/g, "[$3](url:$2)")
    return newStr
}

export function classStyles() {
    let classStyle = {}
    let classHover = {}
    // if(classes !== "" && classes !== undefined){
    //     let classArray = classes.split(" ")
    //     for(let i=0; i<classArray.length; i++) {
    //         if(cssList[classArray[i]] !== undefined){
    //             classStyle = {...classStyle, ...cssList[classArray[i]].style}
    //             classHover = {...classHover, ...cssList[classArray[i]].hover}
    //         }
    //     }
    // }
    return { "classStyle": classStyle, "classHover": classHover }
}

function DragStart(e) {
    e.dataTransfer.setData("Text", e.target.id);
    e.target.classList.add("dragging")
    let renderedModule = document.querySelector(`.side-bar [id="${e.target.id}"]`)
    renderedModule?.classList?.add("dragging")
}

export const Place = (props) => {
    const context = React.useContext(GlobalFunctions)

    const [state, setState] = React.useState({
        components: undefined,
        data: undefined,
        moduleKey: "",
        select: undefined,
        setSelected: undefined,
        static: "",
        fixed: "",
    })
    const handlerSetState = (component, id:string) => {
        setState({
            components: [component],
            data: undefined,
            moduleKey: id,
            select: undefined,
            setSelected: undefined,
            static: "true",
            fixed: "true",
        })
    }
    return (<div className={props.dNone ? "d-none drop-place" : "drop-place"}>
        <div
            id={props.moduleKey}
            onDragOver={(e) => { e.preventDefault() }}
            onDrop={(e) => { context.moveComponent(e) }}
            className="placeInvisible pre-render-drop"
            onDragEnter={(e) => {
                let [dragging, id] = document.body.getAttribute("dragging")!.split(".");
                let isNew = id === "New"
                let idSplit = id.split("-")
                let component
                if (!isNew) {
                    if (!checkMoveToChild(id, props.moduleKey)) return
                    idSplit[0] = `${parseInt(idSplit[0]) - 1}`
                    component = context.JSONLocationSearch(idSplit)[idSplit[idSplit?.length - 1]]
                }
                else {
                    let parsedComponent = templates[dragging]
                    component = JSON.parse(parsedComponent)
                }
                handlerSetState(component, props.moduleKey.slice(0, -1))
            }}
            onDragLeave={(e) => {
                handlerSetState(undefined, "")
            }}
        >
            {state.moduleKey !== "" ? <div className="render" select="true">
                {props.dNone ?
                    <RenderLevel
                        array={state.components}
                        preRenderIndex={state.moduleKey}
                        fixedComponents={[]}
                        staticComponents={[]}
                    />
                    :
                    <ComponentsRender
                        {...state}
                        parentIndex={state.moduleKey}
                        generatePlaces={false}
                    />
                }
            </div> : null}
        </div>
    </div>)
}

export const Text = (props) => {
    const context = React.useContext(GlobalFunctions)
    const [state, setState] = React.useState({
        fastEditor: false,
        data: props.data.text !== "" ? { ...props.data } :{
            text: ""
        }
    })


    const createTextHTML = (text:string, type:string)=> {
        let str
        text !== '' && text !== undefined ? str = parseSpecialCharacters(text) : str = '';
        let component = `<${type}>${str}</${type}>`

        return component
    }

    function parseSpecialCharacters(str:string) {
        let parsedStr = stylize(linkify(decodeURIComponent(cleanHTMLTags(str))))
        return parsedStr
    }

    function cleanHTMLTags(str:string) {
        // let cleanedStr = str.replace(/(<([^>]+)>)/ig, '')
        // return cleanedStr
        return str
    }

    function stylize(str:string) {
        let stylizedStr = str.replace(/{type:(?:'|")style(?:'|"),data:(?:'|")(.{5,}?)(?:'|"),text:(?:'|")(.{1,}?)(?:'|")}/g, '<span style="$1">$2</span>')
        return stylizedStr
    }

    function linkify(str:string) {
        let linkifiedStr = str.replace(/{type:(?:'|")link(?:'|"),data:(?:'|")([-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(?:\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?)(?:'|"),text:(?:'|")(.{1,}?)(?:'|")}/g, '<a target="_blank" rel="noopener" referrerpolicy="no-referrer" href="$1">$2</a>')
        return linkifiedStr
    }

    return <div
        data-text="Escribe aquí"
        type="module"
        title={"Text (" + props.moduleKey + ")"}
        // onKeyDown={async(e)=>{
        //     if(e.key === "Enter") {
        //         let styles = SubmitEdit(e.target.firstChild.style)
        //         await setState({data: {...state.data, text: e.target.innerText, style: {...state.data.style, ...styles}}}); 
        //         context.changeJSON.edit(props.moduleKey, state)
        //     }
        // }} 
        // contentEditable="true"
        draggable={props.fixed === true ? "false" : "true"}
        onDragStart={DragStart}
        onDragEnd={(e) => { e.target.className = props.data.className }}
        className={props.data.className}
        style={props.data.style}
        onClick={(e) => { if (e.target.id === props.moduleKey) context.selectComponent(e, true) }}
        onDoubleClick={(e) => { if (e.target.id === props.moduleKey) context.activatePopEditor(e) }}
        dangerouslySetInnerHTML={{ __html: switchTags(createTextHTML(state.data.text, props.data.type), state.fastEditor) }}
        id={props.moduleKey}>
    </div>
}

export const Image = (props) => {
    const context = React.useContext(GlobalFunctions)
    return (
        <div
            className={"editor-img " + props.data.className}
            style={props.data.style}
            id={props.moduleKey}
            draggable={props.fixed === true ? "false" : "true"}
            onDragStart={DragStart}
            onDragEnd={(e) => { e.target.className = props.data.className }}
            type="module"
            title={"Image (" + props.moduleKey + ")"}
            onClick={(e) => { if (e.target.id === props.moduleKey) context.selectComponent(e, true) }}
            onDoubleClick={(e) => { if (e.target.id === props.moduleKey) context.activatePopEditor(e) }}
        >
            <img src={props.data.src}></img>
        </div>
    )
}
export const Container = (props) => {
    const context = React.useContext(GlobalFunctions)
    let fixed = props.fixed === true ? true : props.fixed?.includes("Container")
    return (
        <div
            className={props.data.className}
            style={props.data.style}
            id={props.moduleKey}
            onClick={(e) => { if (e.target.id === props.moduleKey) context.selectComponent(e, true) }}
            draggable={props.fixed === true ? "false" : "true"}
            type="container"
            title={"Container (" + props.moduleKey + ")"}
            fixed={`${fixed}`}

            onDragStart={DragStart}
            onDragEnd={(e) => { e.target.className = props.data.className }}
        >
            <ComponentsRender
                {...props}
                fixed={fixed ? true : props.fixed}
                parentIndex={props.moduleKey}
                generatePlaces={!fixed}
            />
        </div>
    )
}
