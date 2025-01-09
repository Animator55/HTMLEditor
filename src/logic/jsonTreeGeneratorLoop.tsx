import RenderLevel from "./jsonTreeGenerator";

export default function ContinueLoop ({props}:{props:any}) {
    if(!props.array || props.array.length === 0) return
    return <RenderLevel {...props}/>
}