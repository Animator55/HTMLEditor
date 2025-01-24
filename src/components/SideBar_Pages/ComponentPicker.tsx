import { faImage, faObjectGroup, faPager, faPhotoFilm, faScroll, faSearch, faShapes, faSquarePollHorizontal, faSquareShareNodes, faVectorSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

let moduleTypes: {[key:string]:any} ={
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

const selectIcon = (type: string) => {
    let icon = moduleTypes[type]
    if(icon === undefined) return faVectorSquare

    return icon
}

let ComponentsDefault = ["Container","Text","Image"]

function TemplatesList ({templatesList}: {templatesList:string[]}){
    const RenderNames = ({component}:{component: string})=>{
        return <div
            className="comp-wraper inverse"
            draggable
            data-type={component}
            onDragStart={(e)=>{
                document.body.setAttribute("dragging", component+".New"); 
                e.dataTransfer.setData("Text", component)
                let target = e.target as HTMLDivElement
                if(target)target.classList.add("dragging")
            }}
            onDragEnd={(e)=>{
                document.body.setAttribute("dragging", "undefined"); 
                let target = e.target as HTMLDivElement
                if(target)target.classList.remove("dragging")
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
            {templatesList.map((component: string)=>{
                return <RenderNames component={component} key={Math.random()}/>
            })}
        </ul>
    </section> : null
}

export default function ComponentPicker ({}){
    return <section className="component-editor">
        <section className="editor-form">
            <TemplatesList templatesList={ComponentsDefault}/>
        </section>
    </section>
}