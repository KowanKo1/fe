"use client";

import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import dayjs from "dayjs";
import "dayjs/locale/id";

export const categorySchema = z.object({
  createdAt: z.string(),
  modifiedAt: z.string(),
  name: z.string(),
  id: z.number(),
});

export const columns: ColumnDef<z.infer<typeof categorySchema>>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div>{dayjs(row.original.createdAt).format("DD MMMM YYYY, HH:mm")}</div>
    ),
  },
  {
    accessorKey: "modifiedAt",
    header: "Modified At",
    cell: ({ row }) => (
      <div>{dayjs(row.original.modifiedAt).format("DD MMMM YYYY, HH:mm")}</div>
    ),
  },
];