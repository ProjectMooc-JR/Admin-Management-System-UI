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
      StartDate: "",
      EndDate: "",
      IDIsPublished: "",
      CoursescheduleID: 3,
    },
    validationSchema: Yup.object({
      CourseID: Yup.number().required("Required"),
      StartDate: Yup.date().required("Required"),
      EndDate: Yup.date().required("Required"),
      IDIsPublished: Yup.mixed()
        .oneOf([0, 1], "Must be Yes (1) or No (0)") // 如果使用 tinyint 作为布尔值
        .required("Publication status is required"),
      // 如果你使用 ENUM('Yes', 'No') 来存储，修改如下：
      // IDIsPublished: Yup.mixed().oneOf(['Yes', 'No'], "Must be Yes or No").required("Publication status is required"),
      CoursescheduleID: Yup.number().required("Required"),
    }),
    onSubmit: async (values) => {
      let result = await postRequest("/courseSchedule", {
        CoursescheduleID: values.CoursescheduleID,
        StartDate: values.StartDate,
        EndDate: values.EndDate,
        CourseID: values.CourseID,
        IDIsPublished: values.IDIsPublished,
      });

      console.log(result);

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
        url="/courseSchedule"
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
            type="date"
            label="Start Date"
            name="StartDate"
            onChange={formik.handleChange}
            value={formik.values.StartDate}
            error={formik.touched.StartDate && Boolean(formik.errors.StartDate)}
            helperText={formik.touched.StartDate && formik.errors.StartDate}
            autoComplete="Start Date"
            autoFocus
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="date"
            label="End Date"
            name="EndTDate"
            onChange={formik.handleChange}
            value={formik.values.EndDate}
            error={formik.touched.EndDate && Boolean(formik.errors.EndDate)}
            helperText={formik.touched.EndDate && formik.errors.EndDate}
            autoComplete="End Date"
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
              Create New Course Schedule
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
