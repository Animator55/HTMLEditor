import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faCircleXmark, faDisplay, faMobile, faFolderOpen, faFolder, faShareFromSquare } from '@fortawesome/free-solid-svg-icons'
import PopUp from "./PopUp";
import "../assets/css/navBar.css"
// import ViewForm from "./Forms/ViewForm";

export default function NavBar({ type, span, JSON, addView }) {
    // const [close, setPopUp] = React.useState(false)
    const pagesSpan = React.useRef()

    // const progressBar = React.useRef()

    const toggleSpan = () => {
        pagesSpan.current.classList.toggle("expanded")
    }

    ///components

    function NewFile() {
        return null
        // return <ViewForm confirm={(data)=>{addView(data)}}/>
    }

    function SpanList() {
        return <div className="nav-span margin-right-auto">
            <button
                className="btn-span"
                onClick={toggleSpan}
                onBlur={() => { if (pagesSpan.current.classList.contains("expanded")) toggleSpan() }}
            >
                <FontAwesomeIcon icon={span.index < 0 ? faFolder : faFolderOpen} size="xl" className="margin-right-5px" />
                <p className="margin-0">{span.options[span.index]}</p>
            </button>
            <span className="span-column" ref={pagesSpan}>
                <div>
                    {span.options.map((option, i) => {
                        return <button key={Math.random()}
                            id={`${i}`}
                            className={`${i}` == span.index ? "btn-active" : ""}
                            title={option}
                            onClick={(e) => { span.setOption(`${e.target.id}`) }}
                        >
                            <p id={`${i}`} >{option}</p>
                        </button>
                    })}
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
                progressBar.current.classList.remove("d-none");
                setTimeout(() => { progressBar.current.classList.add("d-none") }, 6000)
                console.log(JSON)
            }}>
                <FontAwesomeIcon icon={faFloppyDisk} size="xl" />
            </button>
            <button onClick={() => {
                progressBar.current.classList.remove("d-none");
                setTimeout(() => { progressBar.current.classList.add("d-none") }, 6000)
            }}>
                <FontAwesomeIcon icon={faShareFromSquare} size="xl" />
            </button>
        </div>
    }

    return (
        <div className="nav-bar">  
        {/* <PopUp visibility={close} setPopUp={setPopUp} confirm={() => { window.location.href = "/" }} /> */}
            {/* <NewFile /> */}
            <SpanList />
            {/* {span.index >= 0 ? <>
                <Save />
            </> : null} */}
        </div>
    )
}