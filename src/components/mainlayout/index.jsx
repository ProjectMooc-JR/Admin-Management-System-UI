import React from "react";
import MainSidebar from "./MainSidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

export default function Mainlayout() {
  return (
    <div className="app">
      <MainSidebar />
      <main className="content">
        <Topbar />
        <Outlet />
      </main>
    </div>
  );
}
