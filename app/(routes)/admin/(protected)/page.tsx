"use client"
import { Typography } from "@/components/ui/typography";
import { DataTable } from "@/components/ui/data-table";
import { columns, itemSchema } from "@/components/table-columns/items";
import { z } from "zod";
import { Box, ChartNoAxesColumn, LogOut } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const items: z.infer<typeof itemSchema>[] = [
  {
    createdAt: "2023-10-01T09:30:00.000Z",
    modifiedAt: "2023-10-01T10:00:00.000Z",
    name: "MacBook Pro",
    code: "MBP-2023",
    description: "Apple MacBook Pro 16-inch, 2023 model",
    stock: 15,
    account_email: "store@example.com",
    category_id: 1,
    id: "1"
  },
  {
    createdAt: "2023-10-02T11:45:00.000Z",
    modifiedAt: "2023-10-02T12:15:00.000Z",
    name: "Samsung Galaxy S21",
    code: "SGS21",
    description: "Samsung Galaxy S21 5G smartphone",
    stock: 30,
    account_email: "store@example.com",
    category_id: 2,
    id: "2"
  },
  {
    createdAt: "2023-10-03T14:20:00.000Z",
    modifiedAt: "2023-10-03T14:50:00.000Z",
    name: "Sony WH-1000XM4",
    code: "SONY-WH1000XM4",
    description: "Sony WH-1000XM4 Wireless Noise-Canceling Headphones",
    stock: 20,
    account_email: "store@example.com",
    category_id: 3,
    id: "3"
  },
  {
    createdAt: "2023-10-04T08:30:00.000Z",
    modifiedAt: "2023-10-04T09:00:00.000Z",
    name: "Dell XPS 13",
    code: "XPS13-2023",
    description: "Dell XPS 13 Laptop, 2023 model",
    stock: 10,
    account_email: "store@example.com",
    category_id: 1,
    id: "4"
  },
  {
    createdAt: "2023-10-05T10:00:00.000Z",
    modifiedAt: "2023-10-05T10:30:00.000Z",
    name: "Apple iPad Pro",
    code: "IPADPRO-2023",
    description: "Apple iPad Pro 12.9-inch, 2023 model",
    stock: 25,
    account_email: "store@example.com",
    category_id: 4,
    id: "5"
  },
  {
    createdAt: "2023-10-01T09:30:00.000Z",
    modifiedAt: "2023-10-01T10:00:00.000Z",
    name: "MacBook Pro",
    code: "MBP-2023",
    description: "Apple MacBook Pro 16-inch, 2023 model",
    stock: 15,
    account_email: "store@example.com",
    category_id: 1,
    id: "1"
  },
  {
    createdAt: "2023-10-02T11:45:00.000Z",
    modifiedAt: "2023-10-02T12:15:00.000Z",
    name: "Samsung Galaxy S21",
    code: "SGS21",
    description: "Samsung Galaxy S21 5G smartphone",
    stock: 30,
    account_email: "store@example.com",
    category_id: 2,
    id: "2"
  },
  {
    createdAt: "2023-10-03T14:20:00.000Z",
    modifiedAt: "2023-10-03T14:50:00.000Z",
    name: "Sony WH-1000XM4",
    code: "SONY-WH1000XM4",
    description: "Sony WH-1000XM4 Wireless Noise-Canceling Headphones",
    stock: 20,
    account_email: "store@example.com",
    category_id: 3,
    id: "3"
  },
  {
    createdAt: "2023-10-04T08:30:00.000Z",
    modifiedAt: "2023-10-04T09:00:00.000Z",
    name: "Dell XPS 13",
    code: "XPS13-2023",
    description: "Dell XPS 13 Laptop, 2023 model",
    stock: 10,
    account_email: "store@example.com",
    category_id: 1,
    id: "4"
  },
  {
    createdAt: "2023-10-05T10:00:00.000Z",
    modifiedAt: "2023-10-05T10:30:00.000Z",
    name: "Apple iPad Pro",
    code: "IPADPRO-2023",
    description: "Apple iPad Pro 12.9-inch, 2023 model",
    stock: 25,
    account_email: "store@example.com",
    category_id: 4,
    id: "5"
  }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex items-stretch h-screen bg-kowan-dark text-kowan-dark p-4">
      <div className="w-64 p-4 flex flex-col gap-4">
        <Typography variant="h3" className="text-secondary-normal text-left text-kowan-light">
          Ko1
        </Typography>
        <div
          className={cn("flex gap-2 items-center pl-4 w-36 cursor-pointer", activeTab === 0 && "border-l")}
          onClick={() => setActiveTab(0)}
        >
          <Box size={24} className="text-secondary-normal text-kowan-light" />
          <Typography variant="s6" className="text-secondary-normal text-left text-kowan-light">
            Items
          </Typography>
        </div>
        <div
          className={cn("flex gap-2 items-center pl-4 w-36 cursor-pointer", activeTab === 1 && "border-l")}
          onClick={() => setActiveTab(1)}
        >
          <ChartNoAxesColumn size={24} className="text-secondary-normal text-kowan-light" />
          <Typography variant="s6" className="text-secondary-normal text-left text-kowan-light">
            Transactions
          </Typography>
        </div>
        <div className="mt-auto flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_nLCu85ayoTKwYw6alnvrockq5QBT2ZWR2g&s" />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-8">
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="w-full grow bg-kowan-light rounded-3xl p-4 flex flex-col max-h-screen">
        <Typography variant="h5" className="text-secondary-normal text-left mb-6">
          Hello! Here is an update on your inventory
        </Typography>
        <div className="overflow-y-auto">
          {activeTab === 0 && <DataTable columns={columns} data={items} />}
          {activeTab === 1 && <div>Transactions content goes here</div>}
        </div>
      </div>
    </div>
  );
}