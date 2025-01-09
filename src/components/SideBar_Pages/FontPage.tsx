import { faArrowLeft, faArrowRight, faCaretDown, faCheck, faCircleNotch, faFont, faMagnifyingGlass, faPlus, faStar, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react"
import FilterFontsSpan from "../FilterFontsSpan";
import ScrollBottom from "../../logic/ScrollBottom";
import { getFontsList } from "../../logic/APIs";
import { AuthAlertContext } from '../../App';

import "../../assets/css/itemList.css"
import { GlobalFunctions } from "../../screens/AdminEditor";

let RequestTimes = 0
const sortFilters = {"alpha": "Alfabético", "date": "Actualizado", "popularity": "Popularidad", "trending": "Tendencia"}

let fontPage = 0
let fontSearch = ""
let sortValue = "popularity"

export default function SideBarFont ({selectedFonts}){
    const [fontsList, setFontsList] = React.useState([])
    const [refresh, activateRefresh] = React.useState(false)

    let selectedArray = Object.keys(selectedFonts)

    const activateAlert = React.useContext(AuthAlertContext)
    const Global = React.useContext(GlobalFunctions)
    const selectedSpan = React.useRef()

    /// Get Data
    async function getFonts(){
        let list = await getFontsList(fontSearch, sortValue, fontPage)
        if(list !== "auth" && list !== undefined) setFontsList(list)
        else if(list === "auth") activateAlert(true)
    }

    if((fontsList.length === 0 && RequestTimes < 1) && fontsList.length < 29) {RequestTimes++; getFonts()}
    if(fontsList.length === 30) RequestTimes = 0;

    const reloadList = () => {
        RequestTimes = 0
        setFontsList([])
    }

    /// Components
    function SearchBar (){
        return (
            <div className="d-flex align-center">
                <input className="w-100" style={{margin: "0 10px"}} onBlur={(e)=>{fontSearch = e.target.value; reloadList()}} defaultValue={fontSearch}/>
                {fontsList.length === 0 ?
                    <button 
                        className="btn-expand" 
                        onClick={(e)=>{
                            fontPage = 0; fontSearch = ""; e.target.parentElement.children[0].value = ""; reloadList();
                        }}
                    >
                        <FontAwesomeIcon icon={faXmark} className="margin-right-5px"/>
                        <h5>Cancelar</h5>
                    </button>
                : 
                    <button 
                        className="btn-expand" 
                        onClick={()=>{fontPage = 0; reloadList();}}
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="margin-right-5px"/>
                        <h5>Buscar</h5>
                    </button>
                }
                <FilterFontsSpan filters={sortFilters} selected={sortValue} click={(key)=>{fontPage = 0; sortValue = key; reloadList()}} />
            </div>
        )
    }

    function PageSelector(){
        let JSX = []
        for (let index = -3; index < 4; index++) {
            if(fontPage+index > -1) {
                if(index === 0) JSX.push(<div key={Math.random()}>{fontPage}</div>)
                else JSX.push(
                    <button 
                        className="btn-2"  
                        key={Math.random()}
                        onClick={()=>{fontPage = fontPage+index; reloadList()}}
                    >
                        {fontPage+index}
                    </button>
                )
            }
            else JSX.push(<div key={Math.random()}></div>)
            
        }
        return (
            <div className="d-flex" style={{justifyContent: "space-between"}}>
                <button className="btn-2" onClick={()=>{
                    if(fontPage !== 0){fontPage = fontPage-1; reloadList()}
                }}>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </button>

                <div className="font-pages-list">{JSX}</div>
                
                <button className="btn-2" onClick={()=>{fontPage = fontPage+1; reloadList()}}>
                    <FontAwesomeIcon icon={faArrowRight}/>
                </button>
            </div>
        )
    }

    function FontsList () {
        if(fontsList.length === 0) return <div>Error</div>
        let newList = fontsList.map((font, i)=>{
            return <div 
                    className={selectedArray?.includes(font.family) ? "list-item-editor selected" : "list-item-editor"}
                    key={Math.random()}
                >
                    <button>
                        <p>#{i+(fontPage*30)}</p>
                        <p style={{fontFamily: font.family}}>{font.family}</p>
                    </button>
                    <button onClick={()=>{
                        if(selectedArray.includes(font.family))
                            delete selectedFonts[font.family]
                        else selectedFonts[font.family] = {...font}
                        activateRefresh(!refresh)
                    }}>
                        <FontAwesomeIcon icon={selectedArray.includes(font.family) ? faCheck : faPlus}/>
                    </button>
                </div>
        })

        return <ul className="item-list-editor">{newList}</ul>
    }

    function SelectedList (){
        return (<>
            <div className="custom-font-list span-column" ref={selectedSpan}>
                {selectedArray?.length > 0 ? <>
                    <button 
                        onClick={(e)=>{selectedSpan.current.classList.toggle("expanded")}}
                        className="d-flex align-center" 
                    >
                        <FontAwesomeIcon icon={faFont}/>
                        <div className="margin-auto">Fuentes Seleccionadas {`(${selectedArray.length})`}</div>
                        <FontAwesomeIcon icon={faCaretDown}/>
                    </button>
                    <div className="item-list-editor">
                        {selectedArray.map((customFont, i)=>{
                            return <div 
                                className="list-item-editor"
                                key={Math.random()}
                            >
                                <button 
                                    onClick={(e)=>{
                                        if(!e.target.lastChild.classList.contains("d-none")) return
                                        let selectlist = e.target.parentElement.parentElement.children
                                        for (let i = 0; i < selectlist.length; i++) {
                                            selectlist[i]?.firstChild?.lastChild?.classList?.add("d-none")
                                        }
                                        e.target.lastChild?.classList?.remove("d-none")
                                        Global.mainFont.setMainFont(customFont) 
                                    }}>
                                    <p style={{fontFamily: customFont}}>{customFont}</p>
                                    <FontAwesomeIcon icon={faStar} className={Global.mainFont.font === customFont ? "main-font": "main-font d-none"}/>
                                </button>
                                <button onClick={()=>{
                                    let index = selectedArray.indexOf(customFont)
                                    delete selectedFonts[customFont]
                                    selectedSpan.current?.lastChild?.removeChild(selectedSpan.current?.lastChild?.children[index])
                                    activateRefresh(!refresh)
                                }} >
                                    <FontAwesomeIcon icon={faXmark}/>
                                </button>
                            </div>
                        })}
                        <ScrollBottom/>
                    </div> 
                </>: null}
            </div>
        </>)
    }

    return (
        <div className="component-editor">
            <SearchBar/>
            {fontsList.length !== 0 ? 
                <>
                    <PageSelector/>
                    <FontsList/>
                    <SelectedList/>
                    <button 
                        className="custom-font-list-btn"
                        onClick={()=>{selectedSpan.current?.classList?.toggle("expanded", !selectedSpan.current?.classList?.contains("expanded"))}}
                    >
                        <FontAwesomeIcon icon={faFont} style={{marginRight: 10}}/>
                        Fuentes Seleccionadas {` (${selectedArray?.length})`}
                    </button>
                </>
            : <FontAwesomeIcon icon={faCircleNotch} spin style={{fontSize: "xx-large", cursor: "progress"}}/>}
        </div>)
}