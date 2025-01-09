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

    function changeList (action, target) {
        switch(action){
            case true:
                setList([...List, {"name": "", "id": `${parseInt(Math.random()*10000)}`}])
            case false: 
                List.splice(target, 1)
            break
            default: 
                List.splice(target, 1, action)
        }
        setList(List)
    }

    return (
        <div>
            <button className="btn-2 align-center" onClick={()=>{changeList(true)}}>
                <FontAwesomeIcon icon={faPlus} style={{fontSize: "1.5rem"}}/>
            </button>
            <div className="box-shadow">
                <FontAwesomeIcon className="margin-right-5px margin-auto" icon={faMagnifyingGlass}/>
                <input 
                    className="w-100 margin-0-auto" 
                    placeholder="Nombre de animación"
                    onKeyDown={(e)=>{if(e.key === "Enter") filterArray(e.target.value, List, "name")}}
                />
            </div>
            <div className="box-shadow d-flex-col">
                {List.map((item, i)=>{
                    return (
                        <div className="d-flex align-center" key={Math.random()}>
                            <div 
                                className="item-of-list" 
                                style={{margin: "10px 25px"}} 
                                onClick={()=>{setEditSelected(item)}}
                            >
                                <div>#{i+1}</div>
                                <div>{item.name + ` (#${item.id})`}</div>
                            </div>
                            <FontAwesomeIcon 
                                icon={faXmark} 
                                onClick={()=>{changeList(false, i)}}
                                className="margin-right-1rem"/>
                        </div>
                    )
                })}
            </div>
            {editSelected !== undefined ? (
                <div className="custom-class-list span-column expanded" style={{height: "40%"}}>
                    <div className="d-flex align-center" style={{justifyContent: "space-between"}}>
                        <FontAwesomeIcon icon={faTrash} size="xl" 
                            onClick={()=>{
                                changeList(false, List.indexOf(editSelected));
                                setEditSelected(undefined)
                            }}
                        />
                        <input 
                            className="margin-0" 
                            onKeyUp={(e)=>{
                                if(e.key === "Enter")
                                changeList({...editSelected, name: e.target.value}, List.indexOf(editSelected))
                            }} 
                            onBlur={(e)=>{
                                changeList({...editSelected, name: e.target.value}, List.indexOf(editSelected))
                            }} 
                            defaultValue={editSelected.name}
                        />
                        <FontAwesomeIcon icon={faCircleXmark} size="xl" onClick={()=>{setEditSelected(undefined)}}/>
                    </div>
                    <div>{editSelected.id}</div>
                </div>
            ) 
            : null}
        </div>
    )
}