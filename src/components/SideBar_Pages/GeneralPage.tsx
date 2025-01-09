import { faCaretDown, faFont, faPen, faPlus, faStar, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { GlobalFunctions } from "../../screens/AdminEditor"

export default function SideBarGeneral ({selectedFonts, JSONView, setSideBarPage}){
    const [refresh, activateRefresh] = React.useState(false)
    const selectedFontList = React.useRef()
    let selectedArray = Object.keys(selectedFonts)

    const Global = React.useContext(GlobalFunctions)

    function SelectedFonts (){
        let selectedList = selectedArray.length > 0 ? 
            selectedArray.map((customFont, i)=>{
                return <div 
                        className="list-item-editor"
                        key={Math.random()}
                    >
                        <button 
                            onClick={(e)=>{
                                if(!e.target.lastChild.classList.contains("d-none")) return
                                let selectlist = e.target.parentElement.parentElement.children
                                for (let i = 0; i < selectlist.length; i++) {
                                    selectlist[i]?.firstChild?.lastChild?.classList?.add("d-none")
                                }
                                e.target.lastChild?.classList?.remove("d-none")
                                Global.mainFont.setMainFont(customFont) 
                            }}>
                            <p style={{fontFamily: customFont}}>{customFont}</p>
                            <FontAwesomeIcon icon={faStar} className={Global.mainFont.font === customFont ? "main-font": "main-font d-none"}/>
                        </button>
                        <button onClick={()=>{
                            let index = selectedArray.indexOf(customFont)
                            delete selectedFonts[customFont]
                            selectedFontList.current?.lastChild?.removeChild(selectedFontList.current?.lastChild?.children[index])
                            activateRefresh(!refresh)
                        }}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </button>
                    </div>
            })
        : null

        return (
            <div>
                <button 
                    className="d-flex-col btn-2 w-100 align-center"
                    onClick={()=>{selectedFontList.current?.classList?.toggle("expanded", !selectedFontList.current?.classList?.contains("expanded"))}}
                > 
                    <h3 className="margin-0"><FontAwesomeIcon icon={faFont} className="margin-right-5px"/>Fuentes {"("+selectedArray.length+")"}</h3>
                    <FontAwesomeIcon icon={faCaretDown}/>
                </button>
                
                <div className="box-shad span-column" ref={selectedFontList}>
                    <button className="item-of-list margin-0-auto w-fit" onClick={()=>{setSideBarPage("Fonts")}}>
                        <FontAwesomeIcon className="margin-right-1rem" icon={faPlus}/>
                        Añadir fuentes
                    </button>
                    <ul className="item-list-editor">
                        {selectedList}
                    </ul>
                </div>
            </div>
        )
    }
    return (
        <div className="component-editor">
            <div className="box-shadow" style={{position: "relative"}}>
                <h2 
                    className="w-webkit margin-0"
                    suppressContentEditableWarning
                    contentEditable
                    onBlur={(e)=>{if(e.target.lastChild.data !== "") JSONView.title = e.target.lastChild.data}} 
                    onKeyDown={(e)=>{if(e.target.lastChild.data !== "" && e.key === "Enter") {
                        e.preventDefault(); JSONView.title = e.target.lastChild.data
                    }}} 
                >
                    {JSONView.title}
                </h2>
                <FontAwesomeIcon className="edit-pen-popup" icon={faPen}/>
            </div>
            <SelectedFonts />
        </div>
    )
}