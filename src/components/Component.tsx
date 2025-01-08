import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { drag } from '../logic/resizeDrag'
import { htmlComponent } from '../vite-env'
import { faArrows } from '@fortawesome/free-solid-svg-icons'

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
            onClick={(e)=>{
                let target = e.target as HTMLElement
                if(target)setSelected(target.accessKey)
            }}
        >
            <span className='move'
                onMouseDown={drag}><FontAwesomeIcon icon={faArrows}/></span>
            {/* <span className='resize'
                onMouseDown={drag}
            ></span> */}
            {module.textContent}
            <Component setSelected={setSelected} props={{...module, parentIndex: completeAccessKey}}/>
        </div>
    })

    return JSX
}