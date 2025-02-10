"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";

const topItems = [
  { name: "Grilled Chicken", units: 125 },
  { name: "Grilled Chicken", units: 125 },
  { name: "Grilled Chicken", units: 125 },
];

const lowItems = [
  { name: "Grilled Chicken", units: 38 },
  { name: "Grilled Chicken", units: 25 },
  { name: "Grilled Chicken", units: 18 },
];

export function SalesItems() {
  return (
    <Card className="w-full px-4 py-4">
      <CardHeader className="flex flex-row items-center justify-between p-0 pb-4">
        <CardTitle className="text-xl text-foreground">Sales Items</CardTitle>
        <Select defaultValue="7">
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-0 pb-2">
        <div className="space-y-5 ">
          <div>
            <h3 className="text-base font-medium border-b border-border flex items-center justify-between pb-1.5">
              <span>Items(Top sell)</span>
              <span>Unit</span>
            </h3>
            <div className="mt-4 space-y-2">
              {topItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm text-secondary-foreground"
                >
                  <span className="text-sm">{item.name}</span>
                  <span className="font-medium">{item.units}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-base font-medium border-b border-border flex items-center justify-between pb-1.5">
              <span>Items(Top sell)</span>
              <span>Unit</span>
            </h3>
            <div className="mt-4 space-y-2">
              {lowItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm text-secondary-foreground"
                >
                  <span className="text-sm">{item.name}</span>
                  <span className="font-medium">{item.units}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          size={"sm"}
          variant="link"
          className="px-0 text-sm text-primary underline"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
