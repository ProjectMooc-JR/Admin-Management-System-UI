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
        CourseID: 0,
        CommentContent: "",
        CommentTime: "",
        UserID: 0,
      },
      validationSchema: Yup.object({
        CourseID: Yup.number()
          .required("Required"),
        CommentContent: Yup.string()
          .max(100, "Must be 30 characters or less")
          .required("Required"),
        CommentTime: Yup.string()
          .min(6, "Must be 6 characters or more")
          .max(100, "Must be 30 characters or less")
          .required("Required"),   
        UserID: Yup.number()
          .required("Required"),   
      }),
      onSubmit: async (values) => {
        let result = await postRequest("/comments", {
            CommentContent: values.CommentContent,
            CommentTime: values.CommentTime,
            CourseID: values.CourseID,
            UserID: values.UserID,
        });
  
        if (result.status == 1) {
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
        <Header title="CREATE Comment" subtitle="Create a New Comment" url="/comments" urltitle={"CommentList"} />
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
              value={formik.values.CourseID}
              error={formik.touched.CourseID && Boolean(formik.errors.CourseID)}
              helperText={formik.touched.CourseID && formik.errors.CourseID}
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
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              autoComplete="This is a sample comment"
              autoFocus
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Comment Time"
              name="CommentTime"
              onChange={formik.handleChange}
              value={formik.values.confirmpassword}
              error={
                formik.touched.confirmpassword &&
                Boolean(formik.errors.confirmpassword)
              }
              helperText={
                formik.touched.confirmpassword && formik.errors.confirmpassword
              }
              autoComplete="current-password"
              autoFocus
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Course ID"
              name="CourseID"
              autoComplete="3"
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              autoFocus
              sx={{ gridColumn: "span 4" }}
            />
           
            {/* <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Gender"
              name="gender"
              autoComplete="text"
              onChange={formik.handleChange}
              value={formik.values.gender}
              error={formik.touched.gender && Boolean(formik.errors.gender)}
              helperText={formik.touched.gender && formik.errors.gender}
              autoFocus
              sx={{ gridColumn: "span 3" }}
            /> */}
  
            {/* <FormControl fullWidth sx={{ gridColumn: "span 4" }}>
              <InputLabel id="demo-simple-select-label">gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="gender"
                value={formik.values.gender}
                label="gender"
                error={formik.touched.gender && Boolean(formik.errors.gender)}
                helperText={formik.touched.gender && formik.errors.gender}
                onChange={formik.handleChange}
              >
                <MenuItem value={0}>Female</MenuItem>
                <MenuItem value={1}>Male</MenuItem>
              </Select>
            </FormControl> */}
            {/* <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Age"
              name="age"
              autoComplete="text"
              onChange={formik.handleChange}
              value={formik.values.age}
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={formik.touched.age && formik.errors.age}
              autoFocus
              sx={{ gridColumn: "span 4" }}
            /> */}
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
  