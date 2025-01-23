import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faCrop, faCropSimple, faBrush, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons'
import { GlobalFunctions } from "../screens/AdminEditor"
import { moduleType } from "../vite-env"


// let inputText = ["Text", "Logo", "SearchBar", "Image", "Módulo", ""]
// let moduleTypes = ["Text", "Logo", "SearchBar", "SocialProfiles", "Image", "Form", "Módulo", ""]
// let fontsArray = ["Arial","cursive", "emoji", "Verdana", "Brush Script MT", "Courier New", "Tahoma", "Trebuchet MS", "Times New Roman", "Georgia", "Garamond", "monospace"]


const languageDictionary: { [key: string]: { [key: string]: string } } = {
    "es": {
        "minWidth": "ancho mínimo",
        "width": "ancho",
        "minHeight": "altura mínima",
        "height": "altura",
        "background": "fondo",
        "color": "Color de Texto",
        "padding": "espaciado interno",
        "margin": "espaciado externo",
        "border": "borde",
        "borderStyle": "estilo del borde",
        "borderRadius": "redondeado de borde",
        "borderColor": "color de borde",
        "fontWeight": "grosor",
        "fontSize": "tamaño",
        "fontFamily": "fuente",
        "textDecoration": "decoracion"
    }
}

const cssKeyList = [
    "align-content",
    "align-items",
    "align-self",
    "animation",
    "animation-delay",
    "animation-direction",
    "animation-duration",
    "animation-fill-mode",
    "animation-iteration-count",
    "animation-name",
    "animation-play-state",
    "animation-timing-function",
    "background",
    "background-attachment",
    "background-clip",
    "background-color",
    "background-image",
    "background-origin",
    "background-position",
    "background-repeat",
    "background-size",
    "border",
    "border-bottom",
    "border-bottom-color",
    "border-bottom-left-radius",
    "border-bottom-right-radius",
    "border-bottom-style",
    "border-bottom-width",
    "border-collapse",
    "border-color",
    "border-left",
    "border-left-color",
    "border-left-style",
    "border-left-width",
    "border-radius",
    "border-right",
    "border-right-color",
    "border-right-style",
    "border-right-width",
    "border-style",
    "border-top",
    "border-top-color",
    "border-top-left-radius",
    "border-top-right-radius",
    "border-top-style",
    "border-top-width",
    "border-width",
    "bottom",
    "box-shadow",
    "box-sizing",
    "clear",
    "color",
    "column-count",
    "column-gap",
    "column-width",
    "content",
    "cursor",
    "display",
    "flex-basis",
    "flex-direction",
    "flex-flow",
    "flex-grow",
    "flex-shrink",
    "flex-wrap",
    "float",
    "font-family",
    "font-size",
    "font-style",
    "font-variant",
    "font-weight",
    "font",
    "gap",
    "grid",
    "grid-area",
    "grid-auto-columns",
    "grid-auto-flow",
    "grid-auto-rows",
    "grid-column-end",
    "grid-column-gap",
    "grid-column-start",
    "grid-column",
    "grid-gap",
    "grid-row-end",
    "grid-row-gap",
    "grid-row-start",
    "grid-row",
    "grid-template-areas",
    "grid-template-columns",
    "grid-template-rows",
    "grid-template",
    "height",
    "inset",
    "justify-content",
    "left",
    "letter-spacing",
    "line-height",
    "list-style-image",
    "list-style-position",
    "list-style-type",
    "list-style",
    "margin",
    "margin-bottom",
    "margin-left",
    "margin-right",
    "margin-top",
    "max-height",
    "max-width",
    "min-height",
    "min-width",
    "mix-blend-mode",
    "opacity",
    "order",
    "outline-color",
    "outline-style",
    "outline-width",
    "outline",
    "overflow-wrap",
    "overflow",
    "overflow-x",
    "overflow-y",
    "padding",
    "padding-bottom",
    "padding-left",
    "padding-right",
    "padding-top",
    "pointer-events",
    "position",
    "resize",
    "right",
    "text-align",
    "text-decoration",
    "text-indent",
    "text-overflow",
    "text-shadow",
    "text-transform",
    "top",
    "transform",
    "transform-origin",
    "transition",
    "transition-delay",
    "transition-duration",
    "transition-property",
    "transition-timing-function",
    "vertical-align",
    "white-space",
    "width",
    "will-change",
    "word-break",
    "word-spacing",
    "z-index"
]

