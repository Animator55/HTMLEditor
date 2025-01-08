import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faCircleXmark, faDisplay, faMobile, faFolderOpen, faFolder} from '@fortawesome/free-solid-svg-icons'
// import PopUp from "../components/PopUp";
import "../assets/navBar.css"

export default function NavBar({type, span, JSON}) {
    // const [close, setPopUp] = React.useState(false)
    // const pagesSpan = React.useRef()
// 
    // const progressBar = React.useRef()

    // const toggleSpan = () => {
    //     pagesSpan.current.classList.toggle("expanded", !pagesSpan.current.classList.contains("expanded"))
    // }

    ///components

    // function ToggleDisplay (){
    //     return <div className="d-flex">
    //         <button><FontAwesomeIcon icon={faDisplay} size="xl"/></button>
    //         <button><FontAwesomeIcon icon={faMobile} size="xl"/></button>
    //     </div>
    // }

    // function Save (){
    //     function ProgressBar (){
    //         return <section className="pop-up-background d-none" ref={progressBar}>
    //                 <div className="progress-bar">
    //                     Saving Data...
    //                     <div className="progress"><span></span></div>
    //                 </div>
    //         </section>
    //     }

    //     return <div className="d-flex">
    //         <ProgressBar />
    //         <button onClick={()=>{
    //             progressBar.current.classList.remove("d-none");
    //             setTimeout(()=>{progressBar.current.classList.add("d-none")}, 6000)
    //             console.log(JSON)
    //         }}>
    //             <FontAwesomeIcon icon={faFloppyDisk} size="xl"/>
    //         </button>
    //     </div>
    // }

    return (
        <div className="nav-bar">
            {type === "editor" ? 
                (<>
                    {/* <PopUp visibility={close} setPopUp={setPopUp} confirm={()=>{window.location.href = "/"}}/> */}
                    {/* {span.index >= 0 ? <>
                        <Save/>
                    </>: null} */}
                    {/* <button onClick={()=>{setPopUp(true)}}><FontAwesomeIcon icon={faCircleXmark} size="xl"/></button> */}
                </>) 
            : null}
        </div>
    )
}