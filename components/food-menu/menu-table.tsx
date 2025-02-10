"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, formatPrice } from "@/lib/utils";
import { MenuItem } from "@/types/menu";
import { Pencil, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { DeleteOfferModal } from "./modals/delete-offer-modal";
import { DeleteFoodItemModal } from "./modals/delete-food-item-modal";
import "./styles.css";

interface MenuTableProps {
  items: MenuItem[];
  onEditItem: (item: MenuItem) => void;
  onCreateOffer: (item: MenuItem) => void;
  onEditOffer: (item: MenuItem) => void;
  onDeleteOffer: (item: MenuItem) => void;
  onDeleteItem: (item: MenuItem) => void;
}

export function MenuTable({
  items,
  onEditItem,
  onCreateOffer,
  onEditOffer,
  onDeleteOffer,
  onDeleteItem,
}: MenuTableProps) {
  const [isDeleteOfferModalOpen, setIsDeleteOfferModalOpen] = useState(false);
  const [isDeleteItemModalOpen, setIsDeleteItemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const handleDeleteOfferClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsDeleteOfferModalOpen(true);
  };

  const handleDeleteItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsDeleteItemModalOpen(true);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Food name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>Edit details</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.uuid}
              data-has-offer={item.current_offer ? "true" : "false"}
              className={cn(
                "relative",
                item.current_offer && "border-b border-red-500"
              )}
            >
              <TableCell className="relative w-20">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="rounded-md object-cover"
                />
                {item.current_offer && (
                  <div className="absolute -top-3 left-0 bg-red-500 px-2 py-0.5 text-xs text-white">
                    {item.current_offer.offer_percentage}% OFF
                  </div>
                )}
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell className="max-w-[200px] truncate">
                {item.description}
              </TableCell>
              <TableCell>{item.food_category_details.name}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>
                {item.current_offer ? (
                  <div>
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(item.price)}
                    </span>
                    <br />
                    <span>{formatPrice(item.current_offer.offer_price)}</span>
                  </div>
                ) : (
                  formatPrice(item.price)
                )}
              </TableCell>
              <TableCell>
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs ${
                    item.is_available
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.is_available ? "Available" : "Unavailable"}
                </span>
              </TableCell>
              <TableCell className="flex items-center gap-1.5">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEditItem(item)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>

                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleDeleteItemClick(item)}
                >
                  <Trash2Icon className="h-4 w-4 text-destructive hover:bg-destructive/20" />
                </Button>
              </TableCell>
              <TableCell>
                {item.current_offer ? (
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-0 right-0 w-auto border-t-0 border-destructive border-r-0 rounded-none rounded-bl-md m-0 h-6 text-xs"
                      onClick={() => onEditOffer(item)}
                    >
                      Edit Offer
                    </Button>
                    <Button
                      variant="link"
                      size="sm"
                      className="text-destructive underline"
                      onClick={() => handleDeleteOfferClick(item)}
                    >
                      Delete Offer
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => onCreateOffer(item)}
                  >
                    Create Offer
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DeleteOfferModal
        isOpen={isDeleteOfferModalOpen}
        onClose={() => {
          setIsDeleteOfferModalOpen(false);
          setSelectedItem(null);
        }}
        onConfirm={() => {
          if (selectedItem) {
            onDeleteOffer(selectedItem);
          }
          setIsDeleteOfferModalOpen(false);
          setSelectedItem(null);
        }}
      />

      <DeleteFoodItemModal
        isOpen={isDeleteItemModalOpen}
        onClose={() => {
          setIsDeleteItemModalOpen(false);
          setSelectedItem(null);
        }}
        onConfirm={() => {
          if (selectedItem) {
            onDeleteItem(selectedItem);
          }
          setIsDeleteItemModalOpen(false);
          setSelectedItem(null);
        }}
      />
    </div>
  );
}
