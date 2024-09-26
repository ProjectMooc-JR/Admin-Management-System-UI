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


export default function CreateCourse() {
  // 控制加载状态
  const [loading, setLoading] = useState(false);

  // 状态管理
  const [teachers, setTeachers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [coverFile, setCoverFile] = useState(null);


  useEffect(() => {
    // Fetch teachers and categories from backend
    const fetchTeachers = async () => {
      try {
        const result = await getRequest("/courses/all-teachers");
        if (result.status == 200) {
          setTeachers(result.data.items || []); // 确保teachers为数组
        } else {
          setTeachers([]); // 确保teachers为数组
        }
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();

    const fetchCategories = async () => {
      const result = await getRequest("/courseCategory/1/500000");
      if (result.status == 200) {
        setCategories(result.data.items);
      } else {
        setCategories([]);
      }
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
      

      // 提交数据到后端
      await postRequest("/courses", formData);
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

      <form onSubmit={formik.handleSubmit}>
      <TextField
          fullWidth
          variant="filled"
          margin="normal"
          label="Course Name"
          name="CourseName"
          value={formik.values.CourseName}
          onChange={formik.handleChange}
          error={
            formik.touched.CourseName && Boolean(formik.errors.CourseName)
          }
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Select Teacher</InputLabel>
          <Select
            variant="filled"
            label="Teacher"
            name="TeacherID"
            value={formik.values.TeacherID}
            onChange={formik.handleChange}
            error={formik.touched.TeacherID && Boolean(formik.errors.TeacherID)}
          >
            {/* 使用 teachers.map 来遍历教师数据 */}
            {teachers.map((teacher) => (
              <MenuItem key={teacher.ID} value={teacher.ID}>
                {teacher.username} {/* 显示教师的名字 */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            variant="filled"
            label="Category"
            value={formik.values.CategoryID}
            onChange={formik.handleChange}
            name="CategoryID"
            error={
              formik.touched.CategoryID && Boolean(formik.errors.CategoryID)
            }
          >
            {categories.map((category) => (
              <MenuItem key={category.ID} value={category.ID}>
                {category.CategoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          variant="filled"
          margin="normal"
          label="Course Description"
          name="Description"
          multiline
          value={formik.values.Description}
          onChange={formik.handleChange}
          error={
            formik.touched.Description && Boolean(formik.errors.Description)
          }
        />

        <MoocDropzone
          onFileSelect={(file) => setCoverFile(file)}
          label="Upload Course Cover"
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
