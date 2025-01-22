import React from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import "../assets/css/editor.css"
import "../assets/css/adminEditor.css"
import ComponentsRender from '../logic/jsxParser';
import selectInJson, { JSONLocationSearch } from "../logic/jsonTreeSelector";
import checkMoveToChild from "../logic/checkMoveToChild";
import { templates } from "../RenderComponents/Templates";
import * as api from "../logic/APIs"
import PopEditor from "../components/PopEditor";
import EditorContainer from "../components/EditorContainer";
import Zoom from "../components/Zoom";
import TrashCan from "../components/TrashCan";
import activateDragPage from "../logic/editorMoves";
import AddFontToDoc from "../logic/AddFontToDoc";
import ReSize from "../components/ReSize";

const setDragging = (val: string) => {
    document.body.setAttribute("dragging", val);
}
setDragging("undefined");

let requestCounter = 0

let fixedComponents = ["Navigation", "Footer", "ProductsGrid"]
//in ComponentsTree included Nav, footer for duplication (UNIQUE MECHANIC POSIBILITY)
let ComponentsTree = ["Container", "Columns", "Header", "Text", "Logo", "Image", "Form", "SearchBar", "SocialProfiles", "ProductsGrid", "Navigation", "Footer"]
let customFontList = {
    "Satisfy": {
        "family": "Satisfy",
        "variants": [
            "regular"
        ],
        "subsets": [
            "latin"
        ],
        "version": "v17",
        "lastModified": "2022-09-22",
        "files": {
            "regular": "http://fonts.gstatic.com/s/satisfy/v17/rP2Hp2yn6lkG50LoOZSCHBeHFl0.ttf"
        },
        "category": "handwriting",
        "kind": "webfonts#webfont"
    }
}

AddFontToDoc(customFontList)

let mainFont: string | undefined = undefined
const setMainFont = (val: string) => { mainFont = val }
let customClassList = [
    { "name": "class-1", "display": "Desktop", "style": [], "hover": [] },
    { "name": "class-2", "display": "Desktop", "style": [{ key: "position", value: "absolute" }], "hover": [] },
    { "name": "class-3", "display": "Desktop", "style": [{ key: "color", value: "#fff" }, { key: "color", value: "#fff" }, { key: "color", value: "#fff" }, { key: "color", value: "#fff" }, { key: "color", value: "#fff" }, { key: "color", value: "#fff" }], "hover": [] },
    { "name": "Container-d", "display": "Mobile", "style": [{ key: "display", value: "flex" }], "hover": [] },
    { "name": "image-rotation", "display": "Mobile", "style": [{ key: "transform", value: "rotate(0deg)" }, { key: "transition", value: "all 1s ease" }], "hover": [{ key: "transform", value: "rotate(360deg)" }, { key: "transition", value: "all 1s ease" }] },
    { name: "logo-container", display: "All", style: [{ key: "display", value: "flex" }, { key: "flex-direction", value: "column" }, { key: "align-items", value: "center" }, { key: "width", value: "fit-content" }, { key: "margin", value: "0 auto!important" }], hover: [], }
]
let zoom = 0.7
let resolution = { x: window.innerWidth, y: window.innerHeight }
let notAllowedMoves: { [key: string]: any } = {}

export const GlobalFunctions = React.createContext<{
    moveComponent: Function
    JSONLocationSearch: Function
    changeJSON: any
    activatePopEditor: Function
    selectComponent: Function
    selectClass: Function
    cssNames: any
    selectedClass: any
    changeCss: Function
    mainFont: {font: string, setMainFont: Function}
}>({
    moveComponent: (e: string) => { console.log(e) },
    JSONLocationSearch: (e: string) => { console.log(e) },//
    changeJSON: {},//
    activatePopEditor: (e: string) => { console.log(e) },
    selectComponent: (e: React.MouseEvent, provinence: boolean) => { console.log(e, provinence) },
    selectClass: (e: number) => { console.log(e) },
    cssNames: {},
    selectedClass: undefined,//
    changeCss: (e: string) => { console.log(e) },//
    mainFont: { "font": "", setMainFont: (e: string) => { console.log(e) } }
});

let selected: any | undefined = undefined

