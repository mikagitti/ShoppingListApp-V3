"use client";
import { GetAllUsers } from "@/Database/dbConnectionV3";
import { UserType } from "@/Database/types";
import React, { createContext, useState, ReactNode, useEffect } from "react";

interface ILoginContext {
     userList: UserType[];
     addNewUser: (user: UserType) => void;
     removeUserFromList: (user: UserType) => void;
     selectedUser: UserType | null;
     selectUser: (id: number) => void;
     clearSelectedUser: () => void;
     selectedAdmin: string | null;
     selectAdmin: (user: string) => void;
     logoutAdmin: () => void;
}

const defaultLoginState: ILoginContext = {
     userList: [],
     addNewUser: (user: UserType) => {},
     removeUserFromList: (user: UserType) => {},
     selectedUser: null,
     selectUser: (id: number) => {},
     clearSelectedUser: () => {},
     selectedAdmin: null,
     selectAdmin: (user: string) => {},
     logoutAdmin: () => {},
};

//CONTEXT
const LoginContext = createContext<ILoginContext>(defaultLoginState);

//PROVIDER
export const LoginProvider = ({ children }: { children: ReactNode }) => {
     const [userList, setUserList] = useState<UserType[]>([]);
     const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
     const [selectedAdmin, setSelectedAdmin] = useState<string | null>(null);

     useEffect(() => {
          const getUserFromDb = async () => {
               const users = await GetAllUsers();

               if (users) setUserList(users);
          };
          getUserFromDb();
     }, []);

     const addNewUser = (user: UserType) => {
          setUserList([...userList, user]);
     };

     const removeUserFromList = (user: UserType) => {
          setUserList(userList.filter((x) => x.id !== user.id));
     };

     const selectUser = (id: number) => {
          const findUser = userList.find((x) => x.id === id);

          if (findUser != undefined) setSelectedUser(findUser);
     };

     const clearSelectedUser = () => {
          setSelectedUser(null);
     };

     const selectAdmin = (user: string) => {
          if (user) {
               setSelectedAdmin(user);
          }
     };

     const logoutAdmin = () => {
          setSelectedAdmin(null);
     };

     return (
          <LoginContext.Provider
               value={{
                    userList,
                    addNewUser,
                    removeUserFromList,
                    selectedUser,
                    selectUser,
                    clearSelectedUser,
                    selectedAdmin,
                    selectAdmin,
                    logoutAdmin,
               }}
          >
               {children}
          </LoginContext.Provider>
     );
};

export default LoginContext;
