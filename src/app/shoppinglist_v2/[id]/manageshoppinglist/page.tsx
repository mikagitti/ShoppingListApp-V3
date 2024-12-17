"use client";
import React, { use, useContext, useEffect, useState } from "react";

import { Box, Button, Container, styled, Typography, Theme } from "@mui/material";
import Grid from '@mui/material/Grid2';
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import {
     GetShoppingListProductsByShoppingListId,
     RemoveProductFromShoppingList,
     GetAllProducts,
     AddNewProductToShoppingList,
} from "@/Database/dbConnectionV3";

import {
     BoxStyle,
     ButtonStyle,
     DangerButtonStyle,
     ListBoxStyle,
     ListItemStyle,
     PrimaryButtonStyle,
} from "../../components/Styles";
import ProductListItem, { iconType } from "../../components/productListItem";
import { ProductType, ShoppingListProductsType } from "@/Database/types";
import LoginContext from "@/Context/login/LoginContext";

const CustomStyledBox = styled(Box)(({ theme }) => ({
     width: '15rem',
     height: '4rem',
     display: 'flex',
     justifyContent: 'center',
     alignItems: 'center',
     color: 'white',
     borderRadius: '10px',
     boxShadow: theme.palette.mode === 'dark' ? '0 0 10px rgba(255, 255, 255, 0.3)' : '0 0 10px rgba(0, 0, 0, 0.3)',
}));


export default function Page({ params }: { params: Promise<{ id: number }> }) {
     const { id } = use(params);
     const shoppingListId: number = id;

     const { selectedUser } = useContext(LoginContext);

     const IconPropsForAddingProduct: iconType = {
          icon: AddShoppingCartIcon,
          color: "green",
     };

     const IconPropsForDeletingProduct: iconType = {
          icon: DeleteIcon,
          color: "red",
     };

     const [shoppingListProducts, setShoppingListProducts] = useState<ShoppingListProductsType[]>([]);
     const [allProducts, setAllProducts] = useState<ProductType[]>([]);
     const [addingProductToShoppingList, setAddingProductToShoppingList] = useState<boolean>(true);

     useEffect(() => {
          fetchShoppingListProductsToMemory();

          const fetchProductToMemory = async () => {
               setAllProducts(await GetAllProducts());
          }

          fetchProductToMemory();

     }, []);

     useEffect(() => {
          openAddProduct();
     }, [addingProductToShoppingList]);

     useEffect(() => {
          fetchAwailableProductsToMemory();
     }, [shoppingListProducts]);

     //Open/Close adding more products to shopping list
     const openAddProduct = async () => {
          if (!addingProductToShoppingList) {
               const productList: ProductType[] = await GetAllProducts();
               const filteredProducts: ProductType[] = productList.filter(
                    (product) =>
                         !shoppingListProducts.some((b) => b.id === product.id)
               );
               setAllProducts(filteredProducts);
          }
     };

     const fetchShoppingListProductsToMemory = async () => {
          const shoppingListProducts: ShoppingListProductsType[] =
               await GetShoppingListProductsByShoppingListId(shoppingListId);
          setShoppingListProducts(shoppingListProducts);
     };

     const fetchAwailableProductsToMemory = () => {
          const filteredProducts: ProductType[] = allProducts.filter(
               (product) =>
                    !shoppingListProducts.some((b) => b.id === product.id)
          );
          setAllProducts(filteredProducts);
     };

     //REMOVE
     const removeProductFromShoppingList = async (productId: number) => {
          await RemoveProductFromShoppingList(shoppingListId, productId);
          await fetchShoppingListProductsToMemory();
     };

     //ADD
     const addProductToShoppingList = async (id: number) => {
          await AddNewProductToShoppingList(shoppingListId, id);
          await fetchShoppingListProductsToMemory();
     };

     if (selectedUser == null) {
          return (
               <>
                    <h1>Login, please!</h1>
               </>
          );
     }

     return (
          <>
               <Box sx={BoxStyle} m={1}>
                    <Typography variant="h4">Manage shopping list.</Typography>
               </Box>

               <Container>
                    <Grid container spacing={2} m={2} justifyContent="center">
                         <Button sx={PrimaryButtonStyle} onClick={() => setAddingProductToShoppingList(true)}>
                              <Typography variant="h5" component="div">Add products</Typography>
                         </Button>
                         <Button sx={DangerButtonStyle} onClick={() => setAddingProductToShoppingList(false)}>
                              <Typography variant="h5" component="div">Remove product</Typography>
                         </Button>
                    </Grid>
               </Container>

               {shoppingListProducts.length <= 0 && (
                    <Box sx={BoxStyle} m={3}>
                         <Typography variant="h4" component="div">
                              Shopping list is empty.<br />Add products
                         </Typography>
                    </Box>
               )}

               <Box sx={BoxStyle} m={1}>
                    {addingProductToShoppingList ? (
                         <ProductListComponent products={allProducts} shownIcon={IconPropsForAddingProduct} action={addProductToShoppingList} />
                    ) : (
                         <ProductListComponent products={shoppingListProducts} shownIcon={IconPropsForDeletingProduct} action={removeProductFromShoppingList} />
                    )}
               </Box>

          </>
     );
}

type ProductListComponentProps = {
     products: ShoppingListProductsType[] | ProductType[],
     shownIcon: iconType,
     action: (id: number) => Promise<void>,
};

const ProductListComponent = ({ products, shownIcon, action }: ProductListComponentProps) => {
     return (
          <Box sx={ListItemStyle}>
               {products.map((product, index) => {
                    return (
                         <div
                              key={index}
                              style={{ margin: "10px" }}
                         >
                              <ProductListItem
                                   icon={shownIcon}
                                   name={product.name}
                                   iconAction={() => action(product.id)}
                              />
                         </div>
                    );
               })}
          </Box>
     );
}