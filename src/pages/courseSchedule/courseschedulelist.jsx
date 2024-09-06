import React from "react";

import { DataGrid } from "@mui/x-data-grid";

export default function CourseScheduleList(props) {
  return (
    <>
      <DataGrid
        getRowId={(row) => row.ID}
        rows={props.rows}
        checkboxSelection
        pageSizeOptions={[25, 50, 100, 150, 300]}
        paginationMode="server"
        rowCount={props.pageData.total}
        columns={props.columns}
        //rows={props.pageData.items}
        onPaginationModelChange={props.setPaginationModel}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          props.setRowSelectionModel(newRowSelectionModel);
        }}
      />
    </>
  );
}
