import React from "react";

export default function ReSize ({EditorRef,AppCont, Resize}){

    const activate = (e)=>{
        if(!e.target.classList.contains("resize-listener")) return
        if(EditorRef.selected === undefined || EditorRef.selectedCoords === undefined) return
        e.target.classList.toggle("d-none")
        let zone = e.target.firstChild
        let selected = EditorRef.selected
        let coords = EditorRef.selectedCoords
        let scale = AppCont.current.lastChild.style.transform.split("(")[1]
        scale = parseFloat(scale)

        zone.style.top = coords.Y +"px"
        zone.style.left = coords.X +"px"
        zone.style.height = selected.clientHeight * scale + 2 +"px"
        zone.style.width = selected.clientWidth * scale + 2 +"px"

        document.addEventListener("wheel", ()=>{e.target.classList.add("d-none")})
        document.addEventListener("keydown", ()=>{e.target.classList.add("d-none")})
    }

    const Drag = (e)=>{
        e = e || window.event;
        e.preventDefault();
        let isX = e.target.classList.contains("right")
        let scale = AppCont.current.lastChild.style.transform.split("(")[1]
        scale = parseFloat(scale)
        let prevSize = {
            x: EditorRef.selected.clientWidth, 
            y: EditorRef.selected.clientHeight
        }

        function dragMoveX(dragMov){
            AppCont.current.firstChild.classList.add("d-none")
            prevSize.x += dragMov.movementX/scale
            EditorRef.selected.style.width = prevSize.x + "px"
        }
        function dragMoveY(dragMov){
            AppCont.current.firstChild.classList.add("d-none")
            prevSize.y += dragMov.movementY/scale
            EditorRef.selected.style.height = prevSize.y + "px"
        }
        function dragEnd(e){
            document.removeEventListener('mousemove', isX ? dragMoveX : dragMoveY);
            document.removeEventListener('mouseup', dragEnd);
            let changes = {width: EditorRef.selected.style.width, height: EditorRef.selected.style.height}
            Resize(EditorRef.selected.id, changes)
        }
        document.addEventListener('mousemove', isX ? dragMoveX : dragMoveY);
        document.addEventListener('mouseup', dragEnd);
    }

    return <div className="resize-listener d-none" onClick={activate}>
        <section className="resize-zone">
            <span className="resize-point right" onMouseDown={Drag}></span>
            <span className="resize-point bottom" onMouseDown={Drag}></span>
        </section>
    </div>
}