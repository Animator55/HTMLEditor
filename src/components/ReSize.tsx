import React from "react"

export default function ReSize({ EditorRef, AppCont, Resize }:
    { EditorRef: any, AppCont: any, Resize: Function }) {

    const activate = (e: React.MouseEvent) => {
        let target = e.target as HTMLDivElement
        if (!target || !target.classList.contains("resize-listener")) return
        if (!EditorRef.current || !EditorRef.current.dataset.selected || EditorRef.current.dataset.selectedCoords === undefined) return
        target.classList.toggle("d-none")
        let zone = target.firstChild as HTMLDivElement
        let selected = document.querySelector(`.edit-screen [id="${EditorRef.current.dataset.selected}"]`) as HTMLDivElement
        let coords = JSON.parse(EditorRef.current.dataset.selectedCoords)
        let scale = AppCont.current.lastChild.style.transform.split("(")[1]
        scale = parseFloat(scale)
        if (!zone) return

        zone.style.top = coords.Y + "px"
        zone.style.left = coords.X + "px"
        zone.style.height = selected.clientHeight * scale + 2 + "px"
        zone.style.width = selected.clientWidth * scale + 2 + "px"

        document.addEventListener("wheel", () => { target.classList.add("d-none") })
        document.addEventListener("keydown", () => { target.classList.add("d-none") })
    }

    const Drag = (e: React.MouseEvent) => {
        e = e || window.event;
        e.preventDefault();
        let target = e.target as HTMLDivElement
        let isX = target.classList.contains("right")
        let scale = AppCont.current.lastChild.style.transform.split("(")[1]
        scale = parseFloat(scale)
        if (!EditorRef.current.dataset.selected) return
        let selected = document.querySelector(`.edit-screen [id="${EditorRef.current.dataset.selected}"]`) as HTMLDivElement
        let prevSize = {
            x: selected.clientWidth,
            y: selected.clientHeight
        }

        function dragMoveX(dragMov: MouseEvent) {
            if (!EditorRef.current.dataset.selected) return
            let selected = document.querySelector(`.edit-screen [id="${EditorRef.current.dataset.selected}"]`) as HTMLDivElement
            AppCont.current.firstChild.classList.add("d-none")
            prevSize.x += dragMov.movementX / scale
            selected.style.width = prevSize.x + "px"
        }
        function dragMoveY(dragMov: MouseEvent) {
            if (!EditorRef.current.dataset.selected) return
            let selected = document.querySelector(`.edit-screen [id="${EditorRef.current.dataset.selected}"]`) as HTMLDivElement
            AppCont.current.firstChild.classList.add("d-none")
            prevSize.y += dragMov.movementY / scale
            selected.style.height = prevSize.y + "px"
        }
        function dragEnd() {
            document.removeEventListener('mousemove', isX ? dragMoveX : dragMoveY);
            document.removeEventListener('mouseup', dragEnd);
            if (!EditorRef.current.dataset.selected) return
            let selected = document.querySelector(`.edit-screen [id="${EditorRef.current.dataset.selected}"]`) as HTMLDivElement
            let changes = { width: selected.style.width, height: selected.style.height }
            Resize(selected.id, changes)
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