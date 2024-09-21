import React, { useState } from "react";
import { useEffect } from "react";
import { Box, Button, Stack, Divider, Hidden } from "@mui/material";
import Header from "../../components/Header";
import CategoryList from "../courseCategory/categorylist";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import getRequest from "../../request/getRequest";
import deleteRequest from "../../request/delRequest";
import postRequest from "../../request/postRequest";
import toast from "react-hot-toast";

const CourseCategory = () => {
  const columns = [
    {
      field: "categoryName",
      headerName: "Category Name",
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "level",
      headerName: "Level",
      type: "number",
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "parentID",
      headerName: "ParentID",
      type: "number",
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "notes",
      headerName: "Notes",
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "operations",
      headerName: "Operations",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={(event) => {
              event.stopPropagation();
              handleEdit(params.row.id);
            }}
            sx={{
              marginRight: 3,
              width: 20,
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#115293",
              },
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={(event) => {
              event.stopPropagation();
              handleDelete(params.row.id);
            }}
            sx={{
              marginRight: 1,
              "&:hover": {
                backgroundColor: "#d32f2f",
              },
            }}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  const [pageSearch, setpageSearch] = useState({
    pageSize: 10,
    page: 1,
  });

  const handlePaginationModel = (e) => {
    setpageSearch((preState) => ({
      ...preState,
      page: e.page + 1,
      pageSize: e.pageSize,
    }));
  };
  const [pageData, setPageData] = useState({ items: [], total: 0 });

  useEffect(() => {
    let getUser = async () => {
      let result = await getRequest(
        `/courseCategory/${pageSearch.page}/${pageSearch.pageSize}`
      );
      if (result.status === 200) {
        setPageData(result.data)
        console.log("pageData:::::", pageData)
      } else {
        setPageData({ items: [], total: 0 })
      }
      console.log(result.data)
    };
    getUser();
  }, [pageSearch]);
  const [open, setOpen] = useState(false);

  // const handleWinClose = async (data) => {
  //   console.log("handleWinClose", data);
  //   setOpen(false);
  //   if (!data.isOk || rowSelectionModel.length == 0) {
  //     return;
  //   }

  //   let ids = rowSelectionModel.join(",");
  //   let result = await deleteRequest(`/users/${ids}`);
  //   if (result.status == 1) {
  //     toast.success("delete success!");
  //   } else {
  //     toast.success("delete fail!");
  //   }

  //   setpageSearch({ page: 1, pageSize: pageSearch.pageSize });
  // };
  const navigate = useNavigate();
  function handleAddCategory() {
    navigate("/courseCategory/addCategory");
  }

  async function handleDelete(courseId) {
    let result = await deleteRequest(`/courseCategory/${courseId}`);
    if (result.status === 200) {
      setAlartMessage("Are you sure to delete these items?");

      toast.success("delete success!");
    } else {
      toast.success("delete fail!");
    }
    setpageSearch({ page: 1, pageSize: pageSearch.pageSize });

  }
  function handleEdit(id) {
    navigate(`/courseCategory/updateCategory/${id}`);

  }
  const [alertMessage, setAlartMessage] = useState("");
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  console.log("rowSelectionModel:;", rowSelectionModel)

  async function handleMutiDelete() {

    if (rowSelectionModel.length == 0) {
      setAlartMessage("Please select items");
      setOpen(true);
      return;
    }
    setAlartMessage("Are you sure to delete these items?");
    setOpen(true);
    //批量删除
    let result = await postRequest(`/courseCategory/mult-delete`, {ids:rowSelectionModel});
    if (result.status === 200) {
      toast.success("delete success!");
    } else {
      toast.success("delete fail!");
    }
    setpageSearch({ page: 1, pageSize: pageSearch.pageSize });
    setRowSelectionModel([]);

  }



  return (
    <>
      <Box m="20px">
        <Header
          title="Course Category"
          subtitle="Managing the Course Category"
        />
        <Box sx={{ mb: "15px" }}>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="contained" onClick={handleAddCategory}>
              Add Category
            </Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={handleMutiDelete}
            >
              Delete
            </Button>
          </Stack>
        </Box>
        <div style={{ width: "100%", overflow: Hidden }}>
          <CategoryList columns={columns} pageData={pageData}
            setPaginationModel={handlePaginationModel}
            setRowSelectionModel={setRowSelectionModel}
          />
        </div>
      </Box>
    </>
  );
};

export default CourseCategory;