export default function AdminEditor() {
    let AdminEditor = true
    const [JSONView, setJSON] = React.useState<any>(undefined)
    const [refresh, activateRefresh] = React.useState(false)
    const [selectedClass, setClass] = React.useState<number | undefined>(undefined)

    const AppCont = React.useRef<HTMLDivElement | null>(null)
    const PopEditorRef = React.useRef<HTMLDivElement | null>(null)
    const EditorRef = React.useRef<HTMLDivElement | null>(null)
    const Container = React.useRef<HTMLDivElement | null>(null)

    const removeSelects = () => {
        if (!AppCont.current) return
        let firstChild = AppCont.current.firstChild as HTMLDivElement
        firstChild.classList.add("d-none")
        //querySelector can be replaced if "event.target" was in parameters, but not in json-tree
        let rendered = document.querySelector(`.edit-screen [select="true"]`)
        let sideRender = document.querySelector(`.side-bar [select="true"]`)
        if (rendered !== null) rendered.setAttribute("select", "false")
        if (sideRender !== null) sideRender.setAttribute("select", "false")
    }

    const addSelect = (key: string, e) => {
        const calcuteCoords = () => {
            if (e.pageY === 0) return
            let resultX = e.pageX - e.nativeEvent.offsetX * zoom - 1
            let resultY = e.pageY - e.nativeEvent.offsetY * zoom - 1
            return { X: resultX, Y: resultY }
        }
        //querySelector can be replaced if "event.target" was in parameters, but not in json-tree
        EditorRef["selected"] = e.target
        EditorRef["selectedCoords"] = calcuteCoords()
        EditorRef.current.firstChild.click()
        AppCont.current.firstChild.click()
        e.target.setAttribute("select", "true")
        document.querySelector(`.side-bar [id="${key}"]`)?.setAttribute("select", "true")
    }

    const setSelected = (key: string | undefined, e?) => {
        Container["page"] = "Editor"
        if (selected === undefined) {
            EditorRef.current.classList.remove("d-none")
            addSelect(key, e)
        }
        else if (key === undefined) {
            removeSelects()
            EditorRef["selected"] = undefined
            EditorRef["selectedCoords"] = undefined
            selected = key
            Container["display"] = false
            Container.current.classList.remove("expanded")
            activateRefresh(!refresh)
            return
        }
        else {
            removeSelects()
            EditorRef.current.classList.remove("d-none")
            addSelect(key, e)
        }
        Container.current.click()
        selected = key
        Container["display"] = true
        Container.current.classList.add("expanded")
    }

    const setSelectedClass = (index: number | undefined) => {
        if (index === undefined) {
            Container.display = false
            Container.current.classList.remove("expanded")
        }
        setClass(index)
    }

    const getJSON = () => {
        let jsonContent = api.getViews()
        setJSON(jsonContent)
    }
    let JSONLoaded = JSONView !== undefined

    if (!JSONLoaded) { requestCounter++; if (requestCounter < 2) getJSON() }
    else requestCounter = 0

    function handleSetSelected(e: React.MouseEvent, provinence: boolean) {
        console.log(provinence)
        //provinence: if(true) modules; else sidebar > jsontree || editor;
        let target = e.target as HTMLDivElement
        if (!target || target.id === undefined) return
        let key = target.id
        setSelected(key, e)
    }

    const editClassList = {
        create: (name: string | undefined) => {
            let id = (Math.random()).toString()
            id = id.slice(2, 6)
            customClassList.push({
                "name": name !== undefined ? name : `class-${id}`,
                "display": "All",
                "style": [],
                "hover": []
            })
            setSelectedClass(customClassList.length - 1)
        },
        delete: (index: number) => {
            customClassList.splice(index, 1)
            if (selectedClass !== undefined) setSelectedClass(undefined)
            else activateRefresh(!refresh)
        },
        edit: (data: { name: string, display: string, style: { key: string; value: string; }[], hover: { key: string; value: string; }[] }, index: number) => {
            let Class = { name: data.name, display: data.display, style: data.style, hover: data.hover }
            customClassList.splice(index, 1, Class)
            activateRefresh(!refresh)
        }
    }

    const convertToSplit = (string: string) => {
        let splited = string.split("-")
        splited[0] = `${parseInt(splited[0]) - 1}`
        return splited
    }

    const changeJSON = {
        create: (target: string, type: string) => {
            let newBlock = templates[type]
            let parsedComponent = JSON.parse(newBlock)
            let Target = convertToSplit(target)
            let location = JSONLocationSearch(Target, JSONView)
            location.splice(Target[Target.length - 1], 0, parsedComponent)
            if (selected !== undefined) setSelected(undefined)
            else activateRefresh(!refresh)
        },
        delete: (target: string) => {
            let Target = convertToSplit(target)
            let location = JSONLocationSearch(Target, JSONView)
            location.splice(Target[Target.length - 1], 1)
            if (selected !== undefined) setSelected(undefined)
            else activateRefresh(!refresh)
        },
        edit: (target: string, data: { data: any }) => {
            let Target = convertToSplit(target)
            let location = JSONLocationSearch(Target, JSONView)
            Object.assign(location[Target[Target.length - 1]].data, data.data)
        }
    }

    function moveComponent(e: React.DragEvent<HTMLDivElement>) {
        setDragging("undefined");
        let source = e.dataTransfer.getData("Text");
        let div = e.target as HTMLDivElement
        if(!div) return
        let target = div.id.slice(0, -1)
        console.log("src:", source, "trg:", target)
        if (source === "" || source === target) return
        if (ComponentsTree.includes(source)) return changeJSON.create(target, source)
        let removedComponent;

        let Source = convertToSplit(source)
        let Target = convertToSplit(target)

        let sourceObj = JSONLocationSearch(Source, JSONView)
        removedComponent = sourceObj.splice(Source[Source.length - 1], 1, "placeholder")

        let targetObj = JSONLocationSearch(Target, JSONView)
        targetObj.splice(Target[Target.length - 1], 0, removedComponent[0])

        if (selected !== undefined) setSelected(undefined)
        else activateRefresh(!refresh)
    }

    const zoomAction = {
        inc: () => { if (AppCont.current && zoom < 1.9) { zoom += 0.1; AppCont.current.lastChild!.style.transform = `scale(${zoom})` } },
        dec: () => { if (AppCont.current && zoom > 0.3) { zoom -= 0.1; AppCont.current.lastChild!.style.transform = `scale(${zoom})` } }
    }

    function addDragEnterStyle(array: HTMLCollection) {
        if (array.length === 0
            || array[0]?.classList?.contains("drop-place-adaptable")
            || (array[0].id === undefined && array[0].className !== "drop-place")) return
        for (let i = 0; i < array.length; i++) {
            array[i].className = "drop-place-adaptable"
            i++
        }
    }

    const DragEnter = (e: React.MouseEvent) => {
        let target = e.target as HTMLDivElement
        if (!target || target.id === undefined
            || target.id === ""
            || document.body.getAttribute("dragging")! === undefined)
            return
        let [dragging, id] = document.body.getAttribute("dragging")!.split(".");
        if (!checkMoveToChild(id, target.id)) return
        let level = target.id.split("-")
        let key = level[0] === "0" ? "0" : level.length
        if (!notAllowedMoves[key]?.includes(dragging)) addDragEnterStyle(target.children);
    }

    function DragEndDrop() {
        if (document.body.getAttribute("dragging")! === undefined) return
        setDragging("undefined");
        activateRefresh(!refresh)
    }
    //editor site/comp variables
    ///editors

    // const handlerSetMainFont = (val) => {
    //     if(!AppCont.current) return
    //     AppCont.current.lastChild.firstChild.innerHTML = AppCont.current.lastChild.firstChild.innerHTML.replace(mainFont, val)
    //     setMainFont(val)
    // }

    const activatePopEditor = (e) => {
        PopEditorRef["selected"] = e.target
        PopEditorRef?.current?.click()
    }

    const confirmPopEditor = (resultHTML: string, entry: string) => {
        if (entry === "Text") PopEditorRef.selected.innerHTML = resultHTML
        else PopEditorRef.selected.firstChild.src = resultHTML
        let key = convertToSplit(PopEditorRef.selected.id)
        let location = JSONLocationSearch(key, JSONView)
        //key
        const keys: { [key: string]: string } = { "Text": "text", "Image": "src", "ProductsGrid": "src" }
        //change json
        location[key[key.length - 1]].data[keys[entry]] = resultHTML
        if (AppCont.current) AppCont.current.addEventListener("mouseenter", (e) => { activateDragPage(e, AppCont, zoomAction) }, { once: true })
        if (EditorRef.current && EditorRef.current.firstChild) EditorRef.current.firstChild.click()
    }

    const Resize = (id: string, changes: { width: number, height: number }) => {
        let Target = convertToSplit(id)
        let location = JSONLocationSearch(Target, JSONView)
        let data = {
            ...location[Target[Target.length - 1]].data,
            style: {
                ...location[Target[Target.length - 1]].data.style,
                width: changes.width,
                height: changes.height
            }
        }
        Object.assign(location[Target[Target.length - 1]].data, data)
        EditorRef.selected.click()
    }

    const parseStylesArray = (array: any[]) => {
        let styleString = "";
        let cssNames = []
        for (const el of array) {
            cssNames.push(el.name)
            styleString += `.${el.name}{`;
            for (const prop of el.style) {
                styleString += `${prop.key}:${prop.value};`;
            }
            styleString += "}";

            let state = "hover"
            if (el[state].length > 0) {
                styleString += `.${el.name}:${state}{`;
                for (const prop of el[state]) {
                    styleString += `${prop.key}:${prop.value};`;
                }
                styleString += "}";
            }
        }
        if (mainFont === undefined || !Object.keys(customFontList).includes(mainFont)) setMainFont(Object.keys(customFontList)[0])
        return [<style>
            {`.edit-screen *{font-family:${mainFont}}`}
            {styleString}
        </style>, cssNames]
    }

    let [css, cssNames] = parseStylesArray(customClassList)

    React.useEffect(() => {
        if (AppCont.current)
            AppCont.current.addEventListener("mouseenter", (e) => { activateDragPage(e, AppCont, zoomAction) },
                { once: true })
    }, []);


    return <div className="screen d-flex-col" >
        <GlobalFunctions.Provider value={{
            moveComponent: moveComponent,
            JSONLocationSearch: (id: string) => { return JSONLocationSearch(id, JSONView) },//
            changeJSON: changeJSON,//
            activatePopEditor: activatePopEditor,
            selectComponent: handleSetSelected,
            selectClass: setSelectedClass,
            cssNames: cssNames,
            selectedClass: selectedClass ? { ...customClassList[selectedClass], index: selectedClass } : undefined,//
            changeCss: editClassList,//
            mainFont: { "font": mainFont, setMainFont: () => { } }
        }}>
            <NavBar JSONObj={JSONView} />
            <div className="d-flex">
                <SideBar
                    mode={"editor"}
                    JSONTree={JSONView}
                    selected={selected}
                    createComponent={() => { Container["page"] = "Componentes"; Container.current.click() }}
                    fixedComponents={fixedComponents}
                    selectedFonts={customFontList}
                />
                <div className="app-cont" ref={AppCont}>
                    <ReSize EditorRef={EditorRef} AppCont={AppCont} Resize={Resize} />
                    <TrashCan deleteModule={(module: string) => { changeJSON.delete(module) }} />
                    <Zoom resolution={resolution} AppCont={AppCont} zoomAction={zoomAction} />
                    <PopEditor key={Math.random()} PopEditorRef={PopEditorRef} confirm={confirmPopEditor} />
                    <div
                        className="edit-screen"
                        style={{
                            transform: `scale(${zoom})`,
                            inset: 0,
                            width: resolution.x,
                            height: resolution.y
                        }}
                    >
                        {css}
                        <div id="0"
                            onDragStart={(e) => { setDragging(e.target.getAttribute("type") + "." + e.target.id) }}
                            onDragEnter={DragEnter}
                            onDragOver={(e) => { e.preventDefault() }}
                            onDrop={DragEndDrop}
                            onDragEnd={DragEndDrop}
                        >
                            {JSONView !== undefined &&
                                <ComponentsRender
                                    generatePlaces={AdminEditor}
                                    components={JSONView.content}
                                    fixed={AdminEditor ? fixedComponents : "false"}
                                />}
                        </div>
                    </div>
                </div>
                <EditorContainer
                    Container={Container}
                    EditorRef={EditorRef}
                    editor={selected}
                    Class={selectedClass}
                    setSelected={setSelected}
                    setSelectedClass={setSelectedClass}
                    selectedFonts={customFontList}
                />
            </div>
        </GlobalFunctions.Provider>
    </div>
}