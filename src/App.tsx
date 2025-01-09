import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faTrash, faHome } from '@fortawesome/free-solid-svg-icons'
import SideBar from "./components/SideBar";
import "./assets/editor.css"
import "./assets/styles.css"
import "./assets/adminEditor.css"
import checkMoveToChild from "./logic/checkMoveToChild";
import ComponentsRender from "./logic/jsxParser";
import { JSONLocationSearch } from "./logic/jsonTreeSelector";

/////
let fixedComponents: string[] = []
let staticComponents: string[] = []
/////
let moduleTypes = ["Text", "Logo", "SearchBar", "Image", "Módulo", ""]
let ComponentsTree = ["Container", "Columns", "Header", "Text", "Logo", "Image", "Form", "SearchBar", "SocialProfiles"]

document.body.setAttribute("dragging", "undefined");
const JSON = {
  content: [
    {
      comp_id: "1", classes: "",
      components: [{
        comp_id: "1-0", classes: "",
        components: [{
          comp_id: "1-0-0", classes: "",
          components: [],
          textContent: "Div",
          style: { background: "blue", padding: "1rem", display: "flex", width: "2rem", height: "3rem" },
        }],
        textContent: "Div",
        style: { background: "red", padding: "1rem", display: "flex" },
      }],
      textContent: "Div",
      style: { background: "green", padding: "1rem", display: "flex", gap: ".5rem" },
    }]
}

