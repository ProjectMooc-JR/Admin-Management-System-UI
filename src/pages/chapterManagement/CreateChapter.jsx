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
import { useParams } from "react-router-dom";

export default function CreateChapter() {
  // 控制加载的状态
  const [loading, setLoading] = useState(false);
  let { courseid } = useParams();
  console.log("CreateChapter", courseid);
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
     ChapterTitle: "",
     ChapterDescription: "",
     ChapterOrder: "",
    },

    validationSchema: Yup.object({
        ChapterTitle: Yup.string().required("ChapterTitle is required"),
    }),
    onSubmit: async (inputValues) => {
      const formData = new FormData();
      formData.append("file", videoFile);
      formData.append("ChapterTitle", inputValues.ChapterTitle);
      formData.append("ChapterDescription", inputValues.ChapterDescription);
      formData.append("ChapterOrder", inputValues.ChapterOrder);
      formData.append("CourseID", courseid);
      
      let result = await postRequest("/chapters", formData);

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
          label="Chapter title"
          name="ChapterTitle"
          value={formik.values.ChapterTitle}
          onChange={formik.handleChange}
          error={formik.touched.ChapterTitle && Boolean(formik.errors.ChapterTitle)}
          helperText={formik.touched.ChapterTitle && formik.errors.ChapterTitle}
        />
         <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Course Description"
          name="ChapterDescription"
          value={formik.values.ChapterDescription}
          onChange={formik.handleChange}
          error={formik.touched.ChapterDescription && Boolean(formik.errors.ChapterDescription)}
          helperText={formik.touched.ChapterDescription && formik.errors.ChapterDescription}
        />
        <TextField
          fullWidth
          variant="filled"
          type="number"
          label="Course Order"
          name="ChapterOrder"
          value={formik.values.ChapterOrder}
          onChange={formik.handleChange}
          error={formik.touched.ChapterOrder && Boolean(formik.errors.ChapterOrder)}
          helperText={formik.touched.ChapterOrder && formik.errors.ChapterOrder}
        />
         <VideoUploadZone onVideoUpload={handleVideoUpload} />        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: "400px" }}
        >
          Add Chapter
        </Button>
      </form>
    </Box>
  );
}
