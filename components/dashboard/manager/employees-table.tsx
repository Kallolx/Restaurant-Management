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
import { cn } from "@/lib/utils";
import { type Employee } from "@/types/manager-dashboard";
import Link from "next/link";

export function EmployeesTable({ employees }: { employees: Employee[] }) {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg font-medium">Employees</CardTitle>
        <Link
          href={"/dashboard/employee"}
          className="text-base text-primary underline h-auto p-0"
        >
          View all
        </Link>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Name</TableHead>
                <TableHead className="whitespace-nowrap">Role</TableHead>
                <TableHead className="whitespace-nowrap">Shift</TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
                <TableHead className="whitespace-nowrap">Performance</TableHead>
                <TableHead className="whitespace-nowrap">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="whitespace-nowrap">
                    {employee.name}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {employee.role}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {employee.shift}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2 py-1 text-xs",
                        {
                          "bg-green-100 text-green-700":
                            employee.status === "Regular",
                          "bg-red-100 text-red-700":
                            employee.status === "Irregular",
                          "bg-yellow-100 text-yellow-700":
                            employee.status === "On leave",
                        }
                      )}
                    >
                      {employee.status}
                    </span>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {employee.performance.type} {employee.performance.value}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="link"
                      className="text-xs text-blue-500 h-auto p-0"
                    >
                      Edit
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
