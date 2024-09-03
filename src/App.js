import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login/login";
import Mainlayout from "./components/mainlayout/index";
import { Toaster } from "react-hot-toast";
import User from "./pages/users/index";
import AddUser from "./pages/users/adduser";
import Comment from "./pages/comments/index";
import AddComment from "./pages/comments/addcomment";

import { theme } from "./theme"
import NeedAuth from "./components/NeedAuth";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Mainlayout />}>
          <Route path="/dashboard" element={<NeedAuth> <Dashboard /></NeedAuth>} />
          <Route path="/users" element={<NeedAuth><User /></NeedAuth>} />
          <Route path="/users/adduser/:id?" element={<NeedAuth><AddUser /></NeedAuth>} />
          <Route path="/comments" element={<NeedAuth>< Comment/></NeedAuth>} />
          <Route path="/comments/addcomment/:id?" element={<NeedAuth><AddComment /></NeedAuth>} />
          <Route path="/comments/addcomment" element={<NeedAuth><AddComment /></NeedAuth>} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
