import { getSession } from "next-auth/react";
import { z } from "zod";

export const createItemSchemaDto = z.object({
  name: z.string(),
  code: z.string(),
  description: z.string(),
  stock: z.coerce.number().int().nonnegative(),
  category_id: z.number().int().positive(),
});

export const createItemSchemaResponse = z.object({
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

export type CreateItemInput = z.infer<typeof createItemSchemaDto>;

export const createItem = async (itemData: CreateItemInput) => {
  const session = await getSession();

  if (!session) {
    throw new Error("User is not authenticated");
  }

  const createFieldsPayload = { ...itemData, account_email: session?.userId ?? "default@email.com" };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/items/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify(createFieldsPayload),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create item");
  }

  const data = await response.json();
  const createdItem = createItemSchemaResponse.parse(data);

  return createdItem;
};