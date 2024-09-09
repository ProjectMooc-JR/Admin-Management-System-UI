import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login/login";
import Mainlayout from "./components/mainlayout/index";
import { Toaster } from "react-hot-toast";
import User from "./pages/users/index";
import Teacher from "./pages/teacher/index";
import AddUser from "./pages/users/adduser";
import CourseSchedule from "./pages/courseSchedule/index";
import AddCourseSchedule from "./pages/courseSchedule/addcourseschedule";

import { theme } from "./theme";
import NeedAuth from "./components/NeedAuth";
import CourseScheduleList from "./pages/courseSchedule/courseschedulelist";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Mainlayout />}>
          <Route
            path="/dashboard"
            element={
              <NeedAuth>
                {" "}
                <Dashboard />
              </NeedAuth>
            }
          />
          <Route
            path="/users"
            element={
              <NeedAuth>
                <User />
              </NeedAuth>
            }
          />
          <Route
            path="/users/adduser/:id?"
            element={
              <NeedAuth>
                <AddUser />
              </NeedAuth>
            }
          />
          <Route
            path="/courseSchedule"
            element={
              <NeedAuth>
                <CourseSchedule />
              </NeedAuth>
            }
          />
          <Route
            path="/courseSchedule/addcourseschedule/:id?"
            element={
              <NeedAuth>
                <AddCourseSchedule />
              </NeedAuth>
            }
          />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
