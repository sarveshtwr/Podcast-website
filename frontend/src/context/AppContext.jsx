"use client";
const { useRouter } = require("next/navigation");
const { createContext, useState, useContext, useEffect } = require("react");

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  // Handle localStorage check after component mounts
  useEffect(() => {
    const hasUser = !!(
      localStorage.getItem("user") || localStorage.getItem("artist")
    );
    setLoggedIn(hasUser);
  }, []);

  const logout = () => {
    setCurrentUser(null);
    setLoggedIn(false);
    const user = localStorage.getItem("user");
    const admin = localStorage.getItem("admin");
    if (admin) {
      localStorage.removeItem("admin");
      router.push("/admin-login");
    } else if (user) {
      localStorage.removeItem("user");
      router.push("/login");
    } else {
      localStorage.removeItem("artist");
      router.push("/artist-login");
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loggedIn,
        setLoggedIn,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);
export default useAppContext;
