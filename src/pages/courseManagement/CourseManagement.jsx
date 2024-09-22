import React, { useState, useEffect } from "react";
import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import AlterDialog from "../../components/alterDialog";
import getRequest from "../../request/getRequest";
import deleteRequest from "../../request/delRequest";
import toast from 'react-hot-toast';
import Header from "../../components/Header";  
import colors from '../../theme';
// import CourseList from "./CourseList"; // 引入CourseList组件

export default function CourseManagement() {
  const [pageSearch, setPageSearch] = useState({
    pageSize: 10,
    page: 1,
  });
  
  const [courses, setCourses] = useState({ items: [], total: 0 });
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const handlePaginationModel = (params) => {
    setPageSearch((preState) => ({
      ...preState,
      page: params.page + 1,
      pageSize: params.pageSize || preState.pageSize,
    }));
  };

useEffect(() => {
    const fetchCourses = async () => {
        const url = `/courses/${pageSearch.page}/${pageSearch.pageSize}`;
        console.log("Requesting URL: ", url);
        let result = await getRequest(url);
        console.log(result);
        if (result.status === 1) {
            setCourses(result.data);
        } else {
            setCourses({ items: [], total: 0 });
        }
    };
    fetchCourses();
}, [pageSearch]);



  const handleDelete = () => {
    if (rowSelectionModel.length === 0) {
      setAlertMessage("Please select courses to delete.");
      setOpen(true);
      return;
    }
    setAlertMessage("Are you sure to delete the selected courses?");
    setOpen(true);
  };

  const handleDialogClose = async (data) => {
    setOpen(false);
    if (!data.isOk || rowSelectionModel.length === 0) return;

    const ids = rowSelectionModel.join(",");
    const result = await deleteRequest(`/courses/${ids}`);
    if (result.status === 1) {
      toast.success("Courses deleted successfully!");
    } else {
      toast.error("Failed to delete courses.");
    }

    setPageSearch({ page: 1, pageSize: pageSearch.pageSize });
  };

  const handleAddCourse = () => {
    navigate("/courses/create");  // 这里添加课程的路由
  };

const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'CourseName', headerName: 'Course Name', flex: 1 },
    { field: 'Description', headerName: 'Description', flex: 1 },
    { field: 'CategoryID', headerName: 'Category', flex: 1 },
    { field: 'TeacherID', headerName: 'Teacher', flex: 1 },
    { field: 'PublishedAt', headerName: 'Published At', flex: 1 },
];


  // // 从 courses 数据中映射 rows
  // const rows = courses.items.map((course) => ({
  //   id: course.id,
  //   courseName: course.courseName,
  //   description: course.description,
  //   category: course.CategoryName,
  //   teacher: course.teacherId,
  //   publishedAt: course.publishedAt,
  // }));

  return (
    <Box m="20px">
      <Header title="Course Management" subtitle="Manage all courses, edit, delete, or add new courses" />

    <Box sx={{ mb: "15px" }}>
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button variant="contained" onClick={handleAddCourse}>
            Add Course
        </Button>
        <Button
            color="secondary"
            variant="contained"
            onClick={handleDelete}
        >
            Delete
        </Button>
        </Stack>
    </Box>

    <Box
    m="40px 0 0 0"
    height="75vh"
    sx={{
        "& .MuiDataGrid-root": {
            border: "none",
        },
        "& .MuiDataGrid-cell": {
            borderBottom: "none",
        },
        "& .name-column--cell": {
            color: colors.greenAccent[300],
        },
        "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
        },
        "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
        },
        "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
        },
    }}
    >
    <DataGrid
        rows={courses.items}  // 将映射后的rows传递给DataGrid
        // total={courses.total}
        columns={columns}
        pageSize={10}
        pageSizeOptions={[10, 25, 50, 100]}  // Provide available options
        checkboxSelection
        disableSelectionOnClick
        onRowSelectionModelChange={(newRowSelectionModel) => {
        setRowSelectionModel(newRowSelectionModel);
        }}
    />
    </Box>
      <AlterDialog
        title="Warning"
        alertType="warning"
        open={open}
        onClose={handleDialogClose}
      >
        {alertMessage}
      </AlterDialog>
    </Box>
  );
}