// function Animations({animations, editHandle}){
//     const [animeSpan, setSpan] = React.useState(false)

//     return (<>
//         <button 
//             className="d-flex-col align-center" 
//             onClick={()=>{setSpan(!animeSpan)}}
//         > 
//             <h3 className="margin-0"><FontAwesomeIcon icon={faClapperboard} className="margin-right-5px"/>Animaciones</h3>
//             <FontAwesomeIcon icon={!animeSpan ? faCaretUp : faCaretDown}/>
//         </button>
//         <div style={animeSpan ? {margin: "10px 0", height: "auto"} : {margin: "0", height: 0, overflow: "hidden"}}>
//             <div>
//                 <input 
//                     onBlur={(e)=>{editHandle("className", e.target.name, e.target.value)}}
//                     onKeyDown={(e)=>{if(e.key === "Enter"){editHandle("className", e.target.name, e.target.value)}}}
//                     name="className" 
//                     defaultValue={animations}
//                 />
//             </div>
//         </div>
//     </>)
// }

function ClassSpan({ classes, editHandle }: { classes: string, editHandle: Function }) {
    const Context = React.useContext(GlobalFunctions)
    let classList = Context ? Context.cssNames : []
    let classesArray = classes === "" ? [] : classes.split(" ")

    const changeSelected = {
        addEntry: (e: React.FocusEvent | React.KeyboardEvent) => {
            e.preventDefault()
            let target = e.target as HTMLDivElement
            if (target.innerText === "") return
            classesArray.push(target.innerText)
            let newClasses = classesArray.join(" ")
            target.innerText = ""
            editHandle("className", "className", newClasses)
        },
        delete: (index: number) => {
            classesArray.splice(index, 1)
            let newClasses = classesArray.join(" ")
            editHandle("className", "className", newClasses)
        }
    }
    const setAutoComplete = (e: React.KeyboardEvent) => {
        let target = e.target as HTMLDivElement
        if (!target || target.innerText === "") return;
        let value = target.innerText
        let autocomplete = ""
        for (let i = 0; i < classList.length; i++) {
            let key = classList[i]
            key = key.slice(0, value.length)
            if (key === value) {
                autocomplete = classList[i] === undefined ? "" : classList[i];
                break
            }
        }
        target.dataset.autocomplete = autocomplete
    }

    const checkClassCreation = (name: string) => {
        if (!Context) return
        if (classList.indexOf(name) !== -1) Context.selectClass(classList.indexOf(name))
        else Context.changeCss.create(name)
    }

    return (<>
        <div>
            {classesArray.length > 0 ? classesArray.map((classItem, i) => {
                return (<section key={Math.random()} className="tag-contain">
                    <div
                        className="tags"
                        onClick={() => { checkClassCreation(classItem) }}
                    >
                        <div className="margin-right-5px">{classItem}</div>
                        <FontAwesomeIcon icon={faPen} />
                    </div>
                    <FontAwesomeIcon icon={faXmark} onClick={() => { changeSelected.delete(i) }} />
                </section>)
            }) : null}
            <div
                className="class-input"
                contentEditable suppressContentEditableWarning
                data-autocomplete=""
                data-placeholder="Name"
                onKeyUp={(e) => {
                    if (e.key === "Tab" || e.key === "Enter") changeSelected.addEntry(e)
                    setAutoComplete(e)
                }}
                onKeyDown={(e) => {
                    if (e.key === "Tab" || e.key === "Enter") {
                        e.preventDefault()
                        let target = e.target as HTMLDivElement
                        if (!target) return
                        target.innerText = target.dataset.autocomplete === "" ?
                            target.innerText : target.dataset.autocomplete ? target.dataset.autocomplete : "";
                    }
                }}
                onBlur={changeSelected.addEntry}
            />
        </div>
    </>)
}

