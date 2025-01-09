import React from "react"
import { faArrowRightToBracket, faClapperboard, faFolderTree, faFont, faList } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function PagesButtons({displayAll, sideBarPage, setSideBarPage,setSideBarWidth}){
    let Pages = {"General":"General","Components":"Componentes","Fonts":"Fuentes", "Animations" : "Animaciones"}
    const Icons = {"General":faList,"Components":faFolderTree,"Fonts":faFont,"Animations": faClapperboard}

    if(!displayAll) {
        delete Pages["General"] 
        delete Pages["Fonts"]  
    }

    let JSX = []
    for (const key in Pages){
        JSX.push(
        <button 
            className={sideBarPage === key ? "selected-page" : ""} 
            onClick={()=>{setSideBarPage(key)}}
            key={Math.random()}
        >
            <FontAwesomeIcon icon={Icons[key]}/>
            <p>{Pages[key]}</p>
        </button>)
    }
    return <nav>
        <button onClick={(e)=>{
            let isExpanded = e.target.parentElement.parentElement.classList.contains("expanded")
            e.target.parentElement.parentElement.classList.toggle("expanded")
            setSideBarWidth(isExpanded ? 50 : 233)
        }}><FontAwesomeIcon icon={faArrowRightToBracket} /></button>
        {JSX}
    </nav>
}