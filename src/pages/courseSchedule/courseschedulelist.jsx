import React from "react";

import { DataGrid } from "@mui/x-data-grid";

export default function CourseScheduleList(props) {
  console.log(props.rows);
  return (
    <>
      //diaoyong hou d端API，
      <DataGrid
        //getRowId={(row) => row.ID}
        getRowId={(row) => row.id}
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
