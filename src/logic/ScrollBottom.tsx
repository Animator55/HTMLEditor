import React from "react";

export default function ScrollBottom(){
    const elementRef = React.useRef<HTMLDivElement|null>(null);
    React.useEffect(() => elementRef.current?.scrollIntoView());
    return <div ref={elementRef} />;
}