'use client'
import React, { useContext } from 'react';
import { Box, Typography } from "@mui/material";
import LoginContext from "@/Context/login/LoginContext";
import LoginCard from './loginCard';


const loginText = `>> Login <<`;

const userLoginStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px'
}

const userListStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    marginTop: '20px',
    width: '100%',
    maxWidth: '800px',
}

export default function Home() {

    const { userList } = useContext(LoginContext);

    return (
        <>

            <Box sx={userLoginStyle}>
                <Typography variant="h4" color={'red'}>
                    {loginText}
                </Typography>

                <Box sx={userListStyle}>
                    {
                        userList.map((user, index) =>
                            <Box key={index} mb={'20px'}>
                                <LoginCard user={user} />
                            </Box>

                        )
                    }
                </Box>
            </Box>

        </>
    )
}
