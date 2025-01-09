import { faCircleXmark, faMagnifyingGlass, faPlus, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import filterArray from "../../logic/filterArray";

const LocalList = [
    {"name": "class 1", "style": {}}, 
    {"name": "class 2", "style": {"position": "absolute"}}, 
    {"name": "class 3", "style": {"color": "#fff"}}, 
    {"name": "class 4", "style": {"background": "#000"}}
] 

export default function SideBarClasses () {
    const [List, setList] = React.useState(LocalList)
    const [editSelected, setEditSelected] = React.useState()

    function changeList (action, target) {
        switch(action){
            case true:
                setList([...List, {"name": "", "id": `${parseInt(Math.random()*10000)}`, style: {}}])
            case false: 
                List.splice(target, 1)
            break
            default: 
                List.splice(target, 1, action)
        }
        setList(List)
    }

    /* Style editing jsx
    <div>
        {Object.keys(editSelected.style).length > 0 ?
            Object.keys(editSelected.style).map(key => {
                return (
                    <div className="d-flex box-shadow" style={{justifyContent: "space-between"}} key={Math.random()}>
                        <div>{key}</div>
                        <div>{editSelected.style[key]}</div>
                        <FontAwesomeIcon icon={faXmark} onClick={()=>{delete editSelected.style[key]; activateRefresh(!refresh)}}/>
                    </div>
                )
            })
        :null}
        <div className="d-flex box-shadow" style={{justifyContent: "space-between"}}>
            <input 
                placeholder="key"
                onKeyUp={(e)=>{
                    if(e.key === "Enter" && e.target.nextSibling.value !== "" && e.target.value !== ""){
                        editSelected.style[e.target.value] = e.target.nextSibling.value
                        activateRefresh(!refresh)
                    }
                }}
                defaultValue=""
                />
            <input 
                id="value"
                placeholder="value"
                onKeyUp={(e)=>{
                    if(e.key === "Enter" && e.target.previousSibling.value !== "" && e.target.value !== ""){
                        editSelected.style[e.target.previousSibling.value] = e.target.value
                        activateRefresh(!refresh)
                    }
                }}
                defaultValue=""
            />
        </div>
    </div>
     */
    return (
        <div>
            <button className="btn-2 align-center" onClick={()=>{changeList(true)}}>
                <FontAwesomeIcon icon={faPlus} style={{fontSize: "1.5rem"}}/>
            </button>
            <div className="box-shadow">
                <FontAwesomeIcon className="margin-right-5px margin-auto" icon={faMagnifyingGlass}/>
                <input 
                    className="w-100 margin-0-auto" 
                    placeholder="Nombre de clase"
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
                                <div>{item.name}</div>
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
                </div>
            ) 
            : null}
        </div>
    )
}