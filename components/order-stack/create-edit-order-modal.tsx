"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, startOfToday } from "date-fns";
import { CalendarIcon, Search, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { ScrollArea } from "../ui/scroll-area";

type OrderType = "dine-in" | "takeaway" | "home-delivery";

interface FoodItem {
  id: string;
  name: string;
  price: number;
  unit: number;
}

const foodItemsList = [
  { id: "1", name: "Grilled Chicken Caesar Salad", price: 850 },
  { id: "2", name: "Garlic Butter Shrimp", price: 950 },
  { id: "3", name: "Ginger Glazed Salmon", price: 1200 },
  { id: "4", name: "Grilled Cheese Sandwich", price: 450 },
  { id: "5", name: "Guacamole Burger", price: 650 },
];

const orderSchema = z
  .object({
    orderType: z.enum(["dine-in", "takeaway", "home-delivery"]),
    orderNo: z.string().min(1, "Order number is required"),
    orderDate: z
      .date({
        required_error: "Order date is required",
        invalid_type_error: "That's not a valid date",
      })
      .min(startOfToday(), "Order date must be today or in the future"),
    orderTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:mm)"),
    tableNo: z.string().min(1, "Table number is required").optional(),
    foodItems: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
          price: z.number(),
          unit: z.number().min(1, "Unit must be at least 1"),
        })
      )
      .min(1, "At least one food item is required"),
    totalItems: z.number().min(1, "Total items must be at least 1"),
    totalPrice: z.number().min(0, "Total price must be non-negative"),
    customerInfo: z
      .object({
        fullName: z.string().min(1, "Full name is required"),
        contact: z.string().min(1, "Contact information is required"),
      })
      .optional(),
    specialRequest: z.string().optional(),
    deliveryInfo: z
      .object({
        name: z.string().min(1, "Delivery name is required"),
        phone: z.string().min(1, "Phone number is required"),
        address: z.string().min(1, "Delivery address is required"),
      })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.orderType === "dine-in" && !data.tableNo) {
        return false;
      }
      if (
        (data.orderType === "takeaway" || data.orderType === "home-delivery") &&
        !data.customerInfo
      ) {
        return false;
      }
      if (data.orderType === "home-delivery" && !data.deliveryInfo) {
        return false;
      }
      return true;
    },
    {
      message: "Please fill in all required fields for the selected order type",
      path: ["orderType"],
    }
  );

type OrderFormData = z.infer<typeof orderSchema>;

