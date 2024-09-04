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
        CourseID: 2,
        CommentContent: "This is sample comment",
        CommentTime: "",
        UserID: 3,
      },
      validationSchema: Yup.object({
        CourseID: Yup.number()
          .required("Required"),
        CommentContent: Yup.string()
          .max(100, "Must be 30 characters or less")
          .required("Required"),  
        UserID: Yup.number()
          .required("Required"),   
      }),
      onSubmit: async (values) => {
        let result = await postRequest("/comments", {
            UserID: values.UserID,
            CommentContent: values.CommentContent,
            CommentTime: values.CommentTime,
            CourseID: values.CourseID,
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
              label="User ID"
              name="UserID"
              autoComplete="4"
              onChange={formik.handleChange}
              value={formik.values.UserID}
              error={formik.touched.UserID && Boolean(formik.errors.UserID)}
              helperText={formik.touched.UserID && formik.errors.UserID}
              autoFocus
              sx={{ gridColumn: "span 4" }}
            />
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
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Course ID"
              name="CourseID"
              autoComplete="5"
              onChange={formik.handleChange}
              value={formik.values.CourseID}
              error={formik.touched.CourseID && Boolean(formik.errors.CourseID)}
              helperText={formik.touched.CourseID && formik.errors.CourseID}
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
  