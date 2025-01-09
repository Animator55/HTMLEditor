import { faArrowPointer, faImage, faObjectGroup, faPager, faPhotoFilm, faScroll, faSearch, faShapes, faSquarePollHorizontal, faSquareShareNodes, faVectorSquare } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getComponents } from "../../logic/APIs";

let moduleTypes ={
    "Container": faObjectGroup,
    "Columns": faSquarePollHorizontal,
    "Header": faPager,
    "Text": faScroll,
    "Logo": faShapes,
    "SearchBar": faSearch,
    "SocialProfiles": faSquareShareNodes,
    "Image": faImage, 
    "ProductsGrid": faPhotoFilm
}

const selectIcon = (type) => {
    let icon = moduleTypes[type]
    if(icon === undefined) return faVectorSquare

    return icon
}

let ComponentsDefault = {
    Containers: ["Container", "Columns", "Header", "Grid"], 
    Text: ["Text", "H1", "H2", "H3", "H4", "H5", "H6"], 
    Multimedia: ["Image", "Video", "GIF", "Gallery", "Slider"],
    Interactive: ["Button", "Input", "Select", "Form", "SearchBar", "Sort", "SocialProfiles", "ProductsGrid"],
    Custom: []
}
let requestCounter = 0

function TemplatesList ({templatesList}){
    const RenderNames = ({component})=>{
        return <div
            className="comp-wraper inverse"
            draggable
            type={component}
            onDragStart={(e)=>{
                document.body.setAttribute("dragging", component+".New"); 
                e.dataTransfer.setData("Text", component)
                e.target.classList.add("dragging")
            }}
            onDragEnd={(e)=>{
                document.body.setAttribute("dragging", "undefined"); 
                e.target.classList.remove("dragging")
            }}
        >
            <button className="comp-selector">
                <FontAwesomeIcon icon={selectIcon(component)}/>
                <p>{component}</p>
            </button>
        </div>
    }

    return templatesList !== undefined ? <section className="page">
        <ul className="item-list-editor">
            {templatesList.map(component=>{
                return <RenderNames component={component} key={Math.random()}/>
            })}
        </ul>
    </section> : null
}

export default function ComponentPicker ({}){
    const [customList, setCustomList] = React.useState()
    const [Page, setPage] = React.useState("Containers")

    const getCustomComponents = async()=>{
        // let jsonContent = await getComponents(id)
        // switch(jsonContent){
        //     // case "auth": 
        //     //     activateAlert(true)
        //     // break
        //     case false: 
        //         setCustomList()
        //         // activateToast([true, {title: "Error!", text: "Cannot request the list, please try later.", result: "error"}])
        //     break
        //     default: 
        //         setCustomList(jsonContent[0])
        // }
        ComponentsDefault.Custom.push("Navigation", "Footer")
    }

    const icons = {
        Containers: faObjectGroup, 
        Text: faScroll, 
        Multimedia: faImage,
        Interactive: faArrowPointer,
        Custom: faVectorSquare
    }

    if(customList === undefined) {requestCounter++; if(requestCounter < 2) getCustomComponents()}
    else requestCounter = 0
    return <section className="component-editor">
        <section className="editor-form">
            <nav>
                {Object.keys(ComponentsDefault).map(page=>{
                    return <button 
                        key={Math.random()} 
                        onClick={()=>{setPage(page)}} 
                        className={Page === page ? "selected-page" : ""}
                    >
                        <FontAwesomeIcon icon={icons[page]}/>
                        <p>{page}</p>
                    </button>
                })}
            </nav> 
            <TemplatesList templatesList={ComponentsDefault[Page]}/>
        </section>
    </section>
}