import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/table-columns/items";
import { useState, useEffect } from "react";
import { getItems } from "@/app/queries/get-items";
import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";

const ItemsPage = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getItems();
        setItems(data);
        console.log("Fetched items:", data);
      } catch (err: any) {
        console.log("Failed to load items.", err);
        setError("Failed to load items.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const filteredItems = items.filter((item) =>
    item.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <Input
          placeholder="Search by item name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
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