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
        pageSize: 25,
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
        field: "CourseID",
        headerName: "Course ID",
        flex: 1,
        
        },
        {
        field: "CommentContent",
        headerName: "Comment Content",
        flex: 1,
        },
        {
        field: "CommentTime",
        headerName: "Comment Time",
        flex: 1,
        },
        {
        field:"UserID",
        headerName:"User ID",
        flex:1,
        },
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

    const [alertMessage, setAlertMessage] = useState("");
   
    function handleDelete() {
        if (rowSelectionModel.length == 0) {
          setAlertMessage("Please select items");
          setOpen(true);
          return;
        }
        setAlertMessage("Are you sure to delete these items?");
        setOpen(true);
      }
    
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
            if(result.status == 1){
                setData(result.data);
                
            }else{
                setData({items:[],total:0});
                
            }
        }
        getComment();
    }, [pageSearch]);
    
    return (
        <Box>
        <Header title="Comments" />
        <Stack spacing={2} sx={{ padding: "0 20px" }}>
            <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/comments/addcomment")}
            >
            Add Comment
            </Button>
            <Divider />
            <CommentList
            columns={columns}
            data={data}
            
            loading={loading}
            error={error}
            handlePaginationModel={handlePaginationModel}
            handleDeleteDialog={handleDeleteDialog}
            handleEdit={handleEdit}
            />
        </Stack>
        <AlterDialog
            open={open}
            setOpen={setOpen}
            title="Delete Comment"
            content="Are you sure you want to delete this comment?"
            handleOk={handleDelete}
        />
        </Box>
    );
}    