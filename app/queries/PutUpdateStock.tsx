import { getSession } from "next-auth/react";
import { z } from "zod";

export const updateStockSchema = z.object({
  item_id: z.number(),
  quantity: z.number(),
  transaction_type: z.enum(["in", "out"]),
  timestamp: z.string(),
  id: z.number(),
});

export type UpdateStock = z.infer<typeof updateStockSchema>;

export const putUpdateStock = async (id: string, quantity: number, transactionType: string) => {
  const session = await getSession(); 

  if (!session) {
    throw new Error("User is not authenticated");
  }

  // Build the query parameters
  const queryParams = new URLSearchParams({
    item_id: id,
    quantity: quantity.toString(),
    transaction_type: transactionType,
  }).toString();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/items/${id}/update_stock?${queryParams}`, {
    method: "PUT", 
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`, 
    },
  });

  if (!response.ok) {
    throw new Error("Failed to update stock");
  }

  const data = await response.json();

  const parsedData = updateStockSchema.parse(data);

  return parsedData;
};
