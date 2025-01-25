import React from "react";
import EditorParser from "./SideBar_Pages/EditorParser";
import ClassEditor from "./ClassEditor";
import SideBarClasses from "./SideBar_Pages/ClassPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faBoxArchive, faFilePen, faPenToSquare, faWandMagicSparkles, faWarning } from "@fortawesome/free-solid-svg-icons";
import ComponentPicker from "./SideBar_Pages/ComponentPicker";
import { moduleType } from "../vite-env";

export default function EditorContainer ({Container, EditorRef, editor, Class, setSelected, setSelectedClass}:
    {Container: any, EditorRef:any, editor: moduleType, Class:any, setSelected: Function, setSelectedClass: Function}
){
    const [page, setPage] = React.useState("Editor")

    const resizeWidth = (e: React.MouseEvent) => {
        if(!Container.current || Container.current.dataset.display === "false") return
        e = e || window.event;
        e.preventDefault();
        let container = Container.current
        let prevSize = {x: parseInt(container.style.minWidth)}
        
        function dragMove(dragMov: MouseEvent){
            container.style.maxWidth = container.style.minWidth = prevSize.x + e.pageX - dragMov.pageX > 235 ? 
                prevSize.x + e.pageX - dragMov.pageX < 400 ? 
                    prevSize.x + e.pageX - dragMov.pageX + "px" : "400px"
                : "235px"
        }

        function dragEnd(){
            document.removeEventListener('mousemove', dragMove);
            document.removeEventListener('mouseup', dragEnd);
        }
        
        document.addEventListener('mousemove', dragMove);
        document.addEventListener('mouseup', dragEnd);
    }
    
    let ClassSelected = Class !== undefined

    let newClass
    if(ClassSelected) newClass = {"index": Class, "key": "Class"}

    const Alert = ()=>{
        return <section className="editor-warning">
            <FontAwesomeIcon icon={faWarning}/>
            <p>No hay clase seleccionada.</p>
        </section>
    }

    const pages: {[key:string]: any} = {
        "Editor":  <></>,
        "Class": ClassSelected ? <ClassEditor 
            classe={newClass} 
            setSelected={setSelectedClass}
        /> : <Alert/>,
        "ClassList": <SideBarClasses/>,
        "Componentes": <ComponentPicker/>
    }

    const icons: {[key:string]: any} = {
        "Editor" : faPenToSquare,
        "Class": faWandMagicSparkles,
        "ClassList": faFilePen,
        "Componentes": faBoxArchive
    }

    React.useEffect(()=>{
        if(ClassSelected && Container.current && Container.current.dataset.page !== "Class"){
            Container.current.dataset.page = "Class"
            setPage("Class")
        }
    }, [Class])

    const changePage = (entry:string)=>{
        if(!Container.current) return
        Container.current.dataset.page = entry
        if(Container.current.dataset.display === "false") {
            Container.current.dataset.display = "true"; 
            Container.current.classList.add("expanded")
        }
        if(entry === "Editor" && EditorRef.current && EditorRef.current.dataset.selected !== undefined){ 
            let key = EditorRef.current.dataset.selected
            let elementRendered = document.querySelector(`.edit-screen [id="${key}"]`) as HTMLDivElement
            if(!elementRendered) return
            elementRendered.dataset.select= "true"
            let sideTarget = document.querySelector(`.side-bar [id="${key}"]`) as HTMLDivElement
            if(sideTarget)sideTarget.dataset.select= "true"
        }
        setPage(entry)
    }

    return <div 
        ref={Container} 
        data-display="false"
        data-page="Editor"
        className={Container.current?.dataset?.display === "true" ? "container-editors expanded" : "container-editors"}
        onClick={(e)=>{
            if(!Container.current) return 
            let target = e.target as HTMLDivElement
            if(target && target.classList.contains("container-editors")) {
                Container.current.dataset.display = "true"
                Container.current.classList.add("expanded")
                setPage(Container.current.dataset.page); 
            }}}
    >
        <section className="drag-zone left" onMouseDown={resizeWidth}></section>
        <nav>
            <button onClick={()=>{
                if(!Container.current) return 
                Container.current.dataset.display = Container.current.dataset.display === "false" ? "true" : "false"
                Container.current.classList.toggle("expanded")
                if(Container.current.dataset.display === "false") Container.current.style.maxWidth = Container.current.style.minWidth = ""
            }}><FontAwesomeIcon icon={faArrowRightToBracket}/></button>
            {Object.keys(pages).map(entry=>{
                return <button 
                    key={Math.random()} 
                    onClick={()=>changePage(entry)} 
                    className={entry === page ? "selected-page" : ""}>
                        <FontAwesomeIcon icon={icons[entry]}/>
                        <p>{entry}</p>
                    </button>
            })}
        </nav>
        <div className="page">
            {pages[page]}
            <EditorParser 
                EditorRef={EditorRef}
                editor={editor} 
                setSelected={setSelected}
            />
        </div>
    </div>
}