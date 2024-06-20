import React, { createContext, useState, ReactNode, useRef, useEffect } from 'react';

import productListJsonFile from './ProductListJSON.json';
import { DbHealthCheck, GetProducts } from '@/Database/dbConnection';

export type ProductListType = {
    id: string;
    productName: string;
    productInShoppingList: boolean; 
}
interface IProductListContext {    
    productList: ProductListType[];
    checkProductListProduct: (id: string) => void;
    updateProductNameById: (id: string, name: string) => void;
    addNewProduct: (id: string, name: string) => void;
    deleteProductFromProductList: (id: string) => void;
}


const fetchProductFromDB = async ():Promise<ProductListType[]> => {

    /*
    const isDbOn:boolean = await DbHealthCheck();
    if(isDbOn)
        console.log('ITS ON!')
    else
        console.log('It is Offline??')
    */
   
    const result = await GetProducts();
    const setProductsToList:ProductListType[] = result.map(x => ( {id: x.id, productName: x.productName, productInShoppingList: Boolean(x.shoppingList)}))
    return setProductsToList;
}

const defaultProductListState: IProductListContext = {
    productList: [],    
    checkProductListProduct: (id: string) => {},
    updateProductNameById: (id: string, name: string) => {},
    addNewProduct: (id: string, name: string) => {},
    deleteProductFromProductList: (id: string) => {},
}

//CONTEXT
const ProductListContext = createContext<IProductListContext>(defaultProductListState);

//PROVIDER
export const ProductListProvider = ({children} : {children : ReactNode}) => {

    const [productList, setProductList] = useState<ProductListType[]>([]);

    //One time database fetch for product list.
    useEffect(() => {        
        async function runFetchProductsFromDB() {
            setProductList(await fetchProductFromDB());
        }
        runFetchProductsFromDB();

        if (productList.length <= 0) {
            setProductList(productListJsonFile);
        }

    },[productList.length])

    const updateProductNameById = (id: string, name: string) => {
        setProductList(productList.map(item => 
            item.id === id ? { ...item, productName: name } : item
          ));
    }

    const checkProductListProduct = (id: string) => {        
        setProductList((items) => 
                    items.map( (item) => item.id === id ? {...item, productInShoppingList: !item.productInShoppingList } : item) )        
    }

    const addNewProduct = (productId: string, productName: string) => {        
        setProductList([...productList, {id: productId, productName: productName, productInShoppingList: false}]);        
    }

    const deleteProductFromProductList = (id: string) => {
        setProductList(productList.filter(item => item.id !== id));
    }

    return (
        <ProductListContext.Provider value={{ 
            productList, 
            checkProductListProduct, 
            updateProductNameById, 
            addNewProduct, 
            deleteProductFromProductList }}>
        {children}
        </ProductListContext.Provider>
    );
}

export default ProductListContext;
