import { JwtPayload } from "jwt-decode";

export interface ProjectType {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  modificationDate: string;
  task: [];
}

export interface ProjectTypeForm {
  title: string;
  description: string;
}

export interface UserGroup {
  id: number;
  name: string;
  creationDate: string;
  modificationDate: string;
}

export interface User {
  id: number;
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  imagePath: string;
  isActivated: boolean;
  group: UserGroup;
  creationDate: string;
  modificationDate: string;
}

export type AuthContextType = {
  token: string | null;
  user: User | null;
  setToken: (newValue: string) => void;
  logout: () => void;
  isManager: boolean;
};

export interface CustomJwtPayload extends JwtPayload {
  userGroup: "Manager" | "Employee";
}
