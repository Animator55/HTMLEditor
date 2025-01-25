import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faCircleXmark, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import PopUp from "../components/PopUp";
import "../assets/css/navBar.css"
import { moduleType } from "../vite-env";

export default function NavBar({ JSONObj }:{JSONObj: {content: moduleType}}) {
    const [close, setPopUp] = React.useState(false)
    const pagesSpan = React.useRef<HTMLDivElement | null>(null)

    const progressBar = React.useRef<HTMLDivElement | null>(null)

    const toggleSpan = () => {
        if(pagesSpan.current)pagesSpan.current.classList.toggle("expanded")
    }

    ///components

    function SpanList() {
        return <div className="nav-span margin-right-auto">
            <button
                className="btn-span"
                onClick={toggleSpan}
                onBlur={() => { if (pagesSpan.current && pagesSpan.current.classList.contains("expanded")) toggleSpan() }}
            >
                <FontAwesomeIcon icon={faFolderOpen} size="xl" className="margin-right-5px" />
            </button>
            <span className="span-column" ref={pagesSpan}>
                <div>
                </div>
            </span>
        </div>
    }

    function Save() {
        function ProgressBar() {
            return <section className="pop-up-background d-none" ref={progressBar}>
                <div className="progress-bar">
                    Saving Data...
                    <div className="progress"><span></span></div>
                </div>
            </section>
        }

        return <div className="d-flex">
            <ProgressBar />
            <button onClick={() => {
                if(!progressBar.current)return
                progressBar.current.classList.remove("d-none");
                setTimeout(() => { progressBar.current && progressBar.current.classList.add("d-none") }, 6000)
                console.log(JSONObj)
            }}>
                <FontAwesomeIcon icon={faFloppyDisk} size="xl" />
            </button>
        </div>
    }

    return (
        <div className="nav-bar">
            <PopUp visibility={close} setPopUp={setPopUp} confirm={() => { window.location.href = "/" }} />
            <SpanList />
            <Save/>
            <button onClick={() => { setPopUp(true) }}><FontAwesomeIcon icon={faCircleXmark} size="xl" /></button>
        </div>
    )
}