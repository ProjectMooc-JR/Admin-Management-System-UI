import React, { useState } from "react";
import { Box, Button, Stack, Divider } from "@mui/material";
import Header from "../../components/Header";
import colors from "../../theme";
import AlterDialog from "../../components/alterDialog";
import CourseScheduleList from "./courseschedulelist";
import { useEffect } from "react";
import getRequest from "../../request/getRequest";
import deleteRequest from "../../request/delRequest";
//import AddCourseSchedule from "./addcourseschedule";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CourseSchedule() {
  const [pageSearch, setpageSearch] = useState({
    pageSize: 25,
    page: 1,
  });

  // const handlePaginationModel = (e) => {
  //   setpageSearch((preState) => ({
  //     ...preState,
  //     page: e.page + 1,
  //     pageSize: e.pageSize,
  //   }));
  // };
  // 实现分页处理的函数：在用户改变页数或者每页显示的条目数时被调用
  // const handlePaginationModel = (e) => {
  //   // e会从分页组件中（比如MUI的datagrid）pass进来
  //   // console.log("e.page", e, pagedTeachers);
  //   console.log("e.page", e.page);
  //   console.log("e.pageSize", e.pageSize);
  //   // console.log("currentPage", currentPage);
  //   setpageSearch((currentPage) => ({
  //     ...currentPage, // 用对象展开符将preState里的数据（键值对）复制过来，只更新需要变动的部分
  //     page: e.page + 1,
  //     pageSize: e.pageSize,
  //   }));
  // };

  const handleUpdate = (row) => {};

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "CourseID",
      headerName: "Course ID",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "StartDate",
      headerName: "Start Date",
      type: "dateTime",
      flex: 1,
    },
    {
      field: "EndDate",
      headerName: "End Date",
      type: "dateTime",
      flex: 1,
    },
    {
      field: "operation",
      headerName: "Opertation",
      flex: 1,
      renderCell: (row) => {
        return (
          <Box>
            <Button variant="text" onClick={handleUpdate(row)}>
              Update
            </Button>
          </Box>
        );
      },
    },
  ];

  // const rows = [
  //   { id: 1, CourseID: 1, StartDate: "010224", EndDate: "020224" },
  //   { id: 2, CourseID: 2, StartDate: "020224", EndDate: "020224" },
  //   { id: 3, CourseID: 3, StartDate: "030224", EndDate: "020224" },
  // ];
  //根据当前页面和分页大小来确定请求的分页参数。
  const [pageData, setPageData] = useState({ items: [], total: 0 });

  useEffect(() => {
    let getCourseschedule = async () => {
      let result = await getRequest(
        `/courseSchedule/${pageSearch.page}/${pageSearch.pageSize}`
      );
      if (result.status == 1) {
        setPageData(result.data);
      } else {
        setPageData({ items: [], total: 0 });
      }
      console.log("=========", result);
    };
    getCourseschedule();
  }, [pageSearch]);

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const handleAddcourseschedule = () => {
    navigate("/courseSchedule/addcourseschedule");
  };
  const [alertMessage, setAlertMessage] = useState("");
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  //const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

  const handledelete = () => {
    //   if (rowSelectionModel.length == 0) {
    //     setAlartMessage("Please select items");
    //     setOpen(true);
    //     return;
    //   }
    //   setAlartMessage("Are you sure to delete these items?");
    //   setOpen(true);
  };

  const handleEdit = (row) => {
    navigate(`/courseSchedule/addcourseschedule/${row.id}`);
  };

  const handleWinClose = async (data) => {
    console.log("handleWinClose", data);
    setOpen(false);
    if (!data.isOk || rowSelectionModel.length == 0) {
      return;
    }
    let ids = rowSelectionModel.join(",");
    let result = await deleteRequest(`/courseSchedule/${ids}`);
    if (result.status == 200) {
      toast.success("delete success!");
    } else {
      toast.success("delete fail!");
    }
    setpageSearch({ page: 1, pageSize: pageSearch.pageSize });
  };

  return (
    <>
      <Box m="20px">
        <Header
          title="Course Schedule"
          subtitle="Managing the Course Schedules"
        />
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
          <Box sx={{ mb: "15px" }}>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="contained" onClick={handleAddcourseschedule}>
                Add Course Schedule
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={handledelete}
              >
                Delete
              </Button>
            </Stack>
          </Box>
          <CourseScheduleList
            //rows={pageData.items}改过的
            //rows={rows}
            columns={columns}
            pageData={pageData}
            handleEdit={handleEdit}
            //setPaginationModel={handlePaginationModel}
            setRowSelectionModel={setRowSelectionModel}
          />
        </Box>
      </Box>
      <AlterDialog
        title="Warning"
        alertType="warning"
        open={open}
        onClose={handleWinClose}
      >
        {alertMessage}
      </AlterDialog>
      {/* <WinDialog title="test dialog" open={open} onClose={handleWinClose}>
            
            <Adduser />
          </WinDialog> */}
    </>
  );
}
