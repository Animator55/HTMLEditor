import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faIcons, faLink, fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ComponentsRender from '../logic/jsxParser'
import { GlobalFunctions } from "../screens/AdminEditor";
import checkMoveToChild from "../logic/checkMoveToChild";
import RenderLevel from "../logic/jsonTreeGenerator";
import { templates } from "./Templates";

library.add(fas)

function checkKey(e, key) {
    if(e.target.id === key) return e
}

const convertStyle = (entry) => {
    let newEntry = entry.replace(/[-](\w)/g, function(str, match) {
        return match.toUpperCase();
    })
    return newEntry
}

function rgbToHex(rgb) {
    let numbers = rgb.slice(4, -1)
    let [r, g, b] = numbers.split(",")
    let hex = "#" + ((1 << 24) + (parseInt(r) << 16) + (parseInt(g) << 8) + parseInt(b)).toString(16).slice(1);
    return hex;
}

function switchTags(str, bool){
    let newStr = str !== undefined ? !bool ? str.replace(/\*(.*?)\*/g, "<b>$1</b>") : str.replace(/(<b>|<\/b>)/g, "*") : ""
    newStr = !bool ? newStr.replace(/(?<!\<)\/(.*?)(?<!\<)\//g, "<i>$1</i>") : newStr.replace(/(<i>|<\/i>)/g, "/") 
    newStr = !bool ? newStr.replace(/\_(.*?)\_/g, "<ins>$1</ins>") : newStr.replace(/(<ins>|<\/ins>)/g, "_")
    newStr = !bool ? newStr.replace(/\[(.*?)\]\(url:(.*?)\)/g, `<a href="$2" target="_blank">$1</a>`) : newStr.replace(/(<a href="(.*?)">(.*?)<\/a>)/g, "[$3](url:$2)")
    return newStr
} 

function SubmitEdit(targetStyle) {
    let changedEntrys = []
    for(let i=0; i < 30; i++) {
        if(targetStyle[i] === undefined) break
        changedEntrys.push(convertStyle(targetStyle[i]))
    }
    let styles = {}
    changedEntrys.forEach(entry=>{
        let val = targetStyle[entry]
        if(entry === "color"){
            val = rgbToHex(targetStyle[entry])
        }
        styles = {...styles, [entry] : val}
    })

    return styles
}

export function classStyles (classes, cssList) {
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
    return {"classStyle": classStyle,"classHover": classHover}
}

function DragStart (e) {
    e.dataTransfer.setData("Text", e.target.id); 
    e.target.classList.add("dragging")
    let renderedModule = document.querySelector(`.side-bar [id="${e.target.id}"]`)
    renderedModule?.classList?.add("dragging")
}

export class Place extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            components: undefined,
            data: undefined,
            moduleKey: "",
            select: undefined,
            setSelected: undefined,
            static: "",
            fixed: "",
        }
        this.handlerSetState = this.handlerSetState.bind(this)
    }
    handlerSetState(component, id){
        this.setState({
            components: [component],
            data: undefined,
            moduleKey: id,
            select: undefined,
            setSelected: undefined,
            static: "true",
            fixed: "true",
        })
    }

    // static contextType = GlobalFunctions;
    render() {
        return (<div className={this.props.dNone ? "d-none drop-place" : "drop-place"}>
            <div 
                id={this.props.moduleKey}
                onDragOver={(e)=>{e.preventDefault()}}
                onDrop={(e)=>{this.context.moveComponent(e)}}
                className="placeInvisible pre-render-drop"
                onDragEnter={(e)=>{
                    let [dragging, id] = document.body.attributes.dragging?.value.split(".");
                    let isNew = id === "New"
                    let idSplit = id.split("-")
                    let component
                    if(!isNew){
                        if(!checkMoveToChild(id, this.props.moduleKey)) return
                        idSplit[0] = idSplit[0]-1 
                        component = this.context.JSONLocationSearch(idSplit)[idSplit[idSplit?.length-1]]
                    }
                    else {
                        let parsedComponent = templates[dragging] 
                        component = JSON.parse(parsedComponent)
                    }
                    this.handlerSetState(component, this.props.moduleKey.slice(0, -1))
                }}
                onDragLeave={(e)=>{
                    this.handlerSetState(undefined, "")
                }}
            >
                {this.state.moduleKey !== "" ? <div className="render" select="true">
                    {this.props.dNone ?
                        <RenderLevel 
                            array={this.state.components}
                            preRenderIndex={this.state.moduleKey}
                            fixedComponents={[]}
                            staticComponents={[]}
                        /> 
                        :
                        <ComponentsRender 
                            {...this.state} 
                            parentIndex={this.state.moduleKey}
                            generatePlaces={false}
                        />
                    }
                </div> : null}
            </div>
        </div>)
    }
}

