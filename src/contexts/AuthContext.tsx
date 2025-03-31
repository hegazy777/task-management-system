import { privateApiInstance } from "../services/api/apiInstance";
import { users_endpoints } from "../services/api/apiConfig";
import { createContext, useEffect, useState, ReactNode } from "react";

interface UserGroup {
  id: number;
  name: string;
  creationDate: string;
  modificationDate: string;
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
  creationDate: string;
  modificationDate: string;
}

export type AuthContextType = {
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  token: string | null;
  user: User | null;
  logout: () => void;
  isAdmin: boolean;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const useLocalStorage = (
  key: string
): [string | null, (newValue: string | null) => void] => {
  const [value, setValue] = useState<string | null>(() => localStorage.getItem(key));

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
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, newValue);
    }
    setValue(newValue);
  };

  return [value, setStoredValue];
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useLocalStorage("token");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getUserData = async () => {
    try {
      const response = await privateApiInstance.get(users_endpoints.GET_USER);
      setUser(response.data);
    } catch (error) {
      console.log("❌ Error fetching user data:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getUserData();
    } else {
      setLoading(false);
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
      {!loading ? children : <p>Loading...</p>}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
