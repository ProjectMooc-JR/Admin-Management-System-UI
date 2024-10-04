import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { Box, TextField, Stack, Button } from "@mui/material";
import Header from "../../components/Header";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import getRequest from "../../request/getRequest";
import { useNavigate } from "react-router-dom";
import putRequest from "../../request/putRequest";
import toast from "react-hot-toast";

const UpdateCourseSchedule = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  // 控制加载的状态
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  // const [coursescheduleDetail, setCoursescheduleDetail] = useState({});
  console.log("Course Schedule ID:", id);
  const formik = useFormik({
    initialValues: {
      Course_id: "",
      StartDate: "",
      EndDate: "",
      IsPublished: "",
    },
    validationSchema: Yup.object({
      Course_id: Yup.string().required("Required"),
      StartDate: Yup.date().required("Required"),
      EndDate: Yup.date().required("Required"),
      IsPublished: Yup.string("Required"),
    }),
    onSubmit: async (values) => {
      let result = await putRequest(`/courseSchedule/${id}`, {
        Course_id: selectedCourse.Course_id,
        StartDate: values.StartDate,
        EndDate: values.EndDate,
        IsPublished: values.IsPublished,
      });
      console.log(result);
      if (result.status === 200) {
        toast.success("update success!!");
        formik.resetForm();
      }
    },
  });
  const [coursescheduleList, setCoursescheduleList] = useState([]);

  useEffect(() => {
    const getCourseSchedule = async () => {
      // 先设置加载状态：打开加载状态
      setLoading(true);
      let res = await getRequest(`/courseSchedule/${id}`);

      console.log("course schedule", res.data);
      if (res.status === 200) {
        // setCoursescheduleDetail(res.data[0]);
        // console.log(coursescheduleDetail);
        // 将获取到的 categoryDetail 更新到表单中
        formik.setValues({
          Course_id: res.data.Course_id,
          StartDate: formatDateToYYYYMMDD(new Date(res.data.startDate)),
          EndDate: formatDateToYYYYMMDD(new Date(res.data.endDate)),
          IsPublished: res.data.IsPublished,
        });
      }
      // } else {
      //   setCoursescheduleDetail({});
      // }
      setLoading(false);
    };
    getCourseSchedule();
  }, []);

  function formatDateToYYYYMMDD(date) {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");
    let timeFormat = `${year}-${month}-${day}`;
    console.log("formatDateToYYYYMMDD", timeFormat);
    return timeFormat;
  }

  const navigate = useNavigate();

  const backToList = () => {
    navigate("/courseSchedule", { replace: true });
  };
  return (
    <Box m={"20px"}>
      <Header
        title={"UPDATE Course Schedule"}
        subtitle="Update Course Schedule"
      />
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Box
          display={"flex"}
          justifyContent="center"
          alignItems="center"
          m="20px"
          sx={{
            border: "2px solid #000",
            borderRadius: "5px",
            padding: "16px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            maxWidth: 900,
          }}
        >
          <Grid container spacing={2} sx={{ width: "100%" }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                type="text"
                label="Course_id"
                multiline
                name="Course_id"
                onChange={formik.handleChange}
                value={formik.values.Course_id}
                id="standard-required-1"
                defaultValue="Hello Course"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">
                  Is Published?
                </InputLabel>
                <Select
                  name="isPublished"
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={formik.values.isPublished ?? ""}
                  label="Level"
                  onChange={formik.handleChange}
                >
                  <MenuItem value={0}>Yes</MenuItem>
                  <MenuItem value={1}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Start Date"
                name="StartDate"
                onChange={formik.handleChange}
                value={formik.values.StartDate}
                error={
                  formik.touched.StartDate && Boolean(formik.errors.StartDate)
                }
                helperText={formik.touched.StartDate && formik.errors.StartDate}
                autoComplete="Start Date"
                autoFocus
                sx={{ gridColumn: "span 4" }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
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
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={10}>
              <Box display="flex" gap={2}>
                <Button type="submit" color="primary" variant="contained">
                  update
                </Button>
                <Button
                  type="cancel"
                  color="secondary"
                  variant="contained"
                  onClick={() => formik.resetForm()}
                >
                  Reset
                </Button>
                <Button
                  type="button"
                  color="grey"
                  variant="contained"
                  onClick={backToList}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Box>
  );
};

export default UpdateCourseSchedule;
