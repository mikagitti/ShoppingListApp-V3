"use client";
import React, { useContext, useEffect, useState } from "react";
import { Box, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { green, red } from "@mui/material/colors";
import { NewProductModal } from "./NewProductModal";
import { EditProductNameModal } from "./EditProductNameModal";
import ProductListItem, { iconType } from "../components/productListItem";
import { DeleteProduct, GetAllProducts } from "@/Database/dbConnectionV3";
import { ProductType } from "@/Database/types";
import LoginContext from "@/Context/login/LoginContext";


const productListStyle = {
     display: "flex",
     flexDirection: "column",
     alignItems: "center",
     justifyContent: "center",
};

export default function Page() {

     const { selectedUser } = useContext(LoginContext);

     const IconPropsForAddingProduct: iconType = {
          icon: AddIcon,
          color: green[500],
     };

     const IconPropsForDeletingProduct: iconType = {
          icon: DeleteIcon,
          color: red[800],
     };

     const [productList, setProductList] = useState<ProductType[] | null>(null);
     const [newProductModalOpen, setNewProductModalOpen] =
          useState<boolean>(false);
     const [trickerProductListUpdate, setTrickerProductListUpdate] =
          useState<boolean>(false);
     const [updateProductNameModalOpen, setUpdateProductNameModalOpen] =
          useState<boolean>(false);
     const [activeProduct, setActiveProduct] = useState<
          ProductType | undefined
     >();

     useEffect(() => {
          getAllProductsFromDb();
     }, []);

     const getAllProductsFromDb = async () => {
          const products = await GetAllProducts();
          setProductList(products);
     };

     const deleteProductFromDbById = async (productId: number) => {
          await DeleteProduct(productId);
     };

     const removeProduct = async (productId: number) => {
          await deleteProductFromDbById(productId);
          await getAllProductsFromDb();
     };

     const editProductName = (product: ProductType) => {
          setActiveProduct(product);
          setUpdateProductNameModalOpen(true);
     };

     const closeAddNewProductModal = () => {
          setNewProductModalOpen(false);
          getAllProductsFromDb();
     };

     const closeEditProductNameModal = () => {
          setUpdateProductNameModalOpen(false);
          getAllProductsFromDb();
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
               <Box sx={productListStyle}>
                    <div>
                         <Box
                              sx={{
                                   marginLeft: "5px",
                                   marginTop: "10px",
                                   marginBottom: "10px",
                              }}
                         >
                              <ProductListItem
                                   icon={IconPropsForAddingProduct}
                                   name="Add new product"
                                   iconAction={() => setNewProductModalOpen(true)}
                              />
                         </Box>

                         <Divider
                              sx={{ border: "solid 3px", margin: " 15px 5px" }}
                         />

                         {productList?.map((product, index) => {
                              return (
                                   <Box key={index} sx={{ margin: "5px" }}>
                                        <ProductListItem
                                             icon={IconPropsForDeletingProduct}
                                             name={product.name}
                                             iconAction={() =>
                                                  removeProduct(product.id)
                                             }
                                             editAction={() =>
                                                  editProductName(product)
                                             }
                                        />
                                   </Box>
                              );
                         })}
                    </div>
               </Box>

               {newProductModalOpen && (
                    <NewProductModal onClose={closeAddNewProductModal} />
               )}

               {updateProductNameModalOpen && (
                    <EditProductNameModal
                         onClose={closeEditProductNameModal}
                         product={activeProduct}
                    />
               )}
          </>
     );
}
