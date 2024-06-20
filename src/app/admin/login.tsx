import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { CSSProperties } from '@mui/material/styles/createMixins';
import { GetAdminByUserNameAndPassword } from '@/Database/dbConnectionV3';
import LoginContext from "@/Context/login/LoginContext";


type ModalProps = {  
  onClose: () => void;
}

const modalStyle : CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',    
}
    

const backgroundStyle = {    
    bgcolor: 'background.paper',
    padding: '15px 25px 35px 25px',
    borderRadius: '30px',
    border: 'solid'      
}


export default function Login({ onClose} : ModalProps) {
  
  const {selectAdmin} = useContext(LoginContext);
  
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    
    if (username && password)
    {       
      const isAdminUserValid = await GetAdminByUserNameAndPassword(username, password);
      console.log('User is: ', isAdminUserValid);
      
      if(isAdminUserValid) {
        selectAdmin(username);
        onClose();
      }
    } else {
      console.log('Submit error: username or password missing');
    }  
  };

  const handleClose = () => {    
    onClose();
  };

  return (
    <div style={ modalStyle }>      
      <Box sx={ backgroundStyle }>
        
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, minwidth: 300 }}
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
        >
          <Typography variant="h6">Type your username and password</Typography>

          <TextField
            label="Username"
            variant="outlined"
            required
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            required
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
            
            <Button onClick={() => handleClose()} variant="outlined" color="secondary">
              Close
            </Button>
          </Box>
        
        </Box>       
      
      </Box>      
    </div>

  );
};



