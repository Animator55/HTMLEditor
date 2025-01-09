/// <reference types="vite/client" />


export type htmlComponent = {
    style: {[key:string]: string}
    components: htmlComponent[]
    textContent: string | null
    classes: string
    comp_id: string
    parentIndex?: string
}
