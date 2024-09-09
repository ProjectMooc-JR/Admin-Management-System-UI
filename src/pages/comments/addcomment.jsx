import React from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Stack
} from "@mui/material";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import postRequest from "../../request/postRequest";
import Header from "../../components/Header";

export default function AddComment () {
    const formik = useFormik({
      initialValues: {
        CourseName: "JavaWeb",
        username: "admin",
        CommentContent: "This is sample comment",
        CommentTime: "",
      },
      validationSchema: Yup.object({
        CourseName: Yup.string()
          .required("Required"),
        
        username: Yup.string()
          .min(3, "Must be 3 characters or more")
          .max(100, "Must be 100 characters or more")
          .required("Required"), 
        CommentContent: Yup.string()
          .max(100, "Must be 100 characters or less")
          .required("Required"),  
          
      }),
      onSubmit: async (values) => {
        let result = await postRequest("/comments", {
            CourseName: values.CourseName,
            username:values.username,
            CommentContent: values.CommentContent,
            CommentTime: values.CommentTime,
        });
  
        if (result.status == 1) {
          console.log(result.status);
          toast.success("add success!");
          formik.resetForm();
          //navigate("/", { replace: true });
        } else {
          toast.error("add failed!");
        }
      },
    });
    return (
      <Box m="20px">
        <Header title="CREATE COMMENT" subtitle="Create a New Comment" url="/comments" urltitle={"CommentList"} />
        <form onSubmit={formik.handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          >
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Course Name"
              name="CourseName"
              autoComplete="CourseName"
              onChange={formik.handleChange}
              value={formik.values.CourseName}
              error={formik.touched.CourseName && Boolean(formik.errors.CourseName)}
              helperText={formik.touched.CourseName && formik.errors.CourseName}
              autoFocus
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="User Name"
              name="username"
              autoComplete="4"
              onChange={formik.handleChange}
              value={formik.values.username}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              autoFocus
              sx={{ gridColumn: "span 4" }}
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
              error={formik.touched.CommentContent && Boolean(formik.errors.CommentContent)}
              helperText={formik.touched.CommentContent && formik.errors.CommentContent}
              autoComplete="This is a sample comment"
              autoFocus
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="datetime"
              label="Comment Time"
              name="CommentTime"
              onChange={formik.handleChange}
              value={formik.values.CommentTime}
              error={
                formik.touched.CommentTime &&
                Boolean(formik.errors.CommentTime)
              }
              helperText={
                formik.touched.CommentTime && formik.errors.CommentTime
              }
              autoComplete="Comment Time"
              autoFocus
              sx={{ gridColumn: "span 4" }}
            />
            
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Stack direction="row" spacing={2}>
              <Button type="submit" color="secondary" variant="contained">
                Create New Comment
              </Button>
              <Button type="cancle" color="secondary" variant="contained">
                Cancel
              </Button>
            </Stack>
          </Box>
        </form>
      </Box>
    );
  }
  