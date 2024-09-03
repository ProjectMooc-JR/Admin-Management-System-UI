import React, { useEffect, useState } from 'react'
import { useFormik } from "formik";
import { Box, TextField, Stack, Button } from '@mui/material';
import Header from '../../components/Header';
import * as Yup from "yup";
import Grid from '@mui/material/Grid';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import getRequest from "../../request/getRequest";
import postRequest from "../../request/postRequest";
import toast from "react-hot-toast";

function MinHeightTextarea() {
  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
  box-sizing: border-box;
  width: 320px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color:  #1C2025;
  background: #fff';
  border: 1px solid #DAE2ED;
  box-shadow: 0px 2px 2px #F3F6F9;
  resize: both; /* 允许用户拉伸 */


  &:hover {
    border-color: #3399FF;
  }

  &:focus {
    border-color: #3399FF;
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
  );

  return (
    <Textarea style={{ resize: 'both' }} // 允许用户调整大小
      aria-label="minimum height" minRows={3} placeholder="Add some notes" />
  );
}


const AddCourseCategory = () => {
  const formik = useFormik({
    initialValues: {
      CategoryName: '',
      Level: 0,
      ParentID: 0,
      Notes: ""
    },
    validationSchema: Yup.object({
      CategoryName: Yup.string()
        .min(3, "Must be 1 characters or more")
        .max(30, "Must be 20 characters or less")
        .required("Required"),
      Level: Yup.number()
        .min(0, "Min value is 0")
        .required("Required"),
      ParentID: Yup.number()
        .min(0, "Default value is 0")
        .required("Required"),
      Notes: Yup.string()
    }),
    onSubmit: async (values) => {
      // 这里formik 已经默认帮我们阻止了默认执行
      let result = await postRequest("/course-category", {
        username: values.username,
        password: values.password,
        email: values.email,
        address: values.address,
      });

      if (result.status == 200) {
        toast.success("add success!");
        formik.resetForm();
        //navigate("/", { replace: true });
      } else {
        toast.error("add failed!");
      }
    },

  })
  const [categoryList, setCategoryList] = useState([]);
  // useEffect(() => {
  //   //请求获取所有的category
  //   let getCategoryList = async () => {
  //     let result = await getRequest(
  //       `/course-category`
  //     );
  //     if (result.status === 200) {
  //       setCategoryList(result.data);
  //     } else {
  //       setCategoryList([]);
  //     }
  //     console.log("=========", result);
  //   };
  //   getCategoryList();
  // }, [])
  return (
    <Box m={"20px"}>
      <Header title={"CREATE CATEGORY"} subtitle="Create a New Course Category" />
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Box display={"flex"}
          justifyContent="center"
          alignItems="center"
          m="20px"
          sx={{
            border: '2px solid #000',
            borderRadius: '5px',
            padding: '16px', // 可选：添加内边距
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // 可选：添加阴影
            maxWidth:900
          }}
        >
          <Grid container spacing={2} sx={{ width: '100%'}}>
            <Grid item xs={12}>
              <TextField fullWidth required type='text' label="Category Name"
                name='categoryName' onChange={formik.handleChange}
                value={formik.values.CategoryName} id="standard-required-1"
                defaultValue="Hello World" />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">Level</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={formik.values.Level}
                  label="Level"
                  onChange={formik.handleChange}
                >

                  <MenuItem value={0}>Zero</MenuItem>
                  <MenuItem value={1}>One</MenuItem>
                  <MenuItem value={2}>Two</MenuItem>
                  <MenuItem value={3}>Three</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">Parent</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={formik.values.ParentID}
                  label="Parent"
                  onChange={formik.handleChange}
                >
                  {categoryList.length > 0 ? categoryList.map((item, index) => {
                    return (
                      <MenuItem value={item.ID}>{item.CategoryName}</MenuItem>
                    )
                  }) : <MenuItem value={0}>Zero</MenuItem>}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
            <TextField fullWidth required type='text' label="Notes" multiline
                name='Notes' onChange={formik.handleChange}
                value={formik.values.Address} id="standard-required-99"
                defaultValue="" />
         
            </Grid>
            <Grid item xs={10}>
              <Box display="flex" gap={2}>
                <Button type="submit" color="secondary" variant="contained">
                  Create New Category
                </Button>

                <Button type="cancle" color="secondary" variant="contained">
                  Cancel
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
  )
}

export default AddCourseCategory