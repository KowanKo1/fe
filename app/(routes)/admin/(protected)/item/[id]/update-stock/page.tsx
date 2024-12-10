// UpdateStock.tsx (Parent component)
import { Typography } from "@/components/ui/typography";
import UpdateStockPage from "@/components/pages/UpdateStockPage";

export default function UpdateStock({ params }: { params: { id: string } }) {
  return (
    <div className="flex items-stretch h-screen bg-kowan-dark text-kowan-dark p-4">
      <div className="w-64 p-4 flex flex-col gap-4">
        <Typography variant="h3" className="text-secondary-normal text-left text-kowan-light">
          Ko1
        </Typography>
      </div>

      <div className="w-full grow bg-kowan-light rounded-3xl p-4 flex flex-col max-h-screen">
        <Typography variant="h5" className="text-secondary-normal text-left mb-6">
          Update Stock for Item ID: {params.id}
        </Typography>
        <div className="overflow-y-auto">
          <UpdateStockPage id={params.id} />
        </div>
      </div>
    </div>
  );
}
