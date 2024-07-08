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

const CustomCard = styled(Card)(({ theme }) => ({
  boxShadow: theme.shadows[10],
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
  fontSize: '12px',
}));

const StyledBadge = styled(Badge)({
  '.MuiBadge-badge': {
    right: 13,
    top: 13,
    border: `0.5px solid white`,
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
    <StyledBadge badgeContent={productCount > 0 ? productCount : '0'} color="primary">
      <CustomCard>
        <CardContent>
          {isEditing ? (
            <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          ) : (
            <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" justifyItems="center">
              <CustomLink href={url}>
                <Typography>{shoppingList.name}</Typography>
              </CustomLink>
            </Box>
          )}
        </CardContent>
        <CardActions>
          <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" justifyItems="center" gap={2}>
            <CustomButton onClick={() => handleEditClick()}>{isEditing ? 'Save' : 'Rename'}</CustomButton>
            {isEditing && <CustomButton onClick={() => setIsEditing(false)}>Close</CustomButton>}

            {!isEditing && (
              <>
                <CustomLink href={`/shoppinglist_v2/${shoppingList.id}/manageshoppinglist`}>
                  <CustomButton>Edit</CustomButton>
                </CustomLink>

                <CustomButton onClick={() => deleteShoppingList()}>Delete</CustomButton>
              </>
            )}
          </Box>
        </CardActions>
      </CustomCard>
    </StyledBadge>
  );
}
