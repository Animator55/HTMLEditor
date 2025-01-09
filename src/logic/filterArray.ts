export default function filterArray (value, array, filter) {
    if(value === "") return []
    let regex = new RegExp(value, "i")
    let copiedArray = [...array]
    let filtred = copiedArray.filter(item=>{
        let itemFiltered = filter !== undefined ? item[filter] : item
        if (regex.test(itemFiltered)) {
            return item
        }
    })
    return filtred
}