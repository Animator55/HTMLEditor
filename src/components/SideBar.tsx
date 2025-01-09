import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faHome, faKey, faCartShopping, faToolbox, faUserTie, faCircleInfo, faList, faGear, faArrowRightFromBracket, faListNumeric, faFilePen, faPenRuler, faArrowLeft, faCircleXmark, faCheck, faTrash, faExclamationTriangle, faFolderTree, faFont, faMinus, faCircleNotch, faArrowRight, faMagnifyingGlass, faXmark, faStar, faArrowDownWideShort, faSearch, faSquareShareNodes, faWindowRestore, faLock, faCaretUp, faPen, faClapperboard, faCopy, faTag } from '@fortawesome/free-solid-svg-icons'
// import SideBarFont from "./SideBar_Pages/FontPage";
// import SideBarClasses from "./SideBar_Pages/ClassPage";
// import SideBarAnimations from "./SideBar_Pages/AnimationPage";
// import SideBarGeneral from "./SideBar_Pages/GeneralPage";
// import PagesButtons from "./SideBar_Pages/PagesButtons";
import selectInJson from "../logic/jsonTreeSelector";
// import EditorParser from "./SideBar_Pages/EditorParser";


import "../assets/sidebar.css";
import "../assets/sidebarEdit.css";
import { htmlComponent } from "../vite-env";
import JSONTreeComponent from "./SideBar_Pages/JSONTreePage";

type Props = {
    JSONTree: {content: htmlComponent[]}
    selected: string
    setSelected: Function
}
///////////
// let customFontList = ["Bakbak One", "ABeeZee"]
//////////

// let mainFont= ""
// const setMainFont = (val:string)=>{mainFont = val}

export default function SideBar({ JSONTree, selected, setSelected}: Props) {
    const LocalJSON = JSONTree
    const [sideBarWidth, setSideBarWidth] = React.useState(300)
    const [editorMode, setEditorMode] = React.useState({});
    const [editorSize, setEditorSize] = React.useState({ x: sideBarWidth - 21, y: 300 });
    const [sideBarPage, setSideBarPage] = React.useState("Components")

    const resizeSideBar = (e) =>{
        e = e || window.event;
        e.preventDefault();
        let el = e.target.nextSibling
        let prevSize = sideBarWidth
        
        function dragMove(dragMov){
            let newX = prevSize - e.pageX + dragMov.pageX
            el.style.minWidth = newX > 366 ? "366px" : newX < 231 ? "231px" : newX + "px"
            let newXDrag = prevSize - e.pageX + dragMov.pageX
            e.target.style.left = newXDrag > 366 ? "366px" : newXDrag < 231 ? "231px" : newXDrag + "px"
        }

        function dragEnd(){
            let value = parseInt(el.style.minWidth)
            el.style.maxWidth = el.style.minWidth
            if(value <= 290) el.classList.add("small")
            else el.classList.remove("small")
            if(editorMode.top === undefined) setEditorSize({ x: value - 21, y: editorSize.y})
            setSideBarWidth(value)
            document.removeEventListener('mousemove', dragMove);
            document.removeEventListener('mouseup', dragEnd);
        }
        
        document.addEventListener('mousemove', dragMove);
        document.addEventListener('mouseup', dragEnd);
    }
    
    // const selectedFonts = customFontList
    let editor
    editor = selected !== undefined && editor?.key !== selected ? selectInJson(selected, LocalJSON) : undefined

    function selectItem (e) {
        if(e.target.className !== ""){
            setSelected(undefined, false);
        }
        else{
            setSelected(e.target.id)
        }
    }

    let JSX;
    function SideBarSelector(page:string) {
        switch(page){
            case "Components":
                return (
                <div>
                    <div>
                        <button 
                            className="btn-2 align-center"
                            onClick={()=>{setSelected("New");}}
                        >
                            <FontAwesomeIcon icon={faPlus} style={{fontSize: "1.5rem"}}/>
                        </button>
                    </div>
                    <div className="json-tree">
                        <JSONTreeComponent
                            JSONTree={JSONTree} 
                            selectItem={selectItem} 
                        />
                    </div>
                    {/* {editor !== undefined ? (
                        <EditorParser
                            editor={editor} 
                            editorMode={editorMode} 
                            setEditorMode={setEditorMode} 
                            editorSize={editorSize} 
                            setEditorSize={setEditorSize} 
                            setSelected={setSelected}
                            selectedFonts={selectedFonts}
                            staticComponents={editionModeSideBar ? staticComponents : [JSONTree.content[0].type]}
                        />
                    ) : null} */}
                </div>)
            // case "Fonts":
            //     return <SideBarFont 
            //                 selectedFonts={selectedFonts} 
            //                 mainFont={mainFont} 
            //                 setMainFont={setMainFont}
            //             />
            // case "Class":
            //     return <SideBarClasses/>
            // case "Animations":
            //     return <SideBarAnimations/>
            // case "General":
            //     return <SideBarGeneral
            //                 selectedFonts={selectedFonts} 
            //                 mainFont={mainFont} 
            //                 setMainFont={setMainFont}
            //                 JSONView={JSONTree}
            //                 setSideBarPage={setSideBarPage}
            //             />
        }
    }
    JSX = (<>
        <div className="side-bar-drag" style={{left: sideBarWidth}} onMouseDown={resizeSideBar}></div>
        <div className="side-bar edit" style={{minWidth: sideBarWidth, maxWidth: sideBarWidth}}>
            <div>
                <h2 className="side-bar-title">HTML Editor</h2>
            </div>
            {JSONTree && <>
                {/* <PagesButtons 
                    displayAll={editionModeSideBar} 
                    sideBarPage={sideBarPage} 
                    setSideBarPage={setSideBarPage}
                />  */}
                {SideBarSelector(sideBarPage)}
            </>}
        </div> 
    </>)
    return JSX
}