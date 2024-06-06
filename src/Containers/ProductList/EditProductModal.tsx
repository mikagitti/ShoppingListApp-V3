import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Modal, TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { CSSProperties } from '@mui/material/styles/createMixins';
import ProductListContext, { ProductListType } from '@/Context/ProductList/ProductListContext';
import ShoppingListContext from '@/Context/ShoppingList/ShoppingListContext';

import { updateProductName } from "../../Database/dbConnection";


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct: ProductListType;
}

const modalStyle : CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',       
  }

const backgroundStyle = {
    background: 'white',
    padding: '15px 25px 35px 25px',
    borderRadius: '30px',    
}


export const EditProductModal = ({ isOpen, onClose, selectedProduct } : ModalProps) => {
    
  const { updateProductNameById } = useContext(ProductListContext);
  const { updateShoppingListProductName } = useContext(ShoppingListContext);
  
  const [productName, setProductName] = useState<string>('');

  const name:string = selectedProduct.productName;

  const saveModifiedProductNameToDbShoppingListProductList = () => {              
      updateProductNameById(selectedProduct.id, productName);
      updateShoppingListProductName(selectedProduct.id, productName);
      
      updateProductName(selectedProduct.id, productName);
      
      onClose();
  }
  
  const closeModal = () => {
    setProductName('');      
    onClose();
  }
  
  if (!isOpen) {    
    return null;
  }

  return (
    <div style={ modalStyle}>      
      <Box sx={backgroundStyle}>
        
          <h1>Edit product name</h1>
          <h1>{productName}</h1>
          <Stack spacing={2}>
              <TextField  id="product-name" 
                          variant="standard" 
                          style={ {fontSize: '30px'}}
                          defaultValue={name}
                          
                          onChange={(e) => setProductName(e.target.value)} 
                          label="Product name"/>
              <Button variant="outlined" onClick={() => saveModifiedProductNameToDbShoppingListProductList()} disabled={productName == '' ? true : false} >Save</Button>
              <Button variant="outlined" onClick={() => closeModal()}>Close</Button>
          </Stack>
        </Box>      
    </div>

  );
};



