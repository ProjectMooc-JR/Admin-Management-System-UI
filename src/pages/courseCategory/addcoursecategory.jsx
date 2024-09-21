import React, { useEffect, useState } from "react";
import { replace, useFormik } from "formik";
import { Box, TextField, Stack, Button } from "@mui/material";
import Header from "../../components/Header";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import getRequest from "../../request/getRequest";
import postRequest from "../../request/postRequest";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddCourseCategory = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      categoryName: "",
      level: 0,
      parentID: 0,
      notes: "",
    },
    validationSchema: Yup.object({
      categoryName: Yup.string()
        .min(3, "Must be 1 characters or more")
        .max(30, "Must be 20 characters or less")
        .required("Required"),
      level: Yup.number().min(0, "Min value is 0").required("Required"),
      parentID: Yup.number().min(0, "Default value is 0").required("Required"),
      notes: Yup.string(),
    }),
    onSubmit: async (values) => {
      console.log(values);

      // 这里formik 已经默认帮我们阻止了默认执行
      let result = await postRequest("/courseCategory", {
        CategoryName: values.categoryName,
        Level: values.level,
        ParentID: values.parentID,
        Notes: values.notes,
      });
      console.log(result);

      if (result.status == 201) {
        toast.success("add success!");
        formik.resetForm();
      } else {
        toast.error("add failed!");
      }
    },
  });
  const [categoryList, setCategoryList] = useState([]);
  const backToList = () => {
    navigate("/courseCategory", { replace: true });
  };
  useEffect(() => {}, []);

  async function handleSelectLevel(e) {
    formik.handleChange(e);
    let result = await getRequest(`courseCategory/courseCategoryLevel/${e.target.value}`);
    if (result.status === 200) {
      setCategoryList(result.data);
    } else {
      setCategoryList([]);
    }
    console.log(result.data);
  }
  return (
    <Box m={"20px"}>
      <Header
        title={"CREATE CATEGORY"}
        subtitle="Create a New Course Category"
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
                label="Category Name"
                multiline
                name="categoryName"
                onChange={formik.handleChange}
                value={formik.values.categoryName}
                id="standard-required-1"
                defaultValue="Hello World"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">
                  Level
                </InputLabel>
                <Select
                  name="level"
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={formik.values.level ?? ""}
                  label="Level"
                  onChange={handleSelectLevel}
                  // onChange={formik.handleChange}
                >
                  <MenuItem value={1}>One</MenuItem>
                  <MenuItem value={2}>Two</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">
                  Parent
                </InputLabel>
                <Select
                  name="parentID"
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={formik.values.parentID ?? ""}
                  label="Parent"
                  onChange={formik.handleChange}
                >
                  {categoryList.length > 0 ? (
                    categoryList.map((item, index) => {
                      return (
                        <MenuItem value={item.ID}>{item.CategoryName}</MenuItem>
                      );
                    })
                  ) : (
                    <MenuItem value={0}>Zero</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                type="text"
                label="Notes"
                multiline
                name="notes"
                onChange={formik.handleChange}
                value={formik.values.notes}
                id="standard-required-99"
                defaultValue=""
              />
            </Grid>
            <Grid item xs={10}>
              <Box display="flex" gap={2}>
                <Button type="submit" color="primary" variant="contained">
                  Create New Category
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
                  Back to list
                </Button>
              </Box>
            </Grid>
          </Grid>
          {/* <Box mt="20px">
            <Stack direction="row" spacing={2}>
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
              <Button type="cancle" color="secondary" variant="contained">
                Cancel
              </Button>
            </Stack>
          </Box> */}
        </Box>
      </form>
    </Box>
  );
};

export default AddCourseCategory;
