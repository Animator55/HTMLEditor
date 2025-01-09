import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import AuthScreens from "./screens/AuthScreens";
import Stats from "./screens/Stats";
import Config from "./screens/Config";
import Help from "./screens/Help";
import AdminEditor from "./screens/AdminEditor";
import ProjectSelect from "./screens/ProjectSelect";
import AuthComponent from "./components/AuthComponent";
import ListsPage from "./screens/ListsPage";
import RegisterForm from "./screens/RegisterForm";
import Toast from "./components/Toast";
import CSS from "./screens/CSS";

import "./assets/css/styles.css"

export const AuthAlertContext = React.createContext(null);
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