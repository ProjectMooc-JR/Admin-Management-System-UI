import { DataGrid } from "@mui/x-data-grid";

export default function CommentList(props) {
  return (
    <>
      <DataGrid
        //getRowId={(row) => row.id}
        checkboxSelection
        pageSizeOptions={[5, 10, 20, 50, 100]}
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
