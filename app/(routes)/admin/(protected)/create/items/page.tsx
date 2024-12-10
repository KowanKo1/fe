"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createItem, createItemSchemaDto } from "@/app/queries/create-item";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { categorySchema, getCategories } from "@/app/queries/get-categories";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Page() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const formSchema = createItemSchemaDto;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      code: "",
      description: "",
      stock: 0,
      category_id: 1,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    try {
      await createItem(data);
      router.push("/admin/"); 
    } catch (error) {
      console.error("Failed to create item", error);
    } finally {
      setSubmitting(false);
    }
  };

  const [categories, setCategories] = useState<z.infer<typeof categorySchema>[]>([]);


  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
      console.log("Fetched categories:", data);
    };

    fetchCategories();
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-y-hidden bg-kowan-dark p-4 md:p-8 lg:px-24">
      <div className="z-20 rounded-3xl bg-kowan-light px-8 py-16 shadow-2xl sm:p-16">
        <Typography variant="h5" className="text-secondary-normal text-left mb-6">
          Create Item
        </Typography>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Item Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Item Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Item Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Stock</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Stock Quantity"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '') {
                          field.onChange(0);
                          return;
                        }
                        const parsedValue = parseInt(value);
                        field.onChange(isNaN(parsedValue) ? 0 : parsedValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Category</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value.toString()}
                      onValueChange={(value) => field.onChange(parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={submitting}>
              {submitting ? "Creating..." : "Create Item"}
            </Button>
          </form>
        </Form>
      </div>

    </main>
  );
}