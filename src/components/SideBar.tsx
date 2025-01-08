import React from 'react'
import { htmlComponent } from '../vite-env'

type Props = {
  selected: htmlComponent | undefined
}

export default function SideBar({ selected }: Props) {
  const ComponentEditor = () => {
    if (!selected) return
    return <section>
      <p>{selected.comp_id}</p>
      <p>{selected.classes}</p>
      <input placeholder='text' defaultValue={selected.textContent ? selected.textContent : ""}/>
      <div>
        <div>
          <input placeholder="key" />
          <input placeholder="value" />
        </div>
        {Object.keys(selected.style).map(el => {
          return <div
            key={Math.random()}
          >
            <input placeholder="key" defaultValue={el} />
            <input placeholder="value" defaultValue={selected.style[el]} />
          </div>
        })}
      </div>
    </section>
  }
  return <aside className='side-bar'>
    <ComponentEditor />
  </aside>
}