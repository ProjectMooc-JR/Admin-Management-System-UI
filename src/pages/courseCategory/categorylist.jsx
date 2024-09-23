import { DataGrid } from "@mui/x-data-grid";

import React from "react";

const CategoryList = (props) => {
  return (
    <DataGrid
      paginationMode="server"
      getRowId={(row) => row.ID}
      pageSizeOptions={[5, 10, 100, 150, 300]}
      rowCount={props.pageData.total}
      rows={props.pageData.items}
      columns={props.columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      onPaginationModelChange={props.setPaginationModel}
      onRowSelectionModelChange={(newRowSelectionModel) => {
        props.setRowSelectionModel(newRowSelectionModel);
      }}
      checkboxSelection
      sx={{
        "& .MuiDataGrid-cell:focus": {
          outline: "none",
        },
      }}
    />
  );
};

export default CategoryList;
