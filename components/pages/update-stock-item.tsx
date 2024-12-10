"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { putUpdateStock } from "@/app/queries/update-stock-item";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function UpdateStockPage({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    quantity: z.number().min(1, "Quantity must be at least 1"),
    transactionType: z.enum(["in", "out"]).refine(value => value === "in" || value === "out", {
      message: "Transaction type must be either 'in' or 'out'"
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 0,
      transactionType: "in",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!id || !data.quantity || !data.transactionType) return;

    setLoading(true);
    try {
      await putUpdateStock(id, data.quantity, data.transactionType);
      alert("Stock updated successfully!");
      router.push("/admin"); 
    } catch (error) {
      console.error("Error updating stock", error);
      alert("Error updating stock");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Typography variant="h5">Update Stock for Item ID: {id}</Typography>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter stock quantity"
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
            name="transactionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Transaction Type</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select transaction type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in">In</SelectItem>
                      <SelectItem value="out">Out</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading || !form.formState.isValid}>
            {loading ? "Updating..." : "Update Stock"}
          </Button>
        </form>
      </Form>
      <Button variant="ghost" className="mt-4" onClick={() => router.back()}>
        Cancel
      </Button>
    </div>
  );
}
