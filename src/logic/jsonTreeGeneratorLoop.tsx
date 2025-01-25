import { moduleType } from "../vite-env";
import RenderLevel from "./jsonTreeGenerator";

export default function ContinueLoop (props: {array: moduleType[], parentIndex: string, generatePlaces: boolean,refresh: Function}) {
    if(props.array.length === 0) return
    return <RenderLevel {...props}/>
}