function Styles({ stylesProp, editHandle }: { stylesProp: { [key: string]: string }, editHandle: Function }) {
    const [stylePage, setPage] = React.useState("size")
    const [refresh, activateRefresh] = React.useState(false)

    let styles: { [key: string]: { [key: string]: string } } = {
        size: {
            width: stylesProp.width,
            height: stylesProp.height,
            minWidth: stylesProp.minWidth,
            minHeight: stylesProp.minHeight,
        },
        color: {
            background: stylesProp.background,
            color: stylesProp.color,
            borderColor: stylesProp.borderColor,
        },
        border: {
            border: stylesProp.border,
            borderStyle: stylesProp.borderStyle,
            borderRadius: stylesProp.borderRadius,
        },
        position: {
            margin: stylesProp.margin,
            padding: stylesProp.padding,
        },
    }

    let inputTypesColor = ["color", "background", "backgroundColor", "borderColor"]
    return (<div>
        <div className="d-flex">
            <button
                className={stylePage === "size" ? "btn-active" : ""}
                onClick={() => { setPage("size") }}>
                <FontAwesomeIcon icon={faCrop} />
            </button>
            <button
                className={stylePage === "color" ? "btn-active" : ""}
                onClick={() => { setPage("color") }}>
                <FontAwesomeIcon icon={faBrush} />
            </button>
            <button
                className={stylePage === "position" ? "btn-active" : ""}
                onClick={() => { setPage("position") }}>
                <FontAwesomeIcon icon={faCropSimple} />
            </button>
            <button
                className={stylePage === "border" ? "btn-active" : ""}
                onClick={() => { setPage("border") }}>
                <FontAwesomeIcon icon={faPenToSquare} />
            </button>
        </div>
        <div>
            {Object.keys(styles[stylePage]).map(key => {
                let val: number | string = styles[stylePage][key]
                let unit: string[] = []
                if (!inputTypesColor.includes(key)) {
                    let match = styles[stylePage][key].match(/[a-zA-Z%]+/g)
                    let valMatch = styles[stylePage][key].match(/\d+/g)
                    val = parseInt((valMatch === null ? "0" : valMatch)[0]);
                    unit = match === null ? ["px"] : match
                }
                return <div
                    className="d-flex"
                    key={Math.random()}
                >
                    <div style={{ margin: "5px 0" }}>{languageDictionary['es'][key]}</div>
                    {key !== "borderStyle" ?
                        <>
                            <input
                                style={{ width: "4rem", margin: "5px 0 5px auto" }}
                                type={inputTypesColor.includes(key) ? "color" : "number"}
                                onBlur={(e) => { editHandle("style", e.target.name, (e.target.value).toString() + (unit === undefined ? "" : unit)); activateRefresh(!refresh) }}
                                onKeyDown={(e) => { 
                                    let target =  e.target as HTMLInputElement
                                    if (target && e.key === "Enter") { editHandle("style", target.name, (target.value).toString() + (unit === undefined ? "" : unit)); activateRefresh(!refresh) } }}
                                defaultValue={val}
                                name={`${key}`}
                            />
                            {!inputTypesColor.includes(key) ?
                                <div className="d-flex" style={{ alignItems: "center" }}>
                                    <select
                                        onChange={async (e) => { await editHandle("style", `${key}`, (val).toString() + e.target.value); activateRefresh(!refresh) }}
                                        defaultValue={unit[0]}
                                    >
                                        <option value="cm">cm</option>
                                        <option value="px">px</option>
                                        <option value="%">%</option>
                                        <option value="mm">mm</option>
                                        <option value="in">in</option>
                                        <option value="pc">pc</option>
                                        <option value="pt">pt</option>
                                        <option value="ch">ch</option>
                                        <option value="em">em</option>
                                        <option value="rem">rem</option>
                                        <option value="vh">vh</option>
                                        <option value="vw">vw</option>
                                        <option value="vmin">vmin</option>
                                        <option value="vmax">vmax</option>
                                        <option value="">none</option>
                                    </select>
                                </div>
                                : null}
                        </>
                        :
                        <select
                            style={{ marginLeft: "auto" }}
                            onBlur={async (e) => { await editHandle("style", key, e.target.value); activateRefresh(!refresh) }}
                            defaultValue={unit[0]}
                        >
                            <option value="solid">Sólido</option>
                            <option value="double">Doble</option>
                            <option value="dashed">Punteado</option>
                            <option value="groove">Ranurado</option>
                            <option value="none">Ninguno</option>
                        </select>
                    }

                </div>
            })}
        </div>
    </div>)
}

