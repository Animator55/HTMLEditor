/// <reference types="vite/client" />


export type htmlComponent = {
    style: {[key:string]: string}
    components: htmlComponent[]
    textContent: string | null
    classes: string
    comp_id: string
    parentIndex?: string
}

export type moduleType = {
    "type"?: string, 
    components?: moduleType[], 
    moduleKey?: string
    key?: string
    "data": {
        "className": string, 
        type?: string,
        text?: string,
        src?: string,
        tags?: string[],
        "style": {[key:string] :string}
    }
    select?: string
    setSelected?: Function
    parentIndex?: string
    generatePlaces?: boolean
}
