"use client";
import { use } from "react"; // Import `use` to unwrap params
import { Typography } from "@/components/ui/typography";
import UpdateStockPage from "@/components/pages/update-stock-item";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // Unwrap `params` with `use`

  if (!id) {
    return <div>Loading...</div>; // Optional: Handle case when `id` is not available immediately
  }

  return (
    <div className="flex items-stretch h-screen bg-kowan-dark text-kowan-dark p-4">
      <div className="w-64 p-4 flex flex-col gap-4">
        <Typography variant="h3" className="text-secondary-normal text-left text-kowan-light">
          Ko1
        </Typography>
      </div>

      <div className="w-full grow bg-kowan-light rounded-3xl p-4 flex flex-col max-h-screen">
        <div className="overflow-y-auto">
          <UpdateStockPage id={id} />
        </div>
      </div>
    </div>
  );
}
