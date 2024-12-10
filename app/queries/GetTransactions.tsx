// queries/GetTransactions.ts
import { getSession } from "next-auth/react";
import { z } from "zod";

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

export const getTransactions = async () => {
  const session = await getSession();

  if (!session) {
    throw new Error("User is not authenticated");
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`, 
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }
  
  const data = await response.json();

  return data.map((transaction: any) => {
    const parsedTransaction = transactionSchema.parse(transaction);

    return {
      ...parsedTransaction,
      item: {
        id: parsedTransaction.item.id,
        name: parsedTransaction.item.name,
      },
    };
  });
};
