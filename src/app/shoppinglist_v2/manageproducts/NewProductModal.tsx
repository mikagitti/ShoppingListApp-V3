import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { CSSProperties } from '@mui/material/styles/createMixins';
import { AddNewShoppingListForUser } from '@/Database/dbConnectionV2';
import { AddNewProduct} from '@/Database/dbConnectionV3';


interface ModalProps {  
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
}


export const NewProductModal = ({ onClose } : ModalProps) => {
      
  const [name, setName] = useState<string>('');
  const [helperText, setHelperText] = useState('');

  const saveNewProduct = async() => {

    if(name.length < 3){
      setHelperText('Name minimun is 3 letters!');     
      return;
    }    
    
    await AddNewProduct(name);
    onClose();
  }
  
  const closeModal = () => {
    setName('');
    onClose();
  }

  return (
    <div style={ modalStyle}>      
      <Box sx={backgroundStyle}>
      <Typography>Write product name and save</Typography>
          <Stack spacing={2}>
              <TextField  
                          id="product-name" 
                          variant="standard"                   
                          onChange={(e) => setName(e.target.value)} 
                          helperText={helperText}/>
              <Button variant="outlined" onClick={() => saveNewProduct()} disabled={name.length > 2 ? false : true}>Save</Button>
              <Button variant="outlined" onClick={() => closeModal()}>Cancel</Button>
          </Stack>
        </Box>      
    </div>

  );
};



