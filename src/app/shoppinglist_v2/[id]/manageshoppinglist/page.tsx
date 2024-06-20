"use client";
import React, { useEffect, useState } from "react";

import { Box, Button, Typography } from "@mui/material";
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
     ListBoxStyle,
     ListItemStyle,
} from "../../components/Styles";
import ProductListItem, { iconType } from "../../components/productListItem";
import { ProductType, ShoppingListProductsType } from "@/Database/types";

export default function Page({ params }: { params: { id: number } }) {
     const IconPropsForAddingProduct: iconType = {
          icon: AddShoppingCartIcon,
          color: "green",
     };

     const IconPropsForDeletingProduct: iconType = {
          icon: DeleteIcon,
          color: "red",
     };

     const shoppingListId: number = params.id;

     const [shoppingListProducts, setShoppingListProducts] = useState<
          ShoppingListProductsType[]
     >([]);
     const [allProducts, setAllProducts] = useState<ProductType[]>([]);
     const [addingProductToShoppingList, setAddingProductToShoppingList] =
          useState<boolean>(false);

     useEffect(() => {
          fetchShoppingListProductsToMemory();
     }, []);

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
          setAddingProductToShoppingList(!addingProductToShoppingList);
     };

     const fetchShoppingListProductsToMemory = async () => {
          const shoppingListProducts: ShoppingListProductsType[] =
               await GetShoppingListProductsByShoppingListId(params.id);
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
     const removeProductFromList = async (productId: number) => {
          await RemoveProductFromShoppingList(shoppingListId, productId);
          await fetchShoppingListProductsToMemory();
     };

     //ADD
     const addProductToShoppingList = async (id: number) => {
          await AddNewProductToShoppingList(shoppingListId, id);
          await fetchShoppingListProductsToMemory();
     };

     return (
          <>
               <Box sx={BoxStyle} m={1}>
                    <Typography variant="h4">Manage shopping list.</Typography>
               </Box>

               <Box sx={BoxStyle} m={1}>
                    <Typography variant="body1" component="div">
                         {addingProductToShoppingList
                              ? "ADD products to shopping list"
                              : "REMOVE products from shopping list"}
                    </Typography>
               </Box>

               {shoppingListProducts.length <= 0 && (
                    <Box sx={BoxStyle} m={3}>
                         <Typography variant="h4" component="div">
                              Shopping list is empty. Add products
                         </Typography>
                    </Box>
               )}

               <Box sx={BoxStyle} m={1}>
                    <Button sx={ButtonStyle} onClick={openAddProduct}>
                         {addingProductToShoppingList ? (
                              <Typography>Remove products from here</Typography>
                         ) : (
                              <Typography>Add products from here</Typography>
                         )}
                    </Button>
               </Box>

               <Box sx={ListBoxStyle}>
                    {addingProductToShoppingList ? (
                         <Box sx={ListItemStyle}>
                              {allProducts.map((product, index) => {
                                   return (
                                        <div
                                             key={index}
                                             style={{ margin: "10px" }}
                                        >
                                             <ProductListItem
                                                  icon={
                                                       IconPropsForAddingProduct
                                                  }
                                                  name={product.name}
                                                  iconAction={() =>
                                                       addProductToShoppingList(
                                                            product.id
                                                       )
                                                  }
                                             />
                                        </div>
                                   );
                              })}
                         </Box>
                    ) : (
                         <Box sx={ListItemStyle}>
                              {shoppingListProducts.map((product, index) => {
                                   return (
                                        <div
                                             key={index}
                                             style={{ margin: "10px" }}
                                        >
                                             <ProductListItem
                                                  icon={
                                                       IconPropsForDeletingProduct
                                                  }
                                                  name={product.name}
                                                  iconAction={() =>
                                                       removeProductFromList(
                                                            product.id
                                                       )
                                                  }
                                             />
                                        </div>
                                   );
                              })}
                         </Box>
                    )}
               </Box>
          </>
     );
}
