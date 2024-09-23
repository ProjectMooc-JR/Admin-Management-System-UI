import { DataGridPro } from '@mui/x-data-grid-pro';

export default function CourseList(props) {
  return (
    <DataGridPro
      columns={props.columns}
      rows={props.courses.items}
      rowCount={props.courses.total}
      rowsPerPageOptions={[1, 20, 50, 100]}
      paginationMode="server"
      pageSize={props.pageSearch.pageSize}
      page={props.pageSearch.page - 1} // 页码从 0 开始
      onPageSizeChange={(newPageSize) => props.setPageSize(newPageSize)}
      onPageChange={(newPage) => props.setPage(newPage)}
      rowSelection
      checkboxSelection
      onRowSelectionModelChange={(newSelection) => props.setRowSelectionModel(newSelection)}
      rowThreshold={0}
      getDetailPanelHeight={props.getDetailPanelHeight}
      getDetailPanelContent={props.getDetailPanelContent}
    />
  );
}
