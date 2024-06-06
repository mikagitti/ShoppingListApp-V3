import React, { createContext, useState, ReactNode, useContext } from 'react';
import { ProductListType } from '../ProductList/ProductListContext';

export type ShoppingListType = {
    productId: string;
    productName: string;
    productChecked: boolean;
}

type ShoppingListContextType = {
  shoppingList: ShoppingListType[];    
  clearShoppingList: () => void;
  checkShoppingListProduct: (product: string) => void;
  ModifyShoppingList: (id: string, productName: string) => void;
  updateShoppingListProductName: (id: string, productName: string) => void;
  deleteProductFromShoppingList: (id: string) => void;
}

const defaultShoppingListState: ShoppingListContextType = {
    shoppingList: [],    
    clearShoppingList: () => {},
    checkShoppingListProduct: (product: string) => {},
    ModifyShoppingList: (id: string, productName: string) => {},
    updateShoppingListProductName: (id: string, productName: string) => {},
    deleteProductFromShoppingList: (id: string) => {},
};


const ShoppingListContext = createContext<ShoppingListContextType>(defaultShoppingListState);

export const ShoppinglistProvider = ({ children }: { children: ReactNode }) => {

    const [shoppingList, setShoppingList] = useState<ShoppingListType[]>(readyShoppingList);    

    const clearShoppingList = () => {        
        setShoppingList([]);
    }

    const checkShoppingListProduct = (removableProduct: string) => {        
        setShoppingList((items) => 
                        items.map( (item) => item.productName === removableProduct ? {...item, productChecked: !item.productChecked } : item) )        
    }

    const ModifyShoppingList = (productId: string, productName: string) => {
        
        //If product does not exist in shoppinglist then add it to shoppinglist.
        if (doesProductExist(productId) == false) {
            setShoppingList([...shoppingList, {productId: productId, productName: productName, productChecked: false}])
        }
        else { //If product exist in shoppinglist, remove product from shoppinglist.
            setShoppingList(shoppingList.filter(product => product.productName !== productName))
        }
    }

    const doesProductExist = (id: string) => {
        return shoppingList.some(item => item.productId === id);
    };

    const updateShoppingListProductName = (id: string, name: string) => {
        setShoppingList(shoppingList.map(item => item.productId === id ? { ...item, productName: name } : item) );                            
    }

    const deleteProductFromShoppingList = (id: string) => {
        setShoppingList(shoppingList.filter(product => product.productId !== id));
    }

    return (
        <ShoppingListContext.Provider value={{ 
            shoppingList,            
            clearShoppingList, 
            checkShoppingListProduct, 
            ModifyShoppingList, 
            updateShoppingListProductName, 
            deleteProductFromShoppingList }}>
        {children}
        </ShoppingListContext.Provider>
    );
};

export default ShoppingListContext;

const readyShoppingList : ShoppingListType[] = [
    
]
