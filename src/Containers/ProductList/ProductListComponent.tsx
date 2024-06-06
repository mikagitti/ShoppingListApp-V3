
import React, { useContext } from 'react';
import { Typography } from '@mui/material';
import ProductListContext from '../../Context/ProductList/ProductListContext';
import ProductListItem from './ProductListItem';

const style = {margin: '10px'}

export default function ProductListComponent () {

    const {productList} = useContext(ProductListContext)

    return (
    <>
    <div>

        <Typography variant="h5">
            Product List
        </Typography>
        <Typography variant="body1">
            Add/Remove products in shopping list.
        </Typography>
        
        {
            productList.map( (product, keyIndex) => (
                <div key={keyIndex} style={style}>
                    <ProductListItem product={product}/>
                </div>
            ))
        }
        
    </div>
    </>
    )
};
