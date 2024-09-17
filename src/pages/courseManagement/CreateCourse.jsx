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
import VideoUploadZone from "../../pages/courseManagement/VideoUploadZone";

export default function CreateCourse() {

  // 控制加载的状态
  const [loading, setLoading] = useState(false);

  const [avatarData, setAvatarData] = useState("");
  const handleAvatarResult = (result) => {
    setAvatarData(result);
  };

  const [videoFile, setVideoFile] = useState(null);

  const handleVideoUpload = (file) => {
    setVideoFile(file); // Store the uploaded video file in state
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("courseVideo", videoFile); // Add the video file to FormData for submission
    // Add other form fields as necessary

    // Submit the form data, e.g., via fetch or axios
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
      <form onSubmit={handleSubmit}>
      {/* Other form fields */}
      <VideoUploadZone onVideoUpload={handleVideoUpload} />
      <button type="submit">Create Course</button>
      </form>
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
