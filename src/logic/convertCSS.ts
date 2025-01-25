
export default function convertCSS (css: {[key: string]: any}[]){
    let displayCss: {[key:string]: {[key:string]: {[key: string]: string}}} = {}
    const getStyles = (classe:{[key:string]: any[]},entry: string)=>{
        let objectStyle: {[key:string]: string} = {}
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

export function getCSSNames (css: {name: string}[]){
    return css.map(el=>{return el.name}) 
}