import React from "react"
import { faClapperboard, faFolderTree, faFont, faList, faPenRuler } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function PagesButtons({displayAll, sideBarPage, setSideBarPage}){
    let Pages = {"General":"General","Components":"Componentes","Fonts":"Fuentes","Class":"Clases","Animations":"Animaciones"}
    const Icons = {"General":faList,"Components":faFolderTree,"Fonts":faFont,"Class":faPenRuler,"Animations":faClapperboard}

    if(!displayAll) {
        delete Pages["General"] 
        delete Pages["Fonts"] 
        delete Pages["Animations"] 
    }

    let JSX = []
    for (const key in Pages){
        JSX.push(
        <button 
            className={sideBarPage === key ? "btn-expand btn-active" : "btn-expand"} 
            onClick={()=>{setSideBarPage(key)}}
            key={Math.random()}
        >
            <FontAwesomeIcon icon={Icons[key]} className="margin-right-5px"/>
            <h4>{Pages[key]}</h4>
        </button>)
    }
    return <div>{JSX}</div>
}