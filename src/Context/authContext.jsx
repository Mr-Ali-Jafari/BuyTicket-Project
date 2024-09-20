import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({})
  const [isLogin, setIsLogin] = useState(false)

  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo, isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider };
