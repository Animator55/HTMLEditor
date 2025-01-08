import React from "react";

export const drag = (e: React.MouseEvent)=>{
    const move = (e2: MouseEvent)=>{
        console.log(e2)
    }
    const drop = (e2: MouseEvent)=>{
        document.removeEventListener("mousemove", move)
        document.removeEventListener("mouseup", drop)
    }

    document.addEventListener("mousemove", move)
    document.addEventListener("mouseup", drop)
}