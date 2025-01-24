import { faArrowRightToBracket, faFolderTree } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function PagesButtons({displayAll, sideBarPage, setSideBarPage,setSideBarWidth}:
    {displayAll: boolean, sideBarPage:string, setSideBarPage:Function,setSideBarWidth: Function}
){
    let Pages: {[key:string]: any} = {
        // "General":"General",
        "Components":"Componentes",
        //  "Animations" : "Animaciones"
        }
    const Icons: {[key:string]: any} = {
        // "General":faList,
        "Components":faFolderTree,
        // "Animations": faClapperboard
    }

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
            let target = e.target as HTMLDivElement
            if(!target) return
            let isExpanded = target.parentElement!.parentElement!.classList.contains("expanded")
            target.parentElement!.parentElement!.classList.toggle("expanded")
            setSideBarWidth(isExpanded ? 50 : 233)
        }}><FontAwesomeIcon icon={faArrowRightToBracket} /></button>
        {JSX}
    </nav>
}