import { faMagnifyingGlass, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import filterArray from "../../logic/filterArray";

import "../../assets/css/classesPage.css"

import { GlobalFunctions } from "../../screens/AdminEditor";

export default function SideBarClasses () {
    const GlobalFunc = React.useContext(GlobalFunctions)
    const cssList = GlobalFunc!
    const [List, setList] = React.useState(cssList.cssNames)
    const selectedClass = cssList.selectedClass?.name

    /////Components

    function TopBar () {
        return <>
            <button className="btn-2 align-center" onClick={()=>{cssList.changeCss.create()}}>
                <FontAwesomeIcon icon={faPlus} style={{fontSize: "1.5rem"}}/>
            </button>
            <div className="box-shadow">
                <FontAwesomeIcon className="margin-right-5px margin-auto" icon={faMagnifyingGlass}/>
                <input 
                    className="w-100 margin-0-auto" 
                    placeholder="Nombre de Clase"
                    onKeyDown={(e)=>{if(e.key === "Enter") {
                        let target = e.target as HTMLInputElement
                        let filtered = target.value === "" ? cssList.cssNames : filterArray(target.value, List)
                        setList(filtered)
                    }}}
                />
            </div>
        </>
    }

    function ListComponent (){
        return <ul className="item-list-editor">
            {List.map((item: string, i: number)=>{
                return <div 
                    className={selectedClass === item ? "list-item-editor selected" : "list-item-editor"}
                    key={Math.random()}
                >
                    <button onClick={()=>{cssList.selectClass(i)}}>
                        <p>{item}</p>
                    </button>
                    <button onClick={()=>{cssList.changeCss.delete(i)}}>
                        <FontAwesomeIcon icon={faXmark}/>
                    </button>
                </div>
            })}
        </ul>
    }

    // function Editor () {
    //     const changeClassName = (value)=>{
    //         let newValue = value.replace(/ +/g, "-")
    //         return newValue
    //     }

    //     const editGeneral = (key, change)=>{
    //         setEditSelected([{...editSelected[0], [key]: change}, editSelected[1]])
    //     }

    //     const changeSelected = {
    //         addEntry : (e)=> {
    //             e.preventDefault()
    //             let [keyInput, valueInput] = e.target.parentElement.children
    //             if(keyInput.innerText === "" || valueInput.value === "") return
    //             editGeneral("style", [...editSelected[0].style, {"key": keyInput.innerText,"value": valueInput.value}])
    //         },
    //         editEntry: (type, newValue, index) =>{
    //             if(newValue === "" && type === "key")
    //                 editGeneral("style", [...editSelected[0].style.filter((entry, i)=>{if(i !== index)return entry})])
    //             else 
    //                 editGeneral("style", Object.values({...editSelected[0].style, 
    //                     [index]: {...editSelected[0].style[index], [type]: newValue}
    //                 }))
    //         }
    //     }

    //     const setAutoComplete = (e)=>{
    //         if(e.target.innerText === "") return;
    //         let value = e.target.innerText
    //         let autocomplete = ""
    //         for (let i=0; i < cssKeyList.length; i++) {
    //             let key = cssKeyList[i]
    //             key = key.slice(0, value.length)
    //             if(key === value){ 
    //                 autocomplete = cssKeyList[i] === undefined ? "" : cssKeyList[i]; 
    //                 break
    //             }
    //         }
    //         e.target.dataset.autocomplete = autocomplete
    //     }
         
    //     ///components

    //     function EditorTopBar () {
    //         return <div className="d-flex align-center" style={{justifyContent: "space-between"}}>
    //             <input 
    //                 className="margin-0" 
    //                 onKeyUp={(e)=>{if(e.key === "Enter") editGeneral("name", changeClassName(e.target.value))}}
    //                 onBlur={(e)=>{editGeneral("name", changeClassName(e.target.value))}}
    //                 defaultValue={editSelected[0]?.name}
    //             />
    //             <FontAwesomeIcon icon={faCircleXmark} size="xl" onClick={()=>{setEditSelected()}}/>
    //         </div>
    //     }

    //     function StyleList (){
    //         return editSelected[0].style.map((entry, i)=>{
    //             return (<section className="style-chip" key={Math.random()}>
    //                 <div 
    //                     contentEditable suppressContentEditableWarning
    //                     data-autocomplete=""
    //                     data-placeholder="key"
    //                     onKeyUp={(e)=>{
    //                         if(e.key === "Enter") changeSelected.editEntry("key", e.target.innerText, i)
    //                         setAutoComplete(e)
    //                     }}
    //                     onKeyDown={(e)=>{
    //                         if(e.key === "Enter") e.preventDefault()
    //                         if(e.key === "Tab") {
    //                         e.target.innerText = e.target.dataset.autocomplete === "" ? 
    //                             e.target.innerText : e.target.dataset.autocomplete; 
    //                     }}}
    //                     style={!cssKeyList.includes(entry.key) ? {textDecoration: "line-through"} : {}}
    //                     onBlur={(e)=>{changeSelected.editEntry("key", e.target.innerText, i)}}
    //                 >{entry.key}</div>
    //                 <input 
    //                     defaultValue={entry.value} 
    //                     onBlur={(e)=>{changeSelected.editEntry("value", e.target.value, i)}}
    //                     onKeyDown={(e)=>{if(e.key === "Enter") changeSelected.editEntry("value", e.target.value, i)}}
    //                 />
    //             </section>)
    //         })
    //     }

    //     function AddEntryZone (){
    //         return <section className="style-chip">
    //             <div
    //                 contentEditable suppressContentEditableWarning
    //                 data-autocomplete=""
    //                 data-placeholder="key"
    //                 onKeyUp={(e)=>{
    //                     if(e.key === "Enter") changeSelected.addEntry(e)
    //                     setAutoComplete(e)
    //                 }}
    //                 onKeyDown={(e)=>{
    //                     if(e.key === "Enter") e.preventDefault()
    //                     if(e.key === "Tab") {
    //                     e.target.innerText = e.target.dataset.autocomplete === "" ? 
    //                         e.target.innerText : e.target.dataset.autocomplete; 
    //                 }}}
    //                 onBlur={changeSelected.addEntry}
    //             />
    //             <input
    //                 placeholder="value" 
    //                 onKeyDown={(e)=>{if(e.key === "Enter") changeSelected.addEntry(e)}}
    //                 onBlur={changeSelected.addEntry}
    //             />
    //         </section>
    //     }

    //     return <div className="custom-class-list span-column expanded edit-class" style={{height: "70%"}}>
    //         <EditorTopBar/>
    //         <ul>
    //             <StyleList/>
    //             <AddEntryZone/>
    //         </ul>
    //         <ConfirmButton submit={()=>{changeList.edit(...editSelected); setEditSelected()}}/>
    //     </div>
    // }
    
    return (
        <div className="component-editor">
            <TopBar/>
            <ListComponent/>
        </div>
    )
}