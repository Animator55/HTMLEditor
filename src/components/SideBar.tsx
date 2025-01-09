import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import JSONTreeComponent from "./SideBar_Pages/JSONTreePage";
import SideBarFont from "./SideBar_Pages/FontPage";
import SideBarGeneral from "./SideBar_Pages/GeneralPage";
import PagesButtons from "./SideBar_Pages/PagesButtons";


import "../assets/css/sidebar.css";
import "../assets/css/sidebarEdit.css";
import SideBarAnimations from "./SideBar_Pages/AnimationPage";

export default function SideBar({mode, JSONTree, selected, createComponent,fixedComponents, selectedFonts}) {
    let editionModeSideBar = mode === "editor";
    const [sideBarWidth, setSideBarWidth] = React.useState(50)
    const [sideBarPage, setPage] = React.useState("Components")
    const SideCont = React.useRef()
    const resizeSideBar = (e) =>{
        e = e || window.event;
        e.preventDefault();
        let el = e.target.parentElement
        let prevSize = sideBarWidth
        
        function dragMove(dragMov){
            let newX = prevSize - e.pageX + dragMov.pageX
            el.style.minWidth = newX > 366 ? "366px" : newX < 233 ? "233px" : newX + "px"
            let newXDrag = prevSize - e.pageX + dragMov.pageX
            e.target.style.left = newXDrag > 366 ? "366px" : newXDrag < 233 ? "233px" : newXDrag + "px"
        }

        function dragEnd(){
            let value = parseInt(el.style.minWidth)
            el.style.maxWidth = el.style.minWidth
            if(value <= 290) el.classList.add("small")
            else el.classList.remove("small")
            setSideBarWidth(value)
            document.removeEventListener('mousemove', dragMove);
            document.removeEventListener('mouseup', dragEnd);
        }
        
        document.addEventListener('mousemove', dragMove);
        document.addEventListener('mouseup', dragEnd);
    }

    const setSideBarPage = (page)=>{
        setPage(page)
        setSideBarWidth(!SideCont.current.classList.contains("expanded") ? 233 : sideBarWidth)
        SideCont.current.classList.add("expanded")
    }

    const page = {
        "Components": <div className="component-editor">
            <div>
                <button 
                    className="btn-2 align-center"
                    onClick={createComponent}
                >
                    <FontAwesomeIcon icon={faPlus} size="xl" className="margin-right-5px"/>
                    <p>Anadir Componente</p>
                </button>
            </div>
            <div className="json-tree">
                <JSONTreeComponent 
                    JSONTree={JSONTree} 
                    fixedComponents={editionModeSideBar ? fixedComponents : []}
                    selected={selected} 
                    generatePlaces={editionModeSideBar}
                />
            </div>
        </div>
        ,
        "Fonts": <SideBarFont 
            selectedFonts={selectedFonts} 
        />,
        "General": <SideBarGeneral
                selectedFonts={selectedFonts} 
                JSONView={JSONTree}
                setSideBarPage={setSideBarPage}
            />,
        "Animations": <SideBarAnimations />
    }

    return (<>
        <div className="side-bar edit small" ref={SideCont} style={{minWidth: sideBarWidth, maxWidth: sideBarWidth}}>
            {JSONTree !== undefined ? <>
                <PagesButtons 
                    displayAll={editionModeSideBar} 
                    sideBarPage={sideBarPage} 
                    setSideBarPage={setSideBarPage}
                    setSideBarWidth={setSideBarWidth}
                /> 
                <div className="page">{page[sideBarPage]}</div>
            </>
            : null}
            <div className="side-bar-drag" style={{left: sideBarWidth}} onMouseDown={resizeSideBar}></div>
        </div> 
    </>)
}