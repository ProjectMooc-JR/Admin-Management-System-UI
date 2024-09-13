import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  // Stack,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
// import toast from "react-hot-toast";
import * as Yup from "yup";
import postRequest from "../../request/postRequest";
import getRequest from "../../request/getRequest";
// import Header from "../../components/Header";

export default function Addteacher() {
  // 存储从后端api获取的所有用户数据
  const [users, setUsers] = useState([]);
  // 控制加载的状态
  const [loading, setLoading] = useState(false);
  // 储存被选择转变成teacher的user
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      // 先设置加载状态：打开加载状态
      setLoading(true);
      const result = await getRequest("/users");
      // 将返回的user数据通过setUsers存储到users中
      setUsers(Array.isArray(result.data) ? result.data : []);
      console.log("Fetched users:", result.data);
      // console.log("Fetched users:", JSON.stringify(result.data));
      // 加载完成，关闭加载状态
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleSelectedUser = (value) => {
    console.log("value", value);
    formik.setFieldValue("User_id",value.id)
    setSelectedUser(value);
  };

  // 使用 Formik 管理表单状态和验证
  const formik = useFormik({
    initialValues: {
      User_id:"",
      HireDate: "",
      HireStatus: 1, // 默认在职
      Specialization: "",
      Description: "",
      MobileNum: "",
      LinkedInLink: "test.com",
    },
    validationSchema: Yup.object({
      User_id: Yup.number().required("user is required"),
      HireDate: Yup.date().required("Hire Date is required"),
      HireStatus: Yup.number().required("Hire Status is required"),
      Specialization: Yup.string()
        .max(200, "Max 200 characters")
        .required("Specialization is required"),
      Description: Yup.string().max(250, "Max 250 characters"),
      MobileNum: Yup.string()
        .max(15, "Max 15 characters")
        .required("Mobile number is required"),
      LinkedInLink: Yup.string(),
    }),
    onSubmit: async (inputValues) => {
      let result = await postRequest("/teachers", {
        User_id: selectedUser.id,
        Specialization: inputValues.Specialization,
        Description: inputValues.Description,
        HireDate: inputValues.HireDate,
        HireStatus: inputValues.HireStatus,
        MobileNum: inputValues.MobileNum,
        LinkedInLink: inputValues.LinkedInLink,
      });

      if (result.status === 201) {
        alert("teacher shifted successfully.");
      } else {
        alert("failed to shift this user to teacher.");
      }
    },
  });
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        boxShadow: 1,
        borderRadius: 2,
        p: 2,
        minWidth: 300,
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <Autocomplete
        options={users}
        getOptionLabel={(option) => option.username}
        loading={loading}
        // onChange={(event, value) => setSelectedUser(value)}
        onChange={(event, value) => handleSelectedUser(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Selected User"
            variant="filled"
            error={
              formik.touched.User_id && Boolean(formik.errors.User_id)
            }
            helperText={formik.touched.User_id && formik.errors.User_id}
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
      <form onSubmit={formik.handleSubmit} className="add-teacher-form">
        <TextField
          fullWidth
          variant="filled"
          type="date"
          label="Hire Date"
          name="HireDate"
          value={formik.values.HireDate}
          onChange={formik.handleChange}
          error={formik.touched.HireDate && Boolean(formik.errors.HireDate)}
          helperText={formik.touched.HireDate && formik.errors.HireDate}
          InputLabelProps={{ shrink: true }}
        />
        <FormControl fullWidth>
          <InputLabel sx={{ top: "12px" }}>Hire Status</InputLabel>
          <Select
            name="HireStatus"
            value={formik.values.HireStatus}
            onChange={formik.handleChange}
            error={
              formik.touched.HireStatus && Boolean(formik.errors.HireStatus)
            }
          >
            <MenuItem value={1}>Active</MenuItem>
            <MenuItem value={0}>Inactive</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Specialization"
          name="Specialization"
          value={formik.values.Specialization}
          onChange={formik.handleChange}
          error={
            formik.touched.Specialization &&
            Boolean(formik.errors.Specialization)
          }
          helperText={
            formik.touched.Specialization && formik.errors.Specialization
          }
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Description"
          name="Description"
          value={formik.values.Description}
          onChange={formik.handleChange}
          error={
            formik.touched.Description && Boolean(formik.errors.Description)
          }
          helperText={formik.touched.Description && formik.errors.Description}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Mobile Number"
          name="MobileNum"
          value={formik.values.MobileNum}
          onChange={formik.handleChange}
          error={formik.touched.MobileNum && Boolean(formik.errors.MobileNum)}
          helperText={formik.touched.MobileNum && formik.errors.MobileNum}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="LinkedIn Link"
          name="LinkedInLink"
          value={formik.values.LinkedInLink}
          onChange={formik.handleChange}
          error={
            formik.touched.LinkedInLink && Boolean(formik.errors.LinkedInLink)
          }
          helperText={formik.touched.LinkedInLink && formik.errors.LinkedInLink}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: "400px" }}
        >
          Transform this user to teacher
        </Button>
      </form>
    </Box>
  );
}
