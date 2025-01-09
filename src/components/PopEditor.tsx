import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react"
// import ReactQuill from "react-quill";
// import { ImageDropZone } from "./ImageInput";
// import ListsPage from "../screens/ListsPage";

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link'],
        ['clean'],
        [{ 'color': [] }, { 'background': [] }],    
        [{ 'align': [] }],
    ],
    history: {
      delay: 2000,
      maxStack: 10,
      userOnly: true
    }
}
export default function PopEditor ({PopEditorRef, confirm}){
    let Module = PopEditorRef.selected !== undefined ? PopEditorRef.selected.title.split(" (")[0] : undefined 

    const [editorState, setEditorState] = React.useState("")

    // const Editor = {
    //     "Text" : <ReactQuill
    //         value={editorState} 
    //         onChange={setEditorState}
    //         theme="snow" 
    //         modules={modules}
    //     />,
    //     "Image": <section>
    //         <div className="image-render" style={{maxHeight: "20rem", minHeight: "10rem"}} dangerouslySetInnerHTML={{__html: '<img src="'+editorState+'"></img>'}}></div>
    //         <ListsPage page={"Images"} mini customSelect={(image)=>{setEditorState("http://localhost:3000/static/media/"+image.Image)}}/>
    //     </section>
    // }
    const toggleOpen = (e)=>{
        let isVisible = !PopEditorRef.current.classList.contains("d-none")
        PopEditorRef.current.classList.toggle("d-none")
        if(isVisible) {
            confirm(editorState, Module)
        }
        else setEditorState(() => {
            console.log(PopEditorRef.selected.innerHTML)
            if(PopEditorRef.selected !== undefined) {
                Module = PopEditorRef.selected.title.split(" (")[0]
                if(Module === "Text") return PopEditorRef.selected.innerHTML
                else return PopEditorRef.selected.firstChild.src
            }
        })
    }

    return <div 
        className="d-none form-background" 
        onClick={(e)=>{if(e.target.classList.contains("form-background")) toggleOpen(e)}}
        ref={PopEditorRef}
    >
        <section className="form-pop-up">
            <nav className="form-top-bar">
                <h1>{PopEditorRef?.selected?.title}</h1>
                <FontAwesomeIcon icon={faXmarkCircle} size="xl" onClick={toggleOpen}/>
            </nav>
            {/* {Editor[Module]} */}
        </section>
    </div>
}