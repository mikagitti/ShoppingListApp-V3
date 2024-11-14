'use client';

import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';

import { Box, Grid, IconButton, Typography } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SettingsIcon from '@mui/icons-material/Settings';

import { GetShoppingListsByUserId, UpdateShoppingListName, GetShoppingListProductsByShoppingListId } from '@/Database/dbConnectionV3';

import { NewShoppingListModal } from './components/NewShoppingListModal';
import { DeleteShoppingListModal } from './components/DeleteShoppingListModal';
import { EditShoppingListNameModal } from './components/EditShoppingListNameModal';
import ShoppingListCard from './components/ShoppingListCard';
import LoginContext from '@/Context/login/LoginContext';
import { ShoppingListType } from '@/Database/types';

type ShoppingListDetailProps = {
  shoppingList: ShoppingListType;
  productCount: number;
};

export default function ShoppingListV2() {
  const { selectedUser } = useContext(LoginContext);

  const [isNewShoppingListModelOpen, setIsNewShoppingListModelOpen] = useState<boolean>(false);
  const [isDeleteShoppingListModelOpen, setIsDeleteShoppingListModelOpen] = useState<boolean>(false);
  const [isEditShoppingListModelOpen, setIsEditShoppingListModelOpen] = useState<boolean>(false);
  const [selectedShoppingList, setSelectedShoppingList] = useState<ShoppingListType | null>(null);
  const [shoppingLists, setShoppingLists] = useState<ShoppingListDetailProps[]>([]);

  useEffect(() => {
    updateUserShoppingListView();
  }, [isNewShoppingListModelOpen, isDeleteShoppingListModelOpen, isEditShoppingListModelOpen]);

  const onCloseEdit = () => {
    updateUserShoppingListView();
    setIsEditShoppingListModelOpen(false);
  };

  const deleteShoppingList = (shoppingList: ShoppingListType) => {
    setSelectedShoppingList(shoppingList);
    setIsDeleteShoppingListModelOpen(true);
  };

  const onCloseDelete = () => {
    updateUserShoppingListView();
    setIsDeleteShoppingListModelOpen(false);
  };

  const updateUserShoppingListView = async () => {
    if (selectedUser != null) {
      const result: ShoppingListType[] | { message: string } | null = await GetShoppingListsByUserId(selectedUser?.id);

      const shoppingLists: ShoppingListDetailProps[] = [];
      if (result != null && !('message' in result)) {
        const shoppingListDetailsPromises = result.map(async (x) => ({
          shoppingList: x,
          productCount: await getShoppingListProductsNotChecked(x.id),
        }));

        const resolvedShoppingListDetails = await Promise.all(shoppingListDetailsPromises);
        shoppingLists.push(...resolvedShoppingListDetails);
      }

      if (result != null && 'message' in result) console.log(result.message);
      if (Array.isArray(result)) setShoppingLists(shoppingLists);
    }
  };

  const addNewShoppingList = () => {
    setIsNewShoppingListModelOpen(false);
    updateUserShoppingListView();
  };

  const saveShoppingListName = async (id: number, newName: string) => {
    await UpdateShoppingListName(id, newName);
    updateUserShoppingListView();
  };

  const getShoppingListProductsNotChecked = async (shoppingListId: number): Promise<number> => {
    const result = await GetShoppingListProductsByShoppingListId(shoppingListId);
    return result.filter((x) => !x.checked).length;
  };

  if (selectedUser == null) {
    return (
      <>
        <h1>Login, please!</h1>
      </>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center', marginTop: '10px' }}>
      <Box sx={{ maxWidth: '1100px' }}>
        <Grid container spacing={2} mt={1}>
          {/* ADD NEW SHOPPING LIST */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
              <IconButton onClick={() => setIsNewShoppingListModelOpen(true)}>
                <NoteAddIcon />
                <Typography>Add new shopping list</Typography>
              </IconButton>
            </Box>
          </Grid>

          {/* MANAGE ALL PRODUCTS */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
              <Link href="/shoppinglist_v2/manageproducts">
                <IconButton>
                  <SettingsIcon />
                  <Typography sx={{ marginLeft: 1 }}>Manage all products</Typography>
                </IconButton>
              </Link>
            </Box>
          </Grid>

          {/*LIST ALL SHOPPING LISTS*/}
          {shoppingLists.length === 0 && (
            <Grid item>
              <Typography variant="h5">There is no shopping lists added</Typography>
            </Grid>
          )}
        </Grid>

        <Grid container spacing={2} mt={1}>
          {shoppingLists &&
            shoppingLists.map((x, index) => {
              return (
                <Grid key={index} item xs={12} sm={6} xl={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <ShoppingListCard
                    shoppingList={x.shoppingList}
                    deleteShoppingList={() => deleteShoppingList(x.shoppingList)}
                    setNewName={(name) => saveShoppingListName(x.shoppingList.id, name)}
                    url={`/shoppinglist_v2/${x.shoppingList.id}`}
                    productCount={x.productCount}
                  />
                </Grid>
              );
            })}
        </Grid>


        {/* ADD new shopping list */}
        {isNewShoppingListModelOpen && selectedUser != null && <NewShoppingListModal onClose={() => addNewShoppingList()} userId={selectedUser?.id} />}

        {/* DELETE shopping list */}
        {isDeleteShoppingListModelOpen && <DeleteShoppingListModal onClose={() => onCloseDelete()} shoppingList={selectedShoppingList} />}

        {/* EDIT shopping list name */}
        {isEditShoppingListModelOpen && <EditShoppingListNameModal onClose={() => onCloseEdit()} shoppingList={selectedShoppingList} />}
      </Box>
    </Box>
  );
}
