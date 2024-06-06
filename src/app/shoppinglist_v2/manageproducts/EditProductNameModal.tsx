import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { CSSProperties } from '@mui/material/styles/createMixins';
import { ProductType, UpdateProductNameById, UpdateShoppingListName } from '@/Database/dbConnectionV2';

interface ModalProps {
  onClose: () => void;
  product: ProductType | undefined;
}

const modalStyle : CSSProperties = {
    position: 'fixed',
    top: -150,
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


export const EditProductNameModal = ({ onClose, product } : ModalProps) => {

  const [newName, setNewName] = useState<string>('');
  const [helperText, setHelperText] = useState('');


  useEffect(() => {    
    if (product) {      
      setNewName(product.name);    
    }
  }, []); 
 

  const saveProductName = async() => {
    if(newName != null && newName != undefined && newName.length < 3) {
      setHelperText('Name minimun is 3 letters!');     
      return;
    }   
   
    if (product)
      await UpdateProductNameById(product.id, newName);
    
    onClose();
  }
  
  const closeModal = () => {
    setNewName('');
    onClose();
  }
  
  return (
    <div style={ modalStyle}>      
      <Box sx={backgroundStyle}>
      <Typography>Modify product name</Typography>                            
          
          <TextField  id="product-name"
                      variant="standard" 
                      style={ {fontSize: '30px'}}                          
                      onChange={(e) => setNewName(e.target.value)} 
                      value={newName}                          
                      helperText={helperText}
                      sx={ {marginTop: '10px', marginBottom: '30px'}}
                      color="secondary"
                      />
                      <Stack gap={2}>
              <Button variant="outlined" onClick={() => saveProductName()} disabled={newName && newName.length > 2 ? false : true} >Save</Button>
              <Button variant="outlined" onClick={() => closeModal()}>Cancel</Button>
          </Stack>
        </Box>      
    </div>

  );
};



