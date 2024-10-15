import React, { useState } from "react";

import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid } from "@mui/x-data-grid";
import DialogConfirm from "./dialogConfirm";
export default function table({ List,colum1,colum2,colum3,colum4 ,pathEdit,pathDelete}: { List: any,colum1: string,colum2: string,colum3: string,colum4: string ,pathEdit: string,pathDelete: string}) {
  return (
    <DataGrid
      initialState={{
        pagination: { paginationModel: { pageSize: 15 } },
      }}
      sx={{ m: 2 }}
      columns={[
        { field: `${colum1}`, width: 200 },
        { field:`${colum2}`, width: 200 },
        { field:`${colum3}`, width: 200 },
        { field: `${colum4}`, width: 200 },
        {
          field: "Edit",
          headerName: "Edit",
          width: 80,
          renderCell: (params) => {
            return (
              <Button href={`${pathEdit}` + `${params.row.id}`}>
                <EditIcon />
              </Button>
            );
          },
        },
        {
          field: "Delete",
          headerName: "Delete",
          headerAlign: "center",
          width: 80,
          renderCell: (params) => {
            return (
              <DialogConfirm
                dialogtitle={`are you sure you want to delete ${params.row.email}`}
                buttonContent={<DeleteIcon />}
                continuebuttonhref={`${pathDelete}` + `${params.row.id}`}
              />
            );
          },
        },
      ]}
      rows={List}
      pageSizeOptions={[15]}
    />
  );
}
