// import React, { useState } from 'react';
// import { Container, Grid, TextField, Button, Box, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';  // 引入 useNavigate 以便进行页面跳转
// import axios from 'axios';
// import MoocDropzone from "../../components/moocDropzone";

// export default function CreateCourse() {
//   const navigate = useNavigate();  // 用于页面跳转
//   const [courseData, setCourseData] = useState({
//     CourseName: '',
//     Description: '',
//     CategoryID: '',
//     Cover: '',
//     TeacherID: '',
//     PublishedAt: '',
//   });

//   const handleChange = (e) => {
//     setCourseData({
//       ...courseData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async () => {
//     try {
//       // 提交数据到后端 API
//       courseData.cover=avatarData;
//       const response = await axios.post('/api/courses', courseData);
//       console.log('Course Created:', response.data);

//       // 创建成功后跳转到课程管理页面
//       navigate('/course-management');
//     } catch (error) {
//       console.error('Error creating course:', error);
//     }
//   };

//   const [avatarData, setAvatarData] = useState("");
//   const handleAvatarResult = (result) => {
//     setAvatarData(result);
//   };

//   return (
//     <Container>
//       <Box sx={{ padding: 3 }}>
//         <Typography variant="h4" gutterBottom>
//           Create New Course
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Course Name"
//               name="CourseName"
//               value={courseData.CourseName}
//               onChange={handleChange}
//               required
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Description"
//               name="Description"
//               value={courseData.Description}
//               onChange={handleChange}
//               required
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Category ID"
//               name="CategoryID"
//               value={courseData.CategoryID}
//               onChange={handleChange}
//               required
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             {/* <TextField
//               fullWidth
//               label="Cover URL"
//               name="Cover"
//               value={courseData.Cover}
//               onChange={handleChange}
//               required
//             /> */}
//              <MoocDropzone avatarResult={handleAvatarResult} notes='select a course cover' />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Teacher ID"
//               name="TeacherID"
//               value={courseData.TeacherID}
//               onChange={handleChange}
//               required
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Published At"
//               name="PublishedAt"
//               type="datetime-local"
//               value={courseData.PublishedAt}
//               onChange={handleChange}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//               required
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Button variant="contained" color="primary" onClick={handleSubmit}>
//               Create Course
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>
//     </Container>
//   );
// }


import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  // Stack,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
// import toast from "react-hot-toast";
import * as Yup from "yup";
import postRequest from "../../request/postRequest";
import getRequest from "../../request/getRequest";
// import Header from "../../components/Header";
import MoocDropzone from "../../components/moocDropzone";

export default function CreateCourse() {

  // 控制加载的状态
  const [loading, setLoading] = useState(false);

  const [avatarData, setAvatarData] = useState("");
  const handleAvatarResult = (result) => {
    setAvatarData(result);
  };

  // 使用 Formik 管理表单状态和验证
  const formik = useFormik({
    initialValues: {
    CourseName: '',
    Description: '',
    CategoryID: '',
    Cover: '',
    TeacherID: '',
    PublishedAt: '',
    },

    validationSchema: Yup.object({
      CourseName: Yup.string().required("CourseName is required"),
    }),
    onSubmit: async (inputValues) => {
      let result = await postRequest("/courses", {
        CourseName: inputValues.CourseName,
        Description: inputValues.Description,
        Cover:avatarData,
        CategoryID: 1,
        TeacherID: 1
      });

      if (result.status === 201) {
        alert("Add course successfully");
      } else {
        alert("Add course failed");
      }
    },
  });
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        boxShadow: 1,
        borderRadius: 2,
        p: 2,
        minWidth: 300,
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
    
      <form onSubmit={formik.handleSubmit} className="add-teacher-form">
      <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Course Name"
          name="CourseName"
          value={formik.values.CourseName}
          onChange={formik.handleChange}
          error={
            formik.touched.CourseName &&
            Boolean(formik.errors.CourseName)
          }
          helperText={
            formik.touched.CourseName && formik.errors.CourseName
          }
        />
        <MoocDropzone avatarResult={handleAvatarResult} notes='select a course cover' />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: "400px" }}
        >
          Transform this user to teacher
        </Button>
      </form>
    </Box>
  );
}
