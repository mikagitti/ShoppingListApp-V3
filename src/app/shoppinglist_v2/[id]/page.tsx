'use client'
import React, { useEffect, useState } from "react";

import { Box, Button, Divider } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { 
    GetShoppingListProductsByShoppingListId, 
    ShoppingListProductsType,
    UpdateProductCheckedInShoppingListByShoppingListIdAndProductId,
} from "@/Database/dbConnectionV2";

import ProductListItem, { iconType } from "../components/productListItem";

const IconPropsForAddingProduct : iconType = {
    icon: AddCircleIcon,
    color: 'green',
};
const IconPropsForDeletingProduct : iconType = {
    icon: RemoveCircleIcon,
    color: 'red',    
};

const boxSize: string = '500px';

export default function Page({ params }: { params: { id: number, name: string } }) {

    const [showCheckedList, setShowCheckedList] = useState<boolean>(false)
    const [shoppingListProducts, setShoppingListProducts] = useState<ShoppingListProductsType[]>([]);
    
    useEffect( () => {
        fetchShoppingListProductsToMemory();        
    }, []);



    const fetchShoppingListProductsToMemory = async() => {
        const result : ShoppingListProductsType[] = await GetShoppingListProductsByShoppingListId(params.id);
        setShoppingListProducts(result);
    }

    const checkProduct = (product: ShoppingListProductsType) => {
        setShoppingListProducts((products) => 
        products.map( (item) => item.id === product.id ? {...item, is_checked: !item.is_checked } : item) )

        saveProductCheckStatusToShoppingList(product);
    }

    const saveProductCheckStatusToShoppingList = async(product: ShoppingListProductsType) => {
        await UpdateProductCheckedInShoppingListByShoppingListIdAndProductId(product.shoppinglist_id, product.product_id, !product.is_checked);
    }

    return (            
       
        <Box sx={ { maxWidth: "500px"}}>
            {
            
            shoppingListProducts.map((product, index) => 
                    product.is_checked == false &&                    
                    <div key={index} style={ {margin: '10px'}}>
                        <ProductListItem icon={IconPropsForAddingProduct} name={product.name} iconAction={() => checkProduct(product)} />                            
                    </div>                    
                )
            }            

            <Divider />

            <Button sx={ {} } onClick={() => setShowCheckedList(!showCheckedList)}>
                {showCheckedList ? 'Hide in Cart' : 'Show in Cart'}
            </Button>
        
            { 
            showCheckedList &&
                shoppingListProducts.map((product, index) => (
                    product.is_checked == true &&
                 
                        <div key={index} style={ {margin: '10px' }}>                            
                            <ProductListItem icon={IconPropsForDeletingProduct} name={product.name} iconAction={() => checkProduct(product)} />                            
                        </div>                 
                    )                    
                )                       
            }

        </Box>        
    )
}