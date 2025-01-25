import AdminEditor from "./screens/AdminEditor";
import "./assets/css/styles.css"

export default function App() {
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
    return <AdminEditor />
}