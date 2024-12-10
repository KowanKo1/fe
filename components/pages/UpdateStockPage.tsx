// UpdateStockPage.tsx
"use client"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import { useState } from "react";
import { putUpdateStock } from "@/app/queries/PutUpdateStock";

export default function UpdateStockPage({ id }: { id: string }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState<number | string>(""); 
  const [transactionType, setTransactionType] = useState<string>(""); 
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!id || !quantity || !transactionType) return;

    setLoading(true);
    try {
      const data = await putUpdateStock(id, quantity as number, transactionType); 
      alert("Stock updated successfully!");
      router.push("/admin/item"); 
    } catch (error) {
      console.error(error);
      alert("Error updating stock");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Typography variant="h5">Update Stock for Item ID: {id}</Typography>
      <div className="mt-4">
        {/* Quantity Input */}
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter new stock quantity"
          className="mb-4"
        />
        {/* Transaction Type Input */}
        <Input
          type="text"
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          placeholder="Enter transaction type (e.g., 'in' or 'out')"
          className="mb-4"
        />
        {/* Update Button */}
        <Button
          className="mt-4"
          onClick={handleUpdate}
          disabled={loading || !quantity || !transactionType}
        >
          {loading ? "Updating..." : "Update Stock"}
        </Button>
      </div>
      <Button
        variant="ghost"
        className="mt-4"
        onClick={() => router.back()}
      >
        Cancel
      </Button>
    </div>
  );
}
