"use client";

import { Typography } from "@/components/ui/typography";
import { Box, ChartNoAxesColumn, LogOut, Shapes } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import TransactionPage from "@/components/pages/transactions";
import ItemsPage from "@/components/pages/items";
import CategoriesPage from "@/components/pages/categories";


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
        <div
          className={cn("flex gap-2 items-center pl-4 w-36 cursor-pointer", activeTab === 2 && "border-l")}
          onClick={() => setActiveTab(2)}
        >
          <Shapes size={24} className="text-secondary-normal text-kowan-light" />
          <Typography variant="s6" className="text-secondary-normal text-left text-kowan-light">
            Categories
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
        <div className="p-2">
          <Typography variant="h5" className="text-secondary-normal text-left">
            Hello! Here is an update on your inventory
          </Typography>
        </div>
        <div className="overflow-y-auto p-2">
          {activeTab === 0 && <ItemsPage />}
          {activeTab === 1 && <TransactionPage />} 
          {activeTab === 2 && <CategoriesPage />} 
        </div>
      </div>
    </div>
  );
}
