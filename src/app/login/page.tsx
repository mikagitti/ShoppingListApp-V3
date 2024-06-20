'use client'
import React, { useContext } from 'react';
import { Box, Typography } from "@mui/material";
import LoginContext from "@/Context/login/LoginContext";
import LoginCard from './loginCard';


const loginText = `>> Login <<`;

export default function Home() {

    const { userList } = useContext(LoginContext);
    
    return (
    <>
        
        <Box sx={{ padding: 3, marginTop: 5, display: 'flex', alignItems: 'center', flexDirection: 'column'}}> 
            <Typography variant="h4" color={'red'}>
                {loginText}
            </Typography>
            
            <Typography paragraph marginTop={2}>    
                Choose ur profile
            </Typography>            
        

        
        {
            userList.map((user, index) => 
                <Box key={index} mb={'20px'}>
                    <LoginCard user={user} />
                </Box>
            
            )
        }
        </Box>

    </>
    )
}
