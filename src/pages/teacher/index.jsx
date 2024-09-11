import React, { useState } from "react";
import { Box, Button, Stack, Divider } from "@mui/material";
import Header from "../../components/Header";
import colors from "../../theme";
import AlterDialog from "../../components/alterDialog";
import TeacherList from "./teacherlist";
import { useEffect } from "react";
import getRequest from "../../request/getRequest";
import deleteRequest from "../../request/delRequest";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Teacher() {
  // 用pageSearch以存储当前的分页信息（当前的页码和条目数）
  const [pageSearch, setPageSearch] = useState({
    pageSize: 10,
    page: 1,
  });
  // 用以存储获取到的（分页后的）用户数据信息
  const [pagedTeachers, setPagedTeachers] = useState({ items: [], total: 0 });

  const [open, setOpen] = useState(false);
  //=========================================================================================

  // ？？？？？【定义操作teacher update的函数（先留空，之后再写）】
  const handleUpdate = (row) => {};

  // ？？？？？【定义操作add teacher的函数（留空）】
  const navigate = useNavigate();
  function handleAddTeacher() {
    navigate("/teachers/addteacher");
  }

  // ？？？？？【定义操作delete teacher的函数（留空）】
  const handleDeleteTeacher = () => {};
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  //=========================================================================================

  // 定义表格的列，并渲染数据列表
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "username",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Specialization",
      headerName: "Specialization",
      flex: 1,
    },
    {
      field: "HireDate",
      headerName: "Hire Date",
      type: "dateTime",
      valueGetter: (value) => {
        let returnValue = value.row.HireDate && new Date(value.row.HireDate);
        return returnValue;
      },
      flex: 1,
    },
    {
      field: "MobileNum",
      headerName: "Mobile Number",
      flex: 1,
    },
    {
      field: "HireStatus",
      headerName: "Hire Status",
      flex: 1,
      valueGetter: (value) => {
        if (value.row.HireStatus == 1) {
          return "Yes";
        }
        return "No";
      },
    },
    {
      field: "operation",
      headerName: "Operation",
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

  // 实现分页处理的函数：在用户改变页数或者每页显示的条目数时被调用
  const handlePaginationModel = (e) => {
    // e会从分页组件中（比如MUI的datagrid）pass进来
    // console.log("e.page", e, pagedTeachers);
    console.log("e.page", e.page);
    console.log("e.pageSize", e.pageSize);
    // console.log("currentPage", currentPage);
    setPageSearch((currentPage) => ({
      ...currentPage, // 用对象展开符将preState里的数据（键值对）复制过来，只更新需要变动的部分
      page: e.page + 1,
      pageSize: e.pageSize,
    }));
  };

  useEffect(() => {
    let getTeacher = async () => {
      let result = await getRequest(
        `/teachers/${pageSearch.page}/${pageSearch.pageSize}?includeUserData=true`
      );
      if (result.status === 200) {
        setPagedTeachers(result.data);
      } else setPagedTeachers({ items: [], total: 0 });
    };
    getTeacher();
  }, [pageSearch]); // 依赖项为pageSearch是当用户翻页时，页码变动，触发useEffect来从后端获取数据

  return (
    <Box m="20px">
      {/* 这个header是之前定义的header组件，box是mui提供的替换div的容器 */}
      <Header title="TEAM" subtitle="Managing Teachers" />
      <Box sx={{ mb: "15px" }}>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="contained" onClick={handleAddTeacher}>
            Add Teacher
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleDeleteTeacher}
          >
            Delete Teacher
          </Button>
        </Stack>
      </Box>
      <TeacherList
        columns={columns}
        pageData={pagedTeachers}
        setPaginationModel={handlePaginationModel}
        setRowSelectionModel={setRowSelectionModel}
      />
    </Box>
  );
}
