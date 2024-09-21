import React from "react";

import { DataGrid } from "@mui/x-data-grid";

export default function UserList(props) {
  return (
    <>
      <DataGrid
        checkboxSelection
        pageSizeOptions={[5, 10, 20, 50, 100]}
        paginationMode="server"
        rowCount={props.pageData.total}
        columns={props.columns}
        rows={props.pageData.items}
        onPaginationModelChange={props.setPaginationModel}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          props.setRowSelectionModel(newRowSelectionModel);
        }}
      />
    </>
  );
}
