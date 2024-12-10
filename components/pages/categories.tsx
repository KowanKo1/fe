"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/table-columns/categories";
import { useState, useEffect } from "react";
import { getCategories } from "@/app/queries/get-categories";
import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
import { z } from "zod";
import { categorySchema } from "@/components/table-columns/categories";

const CategoriesPage = () => {
  const [categories, setCategories] = useState<z.infer<typeof categorySchema>[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCategories();
        setCategories(data);
        console.log("Fetched categories:", data);
      } catch (err: any) {
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <Input
          placeholder="Search by category name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Link href="/admin/create/categories">
          <Button className="ml-4">Create Category</Button>
        </Link>
      </div>
      {loading ? (
        <div>Loading categories...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          {filteredCategories.length === 0 ? (
            <div>No categories found</div>
          ) : (
            <DataTable columns={columns} data={filteredCategories} />
          )}
        </>
      )}
    </div>
  );
};

export default CategoriesPage;