import { htmlComponent } from "../vite-env";
import RenderLevel from "./jsonTreeGenerator";

type PropsPlace = {
    props: {
        array: Array<htmlComponent | "placeholder">
        selectItem: Function
        parentIndex?: string
    }
}
export default function ContinueLoop ({props}:PropsPlace) {
    if(props.array.length === 0) return
    return <RenderLevel {...{props}}/>
}