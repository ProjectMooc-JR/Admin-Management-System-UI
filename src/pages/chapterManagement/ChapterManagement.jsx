import React, { useState, useEffect } from "react";
import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import AlterDialog from "../../components/alterDialog";
import getRequest from "../../request/getRequest";
import deleteRequest from "../../request/delRequest";
import toast from "react-hot-toast";
import Header from "../../components/Header";
import colors from "../../theme";

export default function ChapterManagement() {
  const [pageSearch, setPageSearch] = useState({
    pageSize: 10,
    page: 1,
  });

  const [chapters, setChapters] = useState({ items: [], total: 0 });
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const handlePaginationModel = (e) => {
    setPageSearch({
      ...pageSearch,
      page: e.page + 1,
      pageSize: e.pageSize,
    });
  };

  useEffect(() => {
    const fetchChapters = async () => {
      const result = await getRequest(
        `/chapters/${pageSearch.page}/${pageSearch.pageSize}`
      );
      if (result.status === 200) {
        const rows = result.data.items.map((chapter) => ({
          id: chapter.ID,
          chapterName: chapter.ChapterName,
          description: chapter.Description,
          course: chapter.CourseName,
          teacher: chapter.username,
          publishedAt: chapter.publishedAt,
        }));
        setChapters({ items: rows, total: result.data.length });
      } else {
        setChapters({ items: [], total: 0 });
      }
    };
    fetchChapters();
  }, [pageSearch]);

  const handleDeleteChapter = () => {
    if (rowSelectionModel.length === 0) {
      setAlertMessage("Please select chapters to delete.");
      setOpen(true);
      return;
    }
    setAlertMessage("Are you sure to delete the selected chapters?");
    setOpen(true);
  };

  const handleAddChapter = () => {
    if (rowSelectionModel.length === 0) {
      setAlertMessage("Please select course to add a chapter.");
      return;
    }
    navigate("/createChapter/" + rowSelectionModel.id); // Add chapter route
  };

  const handleDialogClose = async (data) => {
    setOpen(false);
    if (!data.isOk || rowSelectionModel.length === 0) return;

    const ids = rowSelectionModel.join(",");
    const result = await deleteRequest(`/chapters/${ids}`);
    if (result.status === 1) {
      toast.success("Chapters deleted successfully!");
    } else {
      toast.error("Failed to delete chapters.");
    }

    setPageSearch({ page: 1, pageSize: pageSearch.pageSize });
  };

  // const handleAddChapter = () => {
  //   navigate("/chapters/create");  // Add chapter route
  // };

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "chapterName", headerName: "Chapter Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "course", headerName: "Course", flex: 1 },
    { field: "teacher", headerName: "Teacher", flex: 1 },
    { field: "publishedAt", headerName: "Published At", flex: 1 },
  ];


  return (
    <Box m="20px">
      <Header
        title="Chapter Management"
        subtitle="Manage all chapters, edit, delete, or add new chapters"
      />

      <Box sx={{ mb: "15px" }}>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="contained" onClick={handleAddChapter}>
            Add Chapter
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleDeleteChapter}
          >
            Add Chapter
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleDeleteChapter}
          >
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
        <DataGrid
          rows={chapters.items}
          total={chapters.total}
          columns={columns}
          pageSize={10}
          pageSizeOptions={[10, 25, 50, 100]}
          checkboxSelection
          disableSelectionOnClick
          
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
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
