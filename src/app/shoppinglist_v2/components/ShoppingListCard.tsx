import React, { useState } from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link'

import { CardContent, Paper, Typography, styled, Card, CardActions, Button, Icon, IconButton } from '@mui/material';
import { ShoppingListType } from '@/Database/dbConnectionV2';


type CardProps = {    
    shoppingList: ShoppingListType;
    deleteShoppingList: () => void;
    setNewName: (name:string) => void;
    url: string;
}

const CustomCard = styled(Card)(({ theme }) => ({
  boxShadow: theme.shadows[10],
}));

const CustomIconLink = styled(Link)(({ theme }) => ({          
  color: theme.palette.primary.contrastText,
  textDecoration: 'none',
  '&:hover': {
      color: theme.palette.primary.light,
  },
  display: 'flex', 
  gap: 2, 
  flexDirection: 'row',
  alignItems: 'center',  
}));

const CustomButton = styled(Button)(({ theme }) => ({          
  color: theme.palette.primary.contrastText,
  textDecoration: 'none',
  '&:hover': {
      color: theme.palette.secondary.main,      
  },
  display: 'flex', 
  gap: 2, 
  flexDirection: 'row',
  alignItems: 'center',  
  fontSize: '12px'
}));

export default function ShoppingListCard({shoppingList, deleteShoppingList, setNewName, url} : CardProps) {
        
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(shoppingList.name);

  const handleEditClick = () => {
    if (isEditing) {
        setNewName(newTitle);
    }
    setIsEditing(!isEditing);
};

  return (
    <Box width='300px'>
      <CustomCard>
        <CardContent>   
            <Box display="flex" flexDirection='row' justifyContent="space-between" alignItems="center" mt={'-1%'}>
            
              {isEditing ? (
                    <input 
                        type="text" 
                        value={newTitle} 
                        onChange={(e) => setNewTitle(e.target.value)} 
                    />
                ) : (                
                    <CustomIconLink href={url}>
                      <Typography >
                      {shoppingList.name}
                      </Typography>
                    </CustomIconLink>
                )}           

            </Box>
            
        </CardContent>
 
        <CardActions >

          <CustomButton onClick={() => handleEditClick()}>
              {isEditing ? 'Save' : 'Rename'}
          </CustomButton>        

          {!isEditing &&
          <>
          <CustomIconLink href={`/shoppinglist_v2/${shoppingList.id}/manageshoppinglist`}>     
            <CustomButton>
              Edit
            </CustomButton>
          </CustomIconLink>
          
          
          <CustomButton onClick={() => deleteShoppingList()}>
            Delete
          </CustomButton>        
          </>
          }
        </CardActions>        

      </CustomCard>
    </Box>
  );
}