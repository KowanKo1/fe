"use client"

import { ColumnDef } from "@tanstack/react-table"
import { z } from "zod";
import dayjs from "dayjs";
import "dayjs/locale/id";

export const itemSchema = z.object({
  createdAt: z.string(),
  modifiedAt: z.string(),
  name: z.string(),
  code: z.string(),
  description: z.string(),
  stock: z.number().int().nonnegative(),
  account_email: z.string().email(),
  category_id: z.number().int().positive(),
  id: z.string(),
});

export const columns: ColumnDef<z.infer<typeof itemSchema>>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "account_email",
    header: "Account Email",
  },
  {
    accessorKey: "category_id",
    header: "Category ID",
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div className="max-w-4">{dayjs(row.original.createdAt).format("DD MMMM YYYY, HH:mm")}</div>
    ),
  },
  {
    accessorKey: "modifiedAt",
    header: "Modified At",
    cell: ({ row }) => (
      <div className="max-w-4">{dayjs(row.original.modifiedAt).format("DD MMMM YYYY, HH:mm")}</div>
    ),
  },
];
