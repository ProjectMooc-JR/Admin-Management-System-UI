import { DataGrid } from "@mui/x-data-grid";

import React from "react";

const CategoryList = (props) => {
  return (
    <DataGrid
      getRowId={(row) => row.ID}
      rows={props.rows}
      columns={props.columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      pageSizeOptions={[5, 10]}
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
