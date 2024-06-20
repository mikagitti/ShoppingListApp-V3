import ProductListContext, { ProductListType } from '@/Context/ProductList/ProductListContext';
import ShoppingListContext from '@/Context/ShoppingList/ShoppingListContext';
import { Button, Grid, List, ListItem, ListItemIcon, ListItemText, Modal, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

import { deleteProductFromDB } from "../../Database/dbConnection";

import { AddNewModal } from './AddNewProductModal';
import { EditProductModal } from './EditProductModal';


const style = {
    py: 0,
    width: '100%',
    borderRadius: 3,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
    marginBottom: '14px'
};

const iconStyle = {
    fontSize: '40px',
    marginRight: '40px'   
}



type ProductListProps = {
    productList: ProductListType[];
    onDelete: (id: string) => void; 
    onModify: (id: string, name: string) => void;
    onDeleteDB: (id: string) => void;
}


const ProductList = ({ productList, onDelete, onModify, onDeleteDB }: ProductListProps) => {
  return (
    <>      
        {productList.map((product, index) => (
        <List key={index} sx={style} >
            <ListItem
            sx={ {
                ":hover": {
                backgroundColor: '#DEB887',
                cursor: 'pointer', 
                borderRadius: 3,                   
                }}}>
            
                <ListItemText primary={product.productName} />
            
                <ListItemIcon onClick={() => onModify(product.id, product.productName)}>
                    <ModeEditOutlineIcon sx={iconStyle}/>
                </ListItemIcon>                                         
    
                <ListItemIcon onClick={() => onDelete(product.id)}>
                    <DeleteIcon sx={iconStyle}/>
                </ListItemIcon>

            </ListItem>
        </List> 
        ))}
    </>
  );
};






export default function ProductEditingComponent() {

    const {productList, deleteProductFromProductList, updateProductNameById} = useContext(ProductListContext);
    const {deleteProductFromShoppingList, updateShoppingListProductName} = useContext(ShoppingListContext);

    const [showEditProductComponent, setShowEditProductComponent] = useState<boolean>(false);
    const [selectedproduct, setSelectedproduct] = useState<ProductListType>({id: '0', productName: '', productInShoppingList: false});    

    const testProduct: ProductListType = {productName: 'testiPP', productInShoppingList: false, id: '10110'};

    const handleDelete = (productId: string) => {
        deleteProductFromProductList(productId);
        deleteProductFromShoppingList(productId);
        deleteProductFromDB(productId);
    };


    const handleModify = (productId: string, productName: string) => {
        console.log(productId + ' ' +  productName)
        const product: ProductListType = {id: productId, productName: productName, productInShoppingList: false}
        setSelectedproduct(product);
        setModalOpen(true);
    };

    const handleSave = (id: string, name: string) => {
        updateProductNameById(id, name);
        updateShoppingListProductName(id, name);
        setShowEditProductComponent(false);
    };

    const [isAddNewProductModalOpen, setIsAddNewProductModalOpen] = useState<boolean>(false);
    const [isModalOpen, setModalOpen] = useState<boolean>(false);

    const handleDatabadeDelete = (id: string) => {
        deleteProductFromDB(id);
      };

    return (
        <>
            <button style={ {padding: '10px', marginBottom: '10px'}} onClick={() => setIsAddNewProductModalOpen(true)}>Add New Product</button> 
            <ProductList productList={productList} onDelete={handleDelete} onModify={handleModify} onDeleteDB={handleDatabadeDelete}/>

            <AddNewModal isOpen={isAddNewProductModalOpen} onClose={() => setIsAddNewProductModalOpen(false)} />                

            <EditProductModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} selectedProduct={selectedproduct} />

        </>
    );
};




