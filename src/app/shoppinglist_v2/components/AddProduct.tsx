

import React from "react";
import { Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import AddSharpIcon from '@mui/icons-material/AddSharp';
import { ListStyle, IconStyle, BoxStyle } from "./Styles";
import { green } from "@mui/material/colors";

type ProductProps = {
    name: string;
    addProduct: () => void;
}

export default function AddProduct({name, addProduct} : ProductProps) {
  return (   
      <Box sx={BoxStyle}>
        
        <List sx={ListStyle}>
          <ListItem disablePadding>
            <ListItemButton>            

              <ListItemText primary={name} />

              <ListItemIcon>
                <IconButton onClick={addProduct}>
                  <AddSharpIcon sx={IconStyle} style={ {color: green[500]}} />
                </IconButton>
              </ListItemIcon>
              
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  )
}
