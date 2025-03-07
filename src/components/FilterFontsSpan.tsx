import { faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../assets/css/sortList.css";

export default function FilterFontsSpan({filters, selected, click}:{filters:{[key:string]:any}, selected: string, click: Function}){
    const list = React.useRef<HTMLDivElement | null>(null)

    return (<section>
        <div className="sort-list span-column" ref={list}>
            <div className="item-list-editor">
                {Object.keys(filters).map(key=>{
                    return <div 
                        className={selected === key ? "list-item-editor selected" : "list-item-editor"}
                        defaultValue={key}
                        key={Math.random()}
                    >
                        <button onClick={()=>{
                            if(list.current)list.current.classList.add("expanded")
                            click(key)
                        }}>
                            <p>{filters[key]}</p>
                        </button>
                    </div>
                })}
            </div>
        </div>
        <button 
            className="btn-expand" 
            onClick={()=>{
                if(!list.current)return 
                if(list.current.classList.contains("expanded")) list.current.classList.remove("expanded") 
                else list.current.classList.add("expanded")
            }}
        >
            <FontAwesomeIcon icon={faArrowDownWideShort} className="margin-right-5px"/>
            <h5>{filters[selected]}</h5>
        </button>
    </section>)
}