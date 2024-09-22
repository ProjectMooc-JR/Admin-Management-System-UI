import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const CourseList = ({ columns, pageData, setPaginationModel, setRowSelectionModel }) => {
  const handlePageChange = (params) => {
    setPaginationModel(params);
  };

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={pageData.items} // 课程数据
        columns={columns} // 列定义
        paginationMode="server" // 分页模式设置为服务器端
        rowCount={pageData.total} // 总行数，用于分页计算
        pagination // 启用分页
        pageSize={10} // 默认每页显示5条数据
        onPageChange={(newPage) => handlePageChange({ page: newPage })}
        onPageSizeChange={(newPageSize) => handlePageChange({ pageSize: newPageSize })}
        checkboxSelection // 启用复选框选择
        onSelectionModelChange={(newSelection) => {
          setRowSelectionModel(newSelection);
        }}
      />
    </Box>
  );
};

export default CourseList;
