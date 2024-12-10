import { getSession } from "next-auth/react";
import { z } from "zod";

export const createCategorySchemaDto = z.object({
  name: z.string().min(1),
});

export const createCategorySchemaResponse = z.object({
  createdAt: z.string(),
  modifiedAt: z.string(),
  name: z.string(),
  id: z.number(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchemaDto>;

export const createCategory = async (categoryData: CreateCategoryInput) => {
  const session = await getSession();

  if (!session) {
    throw new Error("User is not authenticated");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify(categoryData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create category");
  }

  const data = await response.json();
  const createdCategory = createCategorySchemaResponse.parse(data);

  return createdCategory;
};