import { Model } from "@/types/model";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDownIcon,
  MoreHorizontal,
  TrashIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

type ColumnsOptions = {
  onEdit?: (data: Model) => void;
  onDelete?: (data: Model) => void;
};

export function createColumns({
  onDelete,
}: ColumnsOptions = {}): ColumnDef<Model>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          className="size-6"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          className="size-6"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "_id",
      header: () => <div className="text-left">ID</div>,
      cell: ({ row }) => (
        <div className="text-left font-medium">{row.getValue("_id")}</div>
      ),
    },
    {
      accessorKey: "fileUrl",
      header: () => <div className="text-left">URL</div>,
      cell: ({ row }) => (
        <div className="text-left font-medium w-64 truncate hover:whitespace-normal cursor-pointer">{row.getValue("fileUrl")}</div>
      ),
    },
    {
      accessorKey: "fileFormat",
      header: () => <div className="text-left">Format</div>,
      cell: ({ row }) => (
        <div className="text-left font-medium">{row.getValue("fileFormat")}</div>
      ),
    },
    // {
    //   accessorKey: "name",
    //   header: ({ column }) => (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       Name
    //       <ArrowUpDownIcon className="ml-2 h-4 w-4" />
    //     </Button>
    //   ),
    //   cell: ({ row }) => (
    //     <div className="text-left font-medium">{row.getValue("name")}</div>
    //   ),
    // },
    {
      id: "actions",
      header: () => <div className="text-left">Actions</div>,
      cell: ({ row }) => {
        const obj = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(obj._id)}
              >
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(obj.fileUrl)}
              >
                Copy URL
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {onDelete && (
                <DropdownMenuItem
                  onClick={() => onDelete(obj)}
                  className="text-destructive focus:text-destructive"
                >
                  <TrashIcon className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
