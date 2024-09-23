import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import postRequest from "../../request/postRequest";
import getRequest from "../../request/getRequest";
import MoocDropzone from "../../components/moocDropzone";
import VideoUploadZone from "../../pages/courseManagement/VideoUploadZone";

export default function CreateCourse() {
  // 控制加载状态
  const [loading, setLoading] = useState(false);

  // 状态管理
  const [teachers, setTeachers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [coverFile, setCoverFile] = useState(null);
  const [introVideoFile, setIntroVideoFile] = useState(null);

  useEffect(() => {
    // Fetch teachers and categories from backend
    const fetchTeachers = async () => {
      try {
        const result = await getRequest("/api/all-teachers");
        setTeachers(result.data || []);  // 确保teachers为数组
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
    
    const fetchCategories = async () => {
      const result = await getRequest("/categories");
      setCategories(result.data || []);
    };

    
    fetchCategories();
  }, []);

  // 使用 Formik 管理表单状态和验证
  const formik = useFormik({
    initialValues: {
      CourseName: "",
      Description: "",
      CategoryID: "",
      TeacherID: "",
    },
    validationSchema: Yup.object({
      CourseName: Yup.string().required("Course name is required"),
      TeacherID: Yup.string().required("Teacher is required"),
      CategoryID: Yup.string().required("Category is required"),
    }),
    onSubmit: async (inputValues) => {
      const formData = new FormData();
      formData.append("CourseName", inputValues.CourseName);
      formData.append("Description", inputValues.Description);
      formData.append("CategoryID", inputValues.CategoryID);
      formData.append("TeacherID", inputValues.TeacherID);
      formData.append("Cover", coverFile);
      formData.append("IntroductionVideo", introVideoFile);

      // 提交数据到后端
      await postRequest("/courses", formData);
    },
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Select Teacher</InputLabel>
          <Select
            label="Teacher"
            name="TeacherID"
            value={formik.values.TeacherID}
            onChange={formik.handleChange}
            error={formik.touched.TeacherID && Boolean(formik.errors.TeacherID)}
          >
            {/* 使用 teachers.map 来遍历教师数据 */}
            {teachers.map((teacher) => (
              <MenuItem key={teacher.ID} value={teacher.ID}>
                {teacher.username}  {/* 显示教师的名字 */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            label="Category"
            value={formik.values.CategoryID}
            onChange={formik.handleChange}
            name="CategoryID"
            error={formik.touched.CategoryID && Boolean(formik.errors.CategoryID)}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          label="Course Description"
          name="Description"
          value={formik.values.Description}
          onChange={formik.handleChange}
          error={formik.touched.Description && Boolean(formik.errors.Description)}
        />

        <MoocDropzone
          onFileSelect={(file) => setCoverFile(file)}
          label="Upload Course Cover"
        />

        <VideoUploadZone
          onFileSelect={(file) => setIntroVideoFile(file)}
          label="Upload Introduction Video"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Create Course"}
        </Button>
      </form>
    </Box>
  );
}
