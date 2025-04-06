import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Recupera l'utente loggato al primo caricamento
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((u) => u.email === email);

    if (!existingUser) {
      alert("Email non trovata");
      return false;
    }
    if (existingUser.password !== password) {
      alert("Password sbagliata");
      return false;
    }

    setUser({ email });
    localStorage.setItem("user", JSON.stringify({ email }));
    return true;
  };

  const register = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const alreadyExists = users.find((u) => u.email === email);

    if (alreadyExists) {
      alert("Utente già registrato");
      return false;
    }

    const updatedUsers = [...users, { email, password }];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("user", JSON.stringify({ email }));
    setUser({ email });
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};