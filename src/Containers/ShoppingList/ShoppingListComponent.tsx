import React, { useContext, useState } from "react";

import ShoppingListContext from "../../Context/ShoppingList/ShoppingListContext";
import ShoppingListItemComponent from "./ShoppingListItemComponent";
import { Button, Divider, Typography } from "@mui/material";


const style = {margin: '10px'}

export default function ShoppinListComponent() {

    const {shoppingList} = useContext(ShoppingListContext);
    const [showCheckedList, setShowCheckedList] = useState<boolean>(false)


    return (
    <>
    <div style={ {padding: '10px'}}>
        <Typography variant="h5">
            Shopping List    
        </Typography>
        <Typography variant="body1">
            Check products you have found
        </Typography>
            

        
        { shoppingList.map((x, index) => (            
            x.productChecked === false &&
                <div key={index} style={style}>
                    <ShoppingListItemComponent item={x} />
                </div>
                ))
        }
        
        
        
        <Divider />
        <Button sx={ {} } onClick={() => setShowCheckedList(!showCheckedList)}>Show in Cart</Button>
        
        {showCheckedList &&
        <>
        
            {            
            shoppingList.map((x, index) => 
                x.productChecked === true &&
                    <div key={index} style={style}>
                        <ShoppingListItemComponent item={x} />
                    </div>            
                )
            }
        
        </> 
        
        }
    
    </div>
    </>
    )
}

