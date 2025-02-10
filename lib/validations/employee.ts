import * as z from "zod";

export const employeeFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  salary: z.string().min(1, "Salary is required"),
  shiftStart: z.string().min(1, "Start time is required"),
  shiftEnd: z.string().min(1, "End time is required"),
  mobile: z.string().min(1, "Mobile number is required"),
  address: z.string().min(1, "Address is required"),
  accessType: z.enum(["Staff", "Manager"], {
    required_error: "Access type is required",
  }),
  password: z.string().min(6, "Password must be at least 6 characters"),
  nidNumber: z.string().min(1, "NID number is required"),
  status: z.enum(["Regular", "Irregular", "On Leave"], {
    required_error: "Status is required",
  }),
  photo: z.any().optional(),
  nidDoc: z.any().optional(),
});

export const paySalaryFormSchema = z.object({
  name: z.string(),
  role: z.string(),
  salary: z.string(),
  dueSalary: z.string().min(1, "Due salary is required"),
  bonus: z.string().optional(),
  salaryMonth: z.date({
    required_error: "Salary month is required",
  }),
});

export type EmployeeFormValues = z.infer<typeof employeeFormSchema>;
export type PaySalaryFormValues = z.infer<typeof paySalaryFormSchema>;