function FoodSearchModal({
  isOpen,
  onClose,
  onSelect,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: FoodItem) => void;
}) {
  const [search, setSearch] = useState("");
  const filteredItems = foodItemsList.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader className="text-xl font-medium">
          <DialogTitle className="text-xl font-medium">
            Search food item
          </DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Input
            placeholder="Search food items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-1.5"
          />
        </div>
        <div className="grid gap-1.5">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect({ ...item, unit: 1 })}
              className="w-full text-left px-4 py-2 hover:bg-accent rounded-md flex items-center gap-2"
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="flex justify-end gap-3 mt-2.5">
          <Button
            variant="destructive"
            onClick={onClose}
            className="text-destructive bg-transparent hover:bg-destructive/30"
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={onClose}>
            Add Item
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function CreateEditOrderModal({
  isOpen = false,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  // const [isOpen, setIsOpen] = useState(true);
  const [showFoodSearch, setShowFoodSearch] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      orderType: "dine-in",
      foodItems: [],
      totalItems: 0,
      totalPrice: 0,
      orderDate: new Date(),
    },
    mode: "onSubmit", // Updated mode to onSubmit
  });

  const orderType = watch("orderType");
  const foodItems = watch("foodItems");

  const handleAddFoodItem = (item: FoodItem) => {
    const existingItemIndex = foodItems.findIndex((i) => i.id === item.id);
    if (existingItemIndex !== -1) {
      const updatedItems = [...foodItems];
      updatedItems[existingItemIndex].unit += 1;
      setValue("foodItems", updatedItems, { shouldValidate: true });
    } else {
      setValue("foodItems", [...foodItems, item], { shouldValidate: true });
    }
    setShowFoodSearch(false);
    updateTotals();
  };

  const handleUnitChange = (id: string, unit: number) => {
    const updatedItems = foodItems.map((item) =>
      item.id === id ? { ...item, unit: Math.max(1, unit) } : item
    );
    setValue("foodItems", updatedItems, { shouldValidate: true });
    updateTotals();
  };

  const handleDeleteFoodItem = (id: string) => {
    const updatedItems = foodItems.filter((item) => item.id !== id);
    setValue("foodItems", updatedItems, { shouldValidate: true });
    updateTotals();
  };

  const updateTotals = () => {
    const totalItems = foodItems.reduce((sum, item) => sum + item.unit, 0);
    const totalPrice = foodItems.reduce(
      (sum, item) => sum + item.price * item.unit,
      0
    );
    setValue("totalItems", totalItems, { shouldValidate: true });
    setValue("totalPrice", totalPrice, { shouldValidate: true });
  };

  useEffect(() => {
    updateTotals();
  }, [foodItems]);

  const onSubmit = (data: OrderFormData) => {
    console.log(data);
    toast({
      title: "Order Submitted",
      description: "Your order has been successfully submitted.",
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[700px] p-0">
        <DialogHeader className="mb-2.5 px-6 pt-6">
          <DialogTitle className="text-3xl font-medium">
            {orderType === "takeaway"
              ? "Add Takeaway Order"
              : "Add Customer Order"}
          </DialogTitle>
          <p className="text-sm text-secondary-foreground">
            Fill up the form below to place an order
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <ScrollArea className="h-[calc(100vh-242px)] px-6">
            <div className="space-y-5 pb-4">
              <div className="grid grid-cols-[180px,1fr] mobile-md:grid-cols-1 items-center gap-2">
                <Label className="text-base text-secondary-foreground font-medium">
                  Order type
                </Label>
                <Controller
                  name="orderType"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange} // Updated onValueChange
                      defaultValue={field.value}
                      className="flex gap-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dine-in" id="dine-in" />
                        <Label htmlFor="dine-in">Dine in</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="takeaway" id="takeaway" />
                        <Label htmlFor="takeaway">Takeaway order</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="home-delivery"
                          id="home-delivery"
                        />
                        <Label htmlFor="home-delivery">Home delivery</Label>
                      </div>
                    </RadioGroup>
                  )}
                />
                {errors.orderType && (
                  <p className="text-destructive text-sm ml-[120px]">
                    {errors.orderType.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-[180px,1fr] mobile-md:grid-cols-1 items-center gap-2">
                <Label
                  className="text-base text-secondary-foreground font-medium"
                  htmlFor="order-no"
                >
                  Order no
                </Label>
                <div className="space-y-2">
                  <Controller
                    name="orderNo"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="order-no"
                        placeholder="ex-#154"
                        {...field}
                        onChange={field.onChange}
                      /> // Updated onChange
                    )}
                  />
                  {errors.orderNo && (
                    <p className="text-destructive text-sm">
                      {errors.orderNo.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-[180px,1fr] mobile-md:grid-cols-1 items-center gap-2">
                <Label
                  className="text-base text-secondary-foreground font-medium"
                  htmlFor="order-date"
                >
                  Order date
                </Label>
                <div className="space-y-2">
                  <Controller
                    name="orderDate"
                    control={control}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal bg-secondary",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Select date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            className=""
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                            }}
                            disabled={(date) => date < startOfToday()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                  {errors.orderDate && (
                    <p className="text-destructive text-sm">
                      {errors.orderDate.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-[180px,1fr] mobile-md:grid-cols-1 items-center gap-2">
                <Label
                  className="text-base text-secondary-foreground font-medium"
                  htmlFor="order-time"
                >
                  Order time
                </Label>
                <div className="space-y-2">
                  <Controller
                    name="orderTime"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="time"
                        id="order-time"
                        {...field}
                        onChange={field.onChange} // Updated onChange
                      />
                    )}
                  />
                  {errors.orderTime && (
                    <p className="text-destructive text-sm">
                      {errors.orderTime.message}
                    </p>
                  )}
                </div>
              </div>

              {orderType === "dine-in" && (
                <div className="grid grid-cols-[180px,1fr] mobile-md:grid-cols-1 items-center gap-2">
                  <Label
                    className="text-base text-secondary-foreground font-medium"
                    htmlFor="table-no"
                  >
                    Table no
                  </Label>
                  <div className="space-y-2">
                    <Controller
                      name="tableNo"
                      control={control}
                      rules={{
                        required: "Table number is required for dine-in orders",
                      }}
                      render={({ field }) => (
                        <Input
                          id="table-no"
                          placeholder="ex-Table no-03"
                          {...field}
                          onChange={field.onChange}
                        /> // Updated onChange
                      )}
                    />
                    {errors.tableNo && (
                      <p className="text-destructive text-sm">
                        {errors.tableNo.message}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-[180px,1fr] mobile-md:grid-cols-1 items-start gap-2">
                <Label className="text-base text-secondary-foreground font-medium">
                  Food items & price
                </Label>
                <div className="space-y-2 border border-border rounded-md bg-secondary">
                  <Table className="">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Food Item</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {foodItems.map((item) => (
                        <TableRow
                          key={item.id}
                          className="!border-b border-border"
                        >
                          <TableCell>{item.name}</TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={item.unit}
                              onChange={(e) =>
                                handleUnitChange(
                                  item.id,
                                  Math.max(1, parseInt(e.target.value) || 1)
                                )
                              }
                              className="w-20"
                              min={1}
                            />
                          </TableCell>
                          <TableCell>{item.price * item.unit}Tk</TableCell>
                          <TableCell>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteFoodItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {errors.foodItems && (
                        <TableRow>
                          <TableCell className="text-destructive text-sm px-4 pt-1.5">
                            <p>{errors.foodItems.message}</p>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                  <div className="flex gap-2 px-4 pt-1 pb-5">
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      onClick={() => setShowFoodSearch(true)}
                    >
                      Add Row
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowFoodSearch(true)}
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Search Item
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-[180px,1fr] mobile-md:grid-cols-1 items-center gap-2">
                <Label
                  className="text-base text-secondary-foreground font-medium"
                  htmlFor="total-items"
                >
                  Total items
                </Label>
                <Controller
                  name="totalItems"
                  control={control}
                  render={({ field }) => (
                    <Input id="total-items" {...field} readOnly disabled />
                  )}
                />
              </div>

              <div className="grid grid-cols-[180px,1fr] mobile-md:grid-cols-1 items-center gap-2">
                <Label
                  className="text-base text-secondary-foreground font-medium"
                  htmlFor="total-price"
                >
                  Total price
                </Label>
                <Controller
                  name="totalPrice"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="total-price"
                      value={`${field.value}Tk`}
                      readOnly
                      disabled
                    />
                  )}
                />
              </div>

              {(orderType === "takeaway" || orderType === "home-delivery") && (
                <>
                  <div className="grid grid-cols-[180px,1fr] mobile-md:grid-cols-1 items-center gap-2">
                    <Label
                      className="text-base text-secondary-foreground font-medium"
                      htmlFor="customer-name"
                    >
                      Full name
                    </Label>
                    <div className="space-y-2">
                      <Controller
                        name="customerInfo.fullName"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="customer-name"
                            placeholder="Full name"
                            {...field}
                            onChange={field.onChange}
                          /> // Updated onChange
                        )}
                      />
                      {errors.customerInfo?.fullName && (
                        <p className="text-destructive text-sm">
                          {errors.customerInfo.fullName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-[180px,1fr] mobile-md:grid-cols-1 items-center gap-2">
                    <Label
                      className="text-base text-secondary-foreground font-medium"
                      htmlFor="customer-contact"
                    >
                      Phone or email
                    </Label>
                    <div className="space-y-2">
                      <Controller
                        name="customerInfo.contact"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="customer-contact"
                            placeholder="Phone or email"
                            {...field}
                            onChange={field.onChange}
                          /> // Updated onChange
                        )}
                      />
                      {errors.customerInfo?.contact && (
                        <p className="text-destructive text-sm">
                          {errors.customerInfo.contact.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-[180px,1fr] mobile-md:grid-cols-1 items-center gap-2">
                    <Label
                      className="text-base text-secondary-foreground font-medium"
                      htmlFor="special-request"
                    >
                      Special request
                    </Label>
                    <Controller
                      name="specialRequest"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="special-request"
                          placeholder="ex- It's urgent"
                          {...field}
                          onChange={field.onChange}
                        /> // Updated onChange
                      )}
                    />
                  </div>
                </>
              )}

              {orderType === "home-delivery" && (
                <div className="grid grid-cols-[180px,1fr] mobile-md:grid-cols-1 items-start gap-2">
                  <Label className="text-base text-secondary-foreground font-medium">
                    Home delivery order info
                  </Label>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Controller
                        name="deliveryInfo.name"
                        control={control}
                        render={({ field }) => (
                          <Input
                            placeholder="Name"
                            {...field}
                            onChange={field.onChange}
                          /> // Updated onChange
                        )}
                      />
                      <Controller
                        name="deliveryInfo.phone"
                        control={control}
                        render={({ field }) => (
                          <Input
                            placeholder="Phone number"
                            {...field}
                            onChange={field.onChange}
                          /> // Updated onChange
                        )}
                      />
                    </div>
                    <Controller
                      name="deliveryInfo.address"
                      control={control}
                      render={({ field }) => (
                        <Input
                          placeholder="Delivery address"
                          {...field}
                          onChange={field.onChange}
                        /> // Updated onChange
                      )}
                    />
                    {errors.deliveryInfo && (
                      <p className="text-destructive text-sm">
                        All delivery information is required
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <DialogFooter className="pt-3 pb-2.5  px-6 bg-main-background border-t border-border rounded-b-md">
            <div className="flex justify-between w-full">
              {orderType === "dine-in" && (
                <Button
                  type="button"
                  variant="link"
                  className="text-primary underline text-sm font-medium"
                >
                  View order history
                </Button>
              )}
              <div className="flex gap-3 ml-auto">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => setIsOpen(false)}
                  className="text-destructive bg-transparent hover:bg-destructive/30"
                >
                  Cancel
                </Button>
                <Button variant={"primary"} type="submit">
                  Open Order
                </Button>
              </div>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>

      <FoodSearchModal
        isOpen={showFoodSearch}
        onClose={() => setShowFoodSearch(false)}
        onSelect={handleAddFoodItem}
      />
    </Dialog>
  );
}
