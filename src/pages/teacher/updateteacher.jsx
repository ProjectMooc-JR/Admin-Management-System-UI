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
import toast from "react-hot-toast";
import * as Yup from "yup";
import putRequest from "../../request/putRequest";
import getRequest from "../../request/getRequest";
import { useNavigate, useParams } from "react-router-dom";

// import Header from "../../components/Header";

export default function UpdateTeacher() {
  // 存储从后端api获取的所有用户数据
  const [users, setUsers] = useState([]);
  // 控制加载的状态
  const [loading, setLoading] = useState(false);
  // 储存被选择转变成teacher的user
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    const fetchUsers = async () => {
      // 先设置加载状态：打开加载状态
      setLoading(true);
      const result = await getRequest(`/teachers/${id}`);

      console.log("teachers:", result.data);
      if (result.status == 200) {
        formik.setValues({
          HireDate: formatDateToYYYYMMDD(new Date(result.data.HireDate)),
          HireStatus: result.data.HireStatus,
          Specialization: result.data.Specialization,
          Description: result.data.Description,
          MobileNum: result.data.MobileNum,
          LinkedInLink: result.data.LinkedInLink,
        });
      }
      // console.log("Fetched users:", JSON.stringify(result.data));
      // 加载完成，关闭加载状态
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleSelectedUser = (value) => {
    console.log("value", value);
    setSelectedUser(value);
  };

  function formatDateToYYYYMMDD(date) {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");
    let timeFormat = `${year}-${month}-${day}`;
    console.log("formatDateToYYYYMMDD", timeFormat);
    return timeFormat;
  }

  // 使用 Formik 管理表单状态和验证
  const formik = useFormik({
    initialValues: {
      HireDate: "",
      HireStatus: 1, // 默认在职
      Specialization: "",
      Description: "",
      MobileNum: "",
      LinkedInLink: "",
    },
    validationSchema: Yup.object({
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
      let result = await putRequest(`/teachers/${id}`, {
        User_id: selectedUser.id,
        Specialization: inputValues.Specialization,
        Description: inputValues.Description,
        HireDate: inputValues.HireDate,
        HireStatus: inputValues.HireStatus,
        MobileNum: inputValues.MobileNum,
        LinkedInLink: inputValues.LinkedInLink,
      });

      if (result.status === 201) {
        toast.success("teacher update successfully.");
      } else {
        toast.error("failed to update teacher.");
      }
    },
  });

  const handleCancel = () => {
    formik.resetForm();
    navigate("/teachers");
  };

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
      {/* <button onClick={() => navigate("/teachers")}>Back</button> */}
      {/* <Autocomplete
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
      /> */}
      <form onSubmit={formik.handleSubmit} class="add-teacher-form">
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
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: "400px", flex: 1 }}
          >
            Save updated information
          </Button>
          <Button
            type="button"
            variant="contained"
            color="primary"
            sx={{ width: "400px", flex: 1 }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
}
