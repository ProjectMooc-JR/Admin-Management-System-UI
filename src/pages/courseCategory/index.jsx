// import React, { useState } from "react";
// import { useEffect } from "react";
// import { Box, Button, Stack, Divider, Hidden } from "@mui/material";
// import Header from "../../components/Header";
// import CategoryList from "../courseCategory/categorylist";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useNavigate } from "react-router-dom";
// import getRequest from "../../request/getRequest";
// import deleteRequest from "../../request/delRequest";
// import postRequest from "../../request/postRequest";
// import toast from "react-hot-toast";

// const CourseCategory = () => {
//   const columns = [
//     {
//       field: "CategoryName",
//       headerName: "Category Name",
//       headerAlign: "center",
//       flex: 1,
//       align: "center",
//     },
//     {
//       field: "Level",
//       headerName: "Level",
//       type: "number",
//       headerAlign: "center",
//       flex: 1,
//       align: "center",
//     },
//     {
//       field: "ParentID",
//       headerName: "ParentID",
//       type: "number",
//       headerAlign: "center",
//       flex: 1,
//       align: "center",
//     },
//     {
//       field: "Notes",
//       headerName: "Notes",
//       headerAlign: "center",
//       flex: 1,
//       align: "center",
//     },
//     {
//       field: "operations",
//       headerName: "Operations",
//       flex: 1,
//       headerAlign: "center",
//       align: "center",
//       renderCell: (params) => (
//         <Box>
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<EditIcon />}
//             onClick={(event) => {
//               event.stopPropagation();
//               handleEdit(params.row.id);
//             }}
//             sx={{
//               marginRight: 3,
//               width: 20,
//               backgroundColor: "#1976d2",
//               "&:hover": {
//                 backgroundColor: "#115293",
//               },
//             }}
//           >
//             Edit
//           </Button>
//           <Button
//             variant="contained"
//             color="error"
//             startIcon={<DeleteIcon />}
//             onClick={(event) => {
//               event.stopPropagation();
//               handleDelete(params.row.id);
//             }}
//             sx={{
//               marginRight: 1,
//               "&:hover": {
//                 backgroundColor: "#d32f2f",
//               },
//             }}
//           >
//             Delete
//           </Button>
//         </Box>
//       ),
//     },
//   ];

//   const [pageSearch, setpageSearch] = useState({
//     pageSize: 10,
//     page: 1,
//   });

//   const handlePaginationModel = (e) => {
//     setpageSearch((preState) => ({
//       ...preState,
//       page: e.page + 1,
//       pageSize: e.pageSize,
//     }));
//   };
//   const [pageData, setPageData] = useState({ items: [], total: 0 });

//   useEffect(() => {
//     let getUser = async () => {
//       let result = await getRequest(
//         `/courseCategory/${pageSearch.page}/${pageSearch.pageSize}`
//       );
//       if (result.status === 200) {
//         setPageData(result.data);
//         console.log("pageData:::::", pageData);
//       } else {
//         setPageData({ items: [], total: 0 });
//       }
//       console.log(result.data);
//     };
//     getUser();
//   }, [pageSearch]);
//   const [open, setOpen] = useState(false);

//   // const handleWinClose = async (data) => {
//   //   console.log("handleWinClose", data);
//   //   setOpen(false);
//   //   if (!data.isOk || rowSelectionModel.length == 0) {
//   //     return;
//   //   }

//   //   let ids = rowSelectionModel.join(",");
//   //   let result = await deleteRequest(`/users/${ids}`);
//   //   if (result.status == 1) {
//   //     toast.success("delete success!");
//   //   } else {
//   //     toast.success("delete fail!");
//   //   }

//   //   setpageSearch({ page: 1, pageSize: pageSearch.pageSize });
//   // };
//   const navigate = useNavigate();
//   function handleAddCategory() {
//     navigate("/courseCategory/addCategory");
//   }

//   async function handleDelete(courseId) {
//     let result = await deleteRequest(`/courseCategory/${courseId}`);
//     if (result.status === 200) {
//       setAlartMessage("Are you sure to delete these items?");

//       toast.success("delete success!");
//     } else {
//       toast.success("delete fail!");
//     }
//     setpageSearch({ page: 1, pageSize: pageSearch.pageSize });
//   }
//   function handleEdit(id) {
//     navigate(`/courseCategory/updateCategory/${id}`);
//   }
//   const [alertMessage, setAlartMessage] = useState("");
//   const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
//   console.log("rowSelectionModel:;", rowSelectionModel);

//   async function handleMutiDelete() {
//     if (rowSelectionModel.length == 0) {
//       setAlartMessage("Please select items");
//       setOpen(true);
//       return;
//     }
//     setAlartMessage("Are you sure to delete these items?");
//     setOpen(true);
//     //批量删除
//     let result = await postRequest(`/courseCategory/mult-delete`, {
//       ids: rowSelectionModel,
//     });
//     if (result.status === 200) {
//       toast.success("delete success!");
//     } else {
//       toast.success("delete fail!");
//     }
//     setpageSearch({ page: 1, pageSize: pageSearch.pageSize });
//     setRowSelectionModel([]);
//   }

