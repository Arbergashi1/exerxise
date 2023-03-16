import React, { useState } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import "./App.css";
import "ag-grid-enterprise";
import Button from "./Button";

const columnDefs = [
  {
    headerName: "Make",
    field: "make",
    cellClass: "table-cell",
    enableRowGroup: true,
  },
  {
    headerName: "Model",
    field: "model",
    cellClass: "table-cell",
    enableRowGroup: true,
  },
  { headerName: "Price", field: "price", cellClass: "table-cell" },
  {
    headerName: "Options",
    field: "options",
    cellClass: "table-cell",
    cellRendererFramework: (props) => <Button data={props.data} onSave={(newData) => console.log(newData)} />,
  },
  
];

const rowGroupPanelShow = "always";

const rowData = [
  { id:'1',make: "Toyota", model: "Corolla", price: "$22,000"},
  { make: "Honda", model: "Civic", price: "$24,000" },
  { make: "Ford", model: "Mustang", price: "$32,000" },
  { make: "Toyota", model: "Corolla", price: "$22,000" },
  { make: "Honda", model: "Civic", price: "$24,000" },
  { make: "Ford", model: "Mustang", price: "$32,000" },
  { make: "Toyota", model: "Corolla", price: "$22,000" },
  { make: "Honda", model: "Civic", price: "$24,000" },
  { make: "Ford", model: "Mustang", price: "$32,000" },
  { make: "Toyota", model: "Corolla", price: "$22,000" },
  { make: "Toyota", model: "Corolla", price: "$22,000" },
  { make: "Honda", model: "Civic", price: "$24,000" },
  { make: "Ford", model: "Mustang", price: "$32,000" },
  { make: "Toyota", model: "Corolla", price: "$22,000" },
  { make: "Honda", model: "Civic", price: "$24,000" },
  { make: "Ford", model: "Mustang", price: "$32,000" },
  { make: "Toyota", model: "Corolla", price: "$22,000" },
  { make: "Honda", model: "Civic", price: "$24,000" },
  { make: "Ford", model: "Mustang", price: "$32,000" },
  { make: "Toyota", model: "Corolla", price: "$22,000" },
];




console.log(rowData);

const Tabela = () => {
  
  const [filteredRows, setFilteredRows] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, pageSize: 5 });
  const firstRow = (pagination.currentPage - 1) * pagination.pageSize;
  const lastRow = pagination.currentPage * pagination.pageSize;
  const rowsToDisplayy =
    filteredRows.length > 0
      ? filteredRows.slice(firstRow, lastRow)
      : rowData.slice(firstRow, lastRow);
  const handlePageChange = (params) => {
    const newPagination = {
      currentPage: params.page,
      pageSize: params.pageSize,
    };
    setPagination(newPagination);
  };

  const onGridReady = (params) => {
    params.api.paginationSetPageSize(pagination.pageSize);
  };
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredData = rowData.filter(
      (row) =>
        row.make.toLowerCase().includes(searchTerm) ||
        row.model.toLowerCase().includes(searchTerm) ||
        row.price.toLowerCase().includes(searchTerm)
    );
    setFilteredRows(filteredData);
  };

  const rowsToDisplay = filteredRows.length > 0 ? filteredRows : rowData;
  return (
    <>
     
      <div style={{ margin: "1rem" }}>
        <input
          onChange={handleSearch}
          type="search"
          placeholder="search..."
          style={{
            border: "none",
            backgroundColor: "lightgray",
            padding: "10px",
            borderRadius: "10px",
            width: "15%",
          }}
        />
      </div>
      <div className="ag-theme-alpine" style={{ width: "100%", height: 500 }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowsToDisplay}
          rowGroupPanelShow={rowGroupPanelShow}
          onPaginationChanged={handlePageChange}
          onGridReady={onGridReady}
          pagination={true}
          paginationPageSize={pagination.pageSize}
          suppressPaginationPanel={false}
          frameworkComponents={{
            buttonRenderer: Button,
          }}
        />
      </div>
    </>
  );
};

export default Tabela;
