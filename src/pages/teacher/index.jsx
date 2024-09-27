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

  //=========================================================================================

  // ？？？？？【定义操作teacher update的函数（先留空，之后再写）】
  const handleUpdate = (row) => {
    // 将教师ID添加到URL中
    console.log("rowididi", row);
    navigate(`/teachers/updateteacher/${row.id}`);
  };

  //=========================================================================================

  //【定义操作add teacher的函数】

  const navigate = useNavigate();
  function handleAddTeacher() {
    navigate("/teachers/addteacher");
  }
  //=========================================================================================

  // 【操作delete teacher】

  // 批量删除逻辑：
  // Step 1：用rowSelectionModel配置多选功能，将选中的teacher的id传进一个空数组；

  // Step 2：配置一个alert message状态，初始化是空string；同时配置一个setOpen状态来管理alert message打开/关闭状态；

  // Step 3：配置一个handleDelete函数，用onClick挂在delete button上，点击检测是否有选中用户（没有选中弹出提示，有选中弹出二次确认）;

  // Step 4：在return里导入老师构建的提示框component：alterDialog，提示框提示的文本内容由alertMessage来控制；

  // Step 5：创建调用后端deleteTeacher API的函数，在index中作为props传递给alterDialog这个子组件；

  // **设置多选：原本是空数组，用户多选/反选时，将选中的id加入该数组，或从该数组中移除
  // **rowSelectionModel是MUI提供的方法，默认会选取colums配置中每行的唯一标识符——id
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  //**配置一个打开/关闭弹窗组件的状态
  const [open, setOpen] = useState(false);

  // **配置一个可以在弹窗中显示不同文本信息的状态
  const [alertMessage, setAlertMessage] = useState("");

  // **定义操作delete teacher的函数
  const handleDeleteTeacher = () => {
    if (rowSelectionModel.length === 0) {
      setAlertMessage("Please select teachers you want to delete.");
      setOpen(true);
    } else {
      setAlertMessage(
        "Are you sure to remove " +
          (rowSelectionModel.length === 1 ? "this teacher" : "these teachers") +
          " from database?"
      );
      setOpen(true);
    }
  };

  // **定义调用后端deleteTeacher API的函数，将其传递给alterDialog子组件
  const handleWinClose = async (data) => {
    setOpen(false);
    // 如果用户点击【cancel】(isOk为false）, 取消操作，或者用户没有选取任何行，无事发生；
    if (!data.isOk || rowSelectionModel.length === 0) {
      return;
    }
    // 用户点击【ok】(isOk为true），调用deleteRequest访问后端delete teacher API：
    let ids = rowSelectionModel.join(","); // 将获取的id拼接成用逗号分隔的字符串

    // console.log("ididididi", ids);
    let result = await deleteRequest(`/teachers/${ids}`);
    if (result.status === 200) {
      toast.success("Teacher removed!");
    } else {
      toast.error("Failed to remove.");
    }
    // 重置分页状态，刷新数据
    setPageSearch({ page: 1, pageSize: pageSearch.pageSize });
  };

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
      flex: 1,
      valueGetter: (value) => {
        let hireDate = value.row.HireDate && new Date(value.row.HireDate);
        if (hireDate) {
          // 用padStart方法把day和month的数字顶到两位数，不足两位数的话在前面填充0
          const day = String(hireDate.getDate()).padStart(2, "0");
          // js里的月份默认是0-11，所以+1变成1-12
          const month = String(hireDate.getMonth() + 1).padStart(2, "0");
          const year = hireDate.getFullYear();
          return `${day}/${month}/${year}`; // 返回格式化后的日期
        }
        return "";
      },
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
        if (value.row.HireStatus === 1) {
          return "Active";
        }
        return "Inactive";
      },
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
          </Box>
        );
      },
    },
  ];

  // 实现分页处理的函数：在用户改变页数或者每页显示的条目数时被调用
  const handlePaginationModel = (e) => {
    // e会从分页组件中（比如MUI的datagrid）pass进来
    // console.log("e.page", e, pagedTeachers);
    // console.log("e.page", e.page);
    // console.log("e.pageSize", e.pageSize);
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
    <>
      <Box m="20px">
        {/* 这个header是之前定义的header组件，box是mui提供的替换div的容器 */}
        <Header title="TEAM" subtitle="Managing Teachers" />
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
            pageSearch={pageSearch}
            setPaginationModel={handlePaginationModel}
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
    </>
  );
}
