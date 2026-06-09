import { Model } from "@/types/model";

import { ColumnDef } from "@tanstack/react-table";
import {
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
import { Furniture } from "@/types/furniture";

type ColumnsOptions = {
  onEdit?: (data: Furniture) => void;
  onDelete?: (data: Furniture) => void;
};

export function createColumns({
  onDelete,
}: ColumnsOptions = {}): ColumnDef<Furniture>[] {
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
      accessorKey: "name",
      header: () => <div className="text-left">Name</div>,
      cell: ({ row }) => (
        <div className="text-left font-medium w-64 truncate hover:whitespace-normal cursor-pointer">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: () => <div className="text-left">Description</div>,
      cell: ({ row }) => (
        <div className="text-left font-medium">{row.getValue("description")}</div>
      ),
    },
    {
      accessorKey: "categoryId",
      header: () => <div className="text-left">categoryId</div>,
      cell: ({ row }) => (
        <div className="text-left font-medium">{row.getValue("categoryId")}</div>
      ),
    },
    {
      accessorKey: "brandId",
      header: () => <div className="text-left">brandId</div>,
      cell: ({ row }) => (
        <div className="text-left font-medium">{row.getValue("brandId")}</div>
      ),
    },
    {
      accessorKey: "price",
      header: () => <div className="text-left">price</div>,
      cell: ({ row }) => (
        <div className="text-left font-medium">{row.getValue("price")}</div>
      ),
    },
    {
      accessorKey: "quantity",
      header: () => <div className="text-left">quantity</div>,
      cell: ({ row }) => (
        <div className="text-left font-medium">{row.getValue("quantity")}</div>
      ),
    },
    {
      accessorKey: "modelId",
      header: () => <div className="text-left">modelId</div>,
      cell: ({ row }) => (
        <div className="text-left font-medium">{row.getValue("modelId")}</div>
      ),
    },  
  
    {
      accessorKey: "createdAt",
      header: () => <div className="text-left">Size</div>,
      cell: ({ row }) => (
        <div className="text-left font-medium">{new Date(row.getValue("createdAt")).toLocaleDateString('vi-VN', { timeZone: 'UTC' })}</div>
      ),
    },
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
                onClick={() => navigator.clipboard.writeText(obj.modelId)}
              >
                Copy modelId
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
