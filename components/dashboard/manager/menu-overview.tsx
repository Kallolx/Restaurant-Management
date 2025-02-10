import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type MenuItem } from "@/types/manager-dashboard";
import Link from "next/link";

export function MenuOverview({ items }: { items: MenuItem[] }) {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg font-medium">Menu Overview</CardTitle>
        <Link
          href={"/dashboard/food-menu"}
          className="text-base underline text-primary h-auto p-0"
        >
          View all
        </Link>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Item name</TableHead>
                <TableHead className="whitespace-nowrap">Description</TableHead>
                <TableHead className="whitespace-nowrap">Price</TableHead>
                <TableHead className="whitespace-nowrap">
                  Availability
                </TableHead>
                <TableHead className="whitespace-nowrap">Tags</TableHead>
                <TableHead className="whitespace-nowrap">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="whitespace-nowrap">
                    {item.name}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {item.description}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    ৳ {item.price}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {item.availability}
                  </TableCell>
                  <TableCell>
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700 mr-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="link"
                      className="text-xs text-blue-500 h-auto p-0"
                    >
                      Edit/Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
