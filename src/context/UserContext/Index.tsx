import React, { ReactNode, createContext, useEffect, useState } from "react";
import { User } from "./models/User";
import { LoginService } from "./services/loginService";
import { decodeToken } from "react-jwt";
import { UserService } from "./services/userService";
import { api } from '../../services/api'; 
import { getCurrentAccount } from '../../adapters/current-account/current-account';

type tokenData = {
  nameid:number,
}


const UserContext = createContext<UserContextProps>({} as UserContextProps);

interface UserContextProviderProps {
  children: ReactNode;
}
interface UserContextProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  updateUser: (user: User) => void;
  handleLogout: () => void;
  handleLogin: (email: string, password: string) => Promise<void>;
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User>({} as User);

  const pathName = window.location.pathname

  useEffect(() => {
    if(pathName === '/' || pathName === '/register' || pathName === '/esqueci-senha')
      return
    const account = getCurrentAccount()
    if(!account){
      window.location.href = '/'
    }
  }, [ pathName])

  const handleLogin = async (
    email: string,
    password: string
  ): Promise<void> => { 
      const response = await LoginService.Post({ email, password });
      if (response) {
        localStorage.setItem("token", response.token);
        api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
        const decodedToken:tokenData|null = decodeToken(response.token);
        if(decodedToken){
          const user = await UserService.GetById(decodedToken.nameid!)
          setUser(user)
        }
        console.log(decodedToken)
      } 
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser({} as User);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = (user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  const contextValue: UserContextProps = {
    user,
    setUser,
    handleLogin,
    handleLogout,
    updateUser,
  };

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        setUser(user);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserContext };
