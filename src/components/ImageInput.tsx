import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../assets/css/imageInput.css";

export default function ImageInput ({change}:{change: Function}) {
    return <form id="image-form">
        <input 
            id="input-el-image" 
            type="file" 
            accept="image/bmp,image/png,image/jpeg,image/jpg" 
            multiple
            name="file"
            onChange={(e)=>{change(e)}}
            />
        <label id="image-label" className='btn-cblack margin-0-auto' htmlFor="input-el-image">
            <FontAwesomeIcon icon={faUpload}/>
            Cargar imagen
        </label>
    </form>
}

export function ImageDropZone ({change}:{change: Function}){
    const Drop = (e: React.DragEvent)=>{
        console.log(e)
        e.preventDefault()
        let data = e.dataTransfer.files
        if(data === undefined) return
    }
    return <div 
        className='image-drop'
        onDragOver={(e)=>{
            let target = e.target as HTMLDivElement
            target.classList.add("visible")
        }}
    >
        <input 
            id="input-el-image" 
            type="file" 
            accept="image/bmp,image/png,image/jpeg,image/jpg" 
            multiple
            name="file"
            onChange={(e)=>{change(e)}}
        />
        <label htmlFor="input-el-image" onClick={()=>{console.log("a")}} onDrop={Drop}>
            <FontAwesomeIcon icon={faUpload}/>
        </label>
    </div>
}