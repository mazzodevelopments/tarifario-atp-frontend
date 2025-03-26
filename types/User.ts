export interface User {
  id: number;
  email: string;
  profilePic: string;
  name: string;
  lastname: string;
  firstLogin: boolean;
  birthDate: string;
  phone: string;
  roles: {
    id: number;
    name: string;
  }[];
}

export interface AdminCreateUser {
  email: string;
  password: string;
  name: string;
  lastname: string;
  roleIds: number[];
}

export interface AdminUpdateUser {
  id?: number;
  password?: string;
  name?: string;
  lastname?: string;
  email?: string;
  profilePic?: string;
  firstLogin?: boolean;
  phone?: string;
  birthDate?: string;
  roleIds?: number[];
}
