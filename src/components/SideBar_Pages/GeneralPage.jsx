import { faCaretDown, faFont, faPen, faPlus, faStar, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

export default function SideBarGeneral ({selectedFonts, mainFont, setMainFont, JSONView, setSideBarPage}){
    const [refresh, activateRefresh] = React.useState(false)
    const selectedFontList = React.useRef()

    function SelectedFonts (){
        let selectedList = selectedFonts.length > 0 ? 
            selectedFonts.map((customFont, i)=>{
                return (
                    <div className="d-flex align-center" key={Math.random()} >
                        <div 
                            className="item-of-list" 
                            style={{margin: "10px 25px", fontFamily: customFont}} 
                            onClick={(e)=>{
                                if(e.target.className === "item-of-list") {
                                    let selectlist = e.target.parentElement.parentElement.children
                                    let bool = e.target.lastChild.classList.contains("d-none")
                                    for (let i = 0; i < selectlist.length; i++) {
                                        selectlist[i]?.firstChild?.lastChild?.classList?.add("d-none")
                                    }
                                    e.target.lastChild?.classList?.toggle("d-none", !bool)
                                    setMainFont(mainFont === customFont ? undefined : customFont) 
                                }
                            }}
                        >
                            #{i+1}
                            <div></div>
                            {customFont}
                            <FontAwesomeIcon icon={faStar} className={mainFont === customFont ? "main-font": "main-font d-none"}/>
                        </div>
                        <FontAwesomeIcon 
                            icon={faXmark} 
                            onClick={()=>{
                                let index = selectedFonts.indexOf(customFont)
                                selectedFonts.splice(index, 1)
                                selectedFontList.current?.lastChild?.removeChild(selectedFontList.current?.lastChild?.children[index])
                            }} 
                            className="margin-right-1rem"/>
                    </div>)
            })
        : null

        return (
            <div>
                <button 
                    className="d-flex-col btn-2 w-100 align-center"
                    onClick={()=>{selectedFontList.current?.classList?.toggle("expanded", !selectedFontList.current?.classList?.contains("expanded"))}}
                > 
                    <h3 className="margin-0"><FontAwesomeIcon icon={faFont} className="margin-right-5px"/>Fuentes</h3>
                    <FontAwesomeIcon icon={faCaretDown}/>
                </button>
                
                <div className="box-shad span-column" ref={selectedFontList}>
                    <button className="item-of-list margin-0-auto w-fit" onClick={()=>{setSideBarPage("Fonts")}}>
                        <FontAwesomeIcon className="margin-right-1rem" icon={faPlus}/>
                        Añadir fuentes
                    </button>
                    <div style={{overflowY: "scroll"}}>
                        {selectedList}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="box-shadow h-100">
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