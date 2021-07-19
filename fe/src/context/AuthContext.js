import { createContext, useEffect, useState } from "react";
import { HttpService } from "../services/services";
import { ApiClient } from "../utils/ApiClient";
import { useHistory } from "react-router-dom";

const initialValues = {
  logout: () => {},
  user: null,
  setUser: () => {},
  loading: false,
  fetchData: () => {},
};

export const AuthContext = createContext(initialValues);

export const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [loading, Setloading] = useState(false);
  const [ready, setReady] = useState(false);

  const logout = async () => {
    await HttpService.logout();
    await ApiClient.unsetToken();
    setUser(null);
    history.push("/login");
  };

  const fetchData = async () => {
    try {
      Setloading(true);
      const response = await HttpService.authenticatedUser();
      setReady(true);
      if (response.data !== undefined) {
        setUser(response.data.user);
      }
      Setloading(false);
    } catch (error) {
      Setloading(false);
      setReady(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, logout, setUser, loading, fetchData, ready }}
    >
      {children}
    </AuthContext.Provider>
  );
};
