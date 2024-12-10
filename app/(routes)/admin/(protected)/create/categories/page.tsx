"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategory, createCategorySchemaDto } from "@/app/queries/create-category";
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

export default function Page() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const formSchema = createCategorySchemaDto;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    try {
      await createCategory(data);
      router.push("/admin/"); 
    } catch (error) {
      console.error("Failed to create category", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-y-hidden bg-kowan-dark p-4 md:p-8 lg:px-24">
      <div className="z-20 rounded-3xl bg-kowan-light px-8 py-16 shadow-2xl sm:p-16">
        <Typography variant="h5" className="text-secondary-normal text-left mb-6">
          Create Category
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
                    <Input placeholder="Category Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={submitting}>
              {submitting ? "Creating..." : "Create Category"}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}