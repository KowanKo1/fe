import { getSession } from "next-auth/react";
import { z } from "zod";

export const itemSchema = z.object({
  createdAt: z.string(),
  modifiedAt: z.string(),
  name: z.string(),
  code: z.string(),
  description: z.string(),
  stock: z.number().int().nonnegative(),
  account_email: z.string().email(),
  category_id: z.number().int().positive(),
  id: z.number(),
});

export type Item = z.infer<typeof itemSchema>;

export const getItems = async () => {
  const session = await getSession();

  if (!session) {
    throw new Error("User is not authenticated");
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/items/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }

  const data = await response.json();

  return data.map((item: any) => {
    const parsedItem = itemSchema.parse(item);
    return parsedItem;
  });
};