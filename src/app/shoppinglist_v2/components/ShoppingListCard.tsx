import React, { useState } from 'react';
import Link from 'next/link';

import { CardContent, Typography, styled, Card, CardActions, Button, Box, Badge } from '@mui/material';
import { ShoppingListType } from '@/Database/types';

type CardProps = {
  shoppingList: ShoppingListType;
  deleteShoppingList: () => void;
  setNewName: (name: string) => void;
  url: string;
  productCount: number;
};

const CustomStyledCardHeader = styled(Box)(() => ({
  backgroundColor: 'green',
  height: '1.6rem',
}));

const CustomStyledCard = styled(Card)(({ theme }) => ({
  width: '300px',
  borderRadius: '10px',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
}));

const CustomLink = styled(Link)(({ theme }) => ({
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

const CustomStyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.secondary.main,
  },
  display: 'flex',
  gap: 2,
  flexDirection: 'row',
  alignItems: 'center',
  fontSize: '0.7rem',

}));

const CustomStyledBadge = styled(Badge)({
  '.MuiBadge-badge': {
    right: 13,
    top: 13,
    border: `0.1rem solid white`,
    padding: '0 4px',
    margin: '0 2px',
    borderRadius: '50%',
    max: 99,
  },
});

export default function ShoppingListCard({ shoppingList, deleteShoppingList, setNewName, url, productCount = 0 }: CardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(shoppingList.name);

  const handleEditClick = () => {
    if (isEditing) {
      setNewName(newTitle);
    }
    setIsEditing(!isEditing);
  };

  return (
    <CustomStyledBadge badgeContent={productCount > 0 ? productCount : '0'} color="primary">
      <CustomStyledCard>
        <CustomStyledCardHeader />
        <CardContent>
          {isEditing ? (
            <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          ) : (
            <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" justifyItems="center">
              <CustomLink href={url}>
                <Typography noWrap>{shoppingList.name}</Typography>
              </CustomLink>
            </Box>
          )}
        </CardContent>
        <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
          <Box display="flex" flexDirection="row" gap={2}>
            <CustomStyledButton onClick={() => handleEditClick()}>{isEditing ? 'Save' : 'Rename'}</CustomStyledButton>
            {isEditing && <CustomStyledButton onClick={() => setIsEditing(false)}>Close</CustomStyledButton>}

            {!isEditing && (
              <>
                <CustomLink href={`/shoppinglist_v2/${shoppingList.id}/manageshoppinglist`}>
                  <CustomStyledButton>Edit</CustomStyledButton>
                </CustomLink>

                <CustomStyledButton onClick={() => deleteShoppingList()}>Delete</CustomStyledButton>
              </>
            )}
          </Box>
        </CardActions>
      </CustomStyledCard>
    </CustomStyledBadge>
  );
}
