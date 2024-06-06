import React, { useEffect, useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { CSSProperties } from '@mui/material/styles/createMixins';
import { ShoppingListType, UpdateShoppingListName } from '@/Database/dbConnectionV2';
import { RestaurantMenu } from '@mui/icons-material';

interface ModalProps {
  onClose: () => void;
  shoppingList: ShoppingListType | null;
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


export const EditShoppingListNameModal = ({ onClose, shoppingList } : ModalProps) => {

  const [newName, setNewName] = useState<string>('');
  const [helperText, setHelperText] = useState('');


  useEffect(() => {    
    if (shoppingList == null || shoppingList == undefined) {
      return;
    }
    else {
      console.log('name=', shoppingList.name)
      if(shoppingList.name) {
        setNewName(shoppingList.name);
        console.log('ja name=', shoppingList.name)
      }
    }
  }, []); 
 

  const saveShoppingListName = async() => {
    if(newName != null && newName != undefined && newName.length < 5) {
      setHelperText('Name minimun is 3 letters!');     
      return;
    }   

    if (shoppingList != null) {
      await UpdateShoppingListName(shoppingList.id, newName);
    }
    onClose();
  }
  
  const closeModal = () => {
    setNewName('');
    onClose();
  }
  
  return (
    <div style={ modalStyle}>      
      <Box sx={backgroundStyle}>
      <Typography>Modify shopping list name</Typography>                            
          
          <TextField  id="product-name"
                      variant="standard" 
                      style={ {fontSize: '30px'}}                          
                      onChange={(e) => setNewName(e.target.value)} 
                      value={newName}                          
                      helperText={helperText}
                      sx={ {marginTop: '10px', marginBottom: '20px'}}
                      />
                      <Stack gap={2}>
              <Button variant="outlined" onClick={() => saveShoppingListName()} disabled={newName && newName.length > 2 ? false : true} >Yes</Button>
              <Button variant="outlined" onClick={() => closeModal()}>No</Button>
          </Stack>
        </Box>      
    </div>

  );
};



