"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Employee } from "@/types/employee";
import { Download, Pencil } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AddEditEmployeeModal } from "./add-edit-employee-modal";
import { DownloadNidModal } from "./download-nid-modal";
import { PaySalaryModal } from "./pay-salary-modal";

interface EmployeeCardProps {
  employee: Employee;
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showNidModal, setShowNidModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "regular":
        return "bg-success/10 text-success hover:bg-success/20";
      case "irregular":
        return "bg-destructive/10 text-destructive hover:bg-destructive/20";
      case "on leave":
        return "bg-warning/10 text-warning hover:bg-warning/20";
      default:
        return "bg-secondary";
    }
  };

  return (
    <>
      <Card className="p-4 bg-[#FEF7FF]">
        <div className="relative flex flex-col items-center mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowEditModal(true)}
            className="absolute right-0 top-0"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <div className="relative h-16 w-16 mb-2">
            <Image
              src={employee.image}
              alt={employee.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h3 className="font-medium text-center">{employee.name}</h3>
          <Badge
            variant="secondary"
            className={getStatusColor(employee.status)}
          >
            {employee.status}
          </Badge>
        </div>

        <div className="space-y-2 text-sm mb-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Role:</span>
            <span>{employee.role}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Salary:</span>
            <span>৳ {employee.salary}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shift:</span>
            <span>{employee.shift}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Access type:</span>
            <span>{employee.access}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Password:</span>
            <span>{employee.password}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Mobile:</span>
            <span>{employee.mobile}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Address:</span>
            <span className="text-right">{employee.address}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button className="flex-1" onClick={() => setShowPayModal(true)}>
            ৳&nbsp;Pay Salary
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setShowNidModal(true)}
          >
            <Download className="h-4 w-4" />
            NID
          </Button>
        </div>
      </Card>

      <AddEditEmployeeModal
        open={showEditModal}
        onOpenChange={setShowEditModal}
        employee={employee}
        mode="edit"
      />

      <PaySalaryModal
        open={showPayModal}
        onOpenChange={setShowPayModal}
        employee={employee}
      />

      <DownloadNidModal
        open={showNidModal}
        onOpenChange={setShowNidModal}
        nidImages={[
          "https://picsum.photos/seed/nid1/800/450",
          "https://picsum.photos/seed/nid1/800/450",
        ]}
      />
    </>
  );
}
