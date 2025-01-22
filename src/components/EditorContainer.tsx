import React from "react";
import EditorParser from "./SideBar_Pages/EditorParser";
import ClassEditor from "./ClassEditor";
import SideBarClasses from "./SideBar_Pages/ClassPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faBoxArchive, faFilePen, faPenToSquare, faWandMagicSparkles, faWarning } from "@fortawesome/free-solid-svg-icons";
import ComponentPicker from "./SideBar_Pages/ComponentPicker";

export default function EditorContainer ({Container, EditorRef, editor, Class, setSelected, setSelectedClass, selectedFonts}){
    const [page, setPage] = React.useState("Editor")

    const resizeWidth = (e) => {
        if(!Container?.display) return
        e = e || window.event;
        e.preventDefault();
        let container = Container.current
        let prevSize = {x: parseInt(container.style.minWidth)}
        
        function dragMove(dragMov){
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

    const pages = {
        "Editor":  <></>,
        "Class": ClassSelected ? <ClassEditor 
            classe={newClass} 
            setSelected={setSelectedClass}
        /> : <Alert type="class"/>,
        "ClassList": <SideBarClasses/>,
        "Componentes": <ComponentPicker/>
    }

    const icons = {
        "Editor" : faPenToSquare,
        "Class": faWandMagicSparkles,
        "ClassList": faFilePen,
        "Componentes": faBoxArchive
    }

    React.useEffect(()=>{
        if(ClassSelected && Container["page"] !== "Class"){
            Container["page"] = "Class"
            setPage(Container["page"])
        }
    }, [Class])

    const changePage = (entry)=>{
        Container["page"] = entry
        if(!Container["display"]) {
            Container["display"] = true; 
            Container.current.classList.add("expanded")
        }
        if(entry === "Editor" && EditorRef.selected !== undefined){ 
            let key = EditorRef["selected"]?.id
            let elementRendered = document.querySelector(`.edit-screen [id="${key}"]`)
            EditorRef["selected"] = elementRendered
            elementRendered.setAttribute("select", "true")
            document.querySelector(`.side-bar [id="${key}"]`)?.setAttribute("select", "true")
        }
        setPage(Container["page"])
    }

    return <div 
        ref={Container} 
        className={Container?.display ? "container-editors expanded" : "container-editors"}
        onClick={(e)=>{
            if(e.target.classList.contains("container-editors")) {
                Container["display"] = true
                Container.current.classList.add("expanded")
                setPage(Container["page"]); 
            }}}
    >
        <section className="drag-zone left" onMouseDown={resizeWidth}></section>
        <nav>
            <button onClick={()=>{
                Container["display"] = !Container["display"]
                Container.current.classList.toggle("expanded")
                if(!Container["display"]) Container.current.style.maxWidth = Container.current.style.minWidth = ""
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
                selectedFonts={selectedFonts}
                DNone={page !== "Editor"}
            />
        </div>
    </div>
}