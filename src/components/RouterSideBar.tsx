import React from "react";
import "../assets/css/sidebar.css";

export default function RouterSideBar ({selected}){
    const toggleVisibility = (e) => {e.target.nextSibling.classList.toggle("expanded")}

    const checkSelect = (name)=>{
        if(selected === name) return "selected-page"
        return ""
    }

    return <div className="side-bar router">
        <a href="/"><button className={checkSelect("Home")}>Acceso rápido</button></a>
        <span> 
            <button onClick={toggleVisibility}>Sitio Web</button>
            <div className="span-column">
                <a href="/views"><button className={checkSelect("Views")}>Editor de Sitio</button></a>
                <a href="/componentes"><button className={checkSelect("Components")}>Editor de componentes</button></a>
                <a href="/seo"><button>SEO</button></a>
                <a href="/css"><button className={checkSelect("css")}>CSS</button></a>
                {/* <a href="/animaciones"><button>Animaciones</button></a> */}
            </div>
        </span>
        <a href="/productos"><button className={checkSelect("Products")}>Productos</button></a>
        {/* <span> 
            <button onClick={(e)=>{
                e.target.nextSibling.classList.toggle("expanded", 
                !e.target.nextSibling.classList.contains("expanded"))
            }}>Productos</button>
            <div className="span-column">
                <a href="/productos"><button>Productos Fisicos</button></a>
                <a href="/productos"><button>Productos Virtuales</button></a>
                <a href="/servicios"><button>Servicios</button></a>
            </div>
        </span> */}
        <span> 
            <button onClick={toggleVisibility}>Categorías</button>
            <div className="span-column">
                <a href="/secciones"><button>Secciones</button></a>
                <a href="/tags"><button>Tags</button></a>
                {/* <a href="/tags-ocultas"><button>Tags ocultas</button></a> */}
            </div>
        </span>
        <a href="/imagenes"><button>Imágenes</button></a>
        {/* <span> 
            <button onClick={toggleVisibility}>Multimedia</button>
            <div className="span-column">
                <a href="/imagenes"><button>Imágenes</button></a>
                <a href="/videos"><button>Videos</button></a>
                <a href="/tags"><button>Modelos</button></a>
            </div>
        </span> */}
        <a href="/ventas"><button>Ventas</button></a>
        {/* <span> 
            <button onClick={toggleVisibility}>Ventas</button>
            <div className="span-column">
                <a href="/ventas"><button>Pedidos</button></a>
                <a href="/ventas"><button>Carritos Abandonados</button></a>
                <a href="/agenda"><button>Agenda</button></a>
            </div>
        </span> */}
        <span> 
            <button onClick={toggleVisibility}>Marketing</button>
            <div className="span-column">
                <a href="/promos"><button>Promos</button></a>
                <a href="/newsletter"><button>Newsletter</button></a>
            </div>
        </span>
        <span> 
            <button onClick={toggleVisibility}>Emails</button>
            <div className="span-column">
                <a href="/cuentas"><button>Cuentas</button></a>
                <a href="/newsletter"><button>Newsletter</button></a>
                <a href="/send-massive"><button>Enviar Masivamente</button></a>
            </div>
        </span>
        <span> 
            <button onClick={toggleVisibility}>Configuracion</button>
            <div className="span-column">
                <a href="/pagos"><button>Pagos</button></a>
                <a href="/envios"><button>Envíos</button></a>
                <a href="/configuracion/usuarios"><button>Usuarios</button></a>
                <a href="/configuracion/aplicaciones"><button>Aplicaciones</button></a>
            </div>
        </span>
    </div>
}