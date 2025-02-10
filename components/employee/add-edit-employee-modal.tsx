"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  employeeFormSchema,
  type EmployeeFormValues,
} from "@/lib/validations/employee";
import { Employee } from "@/types/employee";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { TimeInput } from "./time-input";

interface AddEditEmployeeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee?: Employee;
  mode?: "create" | "edit";
}

export function AddEditEmployeeModal({
  open,
  onOpenChange,
  employee,
  mode = "create",
}: AddEditEmployeeModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [nidDoc, setNidDoc] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const photoInputRef = useRef<HTMLInputElement>(null);
  const nidInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      name: "",
      role: "",
      salary: "",
      shiftStart: "",
      shiftEnd: "",
      mobile: "",
      address: "",
      accessType: "Staff",
      password: "",
      nidNumber: "",
      status: "Regular",
    },
  });

  useEffect(() => {
    if (mode === "edit" && employee) {
      const [start, end] = employee.shift.split("-");
      form.reset({
        name: employee.name,
        role: employee.role,
        salary: employee.salary.toString(),
        shiftStart: start,
        shiftEnd: end,
        mobile: employee.mobile,
        address: employee.address || "",
        accessType: employee.access,
        password: employee.password || "",
        nidNumber: employee.nidNumber || "",
        status: employee.status,
      });
      if (employee.image) {
        setPhotoPreview(employee.image);
      }
    }
  }, [mode, employee, form]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNidDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setNidDoc(e.target.files[0]);
    }
  };

  const onSubmit = (values: EmployeeFormValues) => {
    const employeeData = {
      ...values,
      shift: `${values.shiftStart}-${values.shiftEnd}`,
      access: values.accessType,
      image: photoPreview || "",
    };
    console.log(employeeData, photo, nidDoc);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px] p-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col h-[90vh]"
          >
            {/* Header */}
            <DialogTitle className="p-6 border-b">
              <h2 className="text-xl font-medium">
                {mode === "create" ? "Add Employee" : "Edit Employee"}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Fill up the form below to {mode === "create" ? "add" : "edit"}{" "}
                employee
              </p>
            </DialogTitle>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Photo Upload */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden"
                    onClick={() => photoInputRef.current?.click()}
                  >
                    {photoPreview ? (
                      <Image
                        src={photoPreview}
                        alt="Preview"
                        width={128}
                        height={128}
                        className="object-cover w-full h-full rounded-full"
                      />
                    ) : (
                      <div className="text-center">
                        <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                        <span className="text-sm text-muted-foreground mt-2">
                          Upload photo
                        </span>
                      </div>
                    )}
                  </div>
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                </div>

                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="lg:grid lg:grid-cols-[200px,1fr] lg:items-center lg:gap-4">
                      <FormLabel>Employee name</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input placeholder="First and last name" {...field} />
                        </FormControl>
                        <FormMessage className="absolute -bottom-5 text-xs" />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Role Field */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="lg:grid lg:grid-cols-[200px,1fr] lg:items-center lg:gap-4">
                      <FormLabel>Role</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input placeholder="ex-waiter, chef" {...field} />
                        </FormControl>
                        <FormMessage className="absolute -bottom-5 text-xs" />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Salary Field */}
                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem className="lg:grid lg:grid-cols-[200px,1fr] lg:items-center lg:gap-4">
                      <FormLabel>Salary</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input placeholder="ex-5,000Tk" {...field} />
                        </FormControl>
                        <FormMessage className="absolute -bottom-5 text-xs" />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Shift Time Fields */}
                <div className="lg:grid lg:grid-cols-[200px,1fr] lg:items-center lg:gap-4">
                  <FormLabel>Shift time</FormLabel>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="shiftStart"
                      render={({ field }) => (
                        <FormItem>
                          <div className="relative">
                            <FormControl>
                              <TimeInput
                                placeholder="Start time"
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                              />
                            </FormControl>
                            <FormMessage className="absolute -bottom-5 text-xs" />
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="shiftEnd"
                      render={({ field }) => (
                        <FormItem>
                          <div className="relative">
                            <FormControl>
                              <TimeInput
                                placeholder="End time"
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                              />
                            </FormControl>
                            <FormMessage className="absolute -bottom-5 text-xs" />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Personal Info Fields */}
                <div className="lg:grid lg:grid-cols-[200px,1fr] lg:items-center lg:gap-4">
                  <FormLabel>Personal info</FormLabel>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="mobile"
                      render={({ field }) => (
                        <FormItem>
                          <div className="relative">
                            <FormControl>
                              <Input placeholder="Mobile" {...field} />
                            </FormControl>
                            <FormMessage className="absolute -bottom-5 text-xs" />
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <div className="relative">
                            <FormControl>
                              <Input placeholder="Home address" {...field} />
                            </FormControl>
                            <FormMessage className="absolute -bottom-5 text-xs" />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Access Type and Password Fields */}
                <div className="lg:grid lg:grid-cols-[200px,1fr] lg:items-center lg:gap-4">
                  <FormLabel>Access type</FormLabel>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="accessType"
                      render={({ field }) => (
                        <FormItem>
                          <div className="relative">
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select access" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Staff">Staff</SelectItem>
                                <SelectItem value="Manager">Manager</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="absolute -bottom-5 text-xs" />
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="relative">
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type={showPassword ? "text" : "password"}
                                  placeholder="Password"
                                  {...field}
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="absolute right-0 top-0 h-full px-3"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage className="absolute -bottom-5 text-xs" />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* NID Info Fields */}
                <div className="lg:grid lg:grid-cols-[200px,1fr] lg:items-center lg:gap-4">
                  <FormLabel>NID info</FormLabel>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="nidNumber"
                      render={({ field }) => (
                        <FormItem>
                          <div className="relative">
                            <FormControl>
                              <Input placeholder="NID number" {...field} />
                            </FormControl>
                            <FormMessage className="absolute -bottom-5 text-xs" />
                          </div>
                        </FormItem>
                      )}
                    />
                    <div className="relative">
                      <div
                        className="border rounded-md p-3 flex items-center justify-between bg-muted/50 cursor-pointer"
                        onClick={() => nidInputRef.current?.click()}
                      >
                        <span className="text-sm text-muted-foreground">
                          {nidDoc ? nidDoc.name : "Upload NID"}
                        </span>
                        <Upload className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <input
                        ref={nidInputRef}
                        type="file"
                        className="hidden"
                        onChange={handleNidDocChange}
                        accept="image/*,.pdf"
                      />
                    </div>
                  </div>
                </div>

                {/* Status Field */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="lg:grid lg:grid-cols-[200px,1fr] lg:items-center lg:gap-4">
                      <FormLabel>Status</FormLabel>
                      <div className="flex gap-4">
                        {["Regular", "Irregular", "On Leave"].map((status) => (
                          <div
                            key={status}
                            className={`px-4 py-2 rounded-md cursor-pointer ${
                              field.value === status
                                ? status === "Regular"
                                  ? "bg-success/20 text-success"
                                  : status === "Irregular"
                                  ? "bg-destructive/20 text-destructive"
                                  : "bg-warning/20 text-warning"
                                : "bg-muted"
                            }`}
                            onClick={() => field.onChange(status)}
                          >
                            {status}
                          </div>
                        ))}
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t flex items-center justify-end space-x-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                Cancel
              </Button>
              <Button type="submit" variant={"primary"}>
                Save Info
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
