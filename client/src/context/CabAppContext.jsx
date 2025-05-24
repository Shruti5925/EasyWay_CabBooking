import React, { createContext, useState } from 'react';


 export  const CabAppContext = createContext();

export const CabAppContextProvider = ({ children }) => {

  const backendUrl= import.meta.env.VITE_BACKEND_URL 

  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken && storedToken !== "undefined" && storedToken !== "false"
      ? storedToken
      : "";
  });

  
  // const [cab, setCab] = useState([]);
  // const [token,setToken]=useState();



  const value={
    backendUrl,
    token,
    setToken
  }


  return (
    <CabAppContext.Provider value={value}>
      {children}
    </CabAppContext.Provider>
  );
};

// export const useAuth = () => useContext(AuthContext);
export default CabAppContextProvider
