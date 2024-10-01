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
import toast from "react-hot-toast";
import * as Yup from "yup";
import putRequest from "../../request/putRequest";
import getRequest from "../../request/getRequest";
import { useNavigate, useParams } from "react-router-dom";

// import Header from "../../components/Header";

export default function UpdateComment() {
    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const navigate = useNavigate();
    let { id } = useParams();

  useEffect(() => {
    const fetchUsers = async () => {
      
      setLoading(true);
      const result = await getRequest(`/comments/${id}`);

      console.log("comments:", result.data);
      if (result.status == 200) {
        formik.setValues({
          CommentContent: result.data.CommentContent,
          CommentTime: formatDateToYYYYMMDD(new Date(result.data.CommentTime)),
        });
      }
      // console.log("Fetched users:", JSON.stringify(result.data));
      setLoading(false);
    };
    fetchUsers();
  }, []);

  // useEffect(() => {
  //   const fetchCourseAsync =async () => {
  //     setLoading(true);
  //     const result = await getRequest("/courses");

  const handleSelectedUser = (value) => {
    console.log("value", value);
    setSelectedUser(value);
  };

  const handleSelectedCourse = (value) => {
    console.log("value", value);
    setSelectedCourse(value);
  }

  function formatDateToYYYYMMDD(date) {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");
    let timeFormat = `${year}-${month}-${day}`;
    console.log("formatDateToYYYYMMDD", timeFormat);
    return timeFormat;
  }

  const formik = useFormik({
    initialValues: {
      CommentContent: "",
      CommentTime: "2022/01/01",
    },
    validationSchema: Yup.object({
      CommentContent: Yup.string()
      .max(100, "Must be 100 characters or less")
      .required("Required"),
    }),

    onSubmit: async (inputValues) => {
      let result = await putRequest(`/comments/${id}`, {
        Course_id:selectedCourse.id,
        User_id: selectedUser.id,
        CommentContent: inputValues.CommentContent,
        CommentTime: inputValues.CommentTime,
        // Specialization: inputValues.Specialization,
        // Description: inputValues.Description,
        // HireDate: inputValues.HireDate,
        // HireStatus: inputValues.HireStatus,
        // MobileNum: inputValues.MobileNum,
        // LinkedInLink: inputValues.LinkedInLink,
      });

      if (result.status === 201) {
        toast.success("Comment update successfully.");
      } else {
        toast.error("failed to update comment.");
      }
    },
  });

  const handleCancel = () => {
    formik.resetForm();
    navigate("/comments");
  };

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
      {/* <button onClick={() => navigate("/teachers")}>Back</button> */}
      {/* <Autocomplete
        options={users}
        getOptionLabel={(option) => option.username}
        loading={loading}
        // onChange={(event, value) => setSelectedUser(value)}
        onChange={(event, value) => handleSelectedUser(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Selected User"
            variant="filled"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      /> */}
      <form onSubmit={formik.handleSubmit} class="add-teacher-form" >
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Comment Content"
          name="CommentContent"
          onChange={formik.handleChange}
          value={formik.values.CommentContent}
          error={formik.touched.CommentContent && Boolean(formik.errors.CommentContent)}
          helperText={formik.touched.CommentContent && formik.errors.CommentContent}
          autoFocus
        />
        <TextField
          fullWidth
          variant="filled"
          type="date"
          label="Comment Time"
          name="CommentTime"
          value={formik.values.CommentTime}
          onChange={formik.handleChange}
          error={formik.touched.CommentTime && Boolean(formik.errors.CommentTime)}
          helperText={formik.touched.CommentTime && formik.errors.CommentTime}
        />  
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: "400px", flex: 1 }}
          >
            Save updated information
          </Button>
          <Button
            type="button"
            variant="contained"
            color="primary"
            sx={{ width: "400px", flex: 1 }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
}
