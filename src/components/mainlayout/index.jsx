import React ,{useEffect, useState}from "react";
import MainSidebar from "./MainSidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";
import { createTheme } from "@mui/material/styles";

export default function Mainlayout() {
  const [mode, setMode] = useState('light');
 // 根据当前的模式创建主题
 const theme = createTheme({
  palette: {
    mode: mode,
  },
});
const toggleMode = () => {
  setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
};
useEffect(()=>{
  console.log('Mode changed to:', mode);

},[mode])
  return (
    <div className="app">
      <MainSidebar />
      <main className="content">
        <Topbar toggleMode={toggleMode}/>
        <Outlet />
      </main>
    </div>
  );
}
