import { faCircleXmark, faEye, faTrash, faWarning, faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import JsxParser from "react-jsx-parser";
import * as OctagonalEditors from "../../RenderComponents/Editors"
import { GlobalFunctions } from "../../screens/AdminEditor";

let EditorJSON

export default function EditorParser({ editor, setSelected, selectedFonts, EditorRef, DNone }) {
    const GlobalFunc = React.useContext(GlobalFunctions)

    const [refresh, activateRefresh] = React.useState(false)

    const RefUpdate = (target, name, val) => {
        const elementKeys = { text: "innerText" }

        if (target === "style") {
            EditorRef["selected"]["style"][name] = val
            EditorJSON.data = { ...EditorJSON.data, style: { ...EditorJSON.data.style, [name]: val } }
            GlobalFunc.changeJSON.edit(EditorRef["selected"].id, EditorJSON)
        }
        else if (target === "className") EditorRef["selected"].className = EditorJSON.data["className"] = val
        else EditorJSON.data[target] = EditorRef["selected"][elementKeys[target]] = val
    }

    function EditorTopBar() {
        return <div className="d-flex margin-5px" id="dnd">
            <h4 className="margin-0 margin-right-auto text-elipsis" id="dnd">
                {editor !== "New" ? EditorJSON?.type + "(" + EditorJSON?.key + ")" : null}
            </h4>
            {editor === "New" ?
                null
                :
                <>
                    <button
                        onClick={() => { GlobalFunc.changeJSON.delete(EditorJSON?.key, EditorJSON?.index) }}
                    ><FontAwesomeIcon icon={faTrash} size="xl" /></button>
                </>
            }
            <button onClick={() => { setSelected(undefined, false) }}><FontAwesomeIcon icon={faCircleXmark} size="xl" /></button>
        </div>
    }

    function EditorForm() {
        return editor === "New" || EditorJSON !== undefined ? <JsxParser
            bindings={{
                editorProp: editor === "New" ? editor : EditorJSON,
                fontArrayProp: selectedFonts,
                submitProp: (target, name, val) => { RefUpdate(target, name, val) },
            }}
            renderInWrapper={false} components={{ OctagonalEditors }} key={Math.random()}
            jsx={`<OctagonalEditors.${editor?.key === "New" ? editor?.key : EditorJSON?.type} 
                editor={editorProp} 
                fonts={fontArrayProp} 
                submit={submitProp}/>`}
        /> : null
    }

    function RefreshButton() {
        return <button className="d-none" onClick={() => {
            if (EditorRef === undefined || EditorRef["selected"]?.id === undefined) return
            //convert
            let splited = EditorRef["selected"].id.split("-")
            splited[0] = splited[0] - 1
            //search
            let location = GlobalFunc.JSONLocationSearch(splited)
            //set
            EditorJSON = location[splited[splited.length - 1]]
            EditorJSON["key"] = EditorRef["selected"].id
            activateRefresh(!refresh)
        }}></button>
    }

    const Alert = () => {
        return <section className="editor-warning">
            <FontAwesomeIcon icon={faWarning} />
            <p>No hay componente seleccionado.</p>
        </section>
    }

    if (EditorRef["selected"] === undefined) EditorJSON = undefined
    return <>
        {EditorJSON === undefined && <Alert />}
        <div
            ref={EditorRef}
            className={EditorJSON !== undefined ? "component-editor" : "component-editor d-none"}
        >
            <RefreshButton />
            <EditorTopBar />
            <EditorForm />
        </div>
    </>
}