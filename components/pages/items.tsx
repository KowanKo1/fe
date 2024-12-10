import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/table-columns/items";
import { useState, useEffect } from "react";
import { getItems } from "@/app/queries/get-items";
import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { getCategories } from "@/app/queries/get-categories";
import { z } from "zod";
import { categorySchema } from "../table-columns/categories";

const ItemsPage = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categories, setCategories] = useState<z.infer<typeof categorySchema>[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getItems();
        setItems(data);
      } catch (err: any) {
        console.log("Failed to load items.", err);
        setError("Failed to load items.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategoryId || item.category_id.toString() === selectedCategoryId;
    return selectedCategoryId === "-1" ? matchesSearch : matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <Input
          placeholder="Search by item name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select
          value={selectedCategoryId || ""}
          onValueChange={setSelectedCategoryId}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="-1">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Link href="/admin/create/items">
          <Button className="ml-4">Create Item</Button>
        </Link>
      </div>
      {loading ? (
        <div>Loading items...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          {filteredItems.length === 0 ? (
            <div>No items found</div>
          ) : (
            <DataTable columns={columns} data={filteredItems} />
          )}
        </>
      )}
    </div>
  );
};

export default ItemsPage;