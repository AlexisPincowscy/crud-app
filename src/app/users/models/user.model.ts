export interface UserAddress {
  state: string;
  street: string;
  number: string;
}

export interface User {
  id: string;
  fullName: string;
  birthDate: string; // ISO8601 string
  email: string;
  password: string;
  address: UserAddress;
  createdAt: string;
  updatedAt: string;
}

export type UserPayload = {
  fullName: string;
  birthDate: string;
  email: string;
  password: string;
  address: UserAddress;
};
