import RenderLevel from "./jsonTreeGenerator";

export default function ContinueLoop (props) {
    if(props.array.length === 0) return
    return <RenderLevel {...props}/>
}