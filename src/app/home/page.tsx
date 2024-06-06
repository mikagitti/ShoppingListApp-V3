'use client'

import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { GetAllUsers, UpdateUserData, User } from '../../Database/dbConnectionV3'

export default function Home() {

    const [users, setUsers] = useState<User[] | null>(null);

    const [userId, setUserId] = useState<number | null>(null);
    const [userName, setUserName] = useState<string | null>(null);

    const getAllUsersFromV3 = async () => {
        const returnUsers = await GetAllUsers();
        
        console.log(returnUsers);
        
        if (returnUsers !== null)
        {
            let tempUsers = returnUsers.map(x => ({id: x.id, name: x.name}) );
            console.log(tempUsers);
            setUsers(tempUsers);
            return;
        }
        console.log('users: EI LÖYTYNYT')
    }

    const makeUserList = () => {
        
    }

    const handleUpdate = async () => {

        const user:User = {
            id: userId || 0, 
            name: userName || '',
        }

        await UpdateUserData(user);
        clearUserSelection();
        getAllUsersFromV3();
    }

    const userFieldToEdit = () => {
        return (
            <Box sx={ {display: 'flex', flexDirection: 'column', gap:'5px'}}>                
                <input type="number" disabled placeholder="User ID" value={userId !== null ? userId : 0} onChange={(e) => setUserId(e.target.value ? parseInt(e.target.value, 10) : null)} />
                <input type="text" placeholder="UserName" value={userName !== null ? userName : ''} onChange={(e) => setUserName(e.target.value ? e.target.value : null)} />                
                <Button sx={ { }} onClick={() => handleUpdate()}>Update User</Button>
            </Box>
        )
    }

    const showEditFields = (user: User) => {
        setUserId(user.id);
        setUserName(user.name);        
    }

    const clearUserSelection = () => {
        setUserId(null);
        setUserName(null);        
    }

    const userTable = () => {
        return (
            <TableContainer sx={ {border: 'solid 1px'} }>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>User name</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {users && users.map((user, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row"> {user.id} </TableCell>
                            <TableCell>{user.name}</TableCell>
                            
                            <TableCell>
                                <Button onClick={() => showEditFields(user)}>
                                    <Typography fontSize={'0.76rem'}>Edit</Typography>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }



    return (
        
        <Box sx={ {display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        
            <Typography variant="h3">
                Take note!!!
            </Typography>
            
            <Typography paragraph marginTop={2}>    
                Pages are under development...
            </Typography>

            <Button onClick={getAllUsersFromV3}>
                Get all users from Versio 3
            </Button>

            <Box sx={ {width: '50%', marginTop: '2rem'} }>
                {users && userTable()}
            </Box>

            <Box sx={ {mt: '20px'}}>
                {userId && userFieldToEdit()}
            </Box>
        </Box>
    )
}
