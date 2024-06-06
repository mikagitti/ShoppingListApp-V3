
import React from "react";
import { Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { ListStyle, IconStyle, BoxStyle } from "./Styles";
import { red } from "@mui/material/colors";

type ProductProps = {
    name: string;
    removeProductFromList: () => void;
}

export default function ProductList({name, removeProductFromList} : ProductProps) {
  return (   
      <Box sx={BoxStyle}>
        
        <List sx={ListStyle}>
          <ListItem disablePadding>
            <ListItemButton>            

              <ListItemText primary={name} />

              <ListItemIcon>
                <IconButton onClick={removeProductFromList}>
                  <DeleteIcon sx={IconStyle} style={ {color: red[500] }}/>
                </IconButton>
              </ListItemIcon>
              
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  )
}
