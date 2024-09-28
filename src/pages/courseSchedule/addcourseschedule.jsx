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
import { Navigate, useParams, useNavigate } from "react-router-dom";

export default function AddCourseSchedule() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  let { id } = useParams();
  // check the id. If it has one, then update
  const isUpdateMode = id !== undefined;
  const navigate = useNavigate();

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
    //这里把小写id改成大写的ID
    if (value) {
      formik.setFieldValue("Course_id", value.ID);
      setSelectedCourse(value);
    } else {
      formik.setFieldValue("Course_id", "");
      setSelectedCourse(null);
    }
  };

  const formik = useFormik({
    initialValues: {
      Course_id: -1,
      StartDate: "",
      EndDate: "",
      IsPublished: "",
      //CoursescheduleID: 3,
    },
    validationSchema: Yup.object({
      Course_id: Yup.number().required("Course is required"),
      StartDate: Yup.date().required("Required"),
      EndDate: Yup.date().required("Required"),
      IsPublished: Yup.mixed()
        .oneOf([0, 1], "Must be Yes (1) or No (0)") // 如果使用 tinyint 作为布尔值
        .required("Publication status is required"),
      // 如果你使用 ENUM('Yes', 'No') 来存储，修改如下：
      // IDIsPublished: Yup.mixed().oneOf(['Yes', 'No'], "Must be Yes or No").required("Publication status is required"),
      //CoursescheduleID: Yup.number().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      let result = await postRequest("/courseSchedule", {
        //CoursescheduleID: values.CoursescheduleID,
        startDate: values.StartDate,
        endDate: values.EndDate,
        CourseId: selectedCourse.ID,
        isPublished: values.IsPublished == 1 ? true : false,
      });

      // console.log(result);

      if (result.status == 201) {
        console.log(result.status);
        toast.success("add success!");
        formik.resetForm();
        navigate("/courseSchedule");
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
    StartDate: "",
    EndDate: "",
    IsPublished: "",
  });

  const handleCancel = () => {
    setFormData({
      Course_id: "",
      StartDate: "",
      EndDate: "",
      IsPublished: "",
    });
  };

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
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            disablePortal
            options={courses}
            fullWidth
            // 指定要显示的标签
            loading={loading}
            getOptionLabel={(option) => option.CourseName || ""}
            onChange={(event, value) => handleSelectedCourse(value)}
            // value={formik.values.CourseName}
            //isOptionEqualToValue={optionEqualToValueChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Selected Course Name"
                variant="filled"
                error={
                  formik.touched.Course_id && Boolean(formik.errors.Course_id)
                }
                helperText={formik.touched.Course_id && formik.errors.Course_id}
                // params.InputProps 是 Autocomplete 提供的输入框配置属性，用来控制 TextField 的各种行为（如自动完成的显示、清除按钮等）
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
          {/* <TextField
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
          /> */}
          <FormControl fullWidth sx={{ gridColumn: "span 4" }}>
            <InputLabel id="demo-simple-select-label">Published?</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="IsPublished"
              value={formik.values.IsPublished}
              label="IsPublished"
              error={
                formik.touched.IsPublished && Boolean(formik.errors.IsPublished)
              }
              helperText={
                formik.touched.IsPublished && formik.errors.IsPublished
              }
              onChange={formik.handleChange}
            >
              <MenuItem value={0}>Yes</MenuItem>
              <MenuItem value={1}>No</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Stack direction="row" spacing={2}>
            <Button type="submit" color="secondary" variant="contained">
              Create New Course Schedule
            </Button>
            {/* <Button
              type="cancel"
              color="secondary"
              variant="contained"
              onClick={() => formik.resetForm()}
            >
              Cancel
            </Button> */}
          </Stack>
        </Box>
      </form>
    </Box>
  );
}