function Chips({ chipsList, editHandle }: { chipsList: string[], editHandle: Function }) {
    const [refresh, activateRefresh] = React.useState(false)

    let localList = chipsList

    return (<div>
        <div className="d-flex">
            {localList.length > 0 ? localList.map((chip) => {
                return <div className="tags" key={Math.random()} onClick={() => { editHandle("tags", chip); activateRefresh(!refresh) }}><div className="margin-right-5px">{chip}</div><FontAwesomeIcon icon={faXmark} /></div>
            }) : null}
        </div>
        <input
            placeholder="Nueva tags"
            onBlur={(e) => { if (e.target.value !== "") { editHandle("tags", undefined, e.target.value); e.target.value = ""; activateRefresh(!refresh) } }}
            onKeyDown={(e) => { 
                let target = e.target as HTMLInputElement
                if (target && target.value !== "" && e.key === "Enter") { editHandle("tags", undefined, target.value); target.value = ""; activateRefresh(!refresh) } }}
        />
    </div>)
}

export function Classe({ classe }: { classe: any }) {
    const GlobalFunc = React.useContext(GlobalFunctions)
    const css = GlobalFunc !== null ? GlobalFunc : classe
    const [selected, setSelected] = React.useState(css.selectedClass)
    const [page, setPage] = React.useState("style")

    React.useEffect(() => { setSelected(css.selectedClass) }, [css.selectedClass.index])
    React.useEffect(() => { if (selected !== css.selectedClass) { css.changeCss.edit(selected, css.selectedClass.index) } }, [selected])

    const changeClassName = (value: string) => {
        let newValue = value.replace(/ +/g, "-")
        return newValue
    }

    const editGeneral = (key: string, change: any) => {
        if (selected[key] === change) return
        setSelected({ ...selected, [key]: change })
    }

    const changeSelected = {
        addEntry: (e: React.FocusEvent | React.KeyboardEvent) => {
            e.preventDefault()
            let target = e.target as HTMLDivElement
            if (!target) return
            let keyInput = target.parentElement!.children[0] as HTMLDivElement
            let valueInput = target.parentElement!.children[1] as HTMLInputElement
            if (keyInput.innerText === "" || valueInput.value === "") return
            editGeneral(page, [...selected[page], { "key": keyInput.innerText, "value": valueInput.value }])
        },
        editEntry: (type: string, newValue: any, index: number) => {
            if (newValue === "" && type === "key")
                editGeneral(page, [...selected[page].filter((entry: any, i: number) => { if (i !== index) return entry })])
            else
                editGeneral(page, Object.values({
                    ...selected[page],
                    [index]: { ...selected[page][index], [type]: newValue }
                }))
        }
    }

    const setAutoComplete = (e: React.KeyboardEvent) => {
        let target = e.target as HTMLDivElement
        if (!target || target.innerText === "") return;
        let value = target.innerText
        let autocomplete = ""
        for (let i = 0; i < cssKeyList.length; i++) {
            let key = cssKeyList[i]
            key = key.slice(0, value.length)
            if (key === value) {
                autocomplete = cssKeyList[i] === undefined ? "" : cssKeyList[i];
                break
            }
        }
        target.dataset.autocomplete = autocomplete
    }

    const switchDisplay = (e: React.MouseEvent) => {
        let target = e.target as HTMLDivElement
        if (!target) return
        const states = ["Mobile", "Desktop", "All"]
        let index = states.indexOf(target.innerText) - 1 < 0 ? 2 : states.indexOf(target.innerText) - 1
        editGeneral("display", states[index])
    }
    ///components

    function EditorTopBar() {
        const pages = ["style", "hover"]
        return <section>
            <div className="d-flex align-center" style={{ justifyContent: "space-between" }}>
                <input
                    className="margin-0"
                    onKeyUp={(e) => { 
                        let target = e.target as HTMLInputElement
                        if (target && e.key === "Enter") editGeneral("name", changeClassName(target.value)) }}
                    onBlur={(e) => { editGeneral("name", changeClassName(e.target.value)) }}
                    defaultValue={selected?.name}
                />
                <button className="switch-display" onClick={switchDisplay}>{selected.display}</button>
            </div>
            <nav>
                {pages.map(item => {
                    return <button key={Math.random()} onClick={() => { setPage(item) }} className={page === item ? "selected-page upper-first" : "upper-first"}>{item}</button>
                })}
            </nav>
        </section>
    }

    function StyleList() {
        return selected[page].map((entry: any, i: number) => {
            return (<section className="style-chip" key={Math.random()}>
                <div
                    contentEditable suppressContentEditableWarning
                    data-autocomplete=""
                    data-placeholder="key"
                    onKeyUp={(e) => {
                        let target = e.target as HTMLDivElement
                        if (!target) return
                        if (e.key === "Enter") changeSelected.editEntry("key", target.innerText, i)
                        setAutoComplete(e)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") e.preventDefault()
                        if (e.key === "Tab") {
                            let target = e.target as HTMLDivElement
                            if (!target) return
                            target.innerText = target.dataset.autocomplete === "" ?
                                target.innerText : target.dataset.autocomplete ? target.dataset.autocomplete : "";
                        }
                    }}
                    style={!cssKeyList.includes(entry.key) ? { textDecoration: "line-through" } : {}}
                    onBlur={(e) => { changeSelected.editEntry("key", e.target.innerText, i) }}
                >{entry.key}</div>
                <input
                    defaultValue={entry.value}
                    onBlur={(e) => { changeSelected.editEntry("value", e.target.value, i) }}
                    onKeyDown={(e) => {
                        let target = e.target as HTMLInputElement
                        if (target && e.key === "Enter") changeSelected.editEntry("value", target.value, i)
                    }}
                />
            </section>)
        })
    }

    function AddEntryZone() {
        return <section className="style-chip">
            <div
                contentEditable suppressContentEditableWarning
                data-autocomplete=""
                data-placeholder="key"
                onKeyUp={(e) => {
                    if (e.key === "Enter") changeSelected.addEntry(e)
                    setAutoComplete(e)
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") e.preventDefault()
                    if (e.key === "Tab") {
                        let target = e.target as HTMLDivElement
                        if (!target) return
                        target.innerText = target.dataset.autocomplete === "" ?
                            target.innerText : target.dataset.autocomplete ? target.dataset.autocomplete : "";
                    }
                }}
                onBlur={changeSelected.addEntry}
            />
            <input
                placeholder="value"
                onKeyDown={(e) => { if (e.key === "Enter") changeSelected.addEntry(e) }}
                onBlur={changeSelected.addEntry}
            />
        </section>
    }

    return <div className="editor-form">
        <EditorTopBar />
        <section className="page">
            {selected[page] !== undefined ? <StyleList /> : null}
            <AddEntryZone />
        </section>
        {/* <button className="confirm-btn" style={{marginTop: "auto"}} onClick={()=>{submit(selected)}}><FontAwesomeIcon icon={faCheck} size="xl"/> Confirmar</button> */}
    </div>
}

