import { useContext } from "react";

import ShoppingListContext, { ShoppingListType } from "../../Context/ShoppingList/ShoppingListContext";
import { List, ListItem, ListItemText } from "@mui/material";

type ShoppingListItemProps = {
    item: ShoppingListType;
}

const style = {
    py: 0,
    width: '100%',
    borderRadius: 3,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
  };
  

export default function ShoppingListItemComponent({item} : ShoppingListItemProps) {

    const {checkShoppingListProduct } = useContext(ShoppingListContext);
    
    function updateBothLists():void {
        checkShoppingListProduct(item.productName);
    }

    return (
        
        <List sx={style}>
            <ListItem onClick={updateBothLists}>
                <ListItemText>
                    <ListItemText primary={item.productName} />
                </ListItemText>
            </ListItem>
        </List>
        
    )
}