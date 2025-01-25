import { faCircleXmark, faTrash, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { GlobalFunctions } from "../../screens/AdminEditor";
import { moduleType } from "../../vite-env";
import { Container, Image, Text } from "../../RenderComponents/Editors";

let EditorJSON: moduleType | undefined = undefined

export default function EditorParser({ editor, setSelected, EditorRef }:
    { editor: moduleType | "New", setSelected: Function, EditorRef: any }
) {
    const GlobalFunc = React.useContext(GlobalFunctions)

    const [refresh, activateRefresh] = React.useState(false)

    const RefUpdate = (target: string, name: string, val: any) => {
        if (!EditorJSON || !GlobalFunc || !EditorRef.current || !EditorRef.current.dataset.selected) return
        let key = EditorRef.current.dataset.selected
        let elementRendered = document.querySelector(`.edit-screen [id="${key}"]`) as HTMLDivElement

        if (target === "style") {
            (elementRendered.style as any)[name] = val
            EditorJSON.data = { ...EditorJSON.data, style: { ...EditorJSON.data.style, [name]: val } }
            GlobalFunc.changeJSON.edit(elementRendered.id, EditorJSON)
        }
        else if (target === "className") elementRendered.className = EditorJSON.data["className"] = val
        else {
            EditorJSON.data.text = val as string
            elementRendered.innerText = val
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
                        onClick={() => { if (GlobalFunc) GlobalFunc.changeJSON.delete(EditorJSON?.key) }}
                    ><FontAwesomeIcon icon={faTrash} size="xl" /></button>
                </>
            }
            <button onClick={() => { setSelected(undefined, false) }}><FontAwesomeIcon icon={faCircleXmark} size="xl" /></button>
        </div>
    }

    const componentSelector: { [key: string]: any } = {
        "Image": (props: {editor: moduleType, submit: Function}) => { return <Image {...props} /> },
        "Container": (props: {editor: moduleType, submit: Function}) => { return <Container {...props} /> },
        "Text": (props: {editor: moduleType, submit: Function}) => { return <Text {...props} /> },
    }

    function EditorForm() {
        return (EditorJSON !== undefined && EditorJSON.type) && componentSelector[EditorJSON?.type]({
            editor: editor === "New" ? editor : EditorJSON,
            submit: (target: string, name: string, val: any) => { RefUpdate(target, name, val) },
        })
    }

    function RefreshButton() {
        return <button className="d-none" onClick={() => {
            if (!EditorRef.current || !EditorRef.current.dataset.selected) return
            if (!GlobalFunc) return
            //convert
            let splited = EditorRef.current.dataset.selected.split("-")
            splited[0] = splited[0] - 1
            //search
            let location = GlobalFunc.JSONLocationSearch(splited)
            //set
            EditorJSON = location[splited[splited.length - 1]]
            if (EditorJSON) EditorJSON["key"] = EditorRef.current.dataset.selected
            activateRefresh(!refresh)
        }}></button>
    }

    const Alert = () => {
        return <section className="editor-warning">
            <FontAwesomeIcon icon={faWarning} />
            <p>No hay componente seleccionado.</p>
        </section>
    }

    if (EditorRef.current && EditorRef.current.dataset.selected === "undefined") EditorJSON = undefined
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