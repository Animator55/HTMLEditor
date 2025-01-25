
export default function checkMoveToChild (source: string, target: string) {
    if(source === undefined || target === undefined) return  
    //check if the move is from a parent to his child
    let Source = source.split("-")
    let Target = target.split("-")
    if(Source[Source.length-1] === ".") Source.pop()
    if(Target[Target.length-1] === ".") Target.pop()

    if(Source.length <= Target.length) {
        let result = Source.some((num, index)=>{
            return num !== Target[index]
        })
        // console.log(result ? "renderizar places" : "no renderizar places")
        return result
    }
    return true
}
