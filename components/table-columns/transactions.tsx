"use client";

import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import dayjs from "dayjs";
import "dayjs/locale/id";

// Updated Transaction Schema
export const transactionSchema = z.object({
  createdAt: z.string(),
  modifiedAt: z.string(),
  quantity: z.number(),
  transaction_type: z.enum(["in", "out"]),
  timestamp: z.string(),
  account_email: z.string(),
  item: z.object({
    id: z.number(),
    name: z.string(),
  }),
  id: z.number(),
});

export type Transaction = z.infer<typeof transactionSchema>;

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "transaction_type",
    header: "Transaction Type",
    cell: ({ row }) => (
      <div>{row.original.transaction_type === "in" ? "Incoming" : "Outgoing"}</div>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "item_name", // Changed to item_name
    header: "Item Name",
    cell: ({ row }) => (
      <div>{row.original.item.name}</div> // Display item name
    ),
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }) => (
      <div>{dayjs(row.original.timestamp).format("DD MMMM YYYY, HH:mm")}</div>
    ),
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
