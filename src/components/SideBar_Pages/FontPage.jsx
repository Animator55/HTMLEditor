import { faArrowLeft, faArrowRight, faCaretDown, faCheck, faCircleNotch, faFont, faMagnifyingGlass, faPlus, faStar, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react"
import FilterFontsSpan from "../FilterFontsSpan";
import ScrollBottom from "../../logic/ScrollBottom";
import { getFontsList } from "../../logic/APIs";
import { AuthAlertContext } from '../../App';

import "../../assets/css/itemList.css"

let RequestTimes = 0
const sortFilters = {"alpha": "Alfabético", "date": "Actualizado", "popularity": "Popularidad", "trending": "Tendencia"}

let fontPage = 0
let fontSearch = ""
let sortValue = "popularity"

export default function SideBarFont ({selectedFonts, mainFont, setMainFont}){
    const [fontsList, setFontsList] = React.useState([])
    const [refresh, activateRefresh] = React.useState(false)

    const activateAlert = React.useContext(AuthAlertContext)
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
            return (
                <div 
                    key={Math.random()} 
                    className={selectedFonts.includes(font.family) ? "item-of-list item-of-list-active" : "item-of-list"} 
                    onClick={()=>{
                        if(selectedFonts.includes(font.family))
                            selectedFonts.splice(selectedFonts.indexOf(font.family), 1)
                        else selectedFonts.push(font.family)
                        activateRefresh(!refresh)
                    }}
                >
                    <div>#{i+(fontPage*30)}</div>
                    <div style={{fontFamily: font.family}}>{font.family}</div>
                    <FontAwesomeIcon icon={selectedFonts.includes(font.family) ? faCheck : faPlus}/>
                </div>)
        })

        return <div className="fonts-list">{newList}</div>
    }

    function SelectedList (){
        return (<>
            <div className="custom-font-list span-column" ref={selectedSpan}>
                {selectedFonts.length > 0 ? <>
                    <button 
                        onClick={(e)=>{selectedSpan.current.classList.toggle("expanded", !selectedSpan.current.classList.contains("expanded"))}}
                        className="d-flex align-center" 
                    >
                        <FontAwesomeIcon icon={faFont}/>
                        <div className="margin-auto">Fuentes Seleccionadas {`(${selectedFonts.length})`}</div>
                        <FontAwesomeIcon icon={faCaretDown}/>
                    </button>
                    <div>
                        {selectedFonts.map((customFont, i)=>{
                            return (
                                <div className="d-flex align-center" key={Math.random()} >
                                    <div 
                                        className="item-of-list" 
                                        style={{margin: "10px 25px", fontFamily: customFont}} 
                                        onClick={(e)=>{
                                            if(e.target.className === "item-of-list") {
                                                let selectlist = e.target.parentElement.parentElement.children
                                                let bool = e.target.lastChild.classList.contains("d-none")
                                                for (let i = 0; i < selectlist.length; i++) {
                                                    selectlist[i]?.firstChild?.lastChild?.classList?.add("d-none")
                                                }
                                                e.target.lastChild?.classList?.toggle("d-none", !bool)
                                                setMainFont(mainFont === customFont ? undefined : customFont) 
                                            }
                                        }}
                                    >
                                        #{i+1}
                                        <div></div>
                                        {customFont}
                                        <FontAwesomeIcon icon={faStar} className={mainFont === customFont ? "main-font": "main-font d-none"}/>
                                    </div>
                                    <FontAwesomeIcon 
                                        icon={faXmark} 
                                        onClick={()=>{
                                            let index = selectedFonts.indexOf(customFont)
                                            selectedFonts.splice(index, 1)
                                            selectedSpan.current?.lastChild?.removeChild(selectedSpan.current?.lastChild?.children[index])
                                        }} 
                                        className="margin-right-1rem"/>
                                </div>)
                        })}
                        <ScrollBottom/>
                    </div> 
                </>: null}
            </div>
            <button 
                className="custom-font-list-btn"
                style={!selectedSpan.current?.classList?.contains("expanded") ? {color: "var(--cpurple)"} : {display: "none"}} 
                onClick={()=>{selectedSpan.current?.classList?.toggle("expanded", !selectedSpan.current?.classList?.contains("expanded"))}}
            >
                <FontAwesomeIcon icon={faFont} style={{marginRight: 10}}/>
                Fuentes Seleccionadas {` (${selectedFonts.length})`}
            </button>
        </>)
    }

    return (
        <div>
            <SearchBar/>
            {fontsList.length !== 0 ? 
                <>
                    <PageSelector/>
                    <FontsList/>
                    <SelectedList/>
                </>
            : <FontAwesomeIcon icon={faCircleNotch} spin style={{fontSize: "xx-large", cursor: "progress"}}/>}
        </div>)
}