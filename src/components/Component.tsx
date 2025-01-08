import { htmlComponent } from '../vite-env'

type Props = {
    props: htmlComponent
    setSelected: Function
}

export default function Component({props,setSelected}: Props) {
    if (props.components.length === 0) return 
    let firstLevelAccKey = 0
    let innerAccKey = 0
    let JSX = props.components.map(module => {
        let completeAccessKey
        firstLevelAccKey++
        completeAccessKey = firstLevelAccKey.toString()
        if(props.parentIndex !== undefined){
            completeAccessKey = props.parentIndex + "-" + innerAccKey
            innerAccKey++
        } 
        return <div
            key={Math.random()}
            accessKey={completeAccessKey}
            className={module.classes}
            style={module.style}
            onClick={()=>{
                setSelected(completeAccessKey)
            }}
        >
            {module.textContent}
            <Component setSelected={setSelected} props={{...module, parentIndex: completeAccessKey}}/>
        </div>
    })

    return JSX
}