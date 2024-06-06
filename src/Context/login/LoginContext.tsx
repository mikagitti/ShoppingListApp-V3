'use client'
import { GetAllUsers, UserType } from '@/Database/dbConnectionV2';
import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface ILoginContext {    
    userList: UserType[];
    selectedUser: UserType | null;
    selectUser: (id: number) => void;
    clearSelectedUser: () => void;
    selectedAdmin: string | null;
    selectAdmin: (user: string) => void;
    logoutAdmin: () => void;
}


const defaultLoginState: ILoginContext = {
    userList: [],
    selectedUser: null,
    selectUser: (id: number) => {},
    clearSelectedUser: () => {},
    selectedAdmin: null,
    selectAdmin: (user: string) => {},
    logoutAdmin: () => {},
}

//CONTEXT
const LoginContext = createContext<ILoginContext>(defaultLoginState);

//PROVIDER
export const LoginProvider = ({children} : {children : ReactNode}) => {

    const [userList, setUserList] = useState<UserType[]> ([]);
    const [selectedUser, setSelectedUser] = useState<UserType | null> (null);
    const [selectedAdmin, setSelectedAdmin] = useState<string | null> (null);

    useEffect( () => {

        const getUserFromDb = async() => {
            const users = await GetAllUsers();    
            setUserList(users);
        }
        getUserFromDb();
    }, []);

    const selectUser = (id: number) => {
        const findUser = userList.find(x => x.id === id);
        
        if (findUser != undefined)
            setSelectedUser(findUser);        
    }

    const clearSelectedUser = () => {
        setSelectedUser(null);
    }

    const selectAdmin = (user: string) => {
        if (user) {
            setSelectedAdmin(user);
        }
    }

    const logoutAdmin = () => {
        setSelectedAdmin(null);
    }


    return (
        <LoginContext.Provider value={{ 
            userList,
            selectedUser,
            selectUser,
            clearSelectedUser,                        
            selectedAdmin,
            selectAdmin,
            logoutAdmin,
             }}>
        {children}
        </LoginContext.Provider>
    );
}

export default LoginContext;
