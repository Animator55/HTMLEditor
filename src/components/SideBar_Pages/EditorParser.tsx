import { faCircleXmark, faTrash, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import JsxParser from "react-jsx-parser";
import * as OctagonalEditors from "../../RenderComponents/Editors"
import { GlobalFunctions } from "../../screens/AdminEditor";
import { moduleType } from "../../vite-env";

let EditorJSON: moduleType | undefined= undefined

export default function EditorParser({ editor, setSelected, selectedFonts, EditorRef }:
    { editor: moduleType| "New", setSelected: Function, selectedFonts: any, EditorRef: any}
) {
    const GlobalFunc = React.useContext(GlobalFunctions)

    const [refresh, activateRefresh] = React.useState(false)

    const RefUpdate = (target:string, name:string, val:any) => {
        const elementKeys = { text: "innerText" }
        if(!EditorJSON || !GlobalFunc) return  

        if (target === "style") {
            EditorRef["selected"]["style"][name] = val
            EditorJSON.data = { ...EditorJSON.data, style: { ...EditorJSON.data.style, [name]: val } }
            GlobalFunc.changeJSON.edit(EditorRef["selected"].id, EditorJSON)
        }
        else if (target === "className") EditorRef["selected"].className = EditorJSON.data["className"] = val
        else {
            EditorJSON.data.text = val as string
            EditorRef["selected"][elementKeys.text] = val
        }
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
                        onClick={() => { if(GlobalFunc)GlobalFunc.changeJSON.delete(EditorJSON?.key) }}
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
                submitProp: (target:string, name:string, val:any) => { RefUpdate(target, name, val) },
            }}
            renderInWrapper={false} components={{ OctagonalEditors }} key={Math.random()}
            jsx={`<OctagonalEditors.${EditorJSON?.type} 
                editor={editorProp} 
                fonts={fontArrayProp} 
                submit={submitProp}/>`}
        /> : null
    }

    function RefreshButton() {
        return <button className="d-none" onClick={() => {
            if (EditorRef === undefined || EditorRef["selected"]?.id === undefined) return
            if(!GlobalFunc) return  
            //convert
            let splited = EditorRef["selected"].id.split("-")
            splited[0] = splited[0] - 1
            //search
            let location = GlobalFunc.JSONLocationSearch(splited)
            //set
            EditorJSON = location[splited[splited.length - 1]]
            if(EditorJSON)EditorJSON["key"] = EditorRef["selected"].id
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