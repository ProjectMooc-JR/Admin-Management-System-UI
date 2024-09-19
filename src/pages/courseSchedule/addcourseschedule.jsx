import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  CircularProgress,
  Stack,
} from "@mui/material";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import postRequest from "../../request/postRequest";
import Header from "../../components/Header";
import Autocomplete from "@mui/material/Autocomplete";
import getRequest from "../../request/getRequest";

export default function AddCourseSchedule() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCourseAsync = async () => {
      setLoading(true);
      const result = await getRequest("/courses");
      setCourses(Array.isArray(result.data) ? result.data : []);
      console.log("Fetched courses:", result.data);
      setLoading(false);
    };
    fetchCourseAsync();
  }, []);

  const handleSelectedCourse = (value) => {
    console.log("value", value);
    formik.setFieldValue("Course_id", value.id);
    setSelectedCourse(value);
  };

  const formik = useFormik({
    initialValues: {
      Course_id: "",
      StartDate: "",
      EndDate: "",
      IDIsPublished: "",
      //CoursescheduleID: 3,
    },
    validationSchema: Yup.object({
      Course_id: Yup.number().required("Course is required"),
      StartDate: Yup.date().required("Required"),
      EndDate: Yup.date().required("Required"),
      IDIsPublished: Yup.mixed()
        .oneOf([0, 1], "Must be Yes (1) or No (0)") // 如果使用 tinyint 作为布尔值
        .required("Publication status is required"),
      // 如果你使用 ENUM('Yes', 'No') 来存储，修改如下：
      // IDIsPublished: Yup.mixed().oneOf(['Yes', 'No'], "Must be Yes or No").required("Publication status is required"),
      //CoursescheduleID: Yup.number().required("Required"),
    }),
    onSubmit: async (values) => {
      let result = await postRequest("/courseSchedule", {
        //CoursescheduleID: values.CoursescheduleID,
        StartDate: values.StartDate,
        EndDate: values.EndDate,
        Course_ID: selectedCourse.id,
        IDIsPublished: values.IDIsPublished,
      });

      console.log(result);

      if (result.status == 201) {
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
          <Autocomplete
            disablePortal
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
                label="CourseName"
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

          {/* <TextField
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
          /> */}

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
            name="EndDate"
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
