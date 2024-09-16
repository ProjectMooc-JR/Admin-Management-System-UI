// import React from "react";

// import { DataGrid } from "@mui/x-data-grid";

// export default function TeacherList(props) {
//   return (
//     <>
//       <DataGrid
//         checkboxSelection
//         pageSizeOptions={[25, 50, 100, 150, 300]}
//         paginationMode="server"
//         rowCount={props.pageData.total}
//         columns={props.columns}
//         rows={props.pageData.items}
//         onPaginationModelChange={props.setPaginationModel}
//         onRowSelectionModelChange={(newRowSelectionModel) => {
//           props.setRowSelectionModel(newRowSelectionModel);
//         }}
//       />
//     </>
//   );
// }

import React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function TeacherList({
  columns,
  pageData,
  pageSearch,
  setPaginationModel,
  setRowSelectionModel,
}) {
  return (
    <DataGrid
      checkboxSelection
      paginationMode="server"
      pageSize={pageSearch.pageSize || 10}
      rowCount={pageData.total || 0}
      columns={columns}
      rows={pageData.items}
      onPaginationModelChange={(model) => setPaginationModel(model)}
      onRowSelectionModelChange={(newSelection) =>
        setRowSelectionModel(newSelection)
      }
      pageSizeOptions={[10, 50, 100]}
      initialState={{
        pagination: {
          paginationModel: { pageSize: pageSearch.pageSize || 10, page: 0 },
        },
      }}
    />
  );
}