export function EditorForm({ editor, submit }: { editor: moduleType, submit: Function }) {
    const [refresh, activateRefresh] = React.useState(false)
    const [editorLocal, setEditorLocal] = React.useState(
        {
            data: {
                className: editor.data.className,
                style: Object.assign({
                    width: "",
                    height: "",
                    minWidth: "",
                    minHeight: "",
                    background: "",
                    color: "",
                    padding: "",
                    margin: "",
                    border: "",
                    borderStyle: "none",
                    borderColor: "",
                    borderRadius: "",
                }, editor.data.style),
                text: editor.data.text,
            },
            key: editor.key,
            type: editor.type
        }
    )
    const [editorPage, setEditorPage] = React.useState("Styles")
    const pages: { [key: string]: any } = {
        "Classes": <ClassSpan classes={editorLocal.data.className} editHandle={editHandle} />,
        "Styles": <Styles stylesProp={editorLocal.data.style} editHandle={editHandle} />
    }

    function editHandle(target: string, name: string, val: string) {
        console.log(target, name, val)
        setEditorLocal((prev) => {
            switch (target) {
                case "style":
                    prev.data[target][name] = val
                    break
                case "className":
                case "text":
                    prev.data[target] = val
                    break
            }
            return prev
        })
        if (target === "className") { activateRefresh(!refresh) }
        submit(target, name, val)
    }

    return <div className="editor-form">
        <nav>
            {Object.keys(pages).map(page => {
                return <button key={Math.random()} onClick={() => { setEditorPage(page) }} className={editorPage === page ? "selected-page" : ""}>{page}</button>
            })}
        </nav>
        <div className="page">
            {pages[editorPage]}
        </div>
    </div>
}

