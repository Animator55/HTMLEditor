import { faCircleCheck, faCircleInfo, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../assets/css/toast.css"

const icons = {"info": faCircleInfo, "success": faCircleCheck, "error" : faExclamationCircle}

export default function Toast ({data, desactivateToast}) {
    const toastRef = React.useRef()
    React.useEffect(()=>{
        toastRef.current.classList.add("no-display")
        setTimeout(()=>{
            toastRef.current.classList.remove("no-display")
            desactivateToast()
        }, 100)
    })
    
    return (
        <section className={`no-display toast ${data?.result}`} ref={toastRef}>
            <FontAwesomeIcon icon={icons[data?.result]}/>
            <div>
                <h1>{data?.title}</h1>
                <p>{data?.text}</p>
            </div>
        </section>
    )
}