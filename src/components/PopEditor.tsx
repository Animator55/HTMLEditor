import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react"
// import 'react-quill/dist/quill.snow.css'
// import ReactQuill from "react-quill";
// import { ImageDropZone } from "./ImageInput";

// const modules = {
//     toolbar: [
//         [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//         [{ 'font': [] }],
//         [{ size: [] }],
//         ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//         [
//             { list: 'ordered' },
//             { list: 'bullet' },
//             { indent: '-1' },
//             { indent: '+1' },
//         ],
//         ['link'],
//         ['clean'],
//         [{ 'color': [] }, { 'background': [] }],    
//         [{ 'align': [] }],
//     ],
//     history: {
//       delay: 2000,
//       maxStack: 10,
//       userOnly: true
//     }
// }
export default function PopEditor({ PopEditorRef, confirm }: { PopEditorRef: any, confirm: Function }) {
    let Module = "Image"
    // PopEditorRef.selected !== undefined ? PopEditorRef.selected.title.split(" (")[0] : undefined 

    const [editorState, setEditorState] = React.useState<string>("")

    const Editor: { [key: string]: any } = {
        // "Text" : <ReactQuill
        //     value={editorState} 
        //     onChange={setEditorState}
        //     theme="snow" 
        //     modules={modules}
        // />,
        "Image": <section>
            <div className="image-render" style={{ maxHeight: "20rem", minHeight: "10rem" }} dangerouslySetInnerHTML={{ __html: '<img src="' + editorState + '"></img>' }}></div>
        </section>
    }
    const toggleOpen = () => {
        let isVisible = !PopEditorRef.current.classList.contains("d-none")
        PopEditorRef.current.classList.toggle("d-none")
        if (isVisible) {
            confirm(editorState, Module)
        }
        else setEditorState((prev:string) => {
            let elementRendered = document.querySelector(`.edit-screen [id="${PopEditorRef.current.dataset.selected}"]`) as HTMLDivElement
            if (!elementRendered) return prev 
            if (PopEditorRef.current.dataset.selected !== "undefined") {
                Module = elementRendered.title.split(" (")[0]
                let child = elementRendered.firstChild as HTMLImageElement
                if (Module === "Text") return elementRendered.innerHTML
                else return child.src
            }
            return prev
        })
    }

    return <div
        className="d-none form-background"
        onClick={(e) => {
            let target = e.target as HTMLDivElement
            if (target && target.classList.contains("form-background")) toggleOpen()
        }}
        ref={PopEditorRef}
    >
        <section className="form-pop-up">
            <nav className="form-top-bar">
                <h1>{PopEditorRef?.selected?.title}</h1>
                <FontAwesomeIcon icon={faXmarkCircle} size="xl" onClick={toggleOpen} />
            </nav>
            {Editor[Module]}
        </section>
    </div>
}