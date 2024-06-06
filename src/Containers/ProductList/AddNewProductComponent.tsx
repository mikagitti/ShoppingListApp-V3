import { Box, Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";

export default function AddNewProduct() {

    return (

        <>
        <Grid item xs={4}>
        <Card>
          <CardContent>
          <Typography variant="h5" component="div">
                Change product name
              </Typography>
            <Box
              sx={{                
                flexDirection: 'column',
                alignItems: 'center',                
              }}
            >
              <TextField label="Write new product here" variant="outlined" />
              <Button variant="contained" color="primary">
                Save
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
        </>
    )
}