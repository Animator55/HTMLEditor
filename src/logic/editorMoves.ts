export default function activateDragPage (e: MouseEvent, AppCont: any, zoomAction:{inc: Function, dec: Function}){
    e = e || window.event;
    e.preventDefault();

    function mouseMove (e:MouseEvent){
        AppCont.current.lastChild.style.top = AppCont.current.lastChild.offsetTop + e.movementY +"px"
        AppCont.current.lastChild.style.left = AppCont.current.lastChild.offsetLeft + e.movementX +"px"
    }
    
    function KeyDown (e: KeyboardEvent){
        if(!AppCont.current.childNodes[3].classList.contains("d-none") || document.querySelector(`.edit-screen [data-select="true"]`)) return
        if(e.code === "Space") {
            e.preventDefault()
            document.body.style.cursor = "-webkit-grabbing"
            document.addEventListener('mousemove', mouseMove)
        }
        if(e.key === "Shift") document.body.style.cursor = "-webkit-zoom-in"
    }
    
    function KeyUp () {
        document.body.style.cursor = "auto"
        document.addEventListener('keydown', KeyDown)
        document.removeEventListener('mousemove', mouseMove)
    }
    function Zoomevent (e: WheelEvent) {
        if(!e.shiftKey) return
        if(e.deltaY < 0) zoomAction.inc()
        else zoomAction.dec()
    }
    
    function MouseLeave (){
        document.removeEventListener('keydown', KeyDown)
        document.removeEventListener('mousemove', mouseMove)
        document.removeEventListener('keyup', KeyUp)
        document.removeEventListener('wheel', Zoomevent)
        AppCont.current.addEventListener("mouseenter", (e: MouseEvent)=>{activateDragPage(e, AppCont, zoomAction)}, { once: true });
        return
    }
    if(!AppCont.current.childNodes[3].classList.contains("d-none")) return
    document.addEventListener('keydown', KeyDown, {once: true})
    document.addEventListener('keyup', KeyUp)
    document.addEventListener('wheel', Zoomevent)
    AppCont.current.addEventListener('mouseleave', MouseLeave, {once: true})
}