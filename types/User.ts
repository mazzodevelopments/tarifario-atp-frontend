export interface User {
  id: number;
  username: string;
  name: string;
  lastname: string;
  email: string;
  profilePic: string;
  firstLogin: boolean;
  role: {
    id: number;
    name: string;
  };
}

export interface AdminCreateUser {
  email: string;
  password: string;
  name: string;
  lastname: string;
  roleId: number;
}
