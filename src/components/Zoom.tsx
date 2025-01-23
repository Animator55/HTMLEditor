import { faCropSimple, faExpand, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Zoom ({resolution, AppCont, zoomAction}:{resolution:{x:string, y:string}, AppCont:any, zoomAction:{dec: Function, inc: Function}}) {
    return <div className="resolution">
        <section className="resolution-zone">
            <input 
                placeholder="width" 
                type="number" 
                defaultValue={resolution.x} 
                onChange={(e)=>{if(e.target.value !== null) 
                    resolution.x = e.target.value
                    AppCont.current.lastChild.style.width = resolution.x + "px"
                }}
            />
            x
            <input 
                placeholder="height" 
                type="number" 
                defaultValue={resolution.y} 
                onChange={(e)=>{if(e.target.value !== null) 
                    resolution.y = e.target.value
                    AppCont.current.lastChild.style.height = resolution.y + "px"
                }}
            />
        </section>
        <button className="zoom" title="Current resolution" onClick={(e)=>{
            let target = e.target as HTMLButtonElement
            if(!target)return
            let first = target.previousSibling!.firstChild as HTMLInputElement
            let last = target.previousSibling!.lastChild as HTMLInputElement
            first.value = `${window.innerWidth}`
            last.value = `${window.innerHeight}`
            
            AppCont.current.lastChild.style.width = window.innerWidth + "px"
            AppCont.current.lastChild.style.height = window.innerHeight + "px"
        }}><FontAwesomeIcon icon={faCropSimple} size="xl"/></button>
        <button className="zoom" title="Center edit screen" onClick={()=>{
            AppCont.current.lastChild.style.top = "0px"
            AppCont.current.lastChild.style.left = "0px"
        }}><FontAwesomeIcon icon={faExpand} size="xl"/></button>
        <div className="zoom">
            <FontAwesomeIcon 
                icon={faPlus} 
                onClick={()=>{zoomAction.inc()}} 
                size="xl"
            />
            <FontAwesomeIcon 
                icon={faMinus} 
                onClick={()=>{zoomAction.dec()}}
                size="xl"
            />
        </div>
    </div>
}