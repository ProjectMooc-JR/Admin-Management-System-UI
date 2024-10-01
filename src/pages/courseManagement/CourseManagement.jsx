import React, { useState, useEffect } from "react";
import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { DataGridPro } from "@mui/x-data-grid-pro";
import AlterDialog from "../../components/alterDialog";
import getRequest from "../../request/getRequest";
import deleteRequest from "../../request/delRequest";
import toast from "react-hot-toast";
import Header from "../../components/Header";
import colors from "../../theme";

export default function CourseManagement() {
  const [pageSearch, setPageSearch] = useState({
    pageSize: 10,
    page: 1,
  });

  const apiRef = useGridApiRef();

  const [courses, setCourses] = useState({ items: [], total: 0 });
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await getRequest(
        `/courses/${pageSearch.page}/${pageSearch.pageSize}`
      );
      console.log(result);
      // const result = await getRequest('courses/courselist');
      if (result.status === 200) {
        const rows = result.data.items.map((course) => ({
          id: course.id,
          courseName: course.CourseName,
          description: course.Description,
          category: course.CategoryName,
          cover: course.Cover,
          teacher: course.username,
          publishedAt: course.PublishedAt,
          chapterItems: course.chapterItems,
        }));
        setCourses({ items: rows, total: result.data.total });
      } else {
        setCourses({ items: [], total: 0 });
      }
    };
    fetchCourses();
  }, [pageSearch]);

  // 处理点击课程名称的跳转
  const handleRowClick = (courseId) => {
    navigate(`/courses/${courseId}`); // 跳转到课程展示页面
  };

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
    navigate("/courses/create"); // 这里添加课程的路由
  };

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "courseName", headerName: "Course Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "teacher", headerName: "Teacher", flex: 1 },
    {
    field: "cover",
    headerName: "Cover",
    flex: 1,
    renderCell: (params) => (
      <img
        src={params.row.cover}  // 从params.row.cover获取图片地址
        alt="Course Cover"
        style={{ width: "50px", height: "50px", borderRadius: "5px" }} 
      />
    ),
    },
    // { field: "publishedAt", headerName: "Published At", flex: 1 },
    {
      field: "publishedAt",
      headerName: "Published At",
      type: "dateTime",
      valueGetter: (value) => {
        let returnValue =
          value.row.publishedAt && new Date(value.row.publishedAt);
        return returnValue;
      },
      flex: 1,
    },
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
  const getDetailPanelHeight = React.useCallback(() => 400, []);

  const getDetailPanelContent = React.useCallback(
    ({ row }) => <Chapter row={row} />,
    []
  );

  const handlePaginationModel = (e) => {
    setPageSearch((preState) => ({
      ...preState,
      page: e.page + 1,
      pageSize: e.pageSize,
    }));
  };

  const setPageSize = (value) => {
    setPageSearch((preState) => ({
      ...preState,
      pageSize: value,
    }));
  };

  const setPage = (value) => {
    setPageSearch((preState) => ({
      ...preState,
      page: value + 1,
    }));
  };

  const handleAddChapter = () => {
    debugger;
    let selectedRows = apiRef.current.getSelectedRows();
    selectedRows = Array.from(selectedRows.values());
    if (selectedRows.length === 0) {
      toast.error("Please select course to add a chapter.");
      return;
    }
    if (selectedRows.length > 1) {
      toast.error("Please select only one course to add the chapter.");
      return;
    }
    //navigate("/createChapter/" + rowSelectionModel.id); // Add chapter route

    navigate("/createChapter/" + selectedRows[0].id); // Add chapter route
  };

  return (
    <Box m="20px">
      <Header
        title="Course Management"
        subtitle="Manage all courses, edit, delete, or add new courses"
      />

      <Box sx={{ mb: "15px" }}>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="contained" onClick={handleAddCourse}>
            Add Course
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleAddChapter}
          >
            Add Chapter
          </Button>
          <Button color="secondary" variant="contained" onClick={handleDelete}>
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
        {/* <DataGrid
          rows={courses.items} // 将映射后的rows传递给DataGrid
          rowCount={courses.total}
          columns={columns}
          getRowId={(row) => row.id}
          pageSize={10}
          pageSizeOptions={[10, 25, 50, 100]} // Provide available options
          checkboxSelection
          disableSelectionOnClick
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
        /> */}

        <DataGridPro
          columns={columns}
          rows={courses.items}
          rowCount={courses.total}
          rowsPerPageOptions={[1, 20, 50, 100]}
          pageSize={pageSearch.pageSize}
          pagination
          paginationMode="server"
          rowSelection
          checkboxSelection
          indeterminateCheckboxAction="select"
          apiRef={apiRef}
          // 加入点击行跳转逻辑
          onPageSizeChange={(newPageSize) =>
            setPageSearch((prev) => ({ ...prev, pageSize: newPageSize }))
          }
          onPageChange={(newPage) =>
            setPageSearch((prev) => ({ ...prev, page: newPage }))
          }
          // onRowClick={handleRowClick}
          // onPaginationModelChange={handlePaginationModel}

          onRowSelectionModelChange={() => {
            alert("1");
          }}
          rowThreshold={0}
          getDetailPanelHeight={getDetailPanelHeight}
          getDetailPanelContent={getDetailPanelContent}
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

function Chapter(props) {
  console.log("Chapter", props);
  const navigate = useNavigate();

  const handleUpdate = (row) => {
    console.log("rowididi", row);
    navigate(`/CreateChapter/0/${row.id}`);
  };

  const handleDetails = (row) => {
    debugger;
    console.log("rowididi", row);
    navigate(`/CreateChapter/0/${row.id * -1}`);
  };

  return (
    <Box sx={{ width: "98%", height: 400 }}>
      <DataGridPro
        density="compact"
        getRowId={(row) => row.ID}
        columns={[
          { field: "ChapterTitle", headerName: "ChapterTitle", flex: 1 },
          {
            field: "ChapterDescription",
            headerName: "ChapterDescription",
            align: "center",
            type: "string",
            flex: 1,
          },
          {
            field: "ChapterOrder",
            headerName: "ChapterOrder",
            type: "number",
            flex: 1,
          },

          {
            field: "VideoURL",
            headerName: "VideoURL",
            type: "string",
            flex: 1,
          },
          {
            field: "cover",
            headerName: "Cover",
            flex: 1,
            renderCell: (params) => (
              <img
                src={params.row.cover}  
                alt="Course Cover"
                style={{ width: "50px", height: "50px", borderRadius: "5px" }} 
              />
            ),
          },
          {
            field: "operation",
            headerName: "Operation",
            flex: 1,
            renderCell: (row) => {
              return (
                <Box>
                  <Button variant="text" onClick={() => handleUpdate(row)}>
                    Update
                  </Button>
                  <Button variant="text" onClick={() => handleDetails(row)}>
                    Details
                  </Button>
                </Box>
              );
            },
          },
        ]}
        rows={props.row.chapterItems}
        sx={{ flex: 1 }}
        hideFooter
      />
    </Box>
  );
}