export class Logo extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            fastEditor: false,
            data: {
                text: "",
            }
        }
    }
    
    // static contextType = GlobalFunctions;
    componentDidMount(){
        this.setState({data: {...this.props.data}})
    }

    cleanHTMLTags(str) {
        let cleanedStr = str !== undefined ? str.replace(/(<([^>]+)>)/ig, '') : ""
        return cleanedStr
    }
    
    render() {
        return (
            <div 
                draggable={this.props.fixed === true ? "false" : "true"}
                title={"Logo (" + this.props.moduleKey + ")"}
                type="module" 
                onDragStart={DragStart} 
                className={this.props.data.className}
                onDragEnd={(e)=>{e.target.className = this.props.data.className}}
                id={this.props.moduleKey} 
                onClick={(e)=>{if(e.target.id === this.props.moduleKey) this.context.selectComponent(e, true)}}
            >
                <div
                    style={this.props.data.style}
                ></div>
                <div 
                    data-text="Escribe aquí"
                    style={{
                        color: this.props.data.style?.color, 
                        textAlign: this.props.data.style?.textAlign, 
                        fontFamily: this.props.data.style?.fontFamily, 
                        fontWeight: this.props.data.style?.fontWeight,
                        fontSize: this.props.data.style?.fontSize
                    }} 
                    suppressContentEditableWarning={true} 
                    contentEditable="true"
                    onClick={(e)=>{this.context.activatePopEditor(e)}}
                    onKeyDown={async(e)=>{
                        if(e.key === "Enter") {
                            let styles = SubmitEdit(e.target.style)
                            await this.setState({data: {...this.state.data, text: e.target.innerText, style: {...this.state.data.style, ...styles}}}); 
                            this.context.changeJSON.edit(this.props.moduleKey, this.state)
                        }
                    }}
                    dangerouslySetInnerHTML={{ __html: switchTags(this.cleanHTMLTags(this.state.data.text), this.state.fastEditor)}} 
                >   
                </div>
            </div>
        )
    }
}

// export function SearchBar({ data, moduleKey, setSelected, select}) {
//     return (
//         <div 
//             className="d-flex"
//             select={select === moduleKey ? "true": "false"} 
//             draggable={setSelected === undefined ? "false" : "true"}
//             onDragStart={(e)=>{
//                 e.dataTransfer.setData("Text", e.target.id); 
//                 e.target.classList.add("dragging")
//                 let renderedModule = document.querySelector(`.side-bar [id="${e.target.id}"]`)
//                 renderedModule?.classList?.add("dragging")
//             }} 
//             onDragEnd={(e)=>{e.target.className = data.className}}
//             id={moduleKey} 
//             title={"SearchBar (" + this.props.moduleKey + ")"}
//             type="module"
//             onClick={()=>{setSelected(moduleKey, true)}}
//             >
//             <input className={data.inputClassName} type='text' placeholder={data.ph} disabled/>
//             <button className={data.buttonClassName}><FontAwesomeIcon style={{ width: 15, height: 15 }} icon={['fas', 'search']} />{data.buttonText}</button>
//         </div>
//     )

