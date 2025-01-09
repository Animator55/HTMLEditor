import { faCircleXmark, faMagnifyingGlass, faPlus, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import filterArray from "../../logic/filterArray";


const LocalList = [
    {"name": "anim1", "id": "4865"}, 
    {"name": "anim2", "id": "4234"}, 
    {"name": "anim3", "id": "6546"}, 
    {"name": "anim4", "id": "8725"}
]

export default function SideBarAnimations () {
    const [List, setList] = React.useState(LocalList)
    const [editSelected, setEditSelected] = React.useState()

    const changeList = {
        add: (value) =>{
            setList([...List, {"name": "", "id": `${value}`}])
        },
        delete: (target) => {
            setList([...List.filter((el, i)=>{return i !== target})])
        },
        edit: (target, value) => {
            setList([...List.map((el, i)=>{if(i !== target) return el; else return value})])
        } 
    }

    const AddStyle =(e)=> {
        let [keyInput, valueInput] = e.target.parentElement.children
        console.log(e.target.parentElement.children)
        if(keyInput.value === "" || valueInput.value === "") return
        let selectedIndex = List.indexOf(editSelected)
        setList([...List.map((el, i)=>{if(i !== selectedIndex) return el; 
            return {...el, style: ""}
        })])
    }
     

    /////Components

    function TopBar () {
        return <>
            <button className="btn-2 align-center" onClick={()=>{changeList.add(`${Math.random()}`.slice(0, 4))}}>
                <FontAwesomeIcon icon={faPlus} style={{fontSize: "1.5rem"}}/>
            </button>
            <div className="box-shadow">
                <FontAwesomeIcon className="margin-right-5px margin-auto" icon={faMagnifyingGlass}/>
                <input 
                    className="w-100 margin-0-auto" 
                    placeholder="Nombre de animación"
                    onKeyDown={(e)=>{if(e.key === "Enter") {
                        let filtered = filterArray(e.target.value, List, "name")
                        setList(filtered)
                    }}}
                />
            </div>
        </>
    }

    function ListComponent (){
        return <ul className="item-list-editor">
            {List.map((item, i)=>{
                return (
                    <div 
                        className="list-item-editor"
                        key={Math.random()}
                    >
                        <button onClick={()=>{setEditSelected(item)}}>
                            <p>{item.name + ` (#${item.id})`}</p>
                        </button>
                        <button onClick={()=>{changeList.delete(i)}}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                )
            })}
        </ul>
    }

    function Editor (selectedItem) {
        return <div className="custom-class-list span-column expanded" style={{height: "40%"}}>
            <div className="d-flex align-center" style={{justifyContent: "space-between"}}>
                <FontAwesomeIcon icon={faTrash} size="xl" 
                    onClick={()=>{
                        changeList.delete(List.indexOf(selectedItem));
                        setEditSelected()
                    }}
                />
                <input 
                    className="margin-0" 
                    onKeyUp={(e)=>{
                        if(e.key === "Enter")
                        changeList.edit(List.indexOf(selectedItem), {...selectedItem, name: e.target.value})
                    }} 
                    onBlur={(e)=>{
                        changeList.edit(List.indexOf(selectedItem), {...selectedItem, name: e.target.value})
                    }} 
                    defaultValue={selectedItem.name}
                />
                <FontAwesomeIcon icon={faCircleXmark} size="xl" onClick={()=>{setEditSelected()}}/>
            </div>
            <div>{selectedItem.id}</div>
            <ul>
                <section className="d-flex">
                    <input
                        placeholder="key" 
                        onChange={(e)=>{console.log(e)}} 
                        onKeyDown={(e)=>{if(e.key === "Enter") AddStyle(e)}}
                    />
                    <input placeholder="value" onChange={(e)=>{console.log(e)}}/>
                </section>
                {selectedItem.style.map(el=>{
                    return <div className="d-flex">
                        <input defaultValue={el.key} onChange={(e)=>{console.log(e)}}/>
                        <input defaultValue={el.value} onChange={(e)=>{console.log(e)}}/>
                    </div>
                })}
            </ul>
        </div>
    }
    
    return (
        <div className="component-editor">
            <TopBar/>
            <ListComponent/>
            {editSelected !== undefined ? 
                <Editor selectedItem={editSelected}/>
            : null}
        </div>
    )
}