export const GlobalFunctions = React.createContext({
  moveComponent: (e: string) => { console.log(e) },
  setSelected: (val: string, provinence: boolean) => { console.log(val, provinence) },
  changeJSON: {}
});
export default function AdminEditor() {
  const [refresh, activateRefresh] = React.useState(false)
  let zoom = 0.7

  const editScreen = React.useRef<HTMLDivElement | null>(null)
  const TrashCanRef = React.useRef<HTMLDivElement | null>(null)

  const [selected, setSelected] = React.useState<string | undefined>(undefined)

  function handleSetSelected(key: string, provinence: boolean) {
    //provinence: if(true) modules; else sidebar > jsontree || editor;
    if (provinence) { if (key !== undefined && key !== selected) setSelected(key) }
    else setSelected(key)
  }

  const convertToSplit = (string: string) => {
    let splited = string.split("-")
    splited[0] = `${parseInt(splited[0]) - 1}`

    return splited
  }

  const changeJSON = {
    "create": (target: string, data: any) => {
      let styles = { background: "#d6d6d6", height: "50px", padding: "5px", margin: "5px" }
      let newBlock = moduleTypes.includes(data) ?
        { "type": data, "data": { "className": "", "style": styles } }
        :
        { "type": `${data}`, "data": { "className": `${data}-d`, "style": styles }, "components": [] }

      let Target = convertToSplit(target)
      let location = JSONLocationSearch(Target, JSON)
      location.splice(Target[Target.length - 1], 0, newBlock)
      setSelected(undefined)
    },
    "delete": (target: string) => {
      let Target = convertToSplit(target)
      let location = JSONLocationSearch(Target, JSON)
      location.splice(Target[Target.length - 1], 1)
      if (selected !== undefined) setSelected(undefined)
      else activateRefresh(!refresh)
    },
    "edit": (target: string, data: any) => {
      let Target = convertToSplit(target)
      let location = JSONLocationSearch(Target, JSON)
      Object.assign(location[Target[Target.length - 1]].data, data.data)
      setSelected(undefined)
    }
  }

  function moveComponent(source: string, target: string) {
    console.log("src:", source, "trg:", target)
    if (ComponentsTree.includes(source)) { changeJSON.create(target, source); return }
    if (source === "" || source === target) return
    let removedComponent;

    let Source = convertToSplit(source)
    let Target = convertToSplit(target)

    let sourceObj = JSONLocationSearch(Source, JSON)
    removedComponent = sourceObj.splice(Source[Source.length - 1], 1, "placeholder")

    console.log(removedComponent)
    let targetObj = JSONLocationSearch(Target, JSON)
    targetObj.splice(Target[Target.length - 1], 0, removedComponent[0])

    if (selected !== undefined) setSelected(undefined)
    else activateRefresh(!refresh)
  }

  const handlerMoveComponent = (e) => {
    document.body.setAttribute("dragging", "undefined");
    let module = e.dataTransfer.getData("Text");
    e.target.className = "placeInvisible"
    moveComponent(module, e.target.accessKey.slice(0, -1))
  }

  //pending clean
  function addDragEnterStyle(array: any[], bool: boolean) {
    //this is bullshit, a hard to fix bullshit
    if (array.length === 0
      || array[0].classList.contains("drop-place-adaptable")
      || (array[0].accessKey === undefined
        && array[0].className !== "drop-place")) return
    for (let i = 0; i < array.length; i++) {
      array[i].className = bool ? "drop-place-adaptable" : "drop-place"
      i++
    }
  }


  // let notAllowedMoves: { [key: string]: any } = {}

  const DragEnter = (e: React.MouseEvent) => {
    if (e.target.accessKey === undefined
      || e.target.accessKey === ""
      || !document.body.attributes.dragging
      || document.body.attributes.dragging?.value === undefined
      || e.target.attributes.fixed?.value === "true")
      return
    let accessKey = document.body.attributes.dragging?.value;
    if (!checkMoveToChild(accessKey, e.target.accessKey)) return
    // let level = e.target.accessKey.split("-")
    // let key = level[0] === "0" ? "0" : level.length
    // if (!notAllowedMoves[key]?.includes(dragging))
    addDragEnterStyle(e.target.children, true);
  }

  function DragEndDrop(e) {
    if (document.body.attributes.dragging?.value === undefined) return
    document.body.setAttribute("dragging", "undefined");
    addDragEnterStyle(e.target.children, false);
    activateRefresh(!refresh)
  }
  // pending clean above

  //editor site/comp variables

  let renderJSON = JSON

  // Object.keys(JSONtemplate.views)

  ///components

  function TrashCan() {
    return (
      <FontAwesomeIcon
        ref={TrashCanRef}
        className="delete-dnd"
        onDragOver={(e) => { e.preventDefault() }}
        onDrop={(e) => {
          document.body.setAttribute("dragging", "undefined");
          let module = e.dataTransfer.getData("Text")
          if (module.split("-")[0] === "static" || ComponentsTree.includes(module)) return
          changeJSON.delete(module)
        }}
        icon={faTrash}
        style={{ fontSize: "2rem" }}
      />
    )
  }

  function Zoom() {
    return <div className="zoom">
      <FontAwesomeIcon
        icon={faPlus}
        onClick={() => {
          if (zoom < 0.9) {
            zoom += 0.1;
            if (editScreen.current) editScreen.current.style.transform = `scale(${zoom})`
          }
        }}
        size="xl"
      />
      <FontAwesomeIcon
        icon={faMinus}
        onClick={() => {
          if (zoom > 0.3) {
            zoom -= 0.1;
            if (editScreen.current) editScreen.current.style.transform = `scale(${zoom})`
          }
        }}
        size="xl"
      />
    </div>
  }

  return (
    <div className="screen">
      <GlobalFunctions.Provider value={{
        moveComponent: handlerMoveComponent,
        setSelected: handleSetSelected,
        changeJSON: changeJSON,
      }}>
        <SideBar
          mode={"editor"}
          JSONTree={renderJSON}
          selected={selected}
          setSelected={handleSetSelected}
          staticComponents={staticComponents}
          fixedComponents={fixedComponents}
        />
        <div>
          {/* <NavBar type={"editor"} span={navBarSelector} JSON={JSON} /> */}
          <div className="app-cont">
            <TrashCan />
            <Zoom />
            <div className="edit-screen" style={{ transform: `scale(${zoom})` }} ref={editScreen}>
              <div accessKey="0"
                onDragStart={(e) => { document.body.setAttribute("dragging", e.target.accessKey)}}
                onDragEnter={DragEnter}
                onDragOver={(e) => { e.preventDefault() }}
                onDrop={DragEndDrop}
                onDragEnd={DragEndDrop}
              >
                {renderJSON && <ComponentsRender
                  props={{
                    components: renderJSON.content,
                    select: selected,
                    setSelected: handleSetSelected,
                    fixed: fixedComponents,
                    static: staticComponents,
                  }}
                />}
              </div>
            </div>
          </div>
        </div>
      </GlobalFunctions.Provider>
    </div>
  )
}