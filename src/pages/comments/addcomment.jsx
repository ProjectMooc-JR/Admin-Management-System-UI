import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import postRequest from "../../request/postRequest";
import Header from "../../components/Header";
import Autocomplete from "@mui/material/Autocomplete";
import getRequest from "../../request/getRequest";
import putRequest from "../../request/putRequest";
import { Navigate, useParams, useNavigate } from "react-router-dom";

export default function AddComment() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  let { id } = useParams();

    // check the id. If it has one, then update
  const isUpdateMode = id !== undefined;

  useEffect(() => {
    const fetchUserAsync = async () => {
      setLoading(true);
      const result = await getRequest("/users");
      setUsers(Array.isArray(result.data) ? result.data : []);
      console.log("Fetched users:", result.data);
      setLoading(false);
    };
    fetchUserAsync();
  }, []);

  useEffect(() => {
    const fetchCourseAsync = async () => {
      setLoading(true);
      const result = await getRequest("/courses");
      console.log("Fetched courses:", result.data);
      if (result.status === 200) {
        setCourses(Array.isArray(result.data) ? result.data : []);
      }
      setLoading(false);
    };
    fetchCourseAsync();
  }, []);

  const handleSelectedUser = (value) => {
    console.log("value", value);
    formik.setFieldValue("User_id", value.id);
    setSelectedUser(value);
  };

  const handleSelectedCourse = (value) => {
    console.log("value", value);
    formik.setFieldValue("Course_id", value.ID);
    setSelectedCourse(value);
  };

  const formik = useFormik({
    initialValues: {
      //CourseName: "",
      Course_id: -1,
      User_id: -1,
      //username: "",
      CommentContent: "",
      CommentTime: "",
    },
    validationSchema: Yup.object({
      Course_id: Yup.number().required("course is required"),
      User_id: Yup.number().required("user is required"),
      //CourseName: Yup.string().required("Required"),
      // username: Yup.string()
      //   .min(3, "Must be 3 characters or more")
      //   .max(100, "Must be 100 characters or more")
      //   .required("Required"),
      CommentContent: Yup.string()
        .max(100, "Must be 100 characters or less")
        .required("Required"),
    }),

    onSubmit: async (values, {resetForm}) => {
      // let courses = courseList.filter((x) => x.label === values.CourseName);
      // let users = userList.filter((x)=> x.label === values.username)

      let result = await postRequest("/comments", {
        Course_id: selectedCourse.ID,
        User_id: selectedUser.id,
        CommentContent: values.CommentContent,
        CommentTime: values.CommentTime,
      });

      if (result.status === 201) {
        console.log(result.status);
        toast.success("add success!");
        resetForm();
        Navigate("/comments");
        //navigate("/", { replace: true });
      } else {
        toast.error("add failed!");
      }
    },
  });

  const optionEqualToValueChange = (option, value) => {
    return true;
  };

  const [formData, setFormData] = useState({
    Course_id: "",
    User_id: "",
    CommentContent: "",
    CommentTime: "",
  });

  const handleCancel = () => {
    setFormData({
      Course_id: "",
      User_id: "",
      CommentContent: "",
      CommentTime: "",
    });
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmission = async (values) => {
    setIsLoading(true);
    const dataToSubmit = {
      Course_id: selectedCourse.ID,
      User_id: selectedUser.id,
      CommentContent: values.CommentContent,
      CommentTime: values.CommentTime,
    }
    try {
        // const endpoint = id ? `/courses/${id}` : "/courses";
        const result = isUpdateMode
            ? await putRequest(`/comments/${id}`, dataToSubmit)
            : await postRequest("/comments", dataToSubmit);
        if (result.status === 200) {
            toast.success(`${id ? "Update" : "Add"} success!`);
            navigate(`/comments`);
        } else {
            toast.error(result.message);
        }
    } catch (error) {
        console.error(`Error ${id ? "updating" : "adding"} item:`, error);
        toast.error(`Failed to ${id ? "update" : "add"} item.`);
    } finally {
        setIsLoading(false);
    }
};

  return (
    <Box m="20px">
      <Header
        title="CREATE COMMENT"
        subtitle="Create a New Comment"
        url="/comments"
        urltitle={"CommentList"}
      />
      <form onSubmit={formik.handleSubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        >
          <Autocomplete
            isOptionEqualToValue={(option, value) => option.value === value.value}
            // getOptionSelected={(option, value) => option.id === value.id}
            disablePortal
            getOptionLabel={(option) => option.CourseName}
            options={courses}
            fullWidth
            // sx={{ width: 300 }}
            // onChange={(event, value) => {

            //   formik.setFieldValue("CourseName", value.label);
            // }}
            onChange={(event, value) => handleSelectedCourse(value)}
            // value={formik.values.CourseName}
            //isOptionEqualToValue={optionEqualToValueChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Selected Course"
                variant="filled"
                error={
                  formik.touched.Course_id && Boolean(formik.errors.Course_id)
                }
                helperText={formik.touched.Course_id && formik.errors.Course_id}
                // error={
                //   formik.touched.CourseName && Boolean(formik.errors.CourseName)
                // }
                // helperText={formik.touched.CourseName && formik.errors.CourseName}
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
          />
          {/* <Autocomplete
            options = {userList}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                label="username"
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
            )}
            onChange={(event, value) => handleSelectedUser(value)}
            

          /> */}
          <Autocomplete
            isOptionEqualToValue={(option, value) => option.value === value.value}
            // getOptionSelected={(option, value) => option.id === value.id}
            options={users}
            getOptionLabel={(option) => option.username}
            loading={loading}
            onChange={(event, value) => handleSelectedUser(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Selected User"
                variant="filled"
                error={formik.touched.User_id && Boolean(formik.errors.User_id)}
                helperText={formik.touched.User_id && formik.errors.User_id}
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
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Comment Content"
            name="CommentContent"
            multiline
            onChange={formik.handleChange}
            value={formik.values.CommentContent}
            error={
              formik.touched.CommentContent &&
              Boolean(formik.errors.CommentContent)
            }
            helperText={
              formik.touched.CommentContent && formik.errors.CommentContent
            }
            autoComplete="This is a sample comment"
            autoFocus
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="date"
            label="Comment Date"
            name="CommentTime"
            value={formik.values.CommentTime}
            onChange={formik.handleChange}
            error={
              formik.touched.CommentTime && Boolean(formik.errors.CommentTime)
            }
            helperText={formik.touched.CommentTime && formik.errors.CommentTime}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Stack direction="row" spacing={2}>
            <Button type="submit" color="secondary" variant="contained">
              Create New Comment
            </Button>
            {/* <Button
              type="cancle"
              color="secondary"
              variant="contained"
              onClick={handleCancel}
            >
              Cancel
            </Button> */}
          </Stack>
        </Box>
      </form>
    </Box>
  );
}
