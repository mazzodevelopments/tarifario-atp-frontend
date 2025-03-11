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
