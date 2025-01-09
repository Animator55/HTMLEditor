
export default function convertCSS (css){
    let displayCss = {}
    const getStyles = (classe ,entry)=>{
        let objectStyle = {}
        for(let j=0; j<classe[entry]?.length; j++){
            objectStyle[classe[entry][j].key] = classe[entry][j].value
        }
        return objectStyle
    }
    for(let i=0; i<css.length; i++){
        displayCss[css[i].name] = {
            "style": getStyles(css[i], "style"),
            "hover": getStyles(css[i], "hover")
        }
    }

    return displayCss
}

export function getCSSNames (css){
    return css.map(el=>{return el.name}) 
}