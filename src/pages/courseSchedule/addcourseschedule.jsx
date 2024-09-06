import React from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Stack,
} from "@mui/material";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import postRequest from "../../request/postRequest";
import Header from "../../components/Header";

export default function AddCourseSchedule() {
  const formik = useFormik({
    initialValues: {
      CourseID: 2,
      CommentContent: "This is sample comment",
      StartTime: "",
      EndTime: "",
      CoursescheduleID: 3,
    },
    validationSchema: Yup.object({
      CourseID: Yup.number().required("Required"),
      CommentContent: Yup.string()
        .max(100, "Must be 30 characters or less")
        .required("Required"),
      CoursescheduleID: Yup.number().required("Required"),
    }),
    onSubmit: async (values) => {
      let result = await postRequest("/courseSchedule", {
        CoursescheduleID: values.CoursescheduleID,
        CommentContent: values.CommentContent,
        StartTime: values.StartTime,
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
      <Header
        title="CREATE CourseSchedule"
        subtitle="Create a New Course Schedule"
        url="/courseschedule"
        urltitle={"CourseScheduleList"}
      />
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
            label="Course Schedule ID"
            name="CoursescheduleID"
            autoComplete="4"
            onChange={formik.handleChange}
            value={formik.values.CoursescheduleID}
            error={
              formik.touched.CoursescheduleID &&
              Boolean(formik.errors.CoursescheduleID)
            }
            helperText={
              formik.touched.CoursescheduleID && formik.errors.CoursescheduleID
            }
            autoFocus
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="datetime"
            label="Start Time"
            name="StartTime"
            onChange={formik.handleChange}
            value={formik.values.EndTime}
            error={formik.touched.EndTime && Boolean(formik.errors.EndTime)}
            helperText={formik.touched.EndTime && formik.errors.EndTime}
            autoComplete="End Time"
            autoFocus
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="datetime"
            label="Start Time"
            name="StartTime"
            onChange={formik.handleChange}
            value={formik.values.StartTime}
            error={formik.touched.StartTime && Boolean(formik.errors.StartTime)}
            helperText={formik.touched.StartTime && formik.errors.StartTime}
            autoComplete="Start Time"
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
