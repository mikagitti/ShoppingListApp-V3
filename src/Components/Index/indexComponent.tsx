import React, { useContext } from 'react';

import Home from "@/Components/Home/HomeComponent";
import ShoppingListNavBar from "@/Containers/Header/header";
import ProductListComponent from "@/Containers/ProductList/ProductListComponent";
import ShoppinListComponent from "@/Containers/ShoppingList/ShoppingListComponent";
import { ProductListProvider } from "@/Context/ProductList/ProductListContext";
import { ShoppinglistProvider } from "@/Context/ShoppingList/ShoppingListContext";
import { Box, Container, CssBaseline, Grid, Paper, styled } from "@mui/material";

import HeaderListContext from '@/Context/Header/HeaderContext';
import ProductEditingComponent from '@/Containers/ProductList/ProductEditingListComponent';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function IndexComponent() {

    const { activeHeader } = useContext(HeaderListContext)

    return (
<>
        
        <ShoppingListNavBar />
        
        <Container  >
            {
                activeHeader.id === 1 && 
                    <div style={{ marginTop: 8}}>
                        <Home />
                    </div>
            }
            
            <div style={{ marginTop: 8}}>
            <Container>
                <ShoppinglistProvider> {/*PROVIDER*/}
                    <ProductListProvider> {/*PROVIDER*/}              
                    {      
                        activeHeader.id === 2 && <ShoppinListComponent />
                    }
                    {
                        activeHeader.id === 3 &&<ProductListComponent />
                    } 
                    {
                        activeHeader.id === 4 && <ProductEditingComponent />
                    }
                    </ProductListProvider> 
                </ShoppinglistProvider>
            </Container>
            </div>
        
        </Container>
        
        </>
    )

}
