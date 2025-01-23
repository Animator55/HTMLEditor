import { moduleType } from "../vite-env"

export default function selectInJson(source: string, LocalJSON: {content: moduleType[]}) {
    if(source === "New") return {"key": "New"}
    let Source = source.split("-")
    let sourceObj = LocalJSON.content[parseInt(Source[0])-1]
    let loopIndex = 1

    while (Source.length > loopIndex) {
        if(sourceObj.components) sourceObj = sourceObj.components[parseInt(Source[loopIndex])]
        loopIndex++
    }

    return Object.assign({"key": source}, sourceObj)
}

export function JSONLocationSearch (Location:string[], JSON:{content: moduleType[]}) {
    let LocationObj = JSON.content
    let loopIndex = 1

    while (Location.length > loopIndex) {
        LocationObj = LocationObj[parseInt(Location[loopIndex-1])]?.components!
        loopIndex++
    }

    return LocationObj
}