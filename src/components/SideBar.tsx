import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import JSONTreeComponent from "./SideBar_Pages/JSONTreePage";
import PagesButtons from "./SideBar_Pages/PagesButtons";


import "../assets/css/sidebar.css";
import "../assets/css/sidebarEdit.css";
import { moduleType } from "../vite-env";
// import SideBarAnimations from "./SideBar_Pages/AnimationPage";

type Props = {
    mode: string
    JSONTree: {content:moduleType[]} 
    selected:string 
    createComponent: Function
}

export default function SideBar({mode, JSONTree, selected, createComponent}: Props) {
    let editionModeSideBar = mode === "editor";
    const [sideBarWidth, setSideBarWidth] = React.useState(50)
    const [sideBarPage, setPage] = React.useState("Components")
    const SideCont = React.useRef<HTMLDivElement | null>(null)
    const resizeSideBar = (e: React.MouseEvent) =>{
        e = e || window.event;
        e.preventDefault();
        let target = e.target as HTMLDivElement
        let el = target.parentElement as HTMLDivElement
        let prevSize = sideBarWidth
        
        function dragMove(dragMov: MouseEvent){
            let newX = prevSize - e.pageX + dragMov.pageX
            el.style.minWidth = newX > 366 ? "366px" : newX < 233 ? "233px" : newX + "px"
            let newXDrag = prevSize - e.pageX + dragMov.pageX
            target.style.left = newXDrag > 366 ? "366px" : newXDrag < 233 ? "233px" : newXDrag + "px"
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

    const setSideBarPage = (page: string)=>{
        setPage(page)
        if(!SideCont.current) return 
        setSideBarWidth(!SideCont.current.classList!.contains("expanded") ? 233 : sideBarWidth)
        SideCont.current.classList!.add("expanded")
    }

    const page: {[key: string]: any} = {
        "Components": <div className="component-editor">
            <div>
                <button 
                    className="btn-2 align-center"
                    onClick={()=>{createComponent()}}
                >
                    <FontAwesomeIcon icon={faPlus} size="xl" className="margin-right-5px"/>
                    <p>Anadir Componente</p>
                </button>
            </div>
            <div className="json-tree">
                <JSONTreeComponent 
                    JSONTree={JSONTree} 
                    selected={selected} 
                    generatePlaces={editionModeSideBar}
                />
            </div>
        </div>
        ,
        // "General": <SideBarGeneral
        //         selectedFonts={selectedFonts} 
        //         JSONView={JSONTree}
        //         setSideBarPage={setSideBarPage}
        //     />,
        // "Animations": <SideBarAnimations />
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