//   return (
//     <>
//       <Box m="20px">
//         <Header
//           title="Course Category"
//           subtitle="Managing the Course Category"
//         />
//         <Box sx={{ mb: "15px" }}>
//           <Stack direction="row" spacing={2} justifyContent="flex-end">
//             <Button variant="contained" onClick={handleAddCategory}>
//               Add Category
//             </Button>
//             <Button
//               color="secondary"
//               variant="contained"
//               onClick={handleMutiDelete}
//             >
//               Delete
//             </Button>
//           </Stack>
//         </Box>
//         <div style={{ width: "100%", overflow: Hidden }}>
//           <CategoryList
//             columns={columns}
//             pageData={pageData}
//             setPaginationModel={handlePaginationModel}
//             setRowSelectionModel={setRowSelectionModel}
//           />
//         </div>
//       </Box>
//     </>
//   );
// };

// export default CourseCategory;

import React, { useState } from "react";
import { Box, Button, Stack, Divider } from "@mui/material";
import Header from "../../components/Header";
import colors from "../../theme";
import AlterDialog from "../../components/alterDialog";
import CategoryList from "./categorylist";
import { useEffect } from "react";
import getRequest from "../../request/getRequest";
import deleteRequest from "../../request/delRequest";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CourseCategory() {
  // 用pageSearch以存储当前的分页信息（当前的页码和条目数）
  const [pageSearch, setPageSearch] = useState({
    pageSize: 10,
    page: 1,
  });
  // 用以存储获取到的（分页后的）用户数据信息
  const [pagedCategories, setPagedCategories] = useState({
    items: [],
    total: 0,
  });

  //=========================================================================================

  // ？？？？？【定义操作teacher update的函数（先留空，之后再写）】
  const handleUpdate = (row) => {
    // 将教师ID添加到URL中
    console.log("rowididi", row);
    // navigate(`/teachers/updateteacher/${row.id}`);
  };

  //=========================================================================================

  //【定义操作add teacher的函数】

  const navigate = useNavigate();
  function handleAddCategory() {
    navigate("/courseCategory/addCategory");
  }
  //=========================================================================================
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  //**配置一个打开/关闭弹窗组件的状态
  const [open, setOpen] = useState(false);

  // **配置一个可以在弹窗中显示不同文本信息的状态
  const [alertMessage, setAlertMessage] = useState("");

  // **定义操作delete teacher的函数
  const handleDeleteCategory = () => {
    if (rowSelectionModel.length === 0) {
      setAlertMessage("Please select categories you want to delete.");
      setOpen(true);
    } else {
      setAlertMessage(
        "Are you sure to remove " +
          (rowSelectionModel.length === 1
            ? "this category"
            : "these categories") +
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
    let result = await deleteRequest(`/courseCategory/${ids}`);
    if (result.status === 200) {
      toast.success("Course category removed!");
    } else {
      toast.error("Failed to remove.");
    }
    // 重置分页状态，刷新数据
    setPageSearch({ page: 1, pageSize: pageSearch.pageSize });
  };

  //=========================================================================================

  // 定义表格的列，并渲染数据列表
  const columns = [
    { field: "ID", headerName: "ID" },
    {
      field: "CategoryName",
      headerName: "Category Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Level",
      headerName: "Level of Category",
      flex: 1,
    },
    {
      field: "parentCategoryName",
      headerName: "Parent Category",
      flex: 1,
    },
    {
      field: "Notes",
      headerName: "Notes",
      flex: 1,
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
    let getCategory = async () => {
      let result = await getRequest(
        `/courseCategory/${pageSearch.page}/${pageSearch.pageSize}`
      );
      if (result.status === 200) {
        // 创建ID和parent category name的映射关系，创建一个包含了ID和category name对应关系的object：
        const categoryPair = {};
        result.data.items.forEach((category) => {
          categoryPair[category.ID] = category.CategoryName;
        });
        // 把每个items里的parent ID更新为parent category name
        const updatedItems = result.data.items.map((category) => ({
          ...category,
          parentCategoryName: category.ParentID
            ? categoryPair[category.ParentID]
            : "",
        }));

        // 更新状态
        setPagedCategories({ ...result.data, items: updatedItems });
      } else setPagedCategories({ items: [], total: 0 });
    };
    getCategory();
  }, [pageSearch]); // 依赖项为pageSearch是当用户翻页时，页码变动，触发useEffect来从后端获取数据

  return (
    <>
      <Box m="20px">
        {/* 这个header是之前定义的header组件，box是mui提供的替换div的容器 */}
        <Header title="TEAM" subtitle="Managing Course Categories" />
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
              <Button variant="contained" onClick={handleAddCategory}>
                Add Course Category
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={handleDeleteCategory}
              >
                Delete Course Category
              </Button>
            </Stack>
          </Box>
          <CategoryList
            columns={columns}
            pageData={pagedCategories}
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
