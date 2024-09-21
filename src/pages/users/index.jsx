import React, { useState } from "react";
import { Box, Button, Stack, Divider } from "@mui/material";
import Header from "../../components/Header";
import colors from "../../theme";
import AlterDialog from "../../components/alterDialog";
import UserList from "./userlist";
import { useEffect } from "react";
import getRequest from "../../request/getRequest";
import deleteRequest from "../../request/delRequest";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function User() {
  const [pageSearch, setpageSearch] = useState({
    pageSize: 5,
    page: 1,
  });

  const handlePaginationModel = (e) => {
    setpageSearch((preState) => ({
      ...preState,
      page: e.page + 1,
      pageSize: e.pageSize,
    }));
  };

  const handleUpdate = (row) => {};

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "username",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
    },
    {
      field: "age",
      headerName: "Age",
      flex: 1,
    },
    {
      field: "operation",
      headerName: "opertation",
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

  const [pageData, setPageData] = useState({ items: [], total: 0 });

  useEffect(() => {
    let getUser = async () => {
      let result = await getRequest(
        `/users/${pageSearch.page}/${pageSearch.pageSize}`
      );
      if (result.status === 1) {
        setPageData(result.data);
      } else {
        setPageData({ items: [], total: 0 });
      }
      console.log("=========", result);
    };
    getUser();
  }, [pageSearch]);

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  function handleAddUser() {
    navigate("/users/adduser");
  }

  //===============================================================================================

  const [alertMessage, setAlartMessage] = useState("");

  function handledelete() {
    if (rowSelectionModel.length == 0) {
      setAlartMessage("Please select items");
      setOpen(true);
      return;
    }
    setAlartMessage("Are you sure to delete these items?");
    setOpen(true);
  }

  const handleWinClose = async (data) => {
    console.log("handleWinClose", data);
    setOpen(false);
    if (!data.isOk || rowSelectionModel.length == 0) {
      return;
    }

    let ids = rowSelectionModel.join(",");
    let result = await deleteRequest(`/users/${ids}`);
    if (result.status == 1) {
      toast.success("delete success!");
    } else {
      toast.success("delete fail!");
    }

    setpageSearch({ page: 1, pageSize: pageSearch.pageSize });
  };

  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

  return (
    <>
      <Box m="20px">
        <Header title="TEAM" subtitle="Managing the Team Members" />
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
              <Button variant="contained" onClick={handleAddUser}>
                Add User
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
          <UserList
            columns={columns}
            pageData={pageData}
            setPaginationModel={handlePaginationModel}
            setRowSelectionModel={setRowSelectionModel}
          ></UserList>
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
