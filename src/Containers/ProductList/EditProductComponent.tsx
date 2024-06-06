
import ProductListContext from "@/Context/ProductList/ProductListContext"
import ShoppingListContext from "@/Context/ShoppingList/ShoppingListContext";
import { useContext, useEffect, useState } from "react";
import SaveAsTwoToneIcon from '@mui/icons-material/SaveAsTwoTone';
import CloseIcon from '@mui/icons-material/Close';

import { Grid, Card, CardContent, Typography, Button, TextField, Box, styled, Paper, ListItemText, IconButton  } from '@mui/material';

type CurrentComponentProps = {
    onClose: () => void;
    productId: string;
  }
  
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'grey',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'blue',
}));

export default function EditProductComponent( {onClose, productId} : CurrentComponentProps) {

    const { productList, updateProductNameById } = useContext(ProductListContext);
    const { updateShoppingListProductName } = useContext(ShoppingListContext);

    const [ productName, setProductName ] = useState<string>('');

    useEffect(() => {
        const product = productList.find(item => item.id === productId) ?? null;
        setProductName(product ? product.productName : "");
    }, []);

    function saveProductChanges(id: string, name: string) {
        updateProductNameById(id, name);
        updateShoppingListProductName(id, name);
        onClose();
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.value);
      setProductName(event.target.value);
    };

    function InputAndSaveAndCloseGroup() {
      return (
        <Grid container spacing={2} alignItems="center">
          
          <Grid item xs>
            <TextField fullWidth value={productName} variant="filled" onChange={handleChange} />
          </Grid>
          
          <Grid item>            
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => saveProductChanges(productId, productName)}>
              <SaveAsTwoToneIcon />
            </Button>
          </Grid>
          
          <Grid item>
            <IconButton aria-label="close" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Grid>

        </Grid>        
      );
    }

    return (
    
    <Grid container spacing={2}>      
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <InputAndSaveAndCloseGroup />
          </CardContent>
        </Card>
      </Grid>
    </Grid>     
      
    )
}