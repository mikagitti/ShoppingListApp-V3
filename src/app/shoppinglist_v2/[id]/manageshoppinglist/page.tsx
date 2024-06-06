'use client'
import React, { useEffect, useState } from "react";

import { Box, Button, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { 
    GetShoppingListProductsByShoppingListId, 
    ShoppingListProductsType, 
    RemoveProductFromShoppingList, 
    GetAllProducts, 
    ProductType, 
    AddNewProductToShoppingList, 
} from "@/Database/dbConnectionV2";

import { BoxStyle, ButtonStyle, ListBoxStyle, ListItemStyle } from "../../components/Styles";
import ProductListItem, { iconType } from "../../components/productListItem";

export default function Page({ params }: { params: { id: number } }) {

    const IconPropsForAddingProduct : iconType = {
        icon: AddShoppingCartIcon,
        color: 'green',
    };

    const IconPropsForDeletingProduct : iconType = {
        icon: DeleteIcon,
        color: 'red',    
    };
      
    const shoppingListId : number = params.id;

    const [shoppingListProducts, setShoppingListProducts] = useState<ShoppingListProductsType[]>([]);        
    const [allProducts, setAllProducts] = useState<ProductType[]>([]);
    const [addingProduct, setAddingProduct] = useState<boolean>(false);    

    useEffect( () => {        
        fetchShoppingListProductsToMemory();                
    }, []);

    useEffect( () => {
        fetchAwailableProductsToMemory();        
    }, [shoppingListProducts]);

    
    //Open/Close adding more products to shopping list
    const openAddProduct = async() => {
        if(!addingProduct) {            
            const productList : ProductType[] = await GetAllProducts();
            const filteredProducts: ProductType[] = productList.filter(product => !shoppingListProducts.some(b => b.product_id === product.id));            
            setAllProducts(filteredProducts);
        }
        setAddingProduct(!addingProduct);
    }


    const fetchShoppingListProductsToMemory = async() => {        
        const shoppingListProducts : ShoppingListProductsType[] = await GetShoppingListProductsByShoppingListId(params.id);
        setShoppingListProducts(shoppingListProducts);        
    }

    const fetchAwailableProductsToMemory = () => {        
        const filteredProducts: ProductType[] = allProducts.filter(product => !shoppingListProducts.some(b => b.product_id === product.id));            
        setAllProducts(filteredProducts);        
    }

    //REMOVE
    const removeProductFromList = async(id : number) => {
        await RemoveProductFromShoppingList(id);
        await fetchShoppingListProductsToMemory();
    }

    //ADD
    const addProductToShoppingList = async(id: number) => {
        await AddNewProductToShoppingList(shoppingListId, id);
        await fetchShoppingListProductsToMemory();        
    }

    return (
        <>
        <Box sx={BoxStyle} m={1}> 
            <Typography variant="h4">
                Manage shopping list.  
            </Typography>
        </Box>

        <Box sx={BoxStyle} m={1}> 
            <Typography variant="body1" component="div">                 
                {addingProduct ? 'ADD products to shopping list' : 'REMOVE products from shopping list' }
            </Typography>
        </Box>

        {
        shoppingListProducts.length <= 0 && (        
            <Box sx={BoxStyle} m={3}> 
                <Typography variant="h4" component="div">
                    Shopping list is empty. Add products
                </Typography>
            </Box>        
        )
        }      
        
        <Box sx={BoxStyle} m={1}>            
            <Button                 
                sx={ButtonStyle}
                onClick={openAddProduct}
            >
                {addingProduct ? <Typography>Remove products from here</Typography> : <Typography>Add products from here</Typography> }                
            </Button>
        </Box>
        
        <Box sx={ListBoxStyle}>
        {
        addingProduct ? (
            <Box sx={ListItemStyle}>
                {
                allProducts.map((product, index) => {
                    return (
                        <div key={index} style={ {margin: '10px'}}>
                            <ProductListItem icon={IconPropsForAddingProduct} name={product.name} iconAction={() => addProductToShoppingList(product.id)} />
                        </div>
                    )
                })
                }
            </Box>
        ):(            
            <Box sx={ListItemStyle}>
            {            
                shoppingListProducts.map((product, index) => {
                    return (
                        <div key={index} style={ {margin: '10px'}}>
                            <ProductListItem icon={IconPropsForDeletingProduct} name={product.name} iconAction={() => removeProductFromList(product.id)} />
                        </div>                    
                    )
                })
            }
            </Box>
        )}
        </Box>            

        </>
    )
}