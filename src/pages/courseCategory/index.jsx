import React, { useState } from "react";
import { useEffect } from "react";
import { Box, Button, Stack, Divider, Hidden } from "@mui/material";
import Header from "../../components/Header";
import CategoryList from "../courseCategory/categorylist";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import getRequest from "../../request/getRequest";

const CourseCategory = () => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      Hidden: true,
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => params.row.ID,
    },
    {
      field: "CatogryName",
      headerName: "Category Name",
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "Level",
      headerName: "Level",
      type: "number",
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "ParentId",
      headerName: "ParentID",
      type: "number",
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "Notes",
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

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  const [pageData, setPageData] = useState({ items: [], total: 0 });

  useEffect(() => {
    let getUser = async () => {
      let result = await getRequest(`/courseCategory`);
      if (result.status == 200) {
        setPageData(result.data);
      } else {
        setPageData({ items: [], total: 0 });
      }
      console.log("=========", result);
    };
    getUser();
  }, []);

  const navigate = useNavigate();
  function handleAddUser() {
    console.log(11111);
    navigate("/courseCategory/addCategory");
  }

  function handleDelete() {
    console.log("delete");
  }
  function handleEdit() {}
  function handleMutiDelete() {
    console.log("Mult-delete");
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
            <Button variant="contained" onClick={handleAddUser}>
              Add User
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
          <CategoryList columns={columns} rows={pageData.items} />
        </div>
      </Box>
    </>
  );
};

export default CourseCategory;
