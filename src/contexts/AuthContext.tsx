import { privateApiInstance } from "../services/api/apiInstance";
import { users_endpoints } from "../services/api/apiConfig";
import { createContext, useEffect, useState, ReactNode } from "react";

interface UserGroup {
  id: number;
  name: string;
  creationDate: string; // ISO Date String
  modificationDate: string; // ISO Date String
}

interface User {
  id: number;
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  imagePath: string;
  isActivated: boolean;
  group: UserGroup;
  creationDate: string; // ISO Date String
  modificationDate: string; // ISO Date String
}

export type AuthContextType = {
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  token: string | null;
  user: User | null;
  logout: () => void;
  isAdmin: boolean;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

const useLocalStorage = (
  key: string
): [string | null, (newValue: string | null) => void] => {
  const [value, setValue] = useState<string | null>(
    localStorage.getItem(key) || null
  );

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        setValue(event.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  const setStoredValue = (newValue: string | null) => {
    if (newValue === null) {
      localStorage.removeItem("token"); // Remove item if null
    } else {
      localStorage.setItem("token", newValue); // Update localStorage
    }
    setValue(newValue); // Update state for same-tab updates
  };

  return [value, setStoredValue];
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useLocalStorage("token");
  const [user, setUser] = useState<User | null>(null);

  const getUserData = async () => {
    try {
      const response = await privateApiInstance.get(
        users_endpoints.GET_USER

        //     {
        //     "access-control-allow-origin": "*",
        //   }
      );

      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, [token]);
  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);
    setUser(null);
  };

  const isAdmin = user ? user.group.name === "SuperAdmin" : false;
  return (
    <AuthContext.Provider
      value={{
        setToken,
        setUser,
        token,
        user,
        logout,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
