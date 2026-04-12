import { ColumnDef } from "@tanstack/react-table"


export type Category = { _id: string; name: string; _delete: boolean };

export const columns: ColumnDef<Category>[] = [
  { 
    accessorKey: "_id", 
    header: "ID" },
  { 
    accessorKey: "name", 
    header: "Name" 
  },
];