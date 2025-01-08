export default function selectInJson(source, LocalJSON) {
    if(source === "New") return {"key": "New"}
    let Source = source.split("-")
    let sourceObj = LocalJSON.content[Source[0]-1]
    let loopIndex = 1

    while (Source.length > loopIndex) {
        sourceObj = sourceObj.components[Source[loopIndex]]
        loopIndex++
    }

    return Object.assign({"key": source}, sourceObj)
}

export function JSONLocationSearch (Location, JSON) {
    let LocationObj = JSON.content
    let loopIndex = 1

    while (Location.length > loopIndex) {
        LocationObj = LocationObj[Location[loopIndex-1]]?.components
        loopIndex++
    }

    return LocationObj
}