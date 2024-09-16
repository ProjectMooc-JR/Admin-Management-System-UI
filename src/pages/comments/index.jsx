import React, { useState } from "react";
import { Box, Button, Stack, Divider } from "@mui/material";
import Header from "../../components/Header";
import colors from "../../theme";
import AlterDialog from "../../components/alterDialog";
//import UserList from "./userlist";
import CommentList from "./commentlist";
import { useEffect } from "react";
import getRequest from "../../request/getRequest";
import deleteRequest from "../../request/delRequest";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Comment() {
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
    
    const handleUpdate=(row)=>{
        
    }
    
    const columns = [
        { field: "id", headerName: "ID" },

        {
            field: "CourseName",
            headerName: "Course Name",
            flex: 1,
        },

        {
            field:"username",
            headerName:"User Name",
            flex:1,
        },

        {
            field: "CommentContent",
            headerName: "Comment Content",
            flex: 1,
        },

        // {
        //     field: "CommentTime",
        //     headerName: "Comment Time",
        //     flex: 1,
        // },

        {
            field: "CommentTime",
            headerName: "Comment Time",
            type: "dateTime",
            valueGetter: (value) => {
              let returnValue = value.row.CommentTime && new Date(value.row.CommentTime);
              return returnValue;
            },
            flex: 1,
        },

        {
            field: "operation",
            headerName: "operation",
            flex: 1,
            renderCell: (row) => {
              return (
                <Box>
                 <Button variant="text" onClick={handleUpdate(row)} >Update</Button>
                </Box>
              );
            },
          }
    ];
    
    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [data, setData] = useState({items:[],total:0});
    //const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
    
    // const handleDelete = async () => {
    //     try {
    //     await deleteRequest(`/comments/${deleteId}`);
    //     toast.success("Comment deleted successfully");
    //     setOpen(false);
    //     setDeleteId(null);
    //     fetchComments();
    //     } catch (error) {
    //     toast.error("Error while deleting comment");
    //     }
    // };
    const handleAddComment = ()=>{
        navigate("/comments/addcomment");
    }

    const [alertMessage, setAlertMessage] = useState("");
    
    const handleEdit = (row) => {
        navigate(`/comments/addcomment/${row.id}`);
    };
    
    const handleDeleteDialog = (id) => {
        setDeleteId(id);
        setOpen(true);
    };
    
    // const fetchComments = async () => {
    //     setLoading(true);
    //     try {
    //     const response = await getRequest("/comments", pageSearch);
    //     setData(response.data);
        
    //     } catch (error) {
    //     setError(error);
    //     } finally {
    //     setLoading(false);
    //     }
    // };
    
    useEffect(() => {
        let getComment = async()=>{
            let result = await getRequest(`/comments/${pageSearch.page}/${pageSearch.pageSize}`);
            console.log(result.status);
            if(result.status === 200){
                setData(result.data);
            }else{
                setData({items:[],total:0});
            }
        }
        getComment();
    }, [pageSearch]);

    
    function handledelete() {
        if (rowSelectionModel.length === 0) {
          setAlertMessage("Please select items");
          setOpen(true);
          return;
        }
        setAlertMessage("Are you sure to delete these items?");
        setOpen(true);
      }
    const handleWinClose = async (data) => {
        console.log("handleWinClose", data);
        setOpen(false);
        if (!data.isOk || rowSelectionModel.length === 0) {
          return;
        }
      
        let ids = rowSelectionModel.join(",");
        let result = await deleteRequest(`/comments/${ids}`);
        if (result.status === 200) {
          toast.success("comments removed!");
        } else {
          toast.success("comments fail to remove!");
        }
    
        setpageSearch({ page: 1, pageSize: pageSearch.pageSize });
      };
    return (
        <>
            <Box m="20px">
                <Header title="Comments" />
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
                        <Stack direction = "row" spacing={2} justifyContent="flex-end">
                            <Button
                            variant="contained"
                            color="primary"
                            //onClick={() => navigate("/comments/addcomment")}
                            onClick = {handleAddComment}
                            >
                            Add Comment
                            </Button>
                            <Button color="secondary"
                            variant="contained"
                            onClick={handledelete}
                            >
                                Delete Comment
                            </Button>
                        </Stack>
                        <Divider />
                    </Box>
                    <CommentList
                    columns={columns}
                    data={data}   
                    loading={loading}
                    error={error}     
                    handleDeleteDialog={handleDeleteDialog}
                    handleEdit={handleEdit}
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
            {/* <AlterDialog
                open={open}
                setOpen={setOpen}
                title="Delete Comment"
                content="Are you sure you want to delete this comment?"
                handleOk={handleWinClose}
            /> */}
            
        </>
    );
}    