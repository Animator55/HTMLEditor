export default function activateDragPage (e, AppCont, zoomAction){
    e = e || window.event;
    e.preventDefault();

    function mouseMove (e){
        AppCont.current.lastChild.style.top = AppCont.current.lastChild.offsetTop + e.movementY +"px"
        AppCont.current.lastChild.style.left = AppCont.current.lastChild.offsetLeft + e.movementX +"px"
    }
    
    function KeyDown (e){
        if(!AppCont.current.childNodes[3].classList.contains("d-none")) return
        if(e.code === "Space") {
            e.preventDefault()
            document.body.style.cursor = "-webkit-grabbing"
            document.addEventListener('mousemove', mouseMove)
        }
        if(e.key === "Shift") document.body.style.cursor = "-webkit-zoom-in"
    }
    
    function KeyUp (e) {
        document.body.style.cursor = "auto"
        document.addEventListener('keydown', KeyDown)
        document.removeEventListener('mousemove', mouseMove)
    }
    function Zoomevent (e) {
        if(!e.shiftKey) return
        if(e.deltaY < 0) zoomAction.inc()
        else zoomAction.dec()
    }
    
    function MouseLeave (){
        document.removeEventListener('keydown', KeyDown)
        document.removeEventListener('mousemove', mouseMove)
        document.removeEventListener('keyup', KeyUp)
        document.removeEventListener('wheel', Zoomevent)
        AppCont.current.addEventListener("mouseenter", (e)=>{activateDragPage(e, AppCont, zoomAction)}, { once: true });
        return
    }
    if(!AppCont.current.childNodes[3].classList.contains("d-none")) return
    document.addEventListener('keydown', KeyDown, {once: true})
    document.addEventListener('keyup', KeyUp)
    document.addEventListener('wheel', Zoomevent)
    AppCont.current.addEventListener('mouseleave', MouseLeave, {once: true})
}