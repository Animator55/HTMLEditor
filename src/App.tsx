import React from "react";
import AdminEditor from "./screens/AdminEditor";
import Toast from "./components/Toast";
import "./assets/css/styles.css"

export const ToastContext = React.createContext(null);

export default function App() {
    const [toastData, activateToast] = React.useState([false])

    const desactivateToast = () => {
        toastData.splice(0, 2, false)
    }
    // const logout = () => {
    //     window.localStorage.setItem("userId", "")
    //     window.localStorage.setItem("userName", "")
    //     window.localStorage.setItem("sessionId", "")
    //     console.log("cleaned local Data", 
    //         {"userid": window.localStorage.getItem("userId"),
    //         userName: window.localStorage.getItem("userName"),
    //         sessionId: window.localStorage.getItem("sessionId")}
    //     )
    // }
    return (<>
        {toastData[0] ? <Toast data={toastData[1]} desactivateToast={desactivateToast} /> : null}
        <ToastContext.Provider value={activateToast}>
            <AdminEditor type="editor" />
        </ToastContext.Provider>
    </>)
}