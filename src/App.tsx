import React from 'react'
import SideBar from './components/SideBar'
import { htmlComponent } from './vite-env'
import Component from './components/Component'

import "./assets/App.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

type Props = {}

const defaultHTML: htmlComponent = {
  comp_id: "Body",
  textContent: null,
  classes: "",
  style: { margin: "5px" },
  components: [
    {
      comp_id: "1", classes: "",
      components: [{
        comp_id: "1-0", classes: "",
        components: [{
          comp_id: "1-0-0", classes: "",
          components: [],
          textContent: "Div",
          style: { background: "red", display: "flex", width: "2rem", height: "3rem" },
        }],
        textContent: "Div",
        style: { background: "red", display: "flex", width: "2rem", height: "3rem" },
      }],
      textContent: "Div",
      style: { background: "green", padding: "1rem", display: "flex", gap: ".5rem", height: "3rem" },
    }
  ]
}

export default function App({ }: Props) {
  const [html, setHtml] = React.useState(defaultHTML)
  const [zoom, setZoom] = React.useState(7)
  const [selected, setSelected] = React.useState(undefined)

  const searchInHTML =(selected: string|undefined)=>{
    if(!selected) return 
    let splited = selected.split("-")
    let obj = html
    let first = true
    while (splited.length !== 0) {
      let val = first ? parseInt(splited[0])-1 : parseInt(splited[0])
      obj = obj.components[val]
      splited.shift()
    }
    return obj
  }

  return <main>
    <SideBar selected={searchInHTML(selected)}/>
    <section className="render">
      <section className="content" style={{ scale: `${zoom / 10}` }}>
        <div className='body' accessKey="0" style={html.style}>
          <Component props={html} setSelected={setSelected}/>
        </div>
      </section>
      <div className='zoom-container'>
        <button onClick={() => { setZoom(zoom + 1) }}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button onClick={() => { setZoom(zoom - 1) }}>
          <FontAwesomeIcon icon={faMinus} />
        </button>
      </div>
    </section>
  </main>
}