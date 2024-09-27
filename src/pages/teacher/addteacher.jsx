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
import postRequest from "../../request/postRequest";
import getRequest from "../../request/getRequest";
import putRequest from "../../request/putRequest";
import { useNavigate, useParams } from "react-router-dom";
// import Header from "../../components/Header";

export default function Addteacher() {
  const navigate = useNavigate();

  // 存储从后端api获取的所有用户数据
  const [users, setUsers] = useState([]);
  // 控制加载的状态
  const [loading, setLoading] = useState(false);
  // 储存被选择转变成teacher的user
  const [selectedUser, setSelectedUser] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  let { id } = useParams();

  // check the id. If it has one, then update
  const isUpdateMode = id !== undefined;

  useEffect(() => {
    const fetchUsers = async () => {
      // 先设置加载状态：打开加载状态
      setLoading(true);
      const result = await getRequest("/users");
      console.log("usersuerserusuiw", result);

      // 从后端获取所有teachers的数据信息，包括user_id，specialization，hire date等等
      const teacherResult = await getRequest("/teachers");
      console.log("teacherResultteacherResult", teacherResult);

      // 将已经教师的用户id提取出来
      const alreadyTeacherIds = Array.isArray(teacherResult.data)
        ? teacherResult.data.map((teacher) => teacher.User_id)
        : [];

      // 过滤掉已经是教师的用户
      const filteredUsers = Array.isArray(result.data)
        ? result.data.filter((user) => !alreadyTeacherIds.includes(user.id))
        : [];

      // 将返回的已被过滤的user数据通过setUsers存储到users中
      setUsers(filteredUsers);
      console.log("Fetched users:", result.data);
      // console.log("Fetched users:", JSON.stringify(result.data));
      // 加载完成，关闭加载状态
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleSelectedUser = (value) => {
    console.log("value", value);
    formik.setFieldValue("User_id", value.id);
    setSelectedUser(value);
  };

  // 使用 Formik 管理表单状态和验证
  const formik = useFormik({
    initialValues: {
      User_id: "",
      HireDate: "",
      HireStatus: 1, // 默认在职
      Specialization: "",
      Description: "",
      MobileNum: "",
      LinkedInLink: "",
    },
    validationSchema: Yup.object({
      User_id: Yup.number().required("user is required"),
      HireDate: Yup.date().required("Hire Date is required"),
      HireStatus: Yup.number().required("Hire Status is required"),
      Specialization: Yup.string()
        .max(200, "Max 200 characters")
        .required("Specialization is required"),
      Description: Yup.string()
        .max(250, "Max 250 characters")
        .required("Description is required"),
      MobileNum: Yup.string()
        .max(15, "Max 15 characters")
        .required("Mobile number is required"),
      LinkedInLink: Yup.string().required("LinkedIn link is required"),
    }),

    //   onSubmit: async (values) => {
    //     await handleFormSubmission(values);
    // },
    onSubmit: async (inputValues, { resetForm }) => {
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
        resetForm();
        navigate("/teachers");
      } else {
        alert("failed to shift this user to teacher.");
      }
    },
  });

  const handleFormSubmission = async (values) => {
    setIsLoading(true);
    const dataToSubmit = {
      User_id: selectedUser.value.id,
      HireDate: values.HireDate,
      HireStatus: values.HireStatus,
      Specialization: values.Specialization,
      Description: values.Description,
      MobileNum: values.MobileNum,
      LinkedInLink: values.LinkedInLink,
    };
    try {
      // const endpoint = id ? `/courses/${id}` : "/courses";
      const result = isUpdateMode
        ? await putRequest(`/teachers/${id}`, dataToSubmit)
        : await postRequest("/teachers", dataToSubmit);
      if (result.status === 1) {
        toast.success(`${id ? "Update" : "Add"} success!`);
        navigate(`/teachers`);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(`Error ${id ? "updating" : "adding"} item:`, error);
      toast.error(`Failed to ${id ? "update" : "add"} item.`);
    } finally {
      setIsLoading(false);
    }
  };

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
            error={formik.touched.User_id && Boolean(formik.errors.User_id)}
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
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: "400px", flex: 1 }}
          >
            Add Teacher
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
