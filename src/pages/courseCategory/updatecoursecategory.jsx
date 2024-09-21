import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFormik } from "formik";
import { Box, TextField, Stack, Button } from '@mui/material';
import Header from '../../components/Header';
import * as Yup from "yup";
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import getRequest from "../../request/getRequest";
import { useNavigate } from "react-router-dom";
import putRequest from "../../request/putRequest";
import toast from 'react-hot-toast';

const UpdateCourseCategory = () => {


    const { id } = useParams()
    const [categoryDetail, setCategoryDetail] = useState({})
    console.log("Course Category ID:", id);
    const formik = useFormik({
        initialValues: {
            categoryName: '',
            level: 0,
            parentID: 0,
            notes: ""
        },
        validationSchema: Yup.object({
            categoryName: Yup.string()
                .min(3, "Must be 1 characters or more")
                .max(30, "Must be 20 characters or less")
                .required("Required"),
            level: Yup.number()
                .min(0, "Min value is 0")
                .required("Required"),
            parentID: Yup.number()
                .min(0, "Default value is 0")
                .required("Required"),
            notes: Yup.string()
        }),
        onSubmit: async (values) => {
           let result= await putRequest(`/courseCategory/${id}`,{
                CategoryName: values.categoryName,
                Level: values.level,
                ParentID: values.parentID,
                Notes: values.notes,
            })
            console.log(result)
            if(result.status===200){
                toast.success("update success!!")
                formik.resetForm();
            }
        },
    })
    const [categoryList, setCategoryList] = useState([]);


    useEffect(() => {
        let getCategory = async () => {
            let res = await getRequest(`/courseCategory/${id}`)
            // console.log(res.data[0])
            if (res.status === 200) {
                setCategoryDetail(res.data[0])
                console.log(categoryDetail)
                // 将获取到的 categoryDetail 更新到表单中
                formik.setValues({
                    categoryName: res.data[0].CategoryName,
                    level: res.data[0].Level,
                    parentID: res.data[0].ParentID,
                    notes: res.data[0].Notes
                });
            } else {
                setCategoryDetail({})
            }
        }
        getCategory()


    }, [id])
    const navigate = useNavigate();

    const backToList = () => {
        navigate("/courseCategory", { replace: true })
    }
    return (
        <Box m={"20px"}>
            <Header title={"UPDATE CATEGORY"} subtitle="Update Course Category" />
            <form onSubmit={formik.handleSubmit} autoComplete="off">
                <Box display={"flex"}
                    justifyContent="center"
                    alignItems="center"
                    m="20px"
                    sx={{
                        border: '2px solid #000',
                        borderRadius: '5px',
                        padding: '16px',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                        maxWidth: 900
                    }}
                >
                    <Grid container spacing={2} sx={{ width: '100%' }}>
                        <Grid item xs={12}>
                            <TextField fullWidth required type='text' label="Category Name" multiline
                                name='categoryName' onChange={formik.handleChange}
                                value={formik.values.categoryName} id="standard-required-1"
                                defaultValue="Hello World" />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-helper-label">Level</InputLabel>
                                <Select name="level"
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={formik.values.level ?? ""}
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
                                <Select name='parentID'
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={formik.values.parentID ?? ""}
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
                                name='notes' onChange={formik.handleChange}
                                value={formik.values.notes} id="standard-required-99"
                                defaultValue="" />

                        </Grid>
                        <Grid item xs={10}>
                            <Box display="flex" gap={2}>
                                <Button type="submit" color="primary" variant="contained">
                                    update
                                </Button>
                                <Button type="cancel" color="secondary" variant="contained" onClick={() => formik.resetForm()}>
                                    Reset
                                </Button>
                                <Button type="button" color='grey' variant='contained' onClick={backToList}>
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
    )
}

export default UpdateCourseCategory