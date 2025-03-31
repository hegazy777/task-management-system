import { privateApiInstance } from "../services/api/apiInstance";
import { users_endpoints } from "../services/api/apiConfig";
import { createContext, useEffect, useState, ReactNode } from "react";
import { useLocalStorage } from "./useLocalStorge";
import { Spinner } from "react-bootstrap";

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
  token: string | null;
  user: User | null;
  setToken: (newValue: string) => void;
  logout: () => void;
  isAdmin: boolean;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken, removeToken] = useLocalStorage();
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
    if (token && !user) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [token]);

  const logout = () => {
    removeToken();
    setUser(null);
  };

  const isAdmin = user ? user.group.name === "SuperAdmin" : false;

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        logout,
        isAdmin,
      }}
    >
      {!loading ? (
        children
      ) : (
        <div className="d-flex justify-content-center align-items-center vh-100 vw-100">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
