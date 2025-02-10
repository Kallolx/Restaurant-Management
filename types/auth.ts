export interface LoginRequest {
  phone: string;
  password: string;
  restaurant_code: number;
}

export interface User {
  uuid: string;
  name: string;
  email: string | null;
  phone: string;
  profile_picture: string | null;
  created_at: string;
  updated_at: string;
}

export interface Restaurant {
  uuid: string;
  name: string;
  address: string;
  website: string;
  restaurant_code: number;
  logo: string | null;
  staff_members: StaffMember[];
  created_at: string;
  updated_at: string;
}

export interface StaffMember {
  uuid: string;
  user: User;
  role: string;
  designation: string;
  salary: number | null;
  shift_start_time: string;
  shift_end_time: string;
  home_address: string;
  national_id: string;
  national_id_document: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export type UserRoleType = "owner" | "manager" | "staff";
export interface Tokens {
  refresh: string;
  access: string;
}

export interface LoginResponse {
  user: User;
  restaurant: Restaurant;
  role: UserRoleType;
  tokens: Tokens;
}

export interface RefreshTokenRequest {
  refresh: string;
}

export interface RefreshTokenResponse {
  access: string;
  refresh: string;
}
