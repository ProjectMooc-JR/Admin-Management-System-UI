import React from "react";

import { DataGrid } from "@mui/x-data-grid";

export default function CourseScheduleList(props) {
  console.log(props.rows);
  return (
    <>
      <DataGrid
        //getRowId={(row) => row.ID}wrong
        //getRowId={(row) => row.id}
        //rows={props.rows}
        checkboxSelection
        pageSizeOptions={[5, 10, 25, 50, 100]}
        paginationMode="server"
        rowCount={props.data.total}
        columns={props.columns}
        rows={props.data.items}
        onPaginationModelChange={props.setPaginationModel}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          props.setRowSelectionModel(newRowSelectionModel);
        }}
      />
    </>
  );
}

// export default function CourseScheduleList({
//   columns,
//   pageData,
//   pageSearch,
//   setPaginationModel,
//   setRowSelectionModel,
// }) {
//   return (
//     <DataGrid
//       checkboxSelection
//       paginationMode="server"
//       pageSize={pageData.pageSize || 10}
//       rowCount={pageData.total || 0}
//       columns={columns}
//       rows={pageData.items}
//       onPaginationModelChange={(model) => setPaginationModel(model)}
//       onRowSelectionModelChange={(newSelection) =>
//         setRowSelectionModel(newSelection)
//       }
//       pageSizeOptions={[10, 50, 100, 150]}
//       initialState={{
//         pagination: {
//           paginationModel: { pageSize: pageSearch.pageSize || 10, page: 0 },
//         },
//       }}
//     />
//   );
// }
