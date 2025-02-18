import { createContext, useContext, useState } from "react";
import * as userServices from "../Services/userServices";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(userServices.getUser());

  const login = async (email, password) => {
    try {
      const user = await userServices.login(email, password);
      setUser(user);
      toast.success("Login Successfully");
    } catch (error) {
      toast.error(error.respone.data);
    }
  };

  const logout = async () => {
    userServices.logout();
    setUser(null);
    toast.success("Logout Successfully");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