export function EditorChipsForm({ editor, submit }: { editor: moduleType, submit: Function }) {
    const [refresh, activateRefresh] = React.useState(false)
    const [editorLocal, setEditorLocal] = React.useState(
        {
            data: {
                className: editor.data.className,
                style: Object.assign({
                    width: "",
                    height: "",
                    minWidth: "",
                    minHeight: "",
                    background: "",
                    color: "",
                    padding: "",
                    margin: "",
                    border: "",
                    borderStyle: "none",
                    borderColor: "",
                    borderRadius: "",
                }, editor.data.style),
                text: editor.data.text,
                tags: editor.data.tags ? editor.data.tags : [],
            },
            key: editor.key,
            type: editor.type
        }
    )
    const [editorPage, setEditorPage] = React.useState("Styles")

    function editHandle(target: string, name: string, val: string) {
        console.log(target, name, val)
        setEditorLocal((prev) => {
            switch (target) {
                case "style":
                    prev.data[target][name] = val
                    break
                case "tags":
                    if (name === undefined) { prev.data[target][prev.data[target].length] = val }
                    else { prev.data[target].splice(prev.data[target].indexOf(name), 1) }
                    break
                case "className":
                case "text":
                    prev.data[target] = val
                    break
            }
            return prev
        })
        if (target === "className") { activateRefresh(!refresh) }
        submit(target, name, val)
    }

    const pages: { [key: string]: any } = {
        "Classes": <ClassSpan classes={editorLocal.data.className} editHandle={editHandle} />,
        "Chips": <Chips chipsList={editorLocal.data.tags} editHandle={editHandle} />,
        "Styles": <Styles stylesProp={editorLocal.data.style} editHandle={editHandle} />
    }
    return (
        <div className="editor-form">
            <nav>
                {Object.keys(pages).map(page => {
                    return <button key={Math.random()} onClick={() => { setEditorPage(page) }} className={editorPage === page ? "selected-page" : ""}>{page}</button>
                })}
            </nav>
            <div className="page">
                {pages[editorPage]}
            </div>
        </div>)

}

export function EditorTextForm({ editor, submit }: { editor: moduleType, submit: Function }) {
    const [refresh, activateRefresh] = React.useState(false)
    const [editorLocal, setEditorLocal] = React.useState(
        {
            data: {
                className: editor.data.className,
                style: Object.assign({
                    width: "",
                    height: "",
                    minWidth: "",
                    minHeight: "",
                    background: "",
                    color: "",
                    padding: "",
                    margin: "",
                    border: "",
                    borderStyle: "none",
                    borderColor: "",
                    borderRadius: "",
                    fontFamily: "",
                    fontWeight: "",
                    fontSize: "",
                    textDecoration: "",
                }, editor.data.style),
                text: editor.data.text,
            },
            key: editor.key,
            type: editor.type
        }
    )
    const [editorPage, setEditorPage] = React.useState("Styles")

    function editHandle(target: string, name: string, val: string) {
        console.log(target, name, val)
        setEditorLocal((prev) => {
            switch (target) {
                case "style":
                    prev.data[target][name] = val
                    break
                case "className":
                case "text":
                    prev.data[target] = val
                    break
            }
            return prev
        })
        if (target === "className") { activateRefresh(!refresh) }
        submit(target, name, val)
    }

    const pages : { [key: string]: any }= {
        "Classes": <ClassSpan classes={editorLocal.data.className} editHandle={editHandle} />,
        "Styles": <Styles stylesProp={editorLocal.data.style} editHandle={editHandle} />
    }
    return (
        <div className="editor-form">
            <nav>
                {Object.keys(pages).map(page => {
                    return <button key={Math.random()} onClick={() => { setEditorPage(page) }} className={editorPage === page ? "selected-page" : ""}>{page}</button>
                })}
            </nav>
            <div className="page">
                {pages[editorPage]}
            </div>
        </div>)

}

/////////

export function Text (props: {editor: moduleType, submit: Function}) {
        return <EditorTextForm editor={props.editor} submit={props.submit} />
}
export function Image (props: {editor: moduleType, submit: Function}) {
        return <EditorForm editor={props.editor} submit={props.submit} />
}
export function Container (props: {editor: moduleType, submit: Function}) {
        return <EditorForm editor={props.editor} submit={props.submit} />
}