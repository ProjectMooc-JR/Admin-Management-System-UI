import React from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Stack
} from "@mui/material";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import postRequest from "../../request/postRequest";
import Header from "../../components/Header";

export default function AddUser() {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      address: "",
      gender: 0,
      age: 0,
      password: "",
      confirmpassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Must be 3 characters or more")
        .max(30, "Must be 30 characters or less")
        .required("Required"),
      email: Yup.string()
        .max(100, "Must be 30 characters or less")
        .email("pls input correct email format"),
      password: Yup.string()
        .min(6, "Must be 6 characters or more")
        .max(100, "Must be 30 characters or less")
        .required("Required"),
      confirmpassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      debugger;
      let result = await postRequest("/users", {
        username: values.username,
        password: values.password,
        email: values.email,
        address:values.address,
        gender:values.gender,
        age:values.age
      });

      if (result.status == 1) {
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
      <Header title="CREATE USER" subtitle="Create a New User Profile" url="/users" urltitle={"UserList"} />
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
            label="User Name"
            name="username"
            autoComplete="text"
            onChange={formik.handleChange}
            value={formik.values.username}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            autoFocus
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            autoComplete="current-password"
            autoFocus
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Confirmed Password"
            name="confirmpassword"
            onChange={formik.handleChange}
            value={formik.values.confirmpassword}
            error={
              formik.touched.confirmpassword &&
              Boolean(formik.errors.confirmpassword)
            }
            helperText={
              formik.touched.confirmpassword && formik.errors.confirmpassword
            }
            autoComplete="current-password"
            autoFocus
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Email"
            name="email"
            autoComplete="text"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            autoFocus
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Address"
            name="address"
            autoComplete="text"
            multiline
            onChange={formik.handleChange}
            value={formik.values.address}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
            autoFocus
            sx={{ gridColumn: "span 4" }}
          />
          {/* <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Gender"
            name="gender"
            autoComplete="text"
            onChange={formik.handleChange}
            value={formik.values.gender}
            error={formik.touched.gender && Boolean(formik.errors.gender)}
            helperText={formik.touched.gender && formik.errors.gender}
            autoFocus
            sx={{ gridColumn: "span 3" }}
          /> */}

          <FormControl fullWidth sx={{ gridColumn: "span 4" }}>
            <InputLabel id="demo-simple-select-label">gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="gender"
              value={formik.values.gender}
              label="gender"
              error={formik.touched.gender && Boolean(formik.errors.gender)}
              helperText={formik.touched.gender && formik.errors.gender}
              onChange={formik.handleChange}
            >
              <MenuItem value={0}>Female</MenuItem>
              <MenuItem value={1}>Male</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Age"
            name="age"
            autoComplete="text"
            onChange={formik.handleChange}
            value={formik.values.age}
            error={formik.touched.age && Boolean(formik.errors.age)}
            helperText={formik.touched.age && formik.errors.age}
            autoFocus
            sx={{ gridColumn: "span 4" }}
          />
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Stack direction="row" spacing={2}>
            <Button type="submit" color="secondary" variant="contained">
              Create New User
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
