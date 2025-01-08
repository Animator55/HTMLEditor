import React from 'react'
import { htmlComponent } from '../vite-env'

type Props = {
    selected: htmlComponent | undefined
}

export default function SideBar({selected}: Props) {
    const ComponentEditor = ()=>{
        if(!selected) return
        return <section>
            <p>{selected.comp_id}</p>
            <p>{selected.classes}</p>
            <div>{selected.textContent}</div>
        </section>
    }
  return <aside className='side-bar'>
    <ComponentEditor/>
  </aside>
}