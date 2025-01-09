import { faCircleXmark, faTrash, faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import JsxParser from "react-jsx-parser";
import * as OctagonalEditors from "../../RenderComponents/Editors"
import { GlobalFunctions } from "../../screens/AdminEditor";

export default function EditorParser({editor, editorMode, setEditorMode, editorSize, setEditorSize, setSelected, selectedFonts, staticComponents}) {
    let ModePopUp = editorMode.top !== undefined
    const GlobalFunc = React.useContext(GlobalFunctions)

    let cOffX = 0
    let cOffY = 0
    let editorElement = document.getElementsByClassName('component-editor')
    let appCont = document.getElementsByClassName('app-cont')[0]
    let staticBoolean = staticComponents.includes(editor?.type)

    const resizeEditor = (e, bool) => {
        e = e || window.event;
        e.preventDefault();
        let el = editorElement[0]
        let _dZone = editorElement[0].children[0]
        let prevSize = {x: parseInt(editorSize.x), y: parseInt(editorSize.y)}

        const navBarHeight = 45
        const sideBarWidth = parseInt(editorElement[0].parentElement.parentElement.style.minWidth) 
        
        function dragMovePositive(dragMov){
            //bool true: represents bottom-right (only changes width-height) 
            let MoveX = prevSize.x - e.pageX + dragMov.pageX
            let MoveY = prevSize.y - e.pageY + dragMov.pageY

            el.style.width = MoveX < appCont.clientWidth ? MoveX + "px" : appCont.clientWidth
            el.style.height = MoveY < appCont.clientHeight ? MoveY + "px" : appCont.clientHeight
        }
        
        function dragMoveNegative(dragMov){
            //bool false: top-left resizes (moves component with top-left)
            let XMove = parseInt(editorMode.left) - (prevSize.x -(prevSize.x - e.pageX + dragMov.pageX))
            let YMove = parseInt(editorMode.top) - (prevSize.y -(prevSize.y - e.pageY + dragMov.pageY))
            
            el.style.left = (XMove > sideBarWidth ? XMove : sideBarWidth) + "px"
            el.style.top = (YMove > navBarHeight ? YMove : navBarHeight) + "px"

            let resultWidth = prevSize.x + (e.pageX - dragMov.pageX)
            let resultHeight = prevSize.y + (e.pageY - dragMov.pageY)

            el.style.width = XMove > sideBarWidth ? resultWidth + "px" : el.style.width
            el.style.height = YMove > navBarHeight ? resultHeight + "px" : el.style.height
        }

        function dragEnd(){
            const XLimit = document.body.clientWidth - el.clientWidth
            const YLimit = document.body.clientHeight - el.clientHeight

            let top = parseInt(el.style.top)
            let left = parseInt(el.style.left)

            _dZone.style.top = el.style.top = (top > YLimit ? YLimit : top)+ "px"
            _dZone.style.left = el.style.left = (left > XLimit ? XLimit : left)+ "px"
            
            setEditorSize({x: el.style.width, y: el.style.height})
            setEditorMode({top: el.style.top, left: el.style.left, right: el.style.right, bottom: el.style.bottom})
            document.removeEventListener('mousemove', bool ? dragMovePositive : dragMoveNegative);
            document.removeEventListener('mouseup', dragEnd);
        }
        
        document.addEventListener('mousemove', bool ? dragMovePositive : dragMoveNegative);
        document.addEventListener('mouseup', dragEnd);
    }

    const resizeEditorStatic = (e) => {
        e = e || window.event;
        e.preventDefault();
        let el = editorElement[0]
        let prevSize = {x: parseInt(editorSize.x), y: parseInt(editorSize.y)}
        
        function dragMove(dragMov){
            el.style.height = prevSize.y + e.pageY - dragMov.pageY + "px"
        }

        function dragEnd(){
            setEditorSize({x: editorSize.x, y: el.style.height})
            document.removeEventListener('mousemove', dragMove);
            document.removeEventListener('mouseup', dragEnd);
        }
        
        document.addEventListener('mousemove', dragMove);
        document.addEventListener('mouseup', dragEnd);
    }

    const editorDragNDrop = (e) => {
        let el = editorElement[0]
        if(!ModePopUp || (e.target !== el && e.target !== el.children[1])) return  
        e = e || window.event;
        e.preventDefault();
        let _dZone = el.children[0]
        cOffX = e.clientX - el.offsetLeft;
        cOffY = e.clientY - el.offsetTop;

        //limits
        const navBarHeight = 45
        const sideBarWidth = parseInt(el.parentElement.parentElement.style.minWidth)

        const heightLimit = document.body.clientHeight - el.clientHeight 
        const widthLimit = document.body.clientWidth - el.clientWidth 

        function dragEnd(){
            let top = parseInt(el.style.top)
            let left = parseInt(el.style.left)

            el.style.top = _dZone.style.top = (top > heightLimit ? heightLimit : top) + "px"
            el.style.left = _dZone.style.left = (left > widthLimit ? widthLimit : left) + "px"
            
            setEditorMode({"top": el.style.top, "left": el.style.left, "right": el.style.right, "bottom": el.style.bottom})
            document.removeEventListener('mousemove', dragMove);
            document.removeEventListener('mouseup', dragEnd);
        }

        function dragMove(dragMov){
            let Xmove = dragMov.clientX - cOffX
            let Ymove = dragMov.clientY - cOffY
            el.style.top = (el.style.bottom !== "0px" ? Ymove > navBarHeight ? Ymove : navBarHeight : el.style.top)+"px"
            el.style.left = (el.style.right !== "0px" ? Xmove > sideBarWidth ? Xmove : sideBarWidth : el.style.left)+"px"
            
            el.style.right = Xmove > widthLimit ? "0px" : "auto"
            el.style.bottom = Ymove > heightLimit ? "0px" : "auto"
        }

        document.addEventListener('mousemove', dragMove);
        document.addEventListener('mouseup', dragEnd);
    }

    const switchEvent = ()=>{
        let sideBarWidth = parseInt(editorElement[0].parentElement.parentElement.style.minWidth)
        let currentValue = {"top": 45, "left": sideBarWidth+5}
        if(ModePopUp){
            currentValue = {}
            setEditorSize({...editorSize, x: sideBarWidth - 21})
        }
        setEditorMode(currentValue); 
    }

    
    //components 
    
    function DragResizeZone () {
        return <>
            {ModePopUp ? 
                <div className="d-flex-col drag-zone-parent" style={{width: editorSize?.x}}>
                    <div className="drag-zone top" onMouseDown={(e)=>{resizeEditor(e, false)}}></div>
                    <div className="d-flex">
                        <div className="drag-zone left" onMouseDown={(e)=>{resizeEditor(e, false)}} style={{height: editorSize.y}}></div>
                        <div className="drag-zone right" onMouseDown={(e)=>{resizeEditor(e, true)}} style={{marginLeft: "auto"}}></div>
                    </div>
                    <div className="drag-zone bottom" onMouseDown={(e)=>{resizeEditor(e, true)}}></div>
                </div> 
            :
                <div className="drag-zone top" onMouseDown={resizeEditorStatic}></div>
            }
        </>
    }

    function EditorTopBar () {
        return <div className="d-flex margin-5px">
            {editor.key === "New" || staticBoolean ? null : <button onClick={()=>{GlobalFunc.changeJSON.delete(editor.key)}}><FontAwesomeIcon icon={faTrash} size="xl"/></button>}
            <button onClick={switchEvent} style={{marginLeft: "auto"}}><FontAwesomeIcon icon={faWindowRestore} size="xl"/></button>
            <button onClick={()=>{setSelected(undefined, false)}}><FontAwesomeIcon icon={faCircleXmark} size="xl"/></button>
        </div>
    }

    return (
        <div 
            className={ModePopUp ? "component-editor editor-draggable" : "component-editor"} 
            style={{top: editorMode.top, bottom: editorMode.bottom, left: editorMode.left, right: editorMode.right, width: editorSize?.x, height: editorSize.y}} 
            onMouseDown={editorDragNDrop}
        >
            <DragResizeZone/>
            <EditorTopBar/>
            <JsxParser
                bindings={{
                    editorProp: editor,
                    fontArrayProp: selectedFonts,
                    submitProp: (data)=>{GlobalFunc.changeJSON.edit(editor.key, data)},
                }}
                renderInWrapper={false} key={Math.random()} components={{ OctagonalEditors }}
                jsx={`<OctagonalEditors.${editor.key !== "New" ? editor.type : editor.key} 
                    editor={editorProp} 
                    fonts={fontArrayProp} 
                    submit={submitProp}/>`}
            />
        </div>  
    )
}