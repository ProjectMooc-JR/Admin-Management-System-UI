import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login/login";
import Mainlayout from "./components/mainlayout/index";
import { Toaster } from "react-hot-toast";
import User from "./pages/users/index";
import Teacher from "./pages/teacher/index";
import AddUser from "./pages/users/adduser";
import Addteacher from "./pages/teacher/addteacher";
import Comment from "./pages/comments/index";
import AddComment from "./pages/comments/addcomment";
import CourseManagement from "./pages/courseManagement/CourseManagement";
import CourseCategory from "./pages/courseCategory/index";
import AddCourseCategory from "./pages/courseCategory/addcoursecategory";
import CreateCourse from "./pages/courseManagement/CreateCourse";
import CourseSchedule from './pages/courseSchedule/index'

import { theme } from "./theme";
import NeedAuth from "./components/NeedAuth";
import UpdateCourseCategory from "./pages/courseCategory/updatecoursecategory";

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
            path="/teachers"
            element={
              <NeedAuth>
                <Teacher />
              </NeedAuth>
            }
          />
          <Route
            path="/teachers/addteacher"
            element={
              <NeedAuth>
                <Addteacher />
              </NeedAuth>
            }
          />
          <Route
            path="/courseCategory"
            element={
              <NeedAuth>
                <CourseCategory />
              </NeedAuth>
            }
          />
          <Route
            path="/courseCategory/addCategory"
            element={
              <NeedAuth>
                <AddCourseCategory />
              </NeedAuth>
            }
          />
          <Route
            path="/courseCategory/updateCategory/:id"
            element={
              <NeedAuth>
                <UpdateCourseCategory />
              </NeedAuth>
            }
          />
          <Route
            path="/comments"
            element={
              <NeedAuth>
                <Comment />
              </NeedAuth>
            }
          />
          <Route
            path="/comments/addcomment/:id?"
            element={
              <NeedAuth>
                <AddComment />
              </NeedAuth>
            }
          />
          <Route
            path="/comments/addcomment"
            element={
              <NeedAuth>
                <AddComment />
              </NeedAuth>
            }
          />
          <Route path="/courses/create" element={<NeedAuth><CreateCourse/></NeedAuth>}  />
          <Route
            path="/course-management"
            element={
              <NeedAuth>
                <CourseManagement />
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
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
