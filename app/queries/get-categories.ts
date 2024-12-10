import { getSession } from "next-auth/react";
import { z } from "zod";

export const categorySchema = z.object({
  createdAt: z.string(),
  modifiedAt: z.string(),
  name: z.string(),
  id: z.number(),
});

export type Category = z.infer<typeof categorySchema>;

export const getCategories = async () => {
  const session = await getSession();

  if (!session) {
    throw new Error("User is not authenticated");
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await response.json();

  return data.map((category: any) => {
    const parsedCategory = categorySchema.parse(category);
    return parsedCategory;
  });
};