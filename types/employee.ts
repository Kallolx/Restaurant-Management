export interface Employee {
  id: string;
  name: string;
  role: string;
  salary: number;
  shift: string;
  status: "Regular" | "Irregular" | "On Leave";
  image: string;
  mobile: string;
  address?: string;
  access: "Staff" | "Manager";
  password?: string;
  nidNumber?: string;
}