// }

export class Text extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            fastEditor: false,
            data: {
                text: ""
            }
        }
    }

    componentDidMount(){
        this.setState({data: {...this.props.data}})
    }
    
    createTextHTML(text, type) {
        let str
        text !== '' && text !== undefined ? str = this.parseSpecialCharacters(text) : str = '';
        let component = `<${type}>${str}</${type}>`

        return component
    }

    parseSpecialCharacters(str) {
        let parsedStr = this.stylize(this.linkify(decodeURIComponent(this.cleanHTMLTags(str))))
        return parsedStr
    }

    cleanHTMLTags(str) {
        // let cleanedStr = str.replace(/(<([^>]+)>)/ig, '')
        // return cleanedStr
        return str
    }
    
    stylize(str) {
        let stylizedStr = str.replace(/{type:(?:'|")style(?:'|"),data:(?:'|")(.{5,}?)(?:'|"),text:(?:'|")(.{1,}?)(?:'|")}/g, '<span style="$1">$2</span>')
        return stylizedStr
    }
    
    linkify(str) {
        let linkifiedStr = str.replace(/{type:(?:'|")link(?:'|"),data:(?:'|")([-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(?:\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?)(?:'|"),text:(?:'|")(.{1,}?)(?:'|")}/g, '<a target="_blank" rel="noopener" referrerpolicy="no-referrer" href="$1">$2</a>')
        return linkifiedStr
    }
    // static contextType = GlobalFunctions;

    render() {
        return <div 
            data-text="Escribe aquí"
            type="module" 
            title={"Text (" + this.props.moduleKey + ")"}
            // onKeyDown={async(e)=>{
            //     if(e.key === "Enter") {
            //         let styles = SubmitEdit(e.target.firstChild.style)
            //         await this.setState({data: {...this.state.data, text: e.target.innerText, style: {...this.state.data.style, ...styles}}}); 
            //         this.context.changeJSON.edit(this.props.moduleKey, this.state)
            //     }
            // }} 
            // contentEditable="true"
            draggable={this.props.fixed === true ? "false" : "true"}
            onDragStart={DragStart} 
            onDragEnd={(e)=>{e.target.className = this.props.data.className}}
            className={this.props.data.className}
            style={this.props.data.style}
            onClick={(e)=>{if(e.target.id === this.props.moduleKey) this.context.selectComponent(e, true)}} 
            onDoubleClick={(e)=>{if(e.target.id === this.props.moduleKey) this.context.activatePopEditor(e)}}
            dangerouslySetInnerHTML={{ __html: switchTags(this.createTextHTML(this.state.data.text, this.props.data.type),this.state.fastEditor)}} 
            id={this.props.moduleKey}>
        </div>
    }
}

export class Image extends React.Component {
    // static contextType = GlobalFunctions;
    render() {
        return (
            <div 
                className={"editor-img " + this.props.data.className}
                style={this.props.data.style} 
                id={this.props.moduleKey} 
                draggable={this.props.fixed === true ? "false" : "true"}
                onDragStart={DragStart} 
                onDragEnd={(e)=>{e.target.className = this.props.data.className}}
                type="module"
                title={"Image (" + this.props.moduleKey + ")"}
                onClick={(e)=>{if(e.target.id === this.props.moduleKey) this.context.selectComponent(e, true)}}
                onDoubleClick={(e)=>{if(e.target.id === this.props.moduleKey) this.context.activatePopEditor(e)}}
            >
                <img src={this.props.data.src}></img>
            </div>
        )
    }
}
// export class Form extends React.Component {
//     render() {
//         return (
//             <form 
//                 
                // style={{...this.state.data.classStyle, ...this.props.data.style}} 
//                 id={this.props.moduleKey} 
//                 draggable={this.props.fixed === true ? "false" : "true"}
//                 onDragStart={(e)=>{e.dataTransfer.setData("Text", this.props.static.includes("Form") ? "static-"+e.target.id : e.target.id); e.target.classList.add("dragging")
//                 let renderedModule = document.querySelector(`*[id="${e.target.id}"][draggable="true"]:not(.dragging)`)
//                 renderedModule?.classList?.add("dragging")}} 
//                 onDragEnd={(e)=>{e.target.className = this.props.data.className}}
//                 type="module"
//                 onClick={()=>{if(e.target.id === this.props.moduleKey) this.context.selectComponent(e, true)}}
//                 >
//                 {this.props.components.map((formEl) => {
//                     let key = Object.keys(formEl)
//                     if (key[0] !== 'submit') {
//                         return (
//                             <div key={Math.random() * Math.random()}>{formEl[key].label}
//                                 <input className={formEl[key].className} style={formEl[key].style} type={formEl[key].type} placeholder={formEl[key].ph} name={formEl[key].name} required={formEl[key].req} />
//                             </div>
//                         )
//                     }
//                     else {
//                         return (
//                             <button className={formEl[key].className} style={formEl[key].style} type='submit' key={Math.random() * Math.random()} onClick={(e) => { e.preventDefault() }}><FontAwesomeIcon style={{ width: 15, height: 15 }} icon={formEl[key].icon} />{formEl[key].text}</button>
//                         )
//                     }
//                 })}
//             </form>
//         )
//     }
// }

// export class SocialProfiles extends React.Component {
    // static contextType = GlobalFunctions;
//     setAnchors() {
//         let urlRegex = new RegExp('/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/');
//         let isub = -1
//         let Anchors = this.props.data.components.map(element => {
//             let subkey = this.props.moduleKey + "-" + isub
//             isub++
//             // && urlRegex.test(element.url)
//             if (element.url !== "") {
//                 return (<button 
//                     className={this.props.data.className}
//                     style={this.props.data.style} 
//                     key={Math.random()} 
//                     id={subkey} 
//                     >
//                         <FontAwesomeIcon icon={element.icon} />
//                         {element.text}
//                     </button>)
//             }
//         });
//         return Anchors
//     }

//     render() {
//         return (
//             <div 
//                 className="d-flex" 
//                 id={this.props.moduleKey}
//                 draggable={this.props.fixed === true ? "false" : "true"}
//                 onDragStart={(e)=>{
//                     e.dataTransfer.setData("Text", e.target.id); 
//                     e.target.classList.add("dragging")
//                     let renderedModule = document.querySelector(`*[id="${e.target.id}"][draggable="true"]:not(.dragging)`)
//                     renderedModule?.classList?.add("dragging")
//                 }} 
//                 onDragEnd={(e)=>{e.target.className = this.props.data.className}}
//                 type="module"
//                 title={"SocialProfiles (" + this.props.moduleKey + ")"}
//                 >{this.props.data.components?.length > 0 ? this.setAnchors() : null}</div>
//         );
//     }
// }

/////

export class Columns extends React.Component {
    
    // static contextType = GlobalFunctions;
    render() {
        let fixed = this.props.fixed === true ? true : this.props.fixed?.includes("Columns")
        return (
            <div 
                className={this.props.data.className}
                style={this.props.data.style} 
                id={this.props.moduleKey} 
                onClick={(e)=>{if(e.target.id === this.props.moduleKey)  this.context.selectComponent(e, true)}}
                draggable={this.props.fixed === true ? "false" : "true"}
                type="columns"
                title={"Columns (" + this.props.moduleKey + ")"}
                fixed={`${fixed}`}
                
                onDragStart={DragStart} 
                onDragEnd={(e)=>{e.target.className = this.props.data.className}}
                >
                <ComponentsRender
                    {...this.props} 
                    fixed={fixed ? true : this.props.fixed}
                    parentIndex={this.props.moduleKey}
                    generatePlaces={!fixed}
                />
            </div>
        )
    }
}

export class Container extends React.Component {
    // static contextType = GlobalFunctions;
    render() {
        let fixed = this.props.fixed === true ? true : this.props.fixed?.includes("Container")
        return (
            <div 
                className={this.props.data.className}
                style={this.props.data.style} 
                id={this.props.moduleKey} 
                onClick={(e)=>{if(e.target.id === this.props.moduleKey)  this.context.selectComponent(e, true)}}
                draggable={this.props.fixed === true ? "false" : "true"}
                type="container"
                title={"Container (" + this.props.moduleKey + ")"}
                fixed={`${fixed}`}
                
                onDragStart={DragStart} 
                onDragEnd={(e)=>{e.target.className = this.props.data.className}}
                >
                <ComponentsRender
                    {...this.props} 
                    fixed={fixed ? true : this.props.fixed}
                    parentIndex={this.props.moduleKey}
                    generatePlaces={!fixed}
                />
            </div>
        )
    }
}

export class Header extends React.Component {
    // static contextType = GlobalFunctions;
    render() {
        let fixed = this.props.fixed === true ? true : this.props.fixed?.includes("Header")
        return (
            <div 
                className={this.props.data.className}
                style={this.props.data.style}
                id={this.props.moduleKey} 
                onClick={(e)=>{if(e.target.id === this.props.moduleKey)  this.context.selectComponent(e, true)}}
                draggable={this.props.fixed === true ? "false" : "true"} 
                type="container"
                title={"Header (" + this.props.moduleKey + ")"}
                fixed={`${fixed}`}
                
                onDragStart={DragStart} 
                onDragEnd={(e)=>{e.target.className = this.props.data.className}}
                >
                <ComponentsRender
                    {...this.props} 
                    fixed={fixed ? true : this.props.fixed}
                    parentIndex={this.props.moduleKey}
                    generatePlaces={!fixed}
                />
            </div>
        )
    }
}

export class Footer extends React.Component {
    // static contextType = GlobalFunctions;
    render() {
        let fixed = this.props.fixed === true ? true : this.props.fixed?.includes("Footer")
        return (
            <div 
                className={this.props.data.className}
                style={this.props.data.style}
                id={this.props.moduleKey} 
                onClick={(e)=>{if(e.target.id === this.props.moduleKey)  this.context.selectComponent(e, true)}}
                draggable={this.props.fixed === true ? "false" : "true"}
                type="container"
                title={"Footer (" + this.props.moduleKey + ")"}
                fixed={`${fixed}`}
                
                onDragStart={DragStart} 
                onDragEnd={(e)=>{e.target.className = this.props.data.className}}
                >
                <ComponentsRender
                    {...this.props} 
                    fixed={fixed ? true : this.props.fixed}
                    parentIndex={this.props.moduleKey}
                    generatePlaces={!fixed}
                />
            </div>
        )
    }
}

export class Navigation extends React.Component {
    // static contextType = GlobalFunctions;
    render() {
        let fixed = this.props.fixed === true ? true : this.props.fixed?.includes("Navigation")
        return (
            <div 
                className={this.props.data.className}
                style={this.props.data.style}
                id={this.props.moduleKey} 
                onClick={(e)=>{if(e.target.id === this.props.moduleKey)  this.context.selectComponent(e, true)}}
                draggable={this.props.fixed === true ? "false" : "true"}
                type="container"
                title={"Navigation (" + this.props.moduleKey + ")"}
                fixed={`${fixed}`}
                
                onDragStart={DragStart} 
                onDragEnd={(e)=>{e.target.className = this.props.data.className}}
                >
                <ComponentsRender
                    {...this.props} 
                    fixed={fixed ? true : this.props.fixed}
                    parentIndex={this.props.moduleKey}
                    generatePlaces={!fixed}
                />
            </div> 
        )
    }
}
